// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from 'src/interface/IERC20.sol';
import {BonderV1BetToken} from './BonderV1BetToken.sol';
import {Strings} from 'src/libraries/Strings.sol';

import {console} from 'forge-std/console.sol';

interface IBonderV1BetToken {
    function balanceOf(address owner) external view returns (uint256);
    function totalMinted() external view returns (uint256);
    function betMint(address to, uint256 amount) external;
    function claimBurn(address from, uint256 amount) external;
}

interface IBonderV1YesNoFactory {
    function playerToBets(address player) external view returns (uint256[] memory);
}
    
interface IBonderV1CreatorNFT {
    struct CreatorProfile {
            uint256[] betIdArray;
            uint256 totalBetDeposit;
            uint256 completeBetCount;
            uint256 nullBetCount;
            uint256 rank;
            uint256 publicMintNFTFloor;
            uint256 feeCap;
        }
    
    function createMint(address to) external returns (uint256);
    function creatorToId(address creator) external view returns (uint256);
    function idToCreator(uint256 id) external view returns (address);
    function updateComplete(uint256 tokenId, uint256 totalBetDeposit) external;
    function updateNull(uint256 tokenId) external;
    function addBetToCreatorNFT(uint256 tokenId_, uint256 betId_) external;
    function creatorFeeCap(uint256 tokenId) external view returns (uint256);
    function createBetDeposit() external view returns (uint256);
}

