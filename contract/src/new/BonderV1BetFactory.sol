// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IBetTokenERC20} from "../interface/IBetTokenERC20.sol";
import {IBonderPool} from "../interface/IBonderPool.sol";
import {IBonderV1PairLPFactory} from "../interface/IBonderV1PairLPFactory.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {BetTokenERC20} from "./BetTokenERC20.sol";
// import {BonderV1LPFactory} from "../uniswap/BonderV1LPFactory.sol";

// REMOVE BEFORE FLIGHT
import {console} from "forge-std/console.sol";

// TODO: Check when not paused
contract BonderV1BetFactory is Pausable, Ownable {

    uint256 public betId;
    // uint256 public bondPool;

    mapping(uint256 => Bet) public idToBet;
    mapping(uint256 => mapping(address => uint256)) public bonderYesBonds;
    mapping(uint256 => mapping(address => uint256)) public bonderNoBonds;

     // FOR TESTING
    function getBonderYesBonds(
        uint256 _betId,
        address _bonder
    ) external view returns (uint256) {
        return bonderYesBonds[_betId][_bonder];
    }

    // FOR TESTING
    function getBonderNoBonds(
        uint256 _betId,
        address _bonder
    ) external view returns (uint256) {
        return bonderNoBonds[_betId][_bonder];
    }

    // =========================================== BONDER STRUCT AND MAPPING =========================================== //

    // struct BettorProfile {
    //     uint[] betIds;
    // }

    // struct BonderProfile {

    // }



     // =========================================== EVENTS =========================================== //
    event NewSettings(
        uint256 time
    );
    event BetCreated(
        uint256 indexed betId,
        address indexed creator,
        uint256 time
    );
    event StageChange(
        uint256 indexed betId,
        Stages oldStage,
        Stages newStage,
        uint256 time
    );
    event FinalDecision(
        uint256 indexed betId,
        uint256 finalDecision,
        uint256 time
    );
    event BuyYes(
        uint256 indexed betId,
        address indexed bettor,
        uint256 betAmount,
        uint256 time
    );
    event BuyNo(
        uint256 indexed betId,
        address indexed bettor,
        uint256 betAmount,
        uint256 time
    );
    event Claim(
        uint256 indexed betId,
        address indexed bettor,
        uint256 result,
        uint256 winningClaim,
        uint256 time
    );
    event BondYes(
        uint256 indexed betId,
        address indexed bonder,
        uint256 lpAmount,
        uint256 time
    );
    event BondNo(
        uint256 indexed betId,
        address indexed bonder,
        uint256 lpAmount,
        uint256 time
    );
    event Unbond(
        uint256 indexed betId,
        address indexed bonder,
        uint256 result,
        uint256 bondCount,
        uint256 bondReward,
        uint256 time
    );

    // =========================================== INTERFACES =========================================== //
    IERC20 baseUSDC;
    IBonderPool bonderPool;
    IBonderV1PairLPFactory pairLpFactory;

    // =========================================== CONSTRUCTOR =========================================== //

    constructor(
        address _baseUSDCAddr,
        address _bonderPoolAddr,
        address _lpFactoryAddr
    ) Ownable(msg.sender) {
        baseUSDC = IERC20(_baseUSDCAddr);
        bonderPool = IBonderPool(_bonderPoolAddr);
        pairLpFactory = IBonderV1PairLPFactory(_lpFactoryAddr);
    }

    // =========================================== OWNER FUNCTIONS =========================================== /

    struct BetSettings {
        address treasuryAddr;
        uint256 treasuryFee;
        uint256 poolFee;
        uint256 creatorFee;
        // uint256 swapFee;
        uint256 disputeThreshold;
        uint256 validateDuration;
        uint256 disputeDuration;
        // uint256 timeLock;
        // uint256 bondPoolLimit;
    }

    BetSettings public betSettings;

    // Needed for Router contract
    // function getSwapFee() external view returns(uint256 swapFee) {
    //     swapFee = betSettings.swapFee;
    // }

    /*
        If poolFee is 1%. If     a team keeps making dispute, then vote for the right answer, could they game the system?
        poolFee = 1%
        disputeThreshold = 2%
        i.e. 2% of total pool monies need to be burned, for them to get the 1% of total pool monies (fee)
        if disputeThreshold = 1%
        teams need to burn 1%, to try and win the entire 1%. As long as others also bond correctly, their return will be < 1%
        => conclusion: disputeThreshold can be set lower than poolFee if we want, since the risk of people gaming it is low. Not worth it.
    */
    function getBetSettings() public view returns(
      address treasuryAddr,
      uint256 treasuryFee,
      uint256 poolFee,
      uint256 creatorFee,
      uint256 disputeThreshold,
      uint256 validateDuration,
      uint256 disputeDuration
    ) {
      treasuryAddr = betSettings.treasuryAddr;
      treasuryFee = betSettings.treasuryFee;
      poolFee = betSettings.poolFee;
      creatorFee = betSettings.creatorFee;
      disputeThreshold = betSettings.disputeThreshold;
      validateDuration = betSettings.validateDuration;
      disputeDuration = betSettings.disputeDuration;
    }


    // IMPORTANT - Settings based on 2 dp. 0.15% = 15. 10% = 1000. 100% = 10_000
    function setBetSettings(
        address _treasuryAddr, // treasury address
        uint256 _treasuryFee, // fee to treasury
        uint256 _poolFee, // fee for each market
        uint256 _creatorFee, // fee to whomever that created the bet
        // uint256 _swapFee, // fee to swap on pair lp
        uint256 _disputeThreshold, // % threshold before trigger dispute
        uint256 _validateDuration, // time to validate the outcome
        uint256 _disputeDuration // time to dispute the outcome
        // uint256 _timeLock, // time before can withdraw from deposit pool
        // uint256 _bondPoolLimit // bond pool limit
    ) external onlyOwner {

        // address initialdevAddr = contractSettings.devAddr;
        // uint256 initialdevFee = contractSettings.devFee;
        // uint256 initialPoolFee = contractSettings.poolFee;
        // uint256 initialValidateDuration = contractSettings.validateDuration;
        // uint256 initialDisputeThreshold = contractSettings.disputeThreshold;
        // uint256 initialBondPoolLimit = contractSettings.bondPoolLimit;

        betSettings = BetSettings({
            treasuryAddr: _treasuryAddr,
            treasuryFee: _treasuryFee,
            poolFee: _poolFee,
            creatorFee: _creatorFee,
            // swapFee: _swapFee,
            disputeThreshold: _disputeThreshold,
            validateDuration: _validateDuration,
            disputeDuration: _disputeDuration
        });

        emit NewSettings(
            block.timestamp
        );
    }

    enum Stages {
        Bet, // new bet is created
        Validate, // time has expired. Time to bond
        Dispute, // If dispute threshold is hit
        Claim // If no dispute, claim. If dispute, once Council bonds, claim
    }

    struct Bet {
        uint256 id;
        // set by caller
        string betDescription;
        address creator;
        uint256 expiryTime;
        // bool isPrivate;
        // bet progress
        Stages stage;
        uint256 result; // 0 = not decided; 1 = Yes; 2 = No, 3 = Null
        bool disputed;
        // fees
        // uint256 bonderBounty;
        uint256 bonderFee;
        uint256 claimAmt; // IMPT: this figure doesnt drop
        uint256 totalDeposited; // IMPT: this figure doesnt drop
        uint256 yesBonds; // IMPT: this figure doesnt drop
        uint256 noBonds; // IMPT: this figure doesnt drop
        // yes vs no
        address yesToken;
        address noToken;
        address yesLp;
        address noLp;
    }

    // FOR TESTING
    function getEnumValue(uint256 _betId) public view returns (Stages) {
        return idToBet[_betId].stage;
    }

    // FOR TESTING
    function getBetStruct(
        uint256 _betId
    ) public view returns (Bet memory betStruct) {
        betStruct = idToBet[_betId];
    }



    function setPause(bool _setPause) external onlyOwner {
        // require(msg.sender == owner, "Only owner can call this function");
        if (_setPause) {
            _pause;
        } else if (!_setPause) {
            _unpause;
        }
    }

    // ================================================================================================ //
    // =========================================== FREE FOR ALL  =========================================== //
    // ================================================================================================ //

    // =========================================== CHANGE STATES =========================================== //

    function _stageChange(uint256 _betId, Stages _newStage) private {
        // Bet storage bet = idToBet[_betId];

        if (_newStage == Stages.Dispute) {
            idToBet[_betId].disputed = true;
        }

        if (_newStage == Stages.Claim) {

            if (idToBet[_betId].result == 3) {
                // special case - everyone take back money - odds set to 50:50
                // idToBet[_betId].bonderBounty = 0;
                idToBet[_betId].claimAmt = idToBet[_betId].totalDeposited;

            } else if (idToBet[_betId].result != 3) {

                if (idToBet[_betId].result == 1) {
                    // idToBet[_betId].bonderBounty -= idToBet[_betId].yesBonds;
                    bonderPool.factoryBurn(address(this), idToBet[_betId].noBonds);
                } else if (idToBet[_betId].result == 2) {
                    // idToBet[_betId].bonderBounty -= idToBet[_betId].noBonds;
                    bonderPool.factoryBurn(address(this), idToBet[_betId].yesBonds);
                }

                // protocol take fee
                uint256 feeToProtocol = (betSettings.treasuryFee * idToBet[_betId].totalDeposited) /
                    10_000;

                baseUSDC.transfer(betSettings.treasuryAddr, feeToProtocol);

                uint256 feeToCreator = (betSettings.creatorFee * idToBet[_betId].totalDeposited) / 10_000;
                baseUSDC.transfer(idToBet[_betId].creator, feeToCreator);

                uint256 feeToPool = (betSettings.poolFee * idToBet[_betId].totalDeposited) / 10_000;
                if (idToBet[_betId].disputed) {
                    idToBet[_betId].bonderFee = feeToPool; // bonders that bonded gets the fee, or
                } else {
                    baseUSDC.transfer(address(bonderPool), feeToPool);
                    // bondPool += feeToPool; // bondPool gets the fee
                }

                uint256 poolClaim = idToBet[_betId].totalDeposited - feeToProtocol - feeToCreator - feeToPool;
                idToBet[_betId].claimAmt = poolClaim;
            }
        }

        Stages initialStage = idToBet[_betId].stage;
        idToBet[_betId].stage = _newStage;

        emit StageChange(_betId, initialStage, _newStage, block.timestamp);
    }


    function changeFromBet(uint256 _betId) public whenNotPaused {
        // Bet storage bet = idToBet[_betId];

        require(idToBet[_betId].stage == Stages.Bet, "Only when bet is Bet");
        // require(idToBet[_betId].isPrivate == false, "Call changeFromPrivateBet function instead");
        require(
            block.timestamp > idToBet[_betId].expiryTime,
            "Bet has not end"
        );

        _stageChange(_betId, Stages.Validate);
    }



    /*
    function changeFromPrivateBet(uint256 _betId, uint256 _result) public whenNotPaused {
        // Bet storage bet = idToBet[_betId];

        require(idToBet[_betId].stage == Stages.Bet, "Only when bet is Bet");
        require(idToBet[_betId].isPrivate == true, "Call changeFromNew function instead");
        require(
            block.timestamp > idToBet[_betId].expiryTime,
            "Bet has not end"
        );
          // either bet creator or owner as last resort
          require(msg.sender == idToBet[_betId].creator ||
          msg.sender == owner(), "Only bet creator can end private bets");

          idToBet[_betId].result = _result;
          _stageChange(_betId, Stages.Claim); // straight to Claim
    }
    */



    // TODO: should dispute threshold be based off total deposits?
    function getDisputeThresholdAmt(uint256 _betId) public view returns (uint256 disputeThresholdAmt) {
        console.log(betSettings.disputeThreshold);
        console.log(idToBet[_betId].totalDeposited);

        disputeThresholdAmt = (betSettings.disputeThreshold *
            idToBet[_betId].totalDeposited) / 10_000;
    }

    function changeFromValidate(uint256 _betId) public whenNotPaused {
        // Bet storage bet = idToBet[_betId];

        require(idToBet[_betId].stage == Stages.Validate, "Not time to validate yet");
        require(
            block.timestamp >
                (idToBet[_betId].expiryTime + betSettings.validateDuration),
            "Validation has not end"
        );

        // idToBet[_betId].oracleFeeAmt = oracleFee * (idToBet[_betId].yesBets + idToBet[_betId].noBets) / 10_000;

        uint256 disputeThresholdAmt = getDisputeThresholdAmt(_betId);
        // uint256 disputeThresholdAmt = (betSettings.disputeThreshold *
        //     idToBet[_betId].totalDeposited) / 10_000;

        int256 bondDifference = int256(idToBet[_betId].yesBonds) - int256(idToBet[_betId].noBonds);

        // if yes > no bonds
        // NB gave a slight advantage to Yes since if bondDifference == 0, it resolves to Yes if no dispute
        if (bondDifference >= 0) {
            // nobonds need to exceed the dispute threshold amount
            if (idToBet[_betId].noBonds > disputeThresholdAmt) {
                _stageChange(_betId, Stages.Dispute);
            } else {
                idToBet[_betId].result = 1;
                _stageChange(_betId, Stages.Claim);
            }
            // if no > yes bonds
        } else if (bondDifference < 0) {
            // yesbonds need to exceed
            if (idToBet[_betId].yesBonds > disputeThresholdAmt) {
                _stageChange(_betId, Stages.Dispute);
            } else {
                idToBet[_betId].result = 2;
                _stageChange(_betId, Stages.Claim);
            }
        }
    }

    // TODO: To improve mechanism for final decision
    function setFinalDecision(
        uint256 _betId,
        uint256 _decision
    ) external onlyOwner {
        // require(msg.sender == owner, "Only owner can call this function");
        // Bet storage bet = idToBet[_betId];

        require(
            idToBet[_betId].stage == Stages.Dispute,
            "Not time for final decision"
        );

        idToBet[_betId].result = _decision;

        emit FinalDecision(_betId, _decision, block.timestamp);

        _stageChange(_betId, Stages.Claim);

        // emit StageChange(_betId, Stages.Dispute, Stages.Claim, block.timestamp);
    }

    function _createBetToken(string memory _name, string memory  _symbol) private returns (address tokenAddr) {
        BetTokenERC20 tokenContract = new BetTokenERC20(_name, _symbol);
        tokenAddr = address(tokenContract);
    }

    function createBet(
        //TODO: Design a template before submission to chain
        string memory _betDescription,
        uint256 _expiryTime // based on block time stamp
        // bool _setPrivate
        // uint256 _poolDeposit // initial pool amount
    )
        external
        whenNotPaused
    {
        require(_expiryTime > block.timestamp, "Expiry time in the future");

        betId++;

        string memory betIdString = Strings.toString(betId);

        // string memory yesName = string(abi.encodePacked(betIdString,"-YES"));
        // string memory yesSymbol = string(abi.encodePacked("BonderV1",betIdString,"-YES"));

        // BetTokenERC20 yesToken = new BetTokenERC20(yesName, yesSymbol);

        address yesAddr = _createBetToken(string(abi.encodePacked(betIdString,"-YES")), string(abi.encodePacked("BonderV1",betIdString,"-YES")));

        // string memory noName = string(abi.encodePacked(betIdString,"-NO"));
        // string memory noSymbol = string(abi.encodePacked("BonderV1",betIdString,"-NO"));

        // BetTokenERC20 noToken = new BetTokenERC20(noName, noSymbol);
        address noAddr = _createBetToken(string(abi.encodePacked(betIdString,"-NO")), string(abi.encodePacked("BonderV1",betIdString,"-NO")));

        // CREATE LIQUIDITY POOL HERE
        // USDC ALWAYS SET AS 2ND TOKEN
        address yesLp = pairLpFactory.createPair(yesAddr, address(baseUSDC));
        address noLp = pairLpFactory.createPair(noAddr, address(baseUSDC));


        Bet memory newBet = Bet({
            id: betId,
            betDescription: _betDescription,
            creator: msg.sender,
            expiryTime: _expiryTime,
            // isPrivate: _setPrivate,
            stage: Stages.Bet,
            result: 0,
            disputed: false,
            // bonderBounty: 0,
            bonderFee: 0,
            claimAmt: 0,
            totalDeposited: 0,
            yesBonds: 0,
            noBonds: 0,
            yesToken: yesAddr,
            noToken: noAddr,
            yesLp: yesLp,
            noLp: noLp
            // yesLp: address(0),
            // noLp: address(0),
        });

        // Mapping id to Bet
        idToBet[betId] = newBet;

        emit BetCreated(betId, msg.sender, block.timestamp);
    }

    function buyYes(uint256 _betId, uint256 _amount) external {
        _buy(_betId, _amount, true);
        emit BuyYes(_betId, msg.sender, _amount, block.timestamp);
    }

    function buyNo(uint256 _betId, uint256 _amount) external {
        _buy(_betId, _amount, false);
        emit BuyNo(_betId, msg.sender, _amount, block.timestamp);
    }

    function _buy(uint256 _betId, uint256 _amount, bool isYes) private {
        // Bet storage bet = idToBet[_betId];
        address buyTokenAddr = isYes ? idToBet[_betId].yesToken : idToBet[_betId].noToken;
        address otherTokenAddr = isYes ? idToBet[_betId].noToken : idToBet[_betId].yesToken;

        require(idToBet[_betId].stage == Stages.Bet, "Can only bet during the Bet stage");
        require(baseUSDC.balanceOf(msg.sender) >= _amount, "Not enough balance");
        require(baseUSDC.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        uint256 totalSupply = IBetTokenERC20(buyTokenAddr).totalSupply() + IBetTokenERC20(otherTokenAddr).totalSupply();
        uint256 lpAmount;

        if (totalSupply == 0) {
            lpAmount = _amount;
        } else {
            lpAmount = (_amount * totalSupply) / idToBet[_betId].totalDeposited;
        }

        idToBet[_betId].totalDeposited += _amount; // total USDC deposited
        IBetTokenERC20(buyTokenAddr).mint(msg.sender, lpAmount); // mint LP tokens as receipt
    }

    // Check balance via baseUSDC.balanceOf(address(this))
     function claim(uint256 _betId) external whenNotPaused() {
        // Bet storage bet = idToBet[_betId];

        require((idToBet[_betId].stage == Stages.Claim), "Cannot claim yet");

        address yesTokenAddr = idToBet[_betId].yesToken;
        address noTokenAddr = idToBet[_betId].noToken;

        uint256 betResult = idToBet[_betId].result;
        uint256 winningClaim;

        if (betResult == 1) {

            uint256 yesTokenBalance = IBetTokenERC20(yesTokenAddr).balanceOf(msg.sender);
            uint256 yesTotalMinted = IBetTokenERC20(yesTokenAddr).totalMinted();

            require(yesTokenBalance > 0, "No 'Yes' claims");

            winningClaim = (yesTokenBalance * idToBet[_betId].claimAmt) / yesTotalMinted;
            baseUSDC.transfer(msg.sender, winningClaim);

            // uint256 bountyAmount = (yesTokenBalance * idToBet[_betId].bonderBounty) / yesTotalMinted;
            // bonderToken.transfer(msg.sender, bountyAmount);

            IBetTokenERC20(yesTokenAddr).burn(msg.sender, yesTokenBalance); // burn to not claim again

            // emit Claim(
            //     _betId,
            //     msg.sender,
            //     1,
            //     0,
            //     // TODO: remove
            //     // bountyAmount,
            //     winningAmount,
            //     block.timestamp
            // );
        } else if (betResult == 2) {

            uint256 noTokenBalance = IBetTokenERC20(noTokenAddr).balanceOf(msg.sender);
            uint256 noTotalMinted = IBetTokenERC20(noTokenAddr).totalMinted();

            require(noTokenBalance > 0, "No 'No' claims");

            winningClaim = (noTokenBalance * idToBet[_betId].claimAmt) / noTotalMinted;
            baseUSDC.transfer(msg.sender, winningClaim);

            // uint256 bountyAmount = (noTokenBalance * idToBet[_betId].bonderBounty) / noTotalMinted;
            // bonderToken.transfer(msg.sender, bountyAmount);

            IBetTokenERC20(noTokenAddr).burn(msg.sender, noTokenBalance); // burn to not claim again

            // emit Claim(
            //     _betId,
            //     msg.sender,
            //     2,
            //     0,
            //     // TODO: remove
            //     // bountyAmount,
            //     winningAmount,
            //     block.timestamp
            // );
        } else if (betResult == 3) {

            uint256 yesTokenBalance = IBetTokenERC20(yesTokenAddr).balanceOf(msg.sender);
            uint256 noTokenBalance = IBetTokenERC20(noTokenAddr).balanceOf(msg.sender);

            uint256 yesTotalMinted = IBetTokenERC20(yesTokenAddr).totalMinted();
            uint256 noTotalMinted = IBetTokenERC20(noTokenAddr).totalMinted();

            uint256 totalBalance = yesTokenBalance + noTokenBalance;
            uint256 totalMinted = yesTotalMinted + noTotalMinted;

            require(totalBalance > 0, "You got no claims");

            winningClaim = totalBalance * idToBet[_betId].claimAmt / totalMinted;
            baseUSDC.transfer(msg.sender, winningClaim);

            IBetTokenERC20(yesTokenAddr).burn(msg.sender, yesTokenBalance); // burn to not claim again
            IBetTokenERC20(noTokenAddr).burn(msg.sender, noTokenBalance); // burn to not claim again

            // emit Claim(
            //     _betId,
            //     msg.sender,
            //     3,
            //     0,
            //     claimAmount,
            //     block.timestamp
            // );

        }

        emit Claim(
            _betId,
            msg.sender,
            betResult,
            winningClaim,
            block.timestamp
        );
     }



    function bondYes(uint256 _betId, uint256 _lpAmount) external whenNotPaused() {
        _bond(_betId, _lpAmount, true);
        emit BondYes(_betId, msg.sender, _lpAmount, block.timestamp);
    }

    function bondNo(uint256 _betId, uint256 _lpAmount) external whenNotPaused() {
        _bond(_betId, _lpAmount, false);
        emit BondNo(_betId, msg.sender, _lpAmount, block.timestamp);
    }

    function _bond(
        uint256 _betId,
        uint256 _lpAmount,
        bool isYes
    ) private {
        // Bet storage bet = idToBet[_betId];

        // Necessary since bonding can happen even at New stage
        require(
            (idToBet[_betId].stage != Stages.Claim ),
            "Cannot bond anymore"
        );
        // require(
        //     (idToBet[_betId].isPrivate == false),
        //     "Cannot bond to private bets"
        // );
        require(
            bonderPool.balanceOf(msg.sender) >= _lpAmount,
            "Not enough pool tokens to bond"
        );
        require(bonderPool.transferFrom(msg.sender, address(this), _lpAmount), "Transfer failed");

        if (isYes) {
            idToBet[_betId].yesBonds += _lpAmount;
            bonderYesBonds[_betId][msg.sender] += _lpAmount;
        } else {
            idToBet[_betId].noBonds += _lpAmount;
            bonderNoBonds[_betId][msg.sender] += _lpAmount;
        }
    }

    function unbond(uint256 _betId) external whenNotPaused {
        // Bet storage bet = idToBet[_betId];

        require(idToBet[_betId].stage == Stages.Claim, "Cannot unbond yet");

        uint256 betResult = idToBet[_betId].result;
        uint256 bonderBalance;
        uint256 bonderReward;

        if (betResult == 1) {
            bonderBalance = bonderYesBonds[_betId][msg.sender];
            console.log("bonderYesBalance:", bonderBalance / 10**18);
            require(bonderBalance > 0, "You did not bond Yes");
            bonderPool.transfer(msg.sender, bonderBalance); // contract send token back to sender
            console.log("bonder token transferred!");

            bonderReward = (bonderBalance * idToBet[_betId].bonderFee) / idToBet[_betId].yesBonds;
            baseUSDC.transfer(msg.sender, bonderReward);
            console.log("base usdc token transferred!");

            bonderYesBonds[_betId][msg.sender] = 0; // ensure they cannot claim again

            // emit Unbond(
            //     _betId,
            //     msg.sender,
            //     1,
            //     bonderYesBalance,
            //     bonderReward,
            //     block.timestamp
            // );
        } else if (betResult == 2) {
            bonderBalance = bonderNoBonds[_betId][msg.sender];
            require(bonderBalance > 0, "You did not bond No");
            bonderPool.transfer(msg.sender, bonderBalance);

            bonderReward = (bonderBalance * idToBet[_betId].bonderFee) / idToBet[_betId].noBonds;
            baseUSDC.transfer(msg.sender, bonderReward);

            bonderNoBonds[_betId][msg.sender] = 0; // ensure they cannot claim again

            // emit Unbond(
            //     _betId,
            //     msg.sender,
            //     2,
            //     bonderNoBalance,
            //     bonderReward,
            //     block.timestamp
            // );
        } else if (betResult == 3) {
            uint256 bonderYesBalance = bonderYesBonds[_betId][msg.sender];
            uint256 bonderNoBalance = bonderNoBonds[_betId][msg.sender];
            bonderBalance = bonderYesBalance + bonderNoBalance;

            require(bonderBalance > 0, "You did not bond at all");

            bonderPool.transfer(msg.sender, bonderBalance);

            bonderYesBonds[_betId][msg.sender] = 0; // ensure they cannot claim again
            bonderNoBonds[_betId][msg.sender] = 0; // ensure they cannot claim again

            // emit Unbond(
            //     _betId,
            //     msg.sender,
            //     3,
            //     totalBondBalance,
            //     0,
            //     block.timestamp
            // );
        }

        emit Unbond(
                _betId,
                msg.sender,
                betResult,
                bonderBalance,
                bonderReward,
                block.timestamp
            );

    }

    // struct BonderInfo {
    //     uint256 totalLpAmount;
    //     uint256 lastDepositTime;
    // }

    // mapping(address => BonderInfo) public bonderInfo;


    /*
    mapping(address => uint256) public bonderLastDepositTime;


    function depositBondPool(uint256 _amount) external whenNotPaused {
        // CHECKS
        require(_amount > 0 , "Deposit must be greater than zero");
        require(
            baseUSDC.balanceOf(msg.sender) >= _amount,
            "Not enough balance"
        );

        require(
            baseUSDC.transferFrom(msg.sender, address(this), _amount),
            "Transfer failed"
        );

        require(
            (_amount + bondPool) <= betSettings.bondPoolLimit,
            "Bond pool is at its limit"
        );


        uint256 totalSupply = bonderToken.totalSupply();
        uint256 lpAmount;

        if (totalSupply == 0 || bondPool == 0) {
            lpAmount = _amount;
        } else {
            lpAmount = (_amount * totalSupply) / bondPool;
        }

        bondPool += _amount;

        bonderLastDepositTime[msg.sender] = block.timestamp;
        // bonder.totalLpAmount += lpAmount;
        // bonder.lastDepositTime = block.timestamp;
        bonderToken.mint(msg.sender, lpAmount);

        emit DepositPool(msg.sender, _amount, block.timestamp);
    }

    // the number of seconds that have passed since January 1, 1970, UTC.
    // function getBonderInfo() external view returns(uint256 totalLp, uint256 lastDepositTime, uint256 withdrawTime, uint256 secondsLeft) {
    //     // BonderInfo storage bonder = bonderInfo[msg.sender];

    //     totalLp = bonder.totalLpAmount;
    //     lastDepositTime = bonder.lastDepositTime;

    //     uint256 timeLockDuration = contractSettings.timeLock;

    //     withdrawTime = lastDepositTime + timeLockDuration;

    //     if (block.timestamp < withdrawTime) {
    //         secondsLeft = withdrawTime - block.timestamp;
    //     }

    // }


    function withdrawBondPool(uint256 _lpAmount) external whenNotPaused {
        require(_lpAmount > 0 , "Deposit must be greater than zero");
        require(
            bonderToken.balanceOf(msg.sender) >= _lpAmount,
            "Not enough pool tokens to withdraw"
        );

        uint256 timeLockDuration = betSettings.timeLock;

        // BonderInfo storage bonder = bonderInfo[msg.sender];
        uint256 lastDepositTime = bonderLastDepositTime[msg.sender];
        require(block.timestamp >= lastDepositTime + timeLockDuration, "Funds are still locked");
        // bonder.totalLpAmount -= _lpAmount;

        uint256 totalSupply = bonderToken.totalSupply();
        uint256 bondPoolShare = (bondPool * _lpAmount) / totalSupply;
        bondPool -= bondPoolShare; // remove amount and fees

        bonderToken.burn(msg.sender, _lpAmount);
        require(
            baseUSDC.transfer(msg.sender, bondPoolShare),
            "Transfer failed"
        );

        emit WithdrawPool(msg.sender, bondPoolShare, block.timestamp);
    }
    */
}
