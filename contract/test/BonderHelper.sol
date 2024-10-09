

/*
# This file contains deployed addresses

BONDER_USDC=0x8F516067EE3A3204B85d5bB601aA2a5FC8361c1f
MINTER_ADDRESS=0x850ddbf09b02bc99d80672ced98acaa2460c6ff0
CONTROLLER_ADDRESS=0x17E11158D4AdD79f53FbC0efD8f69dC071546AA4
DEV_ADDRESS=0xe973a9e8f568f64faa8696a762427972ee9f8446
FEE_ADDRESS=0xf87100e4a02d7eb23699aa3796e3c74ca69e6967
CREATOR_NFT=0xA8eAA91c5e176D1Ec1A3Cb712BC216DA92034492
FACTORY=0xACFe5D284FAF59cD0964E7D3F420805B8cD9a310
*/



// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {console} from 'forge-std/console.sol';

import {Strings} from "src/libraries/Strings.sol";
// Needed to call within functions
import {BonderUSDC} from "src/modules/usdc/BonderUSDC.sol";
import {BonderV1CreatorNFT} from "src/modules/creator/BonderV1CreatorNFT.sol";
import {BonderV1YesNoFactory} from "src/modules/factory/BonderV1YesNoFactory.sol";

interface IBonderV1CreatorNFT {

    struct CreatorProfile {
        uint256 feeCap;
        uint256[] betIdArray;
        uint256 totalBetDeposit;
        uint256 completeBetCount;
        uint256 nullBetCount;
        uint256 rank;
        uint256 publicMintNFTFloor;
    }

    function getCreatorProfile(uint256 tokenId) external view returns (
        uint256 feeCap,
        uint256[] memory betIdArray,
        uint256 totalBetDeposit,
        uint256 completeBetCount,
        uint256 nullBetCount,
        uint256 rank,
        uint256 publicMintNFTFloor
    );
}

interface IBonderV1BetToken {
    function totalMinted() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
}

interface IBonderUSDC {
    function balanceOf(address account) external view returns (uint256);
}