contract BonderV1YesNoFactory {
    address public controller;
    bool public isPaused;

    function setController(address controller_) external {
        require(msg.sender == controller, 'Only controller can set controller');
        controller = controller_;
    }

    function setPause(bool _setPause) external {
        require(msg.sender == controller, 'Only controller can pause this contract');
        if (_setPause) {
            isPaused = true;
        } else if (!_setPause) {
            isPaused = false;
        }
    }

    modifier whenNotPaused() {
        require(!isPaused, 'Contract is paused');
        _;
    }

    address public usdcAddress;
    address public creatorNFTAddress;

    IERC20 public usdc;
    IBonderV1CreatorNFT public creatorNFT;

    uint256 public totalBets;

    enum Phase {
        Bet,
        Validate,
        Dispute,
        Claim
    }

    mapping(uint256 => Bet) public idToBet;
    mapping(uint256 => FactorySettings) public idToFactorySettings;
    mapping(address => uint256[]) public playerToBets;

    struct Bet {
        uint256 betId;
        uint256 creatorId;
        string betCid;
        uint256 cutoffTime;
        uint256 timeFlag;
        Phase phase;
        uint256[3] result;
        uint256 leadOutcome;
        uint256 disputeLevel;
        uint256 feeToMarketBonders;
        uint256 claimAmt;
        uint256 totalDeposited;
        uint256 yesBonds;
        uint256 noBonds;
        address yesToken;
        address noToken;
    }

    struct FactorySettings {
        uint256 betId;
        uint256 createBetDeposit;
        uint256 creatorFee;
        uint256 bonderFee;
        uint256 pdt;
        uint256 bdt;
        uint256 vd; 
        uint256 pdd;
        uint256 bdd;
    }

    function getEnumValue(uint256 _betId) public view returns (Phase) {
        return idToBet[_betId].phase;
    }

    function getBetStruct(uint256 _betId) public view returns (Bet memory betStruct) {
        betStruct = idToBet[_betId];
    }

    function _createBetToken(string memory _name, string memory _symbol) private returns (address tokenAddr) {
        bytes memory bytecode = type(BonderV1BetToken).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(_name, _symbol));

        assembly {
            tokenAddr := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
    }

    constructor(
        address _usdcAddr,
        address _creatorNFTAddr,
        address _controller
    ) {
        usdc = IERC20(_usdcAddr);
        creatorNFT = IBonderV1CreatorNFT(_creatorNFTAddr);

        usdcAddress = _usdcAddr;
        creatorNFTAddress = _creatorNFTAddr;
        controller = _controller;
    }

    function createBet(
        string memory _betCid,
        uint256 _cutoffTime,
        uint256 _creatorFee
    ) external whenNotPaused {
        require(_cutoffTime > block.timestamp, 'Expiry time in the future');
    
        uint256 creatorTokenId = creatorNFT.creatorToId(msg.sender);

        if (creatorTokenId == 0) {
            creatorTokenId = creatorNFT.createMint(msg.sender);
        }

        uint256 feeCap = creatorNFT.creatorFeeCap(creatorTokenId);
        require(_creatorFee <= feeCap, 'Cannot set higher than your fee cap');

        uint256 betDeposit = creatorNFT.createBetDeposit();
        require(usdc.balanceOf(msg.sender) >= betDeposit, 'Not enough balance to create bet');
        require(usdc.transferFrom(msg.sender, address(this), betDeposit), 'Transfer failed');

        totalBets++;

        creatorNFT.addBetToCreatorNFT(creatorTokenId, totalBets);

        string memory betIdString = Strings.toString(totalBets);

        BonderV1BetToken yesToken = new BonderV1BetToken(
            string(abi.encodePacked('BonderV1BetToken', betIdString, '-YES')), 
            string(abi.encodePacked(betIdString, '-YES-V1')),
            18
            );
        
        BonderV1BetToken noToken = new BonderV1BetToken(
            string(abi.encodePacked('BonderV1BetToken', betIdString, '-NO')), 
            string(abi.encodePacked(betIdString, '-NO-V1')),
            18
            );

        Bet memory newBet = Bet({
            betId: totalBets,
            creatorId: creatorTokenId,
            betCid: _betCid,
            cutoffTime: _cutoffTime,
            timeFlag: block.timestamp, 
            phase: Phase.Bet,
            result: [uint256(0), 0, 0],
            leadOutcome: 0,
            disputeLevel: 0,
            feeToMarketBonders: 0,
            claimAmt: 0,
            totalDeposited: 0,
            yesBonds: 0,
            noBonds: 0,
            yesToken: address(yesToken),
            noToken: address(noToken)
        });

        FactorySettings memory assignedFactorySettings = FactorySettings({
            betId: totalBets,
            createBetDeposit: betDeposit,
            creatorFee: _creatorFee,
            bonderFee: 0,
            pdt: 0,
            bdt: 0,
            vd: 0,
            pdd: 0,
            bdd: 0
        });

        idToBet[totalBets] = newBet;
        idToFactorySettings[totalBets] = assignedFactorySettings;
    }

    function buyYes(uint256 _betId, uint256 _amount) external whenNotPaused {
        _buy(_betId, _amount, 1);
    }

    function buyNo(uint256 _betId, uint256 _amount) external whenNotPaused {
        _buy(_betId, _amount, 2);
    }

    function _buy(uint256 _betId, uint256 _amount, uint256 _yesNo) private {
        require(idToBet[_betId].phase == Phase.Bet, 'Can only bet during Bet phase');
        require(_yesNo == 1 || _yesNo == 2, '_yesNo must be 1 or 2');

        require(usdc.balanceOf(msg.sender) >= _amount, 'Not enough balance');
        require(usdc.transferFrom(msg.sender, address(this), _amount), 'Transfer failed');

        (address buyTokenAddr, address otherTokenAddr) = _yesNo == 1
            ? (idToBet[_betId].yesToken, idToBet[_betId].noToken)
            : (idToBet[_betId].noToken, idToBet[_betId].yesToken);

        uint256 totalMinted = IBonderV1BetToken(buyTokenAddr).totalMinted() +
            IBonderV1BetToken(otherTokenAddr).totalMinted();
        uint256 lpAmount;

        if (totalMinted == 0) {
            lpAmount = _amount;
        } else {
            lpAmount = (_amount * totalMinted) / idToBet[_betId].totalDeposited;
        }

        idToBet[_betId].totalDeposited += _amount;
        IBonderV1BetToken(buyTokenAddr).betMint(msg.sender, lpAmount);

        if (!_containsBetId(playerToBets[msg.sender], _betId)) {
            playerToBets[msg.sender].push(_betId);
        }
    }

    function _containsBetId(uint256[] storage betIds, uint256 betId) private view returns (bool) {
        for (uint256 i = 0; i < betIds.length; i++) {
            if (betIds[i] == betId) {
                return true;
            }
        }
        return false;
    }
}