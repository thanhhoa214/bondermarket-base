// SPDX-License-Identifier: lastman.xyz

pragma solidity 0.8.20;

import {IBetTokenERC20} from '../src/interface/IBetTokenERC20.sol';
import {IBonderV1Pair} from "../src/interface/IBonderV1Pair.sol";

// import '../src/interface/IBonderPoolToken.sol';
import "forge-std/Test.sol";
import {BonderBaseSepoliaUSDC} from "src/new/BonderBaseSepoliaUSDC.sol";
import {BonderPool} from "src/new/BonderPool.sol";
import {BonderV1PairLPFactory} from "src/uniswap/BonderV1PairLPFactory.sol";
import {BonderV1BetFactory} from "src/new/BonderV1BetFactory.sol";
import {BonderV1PrivateBetFactory} from "src/new/BonderV1PrivateBetFactory.sol";
import {BonderV1Router} from "src/uniswap/BonderV1Router.sol";
import {BonderV1PairLibrary} from "src/uniswap/BonderV1PairLibrary.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract BonderHelper is Test {

    enum Stages {
        Bet, // new bet is created
        Validate, // time has expired. Time to vote
        Dispute, // If dispute threshold is hit
        Claim // If no dispute, claim. If dispute, once Council votes, claim
    }

    // address treasuryAddress;

    BonderBaseSepoliaUSDC public baseUSDC;
    BonderPool public bonderPool;
    BonderV1BetFactory public betFactory;
    BonderV1PrivateBetFactory public privateBetFactory;
    BonderV1PairLPFactory public pairLpFactory;
    BonderV1Router public bonderRouter;


    address baseUSDCAddress;
    address bonderPoolAddress;
    address betFactoryAddress;
    address privateBetFactoryAddress;
    address pairLpFactoryAddress;
    address bonderRouterAddress;

    address owner = makeAddr("owner");
    address treasury = makeAddr("treasury");
    address alice = makeAddr("alice");
    address bravo = makeAddr("bravo");
    address charlie = makeAddr("charlie");
    address delta = makeAddr("delta");
    address echo = makeAddr("echo");
    address foxtrot = makeAddr("foxtrot");
    address golf = makeAddr("golf");
    address hotel = makeAddr("hotel");
    address india = makeAddr("india");
    address juliett = makeAddr("juliett");
    address kilo = makeAddr("kilo");
    address lima = makeAddr("lima");

    // =========================================== HELPER CHECKS =========================================== //
    uint256 conversion = 10**18;
    mapping(address => string) public addressToString;

    function getBetTokensPath(uint _betId) public view returns(address yesTokenAddr, address noTokenAddr) {
      yesTokenAddr = betFactory.getBetStruct(_betId).yesToken;
      noTokenAddr = betFactory.getBetStruct(_betId).noToken;
    }

    function getLpReserve(uint _betId) public view returns (
        uint yesReserveA,
        uint yesReserveB,
        uint noReserveA,
        uint noReserveB
    ){

        address yesTokenAddress = betFactory.getBetStruct(_betId).yesToken;
        address noTokenAddress = betFactory.getBetStruct(_betId).noToken;

        (yesReserveA, yesReserveB) = BonderV1PairLibrary.getReserves(pairLpFactoryAddress, yesTokenAddress, baseUSDCAddress);
        (noReserveA, noReserveB) = BonderV1PairLibrary.getReserves(pairLpFactoryAddress, noTokenAddress, baseUSDCAddress);

    }

    function getStringLabel(address _address) public view returns (string memory) {
        return addressToString[_address];
    }


    function getAddr() public view {
        console.log("baseUSDCAddress",baseUSDCAddress);
        console.log("bonderPoolAddress",bonderPoolAddress);
        console.log("betFactoryAddress",betFactoryAddress);
        console.log("privateBetFactoryAddress",privateBetFactoryAddress);
        console.log("pairLpFactoryAddress",pairLpFactoryAddress);
        console.log("bonderRouterAddress",bonderRouterAddress);
        console.log("ownerAddress",owner); //  0x7c8999dC9a822c1f0Df42023113EDB4FDd543266
        console.log("treasuryAddress",treasury); // 0xf43Bca55E8091977223Fa5b776E23528D205dcA8
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
    }

    // =========================================== CONSOLE LOGS =========================================== //
    // get state variables
    function getState(uint _betId) public view {
      (address yesTokenAddr, address noTokenAddr) = getBetTokensPath(_betId);
      uint256 yesCount = IBetTokenERC20(yesTokenAddr).totalMinted();
      uint256 noCount = IBetTokenERC20(noTokenAddr).totalMinted();

        uint256 yesBonds = betFactory.getBetStruct(_betId).yesBonds;
        uint256 noBonds = betFactory.getBetStruct(_betId).noBonds;

      console.log("");
      console.log("//----------- getState -------------//");
      console.log("// Bonder Pool //");
      console.log("bondPoolUsdcAmount:", bonderPool.bondPoolAmt() / conversion);
      console.log("bonderPoolTotalSupply", bonderPool.totalSupply() / conversion);
      console.log("// Bet Factory //");
      console.log("betId:", betFactory.betId());
      console.log("baseUSDC on contract", baseUSDC.balanceOf(betFactoryAddress) / conversion);
      console.log("totalDeposited:", betFactory.getBetStruct(_betId).totalDeposited / conversion);
      console.log("yes : no", yesCount / conversion, noCount / conversion);
      console.log("bondYes : bondNo", yesBonds / conversion, noBonds / conversion);
      // console.log("//----------- Fees -------------//");

      // console.log("protocolFees", baseUSDC.balanceOf(betFactory.betSettings.treasuryAddr) / conversion);


      console.log("");
    }


    // literally the usage of idToBet
    function getBetStruct(uint _betId) public view {
            console.log("");
            console.log("//----------- getBetStruct -------------//");
            console.log("id:", betFactory.getBetStruct(_betId).id);
            console.log("description:", betFactory.getBetStruct(_betId).betDescription);
            console.log("creator:", betFactory.getBetStruct(_betId).creator);
            console.log("expiryTime:", betFactory.getBetStruct(_betId).expiryTime);
            // console.log("isPrivate:", betFactory.getBetStruct(_betId).isPrivate);
            console.log("stage:", uint256(betFactory.getEnumValue(_betId)));
            console.log("result:", betFactory.getBetStruct(_betId).result);
            console.log("disputed:", betFactory.getBetStruct(_betId).disputed);
            // console.log("bonderBounty:", betFactory.getBetStruct(_betId).bonderBounty / conversion);
            console.log("bonderFee:", betFactory.getBetStruct(_betId).bonderFee / conversion);
            console.log("claimAmt:", betFactory.getBetStruct(_betId).claimAmt / conversion);
            console.log("totalDeposited:", betFactory.getBetStruct(_betId).totalDeposited / conversion);
            console.log("yesBonds:", betFactory.getBetStruct(_betId).yesBonds / conversion);
            console.log("noBonds:", betFactory.getBetStruct(_betId).noBonds / conversion);
            console.log("yesTokenAddress:", betFactory.getBetStruct(_betId).yesToken);
            console.log("noTokenAddress:", betFactory.getBetStruct(_betId).noToken);
            console.log("yesLpAddress:", betFactory.getBetStruct(_betId).yesLp);
            console.log("noLpAddress:", betFactory.getBetStruct(_betId).noLp);
            console.log("");
    }

    function getBettorBalance(uint _betId, address _bettor) public view {
        address yesTokenAddress = betFactory.getBetStruct(_betId).yesToken;
        address noTokenAddress = betFactory.getBetStruct(_betId).noToken;
        address yesLpAddress = betFactory.getBetStruct(_betId).yesLp;
        address noLpAddress = betFactory.getBetStruct(_betId).noLp;

        uint256 yesTokens = IERC20(yesTokenAddress).balanceOf(_bettor);
        uint256 noTokens = IERC20(noTokenAddress).balanceOf(_bettor);
        uint256 yesLpTokens = IERC20(yesLpAddress).balanceOf(_bettor);
        uint256 noLpTokens = IERC20(noLpAddress).balanceOf(_bettor);


        console.log("");
        console.log("//----------- getBettorBalance -------------//");
        console.log("Bettor Address:",_bettor);
        string memory bettorString = getStringLabel(_bettor);
        console.log("Bettor String:", bettorString);
        console.log("USDC balance:",baseUSDC.balanceOf(_bettor) / conversion);
        console.log("Yes tokens:", yesTokens / conversion);
        console.log("No tokens:", noTokens / conversion);
        console.log("Yes LP tokens:", yesLpTokens / conversion);
        console.log("No LP tokens:", noLpTokens / conversion);
        console.log("");
    }

    function getBonderBalance(uint _betId, address _bonder) public view {
        console.log("");
        console.log("//----------- getBonderBalance -------------//");
        console.log("Bonder Address:",_bonder);
        string memory bonderString = getStringLabel(_bonder);
        console.log("Bonder String:", bonderString);
        console.log("USDC balance:",baseUSDC.balanceOf(_bonder) / conversion);
        console.log("bonderPoolTokens:",bonderPool.balanceOf(_bonder) / conversion);
        console.log("Yes bonds:", betFactory.getBonderYesBonds(_betId,  _bonder) / conversion);
        console.log("No bonds:", betFactory.getBonderNoBonds(_betId, _bonder) / conversion);
        console.log("");
    }

    function getPairLp(uint256 _betId) public view {
        address yesLpAddress = betFactory.getBetStruct(_betId).yesLp;
        address noLpAddress = betFactory.getBetStruct(_betId).noLp;

        (uint yesReserve0, uint yesReserve1,) = IBonderV1Pair(yesLpAddress).getReserves();
        (uint noReserve0, uint noReserve1,) = IBonderV1Pair(noLpAddress).getReserves();


        console.log("//----------- getPairLp -------------//");
        console.log("yesLpSupply:", IBonderV1Pair(yesLpAddress).totalSupply());
        console.log("yesLpSupply_reserve0:", yesReserve0);
        console.log("yesLpSupply_reserve1:", yesReserve1);
        console.log("noLpSupply:", IBonderV1Pair(noLpAddress).totalSupply());
        console.log("noLpSupply_reserve0:", noReserve0);
        console.log("noLpSupply_reserve1:", noReserve1);

    }

    // =========================================== SET UP =========================================== //
    function setUp() public {

        vm.deal(owner, 10 ether);
        vm.deal(alice, 10 ether);
        vm.deal(bravo, 10 ether);
        vm.deal(charlie, 10 ether);
        vm.deal(delta, 10 ether);
        vm.deal(echo, 10 ether);
        vm.deal(foxtrot, 10 ether);
        vm.deal(golf, 10 ether);
        vm.deal(hotel, 10 ether);
        vm.deal(india, 10 ether);
        vm.deal(juliett, 10 ether);
        vm.deal(kilo, 10 ether);

        console.log(kilo);
        console.log(lima);

        // Owner create the contracts
        vm.startPrank(owner);

        addressToString[0x7c8999dC9a822c1f0Df42023113EDB4FDd543266] = "owner";
        addressToString[0xf43Bca55E8091977223Fa5b776E23528D205dcA8] = "treasury";
        addressToString[0x328809Bc894f92807417D2dAD6b7C998c1aFdac6] = "alice";
        addressToString[0x4b930C2E5433fDDCB11B47539EfF039c123135eE] = "bravo";
        addressToString[0xea475d60c118d7058beF4bDd9c32bA51139a74e0] = "charlie";
        addressToString[0x3a78DC99c78919Dc7AD3200cBE8D345717613668] = "delta";
        addressToString[0x483ab6A0bE906b1006e54b1826d13EA49007d072] = "echo";
        addressToString[0x808587AD709d5eb35ccBA9778104EA2F490934E5] = "foxtrot";
        addressToString[0x3036d5480Be74F747F0303359d317a4D9907F0e1] = "golf";
        addressToString[0x5D5a7dC71C58e48a864E143E5C6831343c32aF69] = "hotel";
        addressToString[0xb0943f673228623364A32DE929E88C26B60e2268] = "india";
        addressToString[0x5A22d089cbb9d67cBf698906Fd5Ed5Dd01932478] = "juliett";
        // addressToString[0x5A22d089cbb9d67cBf698906Fd5Ed5Dd01932478] = "kilo";
        // addressToString[0x5A22d089cbb9d67cBf698906Fd5Ed5Dd01932478] = "lima";

        // console.log(owner); //  0x7c8999dC9a822c1f0Df42023113EDB4FDd543266
        // console.log(treasury); // 0xf43Bca55E8091977223Fa5b776E23528D205dcA8
        // console.log(alice); // 0x328809Bc894f92807417D2dAD6b7C998c1aFdac6
        // console.log(bravo); // 0x4b930C2E5433fDDCB11B47539EfF039c123135eE
        // console.log(charlie); // 0xea475d60c118d7058beF4bDd9c32bA51139a74e0
        // console.log(delta); // 0x3a78DC99c78919Dc7AD3200cBE8D345717613668
        // console.log(echo); // 0x483ab6A0bE906b1006e54b1826d13EA49007d072
        // console.log(foxtrot); // 0x808587AD709d5eb35ccBA9778104EA2F490934E5
        // console.log(golf); // 0x3036d5480Be74F747F0303359d317a4D9907F0e1
        // console.log(hotel); // 0x5D5a7dC71C58e48a864E143E5C6831343c32aF69
        // console.log(india); // 0xb0943f673228623364A32DE929E88C26B60e2268
        // console.log(juliett); // 0x5A22d089cbb9d67cBf698906Fd5Ed5Dd01932478
        // console.log(kilo); // 0x5A22d089cbb9d67cBf698906Fd5Ed5Dd01932478
        // console.log(lima); // 0x5A22d089cbb9d67cBf698906Fd5Ed5Dd01932478

        // ------------------------------------------ DEPLOY CONTRACTS ------------------------------------------ //
        // Deploy our own stablecoin (Not needed for prod)
        baseUSDC = new BonderBaseSepoliaUSDC();
        baseUSDCAddress = address(baseUSDC);
        // console.log(baseUSDCAddress);

        // Deploy our Bonder Pool LP token
        bonderPool = new BonderPool(baseUSDCAddress);
        bonderPoolAddress = address(bonderPool);
        // console.log(bonderPoolAddress);

        // Deploy our pair LP token
        pairLpFactory = new BonderV1PairLPFactory();
        pairLpFactoryAddress = address(pairLpFactory);
        // console.log(pairLpFactoryAddress);

        // Deploy our bet factory contract
        betFactory = new BonderV1BetFactory(baseUSDCAddress, bonderPoolAddress, pairLpFactoryAddress);
        betFactoryAddress = address(betFactory);
        // console.log(betFactoryAddress);

        // Deploy our private bet factory contract
        privateBetFactory = new BonderV1PrivateBetFactory(baseUSDCAddress, bonderPoolAddress, pairLpFactoryAddress);
        privateBetFactoryAddress = address(privateBetFactory);
        // console.log(betFactoryAddress);

        // Deploy bonder router and set swap fee to 1%
        bonderRouter = new BonderV1Router(pairLpFactoryAddress, baseUSDCAddress, 100);
        bonderRouterAddress = address(bonderRouter);

        // ------------------------------------------ SET APPROVALS ------------------------------------------ //
        // Set bonder market as bond pool true
        bonderPool.setBetFactory(betFactoryAddress, true);
        bonderPool.setBetFactory(privateBetFactoryAddress, true);
        // bondPoolLimit = $100_000
        bonderPool.setBondPoolLimit(100_000 * 10**18);

        // bonderPool set deposit limit
        pairLpFactory.setBetFactory(betFactoryAddress, true);
        pairLpFactory.setBetFactory(privateBetFactoryAddress, true);

        // Owner settings for the bet factories
        /* Settings
          treasuryAddr = treasuryAddress
          treasuryFee = 0.4%
          poolFee = 0.5%
          creatorFee = 0.1%
          swapFee = 1%
          disputeThreshold = 5%
          validateDuration = 2400
          disputeDuration = 2400
        */
        betFactory.setBetSettings(
          treasury,
          40,
          50,
          10,
          500,
          2400,
          2400
        );

        /* Settings
          treasuryAddr = treasuryAddress
          treasuryFee = 0.4%
          poolFee = 2%
          creatorFee = 0.1%
          swapFee = 1%
          disputeThreshold = 5%
          validateDuration = 2400
          disputeDuration = 2400
        */
        privateBetFactory.setBetSettings(
          treasury,
          40,
          200
        );

        //------------------ LP contracts ------------------//
        // Send our stablecoins to players
        baseUSDC.transfer(alice, 100_000 * 10**18);
        baseUSDC.transfer(bravo, 100_000 * 10**18);
        baseUSDC.transfer(charlie, 100_000 * 10**18);
        baseUSDC.transfer(delta, 100_000 * 10**18);
        baseUSDC.transfer(echo, 100_000 * 10**18);
        baseUSDC.transfer(foxtrot, 100_000 * 10**18);
        baseUSDC.transfer(golf, 100_000 * 10**18);
        baseUSDC.transfer(hotel, 100_000 * 10**18);
        baseUSDC.transfer(india, 100_000 * 10**18);
        baseUSDC.transfer(juliett, 100_000 * 10**18);
        baseUSDC.transfer(kilo, 100_000 * 10**18);
        baseUSDC.transfer(lima, 100_000 * 10**18);

        vm.stopPrank();

        // All players to approve baseUSDC
        // TODO: FRONT END NEEDS TO APPROVE HIGH AMOUNT - INFINITE?
        vm.startPrank(alice);
        baseUSDC.approve(betFactoryAddress, 100_000_000 * 10**18);
        vm.stopPrank();

        vm.startPrank(bravo);
        baseUSDC.approve(betFactoryAddress, 100_000_000 * 10**18);
        vm.stopPrank();

        vm.startPrank(charlie);
        baseUSDC.approve(betFactoryAddress, 100_000_000 * 10**18);
        vm.stopPrank();

        vm.startPrank(delta);
        baseUSDC.approve(betFactoryAddress, 100_000_000 * 10**18);
        vm.stopPrank();

        vm.startPrank(echo);
        baseUSDC.approve(betFactoryAddress, 100_000_000 * 10**18);
        vm.stopPrank();

        vm.startPrank(foxtrot);
        baseUSDC.approve(betFactoryAddress, 100_000_000 * 10**18);
        vm.stopPrank();

        vm.startPrank(golf);
        baseUSDC.approve(betFactoryAddress, 100_000_000 * 10**18);
        vm.stopPrank();

        vm.startPrank(hotel);
        baseUSDC.approve(betFactoryAddress, 100_000_000 * 10**18);
        vm.stopPrank();

        vm.startPrank(india);
        baseUSDC.approve(betFactoryAddress, 100_000_000 * 10**18);
        vm.stopPrank();

        vm.startPrank(juliett);
        baseUSDC.approve(betFactoryAddress, 100_000_000 * 10**18);
        vm.stopPrank();

        vm.startPrank(kilo);
        baseUSDC.approve(betFactoryAddress, 100_000_000 * 10**18);
        vm.stopPrank();

        vm.startPrank(lima);
        baseUSDC.approve(betFactoryAddress, 100_000_000 * 10**18);
        vm.stopPrank();
    }

}