contract BonderHelper is Test {

     enum Phase {
        Bet, // new bet is created
        Validate, // time has expired. Time to vote
        Dispute, // If dispute threshold is hit
        Claim // If no dispute, claim. If dispute, once Council votes, claim
    }


    BonderUSDC public usdc;
    BonderV1YesNoFactory public yesNoFactory;
    BonderV1CreatorNFT public creatorNFT;

    address usdcAddress;
    address yesNoFactoryAddress;
    address creatorNFTAddress;

    address owner = makeAddr("owner");
    address minter = makeAddr("minter");
    address controller = makeAddr("controller");
    address dev = makeAddr("dev");
    // address treasury = makeAddr("treasury");
    //creators
    address alice = makeAddr("alice");
    address bravo = makeAddr("bravo");
    
    //market1
    address charlie = makeAddr("charlie");
    address delta = makeAddr("delta");
    
    //market2
    address echo = makeAddr("echo");
    address foxtrot = makeAddr("foxtrot");
    
    //market3
    address golf = makeAddr("golf");
    address hotel = makeAddr("hotel");

    address india = makeAddr("india");
    address juliett = makeAddr("juliett");
    address kilo = makeAddr("kilo");

    // feeAddr is the address that collects fees
    address feeAddr = makeAddr("feeAddr");    

    uint256 conversion = 10**18;
    mapping(address => string) public addressToString;

    function getBetTokensPath(uint _betId) public view returns(address yesTokenAddr, address noTokenAddr) {
      yesTokenAddr = yesNoFactory.getBetStruct(_betId).yesToken;
      noTokenAddr = yesNoFactory.getBetStruct(_betId).noToken;
      console.log("//getBetTokensPath//");
      console.log("yesTokenAddr", yesTokenAddr);
      console.log("noTokenAddr", noTokenAddr);
    }

    // function getLpReserve(uint _betId) public view returns (
    //     uint yesReserveA,
    //     uint yesReserveB,
    //     uint noReserveA,
    //     uint noReserveB
    // ){

    //     address yesTokenAddress = yesNoFactory.getBetStruct(_betId).yesToken;
    //     address noTokenAddress = yesNoFactory.getBetStruct(_betId).noToken;

    //     (yesReserveA, yesReserveB) = BonderV1PairLibrary.getReserves(pairLpFactoryAddress, yesTokenAddress, baseUSDCAddress);
    //     (noReserveA, noReserveB) = BonderV1PairLibrary.getReserves(pairLpFactoryAddress, noTokenAddress, baseUSDCAddress);

    // }

    function getStringLabel(address _address) public view returns (string memory) {
        return addressToString[_address];
    }


    function getAddr() public view {
        console.log("usdcAddress",usdcAddress);
        console.log("yesNoFactoryAddress",yesNoFactoryAddress);
        console.log("creatorNFTAddress",creatorNFTAddress);
        console.log("ownerAddress",owner); //  0x7c8999dC9a822c1f0Df42023113EDB4FDd543266
        // console.log("treasuryAddress",treasury); // 0xf43Bca55E8091977223Fa5b776E23528D205dcA8
        console.log("aliceAddress",alice); // 0x328809Bc894f92807417D2dAD6b7C998c1aFdac6
        console.log("bravoAddress",bravo); // 0x4b930C2E5433fDDCB11B47539EfF039c123135eE
        console.log("charlieAddress",charlie); // 0xea475d60c118d7058beF4bDd9c32bA51139a74e0
        console.log("deltaAddress",delta); // 0x3a78DC99c78919Dc7AD3200cBE8D345717613668
        console.log("echoAddress",echo); // 0x483ab6A0bE906b1006e54b1826d13EA49007d072
        console.log("foxtrotAddress",foxtrot); // 0x808587AD709d5eb35ccBA9778104EA2F490934E5
        console.log("golfAddress",golf); // 0x3036d5480Be74F747F0303359d317a4D9907F0e1
        console.log("hotelAddress",hotel); // 0x5D5a7dC71C58e48a864E143E5C6831343c32aF69
        console.log("indiaAddress",india); // 0xb0943f673228623364A32DE929E88C26B60e2268
        console.log("juliettAddress",juliett); // 0x5A22d089cbb9d67cBf698906Fd5Ed5Dd01932478
        console.log("kiloAddress",kilo); // 
    }

    // =========================================== CONSOLE LOGS =========================================== //

    // get state variables
    function getState() public view {
      console.log("");
      console.log("//----------- Get State -------------//");

      console.log("// Bet Factory Info //");
      console.log("totalBets:", yesNoFactory.totalBets());
      console.log("usdc on contract", usdc.balanceOf(yesNoFactoryAddress) / conversion);
      console.log("// Creator NFT Info //");
      console.log("totalSupply:", creatorNFT.totalSupply());
      console.log("createBetDeposit:", creatorNFT.createBetDeposit());
      console.log("creatorNFTAddress", creatorNFTAddress);
      console.log("-------------------------------------------");
      console.log("");
    }



    // literally the usage of idToBet
    // function getBetStruct(uint _betId) public view {
    //      (address yesTokenAddr, address noTokenAddr) = getBetTokensPath(_betId);
    //   uint256 yesCount = IBonderV1BetToken(yesTokenAddr).totalMinted();
    //   uint256 noCount = IBonderV1BetToken(noTokenAddr).totalMinted();


    //         console.log("");
    //         console.log("//----------- getBetStruct -------------//");

    //         console.log("betId:", yesNoFactory.getBetStruct(_betId).betId);
    //         console.log("creatorId:", yesNoFactory.getBetStruct(_betId).creatorId);
    //         console.log("betCid:", yesNoFactory.getBetStruct(_betId).betCid);
    //         console.log("cutoffTime:", yesNoFactory.getBetStruct(_betId).cutoffTime);
    //         console.log("timeFlag:", yesNoFactory.getBetStruct(_betId).timeFlag);
    //         console.log("phase:", uint256(yesNoFactory.getEnumValue(_betId)));
    //         console.log("result0:", yesNoFactory.getBetStruct(_betId).result[0]);
    //         console.log("result1:", yesNoFactory.getBetStruct(_betId).result[1]);
    //         console.log("result2:", yesNoFactory.getBetStruct(_betId).result[2]);
    //         console.log("leadOutcome:", yesNoFactory.getBetStruct(_betId).leadOutcome);
    //         console.log("disputeLevel:", yesNoFactory.getBetStruct(_betId).disputeLevel);
    //         console.log("feeToMarketBonders:", yesNoFactory.getBetStruct(_betId).feeToMarketBonders / conversion);
    //         console.log("claimAmt:", yesNoFactory.getBetStruct(_betId).claimAmt / conversion);
    //         console.log("totalDeposited:", yesNoFactory.getBetStruct(_betId).totalDeposited / conversion);
    //         console.log("yesBonds:", yesNoFactory.getBetStruct(_betId).yesBonds / conversion);
    //         console.log("noBonds:", yesNoFactory.getBetStruct(_betId).noBonds / conversion);
    //         console.log("yesTokenAddress:", yesNoFactory.getBetStruct(_betId).yesToken);
    //         console.log("noTokenAddress:", yesNoFactory.getBetStruct(_betId).noToken);
    //         console.log("yesCount:", yesCount / conversion);
    //         console.log("noCount:", noCount / conversion);
    //         console.log("");
    // }



            // console.log("creatorFee:", yesNoFactory.getBetStruct(_betId).creatorFee);
            // console.log("bonderFee:", yesNoFactory.getBetStruct(_betId).bonderFee);

            // console.log("pdt:", yesNoFactory.getBetStruct(_betId).pdt);
            // console.log("bdt:", yesNoFactory.getBetStruct(_betId).bdt);
            // console.log("vd:", yesNoFactory.getBetStruct(_betId).vd);
            // console.log("pdd:", yesNoFactory.getBetStruct(_betId).pdd);
            // console.log("bdd:", yesNoFactory.getBetStruct(_betId).bdd);
            
            // function getPlayerBets(address _player) public view returns (uint256[] memory) {
            //     return yesNoFactory.playerToBets(_player);
            // }
    
    function getCreatorNFT(uint256 tokenId) public view {

        // ... existing code ...
    (
        uint256 feeCap,
        uint256[] memory betIdArray,
        uint256 totalBetDeposit,
        uint256 completeBetCount,
        uint256 nullBetCount,
        uint256 rank,
        uint256 publicMintNFTFloor
    ) = creatorNFT.getCreatorProfile(tokenId);
  
        console.log("feeCap:", feeCap);
        console.log("betIdArray:");
        logArray(betIdArray);
        console.log("totalBetDeposit:", totalBetDeposit);
        console.log("completeBetCount:", completeBetCount);
        console.log("nullBetCount:", nullBetCount);
        console.log("rank:", rank);
        console.log("publicMintNFTFloor:", publicMintNFTFloor);
    }

    function logArray(uint256[] memory arr) internal pure {
        // console.log("Array contents:");
        string memory array = "[";
        for (uint i = 0; i < arr.length; i++) {
            array = string(abi.encodePacked(array, i > 0 ? ", ":"", Strings.toString(arr[i])));
            // if (i == 0) console.log("[");
            // console.log(arr[i], i < arr.length - 1 ? "," : "]");
        }

        array = string(abi.encodePacked(array, "]"));
        console.log(array);
    }

    function getPlayerBalance(uint _betId, address _player) public view {

        (address yesTokenAddress, address noTokenAddress) = getBetTokensPath(_betId);
        uint256 playerYesTokens = 0;
        uint256 playerNoTokens = 0;
        if (yesTokenAddress != address(0)) {
            console.log("I'M YES!!!!!!!!!!!!!!");
            // playerYesTokens = IBonderV1BetToken(yesTokenAddress).balanceOf(_player) / conversion;
            playerYesTokens = IBonderV1BetToken(yesTokenAddress).balanceOf(_player);
            console.log(playerYesTokens);
        }
        if (noTokenAddress != address(0)) {
            console.log("I'M NO!!!!!!!!!!!!!!");
            playerNoTokens = IBonderV1BetToken(noTokenAddress).balanceOf(_player);
            console.log(playerNoTokens);
        }


        console.log("");
        console.log("//----------- Player Balance -------------//");
        console.log("Player Address:",_player);
        string memory playerString = getStringLabel(_player);
        console.log("Player String:", playerString);
            console.log("usdc balance:", IBonderUSDC(usdcAddress).balanceOf(_player)/10**6);
        // console.log("USDC balance:",usdc.balanceOf(_player) / conversion);
        console.log("-------------------------------------------");
        console.log("Bet Id: ", _betId);
        console.log("Yes balance:", playerYesTokens);
        console.log("No balance:", playerNoTokens);
        console.log("-------------------------------------------");
        console.log("");

    }


    struct Bet {
        uint256 betId;
        uint256 creatorId; // track creator id, not address
        string betCid; // contains title and context
        uint256 cutoffTime; // TODO: a block.timestamp measure. FE needs to convert time from date to block.timstamp
        uint256 timeFlag;
        Phase phase;
        uint256[3] result; // [poolWinnings, bonderFee, bonderNotBurned] 1 = Yes; 2 = No; 3 = [all take back money, no one gets the fee, both not burned]
        uint256 leadOutcome;
        uint256 disputeLevel; // 0 = not disputed; 1 = PDT; 2 = BDT
        uint256 feeToMarketBonders; // fee to MarketBonders
        uint256 claimAmt; // IMPT: this figure doesnt drop
        uint256 totalDeposited; // IMPT: this figure doesnt drop
        uint256 yesBonds; // IMPT: this figure doesnt drop
        uint256 noBonds; // IMPT: this figure doesnt drop
        address yesToken;
        address noToken;
    }


            

    function getBetStruct(uint _betId) public view {
        // (
        //     uint256 betId,
        //     uint256 creatorId,
        //     string memory betCid,
        //     uint256 cutoffTime,
        //     uint256 timeFlag,
        //     ,  // Phase phase
        //     uint256[3] memory result,
        //     uint256 leadOutcome,
        //     uint256 disputeLevel,
        //     uint256 feeToMarketBonders,
        //     uint256 claimAmt,
        //     uint256 totalDeposited,
        //     uint256 yesBonds,
        //     uint256 noBonds,
        //     address yesToken,
        //     address noToken
        // ) 
        
        BonderV1YesNoFactory.Bet memory betStruct = yesNoFactory.getBetStruct(_betId);

        uint256 yesMinted = IBonderV1BetToken(betStruct.yesToken).totalMinted();
        uint256 noMinted = IBonderV1BetToken(betStruct.noToken).totalMinted();

        console.log("");
        console.log("//----------- Bet Struct -------------//");
        console.log("betId:", betStruct.betId);
        console.log("creatorId:", betStruct.creatorId);
        console.log("betCid:", betStruct.betCid);
        console.log("cutoffTime:", betStruct.cutoffTime);
        console.log("timeFlag:", betStruct.timeFlag);
        console.log("phase:", uint256(yesNoFactory.getEnumValue(_betId)));
        console.log("result[0]:", betStruct.result[0]);
        console.log("result[1]:", betStruct.result[1]);
        console.log("result[2]:", betStruct.result[2]);
        console.log("leadOutcome:", betStruct.leadOutcome);
        console.log("disputeLevel:", betStruct.disputeLevel);
        console.log("feeToMarketBonders:", betStruct.feeToMarketBonders / conversion);
        console.log("claimAmt:", betStruct.claimAmt / conversion);
        console.log("totalDeposited:", betStruct.totalDeposited / conversion);
        console.log("yesBonds:", betStruct.yesBonds / conversion);
        console.log("noBonds:", betStruct.noBonds / conversion);
        console.log("yesTokenAddress:", betStruct.yesToken);
        console.log("noTokenAddress:", betStruct.noToken);   
        console.log("yesMinted:", yesMinted);   
        console.log("noMinted:", noMinted);   
        console.log("-------------------------------------------");
        console.log("");
    }
}
