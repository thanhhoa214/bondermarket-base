// SPDX-License-Identifier: lastman.xyz
pragma solidity 0.8.20;

import "forge-std/Test.sol";

import {BonderHelper} from "./BonderHelper.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IBonderV1Pair} from "../src/interface/IBonderV1Pair.sol";

contract BonderContractTest is Test, BonderHelper {

    // function test_test() public {

        // (uint reserveA, uint reserveB) = BonderV1PairLibrary.getReserves(factory, tokenA, tokenB);

        // uint256 blockNumber = vm.getBlockNumber();
        // console.log(blockNumber);

    // }


    function test_functions() public {
        console.log("//====================== TEST FUNCTIONS START ======================//");

        console.log("//---------------------- CREATE BET ----------------------//");
        vm.startPrank(alice);
        betFactory.createBet(
          "Will Trump Win?",
          2400
        );
        console.log("Bet created");
        vm.stopPrank();

        getState(1);
        getBetStruct(1);

        console.log("//====================== BETTORS ARC ======================//");
        console.log("//<<<<<<<<<<<<<<<<<<<<<<<  BET STAGE >>>>>>>>>>>>>>>>>>>>>>>>>//");
        console.log("//---------------------- BUY YES TICKETS ----------------------//");
        vm.startPrank(bravo);
        betFactory.buyYes(1, 1000 * 10**18);
        console.log("B bettor created");
        vm.stopPrank();

        getState(1);
        getBettorBalance(1,bravo);

        vm.startPrank(charlie);
        betFactory.buyYes(1, 50 * 10**18);
        console.log("C bettor created");
        vm.stopPrank();

        getState(1);
        getBettorBalance(1,charlie);

        console.log("//---------------------- BUY NO TICKETS ----------------------//");
        vm.startPrank(juliett);
        betFactory.buyNo(1, 1000 * 10**18);
        console.log("J bettor created");
        vm.stopPrank();

        getState(1);
        getBettorBalance(1,juliett);

        getBetStruct(1);

        vm.startPrank(kilo);
        betFactory.buyNo(1, 2000 * 10**18);
        console.log("K bettor created");
        vm.stopPrank();

        getState(1);
        getBettorBalance(1,kilo);

        getBetStruct(1);

        console.log("//---------------------- DEPOSIT TO YES LP POOL ----------------------//");
        vm.startPrank(bravo);
        (address yesToken, ) = getBetTokensPath(1); // 0xd21F3a6b1f4e57e396134fb5A892e37465209AbD
        IERC20(baseUSDC).approve(bonderRouterAddress,10_000 * 10**18);
        IERC20(yesToken).approve(bonderRouterAddress,10_000 * 10**18);

        bonderRouter.addLiquidity(
          yesToken,
          baseUSDCAddress,
          100 * 10 **18,
          100 * 10 **18,
          0,
          0,
          bravo,
          10
        );
        console.log("deposited to yes lp");
        vm.stopPrank();

        getState(1);
        getBettorBalance(1, bravo);
        getLpReserve(1);

        console.log("//---------------------- SELL TO YES LP POOL ----------------------//");
        vm.startPrank(charlie);
        getBettorBalance(1, charlie);
        (address yesToken1, ) = getBetTokensPath(1);
        IERC20(baseUSDC).approve(bonderRouterAddress,10_000 * 10**18);
        IERC20(yesToken1).approve(bonderRouterAddress,10_000 * 10**18);

        address[] memory path = new address[](2) ;
        path[0] = yesToken1;
        path[1] = address(baseUSDC);
        uint[] memory amounts = bonderRouter.swapExactTokensForTokens(
          50 * 10**18,
          0,
          path,
          charlie,
          10);
        console.log("amountsIn:",amounts[0] / 10**18);
        console.log("amountsOut:",amounts[1] / 10**18);
        console.log("deposited to lp");
        vm.stopPrank();

        getBettorBalance(1, charlie);

        console.log("//---------------------- BUY FROM YES LP POOL WITH EXACT TOKENS (WITHOUT SELLING FIRST) ----------------------//");
        vm.startPrank(delta);
        getBettorBalance(1, delta);
        (address yesToken2, ) = getBetTokensPath(1);
        IERC20(baseUSDC).approve(bonderRouterAddress,10_000 * 10**18);
        IERC20(yesToken2).approve(bonderRouterAddress,10_000 * 10**18);

        address[] memory path2 = new address[](2) ;
        path2[0] = address(baseUSDC);
        path2[1] = yesToken2;
        uint[] memory amounts2 = bonderRouter.swapExactTokensForTokens(
          50 * 10**18,
          0,
          path2,
          delta,
          10);
        console.log("amountsIn::",amounts2[0] / 10**18);
        console.log("amountsOut::",amounts2[1] / 10**18);
        console.log("bought from LP");
        vm.stopPrank();

        getBettorBalance(1, delta);

        console.log("//---------------------- BUY FROM YES LP POOL TO GET EXACT TOKENS ----------------------//");
        vm.startPrank(echo);
        getBettorBalance(1, echo);
        (address yesToken3, ) = getBetTokensPath(1);
        IERC20(baseUSDC).approve(bonderRouterAddress,10_000 * 10**18);
        IERC20(yesToken3).approve(bonderRouterAddress,10_000 * 10**18);

        address[] memory path3 = new address[](2) ;
        path3[0] = address(baseUSDC); // input token
        path3[1] = yesToken3; // output token
        bonderRouter.swapTokensForExactTokens(
          10 * 10**18,
          1000 * 10**18,
          path3,
          echo,
          10);
        console.log("bought from LP");
        vm.stopPrank();

        getBettorBalance(1, echo);

        console.log("//---------------------- DEPOSIT TO NO LP POOL ----------------------//");
        vm.startPrank(juliett);
        (, address noToken) = getBetTokensPath(1); // 0xd21F3a6b1f4e57e396134fb5A892e37465209AbD
        IERC20(baseUSDC).approve(bonderRouterAddress,10_000 * 10**18);
        IERC20(noToken).approve(bonderRouterAddress,10_000 * 10**18);

        bonderRouter.addLiquidity(
          noToken,
          baseUSDCAddress,
          100 * 10 **18,
          100 * 10 **18,
          0,
          0,
          juliett,
          10
        );
        console.log("deposited to no lp");
        vm.stopPrank();

        getState(1);
        getBettorBalance(1, juliett);
        getLpReserve(1);

        console.log("//---------------------- SELL TO NO LP POOL ----------------------//");
        vm.startPrank(kilo);
        getBettorBalance(1, kilo);
        (,address noToken5) = getBetTokensPath(1);
        IERC20(baseUSDC).approve(bonderRouterAddress,10_000 * 10**18);

        console.log("allowance:",IERC20(noToken5).allowance(kilo, bonderRouterAddress)  / conversion);
        IERC20(noToken5).approve(bonderRouterAddress,10_000 * 10**18);
        console.log("allowance:",IERC20(noToken5).allowance(kilo, bonderRouterAddress) / conversion);

        address[] memory path5 = new address[](2) ;
        path5[0] = noToken5;
        path5[1] = address(baseUSDC);
        uint[] memory amounts5 = bonderRouter.swapExactTokensForTokens(
          500 * 10**18,
          0,
          path5,
          kilo,
          10);
        console.log("amountsIn:",amounts5[0] / 10**18);
        console.log("amountsOut:",amounts5[1] / 10**18);
        console.log("deposited to lp");
        vm.stopPrank();

        getBettorBalance(1, kilo);

        console.log("//====================== BONDERS ARC ======================//");
        console.log("//---------------------- DEPOSIT TO BOND POOL ----------------------//");

        getState(1);

        vm.startPrank(foxtrot);

        console.log("foxtrot usdc balance:", baseUSDC.balanceOf(foxtrot) / conversion);
        // this means: approve bonderPoolAddress to spend my usdc
        baseUSDC.approve(bonderPoolAddress, 10_000 * 10**18);
        uint256 foxtrotAllowance = baseUSDC.allowance(foxtrot, bonderPoolAddress);
        console.log("foxtrotAllowance:", foxtrotAllowance / conversion);

        bonderPool.depositBondPool(1000 * 10**18);
        console.log("Bonder created");
        vm.stopPrank();

        getState(1);

        vm.startPrank(golf);

        console.log("golf usdc balance:", baseUSDC.balanceOf(golf));
        baseUSDC.approve(bonderPoolAddress, 10_000 * 10**18);
        uint256 golfAllowance = bonderPool.allowance(golf, bonderPoolAddress);
        console.log("golfAllowance:", golfAllowance / conversion);


        // bonderPool.approve(betFactoryAddress, 10_000 * 10**18);
        // uint256 golfAllowance = bonderPool.allowance(golf, betFactoryAddress);
        // console.log("golfAllowance:", golfAllowance  / conversion);

        bonderPool.depositBondPool(2000 * 10**18);
        console.log("Bonder created");
        vm.stopPrank();

        getState(1);

        vm.startPrank(hotel);
        // bonderPool.approve(betFactoryAddress, 10_000 * 10**18);
        baseUSDC.approve(bonderPoolAddress, 10_000 * 10**18);
        bonderPool.depositBondPool(3000 * 10**18);
        console.log("Bonder created");
        vm.stopPrank();

        getState(1);

        vm.startPrank(india);
        // bonderPool.approve(betFactoryAddress, 10_000 * 10**18);
        baseUSDC.approve(bonderPoolAddress, 10_000 * 10**18);
        bonderPool.depositBondPool(4000 * 10**18);
        console.log("Bonder created");
        vm.stopPrank();

        getState(1);

        getBonderBalance(1,foxtrot);
        getBonderBalance(1,golf);
        getBonderBalance(1,hotel);
        getBonderBalance(1,india);

        // Proves that you can bond during BET stage
        // Most bonding happens at validate stage
        console.log("//---------------------- BOND TO YES ----------------------//");
        vm.startPrank(foxtrot);
        bonderPool.approve(betFactoryAddress, 10_000 * 10**18);
        betFactory.bondYes(1, 150 * 10**18);
        console.log("Bond to Yes");
        vm.stopPrank();


        console.log("//---------------------- BOND TO NO ----------------------//");
        vm.startPrank(golf);
        bonderPool.approve(betFactoryAddress, 10_000 * 10**18);
        betFactory.bondNo(1, 200 * 10**18);
        console.log("Bond to No");
        vm.stopPrank();


        console.log("//---------------------- BET ENDS ----------------------//");
        skip(2401);

        // TODO - a different flow for private bets
        betFactory.changeFromBet(1);

        console.log("//<<<<<<<<<<<<<<<<<<<<<<<  VALIDATE STAGE >>>>>>>>>>>>>>>>>>>>>>>>>//");

        //

        getBetStruct(1);
        uint256 disputeAmt = betFactory.getDisputeThresholdAmt(1);
        console.log("disputeAmt:", disputeAmt / conversion);

        console.log("//---------------------- BOND TO YES ----------------------//");
        vm.startPrank(hotel);
        bonderPool.approve(betFactoryAddress, 10_000 * 10**18);
        betFactory.bondYes(1, 100 * 10**18);
        console.log("Bond to Yes");
        vm.stopPrank();

        getState(1);


        console.log("//---------------------- BOND TO NO ----------------------//");
        vm.startPrank(india);
        bonderPool.approve(betFactoryAddress, 10_000 * 10**18);
        betFactory.bondNo(1, 200 * 10**18);
        console.log("Bond to No");
        vm.stopPrank();

        getState(1);



        console.log("//---------------------- PHASE CHANGE TO VALIDATE ----------------------//");
        skip(2401);
        betFactory.changeFromValidate(1);

        // TODO - a path when there is no dispute
        console.log("//<<<<<<<<<<<<<<<<<<<<<<<  SHOULD BE DISPUTE STAGE >>>>>>>>>>>>>>>>>>>>>>>>>//");
        getBetStruct(1);

        console.log("//---------------------- DISPUTED ----------------------//");
        vm.startPrank(hotel);
        betFactory.bondYes(1, 100 * 10**18);
        console.log("Bond to Yes");
        vm.stopPrank();

        getState(1);

        vm.startPrank(india);
        betFactory.bondYes(1, 200 * 10**18);
        console.log("Bond to Yes");
        vm.stopPrank();

        getState(1);

        getBetStruct(1);

        vm.startPrank(owner);
        betFactory.setFinalDecision(1, 1);
        console.log("Final decision made");
        vm.stopPrank();

        getState(1);

        console.log("//---------------------- CLAIM  ----------------------//");
        // address[4] memory bettors = [bravo, charlie, delta, echo];

        getBetStruct(1);

        vm.startPrank(bravo);
        betFactory.claim(1);
        console.log("B claimed");
        vm.stopPrank();

        getState(1);


        vm.startPrank(charlie);
        // since sold all to lp pool
        vm.expectRevert();
        betFactory.claim(1);
        console.log("C tried to claimed");
        vm.stopPrank();

        getState(1);

        vm.startPrank(delta);
        betFactory.claim(1);
        console.log("D claimed");
        vm.stopPrank();

        getState(1);

        vm.startPrank(echo);
        // bought No
        // vm.expectRevert();
        betFactory.claim(1);
        console.log("E claimed");
        vm.stopPrank();

        getState(1);

        console.log("//---------------------- UNBOND ----------------------//");
        getBonderBalance(1,foxtrot);

        getState(1);

        vm.startPrank(foxtrot);
        betFactory.unbond(1);
        console.log("F unbond");
        vm.stopPrank();

        vm.startPrank(golf);
        // since bond to No
        vm.expectRevert();
        betFactory.unbond(1);
        console.log("G tried to unbond");
        vm.stopPrank();

        vm.startPrank(hotel);
        betFactory.unbond(1);
        console.log("H unbond");
        vm.stopPrank();

        vm.startPrank(india);
        betFactory.unbond(1);
        console.log("I unbond");
        vm.stopPrank();


        getBonderBalance(1,foxtrot);
        getBonderBalance(1,golf);
        getBonderBalance(1,hotel);
        getBonderBalance(1,india);

        getState(1);
        getPairLp(1);

        // getTreasury();

        console.log("//---------------------- WITHDRAW FROM BOND POOL ----------------------//");
        vm.startPrank(foxtrot);
        bonderPool.withdrawBondPool(1000 * 10**18);
        console.log("F withdraw from bond pool");
        vm.stopPrank();



        console.log("//---------------------- WITHDRAW FROM YES LP POOL ----------------------//");

        vm.startPrank(bravo);

        (address yesToken6, ) = getBetTokensPath(1); // 0xd21F3a6b1f4e57e396134fb5A892e37465209AbD
        address yesLp = betFactory.getBetStruct(1).yesLp;

        IERC20(baseUSDC).approve(bonderRouterAddress,10_000 * 10**18);
        IERC20(yesToken6).approve(bonderRouterAddress,10_000 * 10**18);
        IBonderV1Pair(yesLp).approve(bonderRouterAddress,10_000 * 10**18);
        // console.log(yesToken);

        console.log("yesLpAddress:");
        console.logAddress(yesLp);
        uint256 bravoBalance = IBonderV1Pair(yesLp).balanceOf(bravo);
        // uint256 betFactoryUsdc = IERC20(baseUSDC).balanceOf(betFactoryAddress) / 10**18;

        console.log("bravoBalance:", bravoBalance / 10**18);
        // console.log("betFactoryUsdc:", betFactoryUsdc);

        bonderRouter.removeLiquidity(
          yesToken6,
          baseUSDCAddress,
          bravoBalance,
          0,
          0,
          bravo,
          5000
        );
        console.log("withdrawn from lp");
        vm.stopPrank();
        getBettorBalance(1, bravo);

        console.log("//---------------------- WITHDRAW FROM NO LP POOL ----------------------//");

        vm.startPrank(juliett);

         (, address noToken6) = getBetTokensPath(1);
        address noLp = betFactory.getBetStruct(1).noLp;

        // (, address noToken) = getLpPath(1); // 0xd21F3a6b1f4e57e396134fb5A892e37465209AbD

        IERC20(baseUSDC).approve(bonderRouterAddress,10_000 * 10**18);
        IERC20(noToken6).approve(bonderRouterAddress,10_000 * 10**18);
        IBonderV1Pair(noLp).approve(bonderRouterAddress,10_000 * 10**18);

        console.log("noLpAddress:");
        console.logAddress(noLp);
        uint256 juliettBalance = IBonderV1Pair(noLp).balanceOf(juliett);
        // uint256 betFactoryUsdc = IERC20(baseUSDC).balanceOf(betFactoryAddress) / 10**18;
        console.log("juliettBalance:", juliettBalance / 10**18);
        // console.log("betFactoryUsdc:", betFactoryUsdc);

        bonderRouter.removeLiquidity(
          address(noToken6),
          baseUSDCAddress,
          juliettBalance,
          0,
          0,
          juliett,
          5000
        );
        console.log("withdrawn from lp");
        vm.stopPrank();

        getState(1);
        getBettorBalance(1, juliett);
        getLpReserve(1);


    }


    }
