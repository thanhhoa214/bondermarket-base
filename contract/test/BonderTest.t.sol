// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {console} from 'forge-std/console.sol';

//Needed to call for testing
import {BonderUSDC} from "src/modules/usdc/BonderUSDC.sol";
import {BonderV1CreatorNFT} from "src/modules/creator/BonderV1CreatorNFT.sol";
import {BonderV1YesNoFactory} from "src/modules/factory/BonderV1YesNoFactory.sol";

import { BonderHelper } from "./BonderHelper.sol";


interface IBonderV1BetToken {
    function totalMinted() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
}

interface IBonderUSDC {
    function balanceOf(address account) external view returns (uint256);
}

contract BonderTest is Test, BonderHelper {

    function setUp() public {

        vm.deal(owner, 10 ether);
        vm.deal(minter, 10 ether);
        vm.deal(controller, 10 ether);
        vm.deal(dev, 10 ether);
        // vm.deal(treasury, 10 ether);
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


            usdc = new BonderUSDC();
            usdcAddress = address(usdc);

            console.log("owner usdc:", IBonderUSDC(usdcAddress).balanceOf(address(owner))/10**6);

            creatorNFT = new BonderV1CreatorNFT(minter, controller, dev, feeAddr, usdcAddress);
            creatorNFTAddress = address(creatorNFT);

            yesNoFactory = new BonderV1YesNoFactory(usdcAddress, creatorNFTAddress, controller);
            yesNoFactoryAddress = address(yesNoFactory);

            usdc.transfer(alice, 100_000 * 10**6);
            console.log("alice usdc:", IBonderUSDC(usdcAddress).balanceOf(address(alice))/10**6);
            usdc.transfer(bravo, 100_000 * 10**6);
            usdc.transfer(charlie, 100_000 * 10**6);
            usdc.transfer(delta, 100_000 * 10**6);
            usdc.transfer(echo, 100_000 * 10**6);
            usdc.transfer(foxtrot, 100_000 * 10**6);
            usdc.transfer(golf, 100_000 * 10**6);
            usdc.transfer(hotel, 100_000 * 10**6);
            usdc.transfer(india, 100_000 * 10**6);
            usdc.transfer(juliett, 100_000 * 10**6);
            usdc.transfer(kilo, 100_000 * 10**6);
        
        vm.stopPrank();

        vm.startPrank(controller);
            creatorNFT.setBetFactory(yesNoFactoryAddress, true);
        vm.stopPrank();
        
        vm.startPrank(alice);
            usdc.approve(yesNoFactoryAddress, 100_000_000 * 10**6);
        vm.stopPrank();

        vm.startPrank(bravo);
            usdc.approve(yesNoFactoryAddress, 100_000_000 * 10**6);
        vm.stopPrank();

        vm.startPrank(charlie);
            usdc.approve(yesNoFactoryAddress, 100_000_000 * 10**6);
        vm.stopPrank();

        vm.startPrank(delta);
            usdc.approve(yesNoFactoryAddress, 100_000_000 * 10**6);
        vm.stopPrank();

        vm.startPrank(echo);
            usdc.approve(yesNoFactoryAddress, 100_000_000 * 10**6);
        vm.stopPrank();

        vm.startPrank(foxtrot);
            usdc.approve(yesNoFactoryAddress, 100_000_000 * 10**6);
        vm.stopPrank();

        vm.startPrank(golf);
            usdc.approve(yesNoFactoryAddress, 100_000_000 * 10**6);
        vm.stopPrank();

        vm.startPrank(hotel);
            usdc.approve(yesNoFactoryAddress, 100_000_000 * 10**6);
        vm.stopPrank();

        vm.startPrank(india);
            usdc.approve(yesNoFactoryAddress, 100_000_000 * 10**6);
        vm.stopPrank();

        vm.startPrank(juliett);
            usdc.approve(yesNoFactoryAddress, 100_000_000 * 10**6);
        vm.stopPrank();

        vm.startPrank(kilo);
            usdc.approve(yesNoFactoryAddress, 100_000_000 * 10**6);
        vm.stopPrank();

    }

    function test_1() public {

        console.log("TEST STARTS");
        
        getPlayerBalance(1, alice);
 
        vm.startPrank(alice);
            // TEST if can create market
            // Create Bet 1
            yesNoFactory.createBet(
                // Example of how a CID (Content Identifier) from IPFS looks like
                // CIDs are typically 46 characters long and start with "Qm"
                "QmX7bJqhRFXKsNLjEJuGdvK6qQbZQsfXzYGY2NKzNRWQaC",
                10,
                0
            );

            // TEST setting creator fees to 0.1%
            // revert as rank is 0
            vm.expectRevert();
                yesNoFactory.createBet(
                    "QmX7bJqhRFXKsNLjEJuGdvK6qQbZQsfXzYGY2NKzNRWQaC",
                    10,
                    1
                );
        vm.stopPrank();
        // getPlayerBalance(1, alice);
        getCreatorNFT(1);
        
        getPlayerBalance(1, alice);
        getBetStruct(1);
        
        // TEST createBetDeposit
        vm.startPrank(controller);
            creatorNFT.setCreateBetDeposit(100 * 10**6);
        vm.stopPrank();

        vm.startPrank(alice);

            yesNoFactory.createBet(
                // Create Bet 2
                "QmX7bJqhRFXKsNLjEJuGdvK6qQbZQsfXzYGY2NKzNRWQaC",
                10,
                0
            );

        vm.stopPrank();

        getBetStruct(2);

        // Check Alice USDC balance here
        getPlayerBalance(1, alice);
        
        // TEST pause contract
        vm.startPrank(controller);
            yesNoFactory.setPause(true);
        vm.stopPrank();


        vm.startPrank(bravo);
            vm.expectRevert();
            yesNoFactory.createBet(
                "QmX7bJqhRFXKsNLjEJuGdvK6qQbZQsfXzYGY2NKzNRWQaC",
                10,
                0
            );
        vm.stopPrank();

        vm.startPrank(controller);
            yesNoFactory.setPause(false);
        vm.stopPrank();

        vm.startPrank(bravo);
            // Create Bet 3
            yesNoFactory.createBet(
                "QmX7bJqhRFXKsNLjEJuGdvK6qQbZQsfXzYGY2NKzNRWQaC",
                10,
                0
            );
        vm.stopPrank();

        getBetStruct(3);

        // TEST buy tokens
        skip(5);

        vm.startPrank(charlie);
            yesNoFactory.buyYes(1, 1000 * 10**6);
            console.log("Player C in");
        vm.stopPrank();



        vm.startPrank(delta);
            yesNoFactory.buyNo(1, 500 * 10**6);
            console.log("Player D in");
        vm.stopPrank();

        vm.startPrank(echo);
            yesNoFactory.buyYes(2, 1000 * 10**6);
            console.log("Player E in");
        vm.stopPrank();

        vm.startPrank(foxtrot);
            yesNoFactory.buyNo(2, 1000 * 10**6);
            console.log("Player F in");
        vm.stopPrank();

        vm.startPrank(golf);
            yesNoFactory.buyYes(3, 1000 * 10**6);
            console.log("Player G in");
        vm.stopPrank();

        vm.startPrank(hotel);
            yesNoFactory.buyNo(3, 1 * 10**6);
            console.log("Player H in");
        vm.stopPrank();    

        getBetStruct(1);
        getBetStruct(2);
        getBetStruct(3);

        getPlayerBalance(1, charlie);
        getPlayerBalance(1, delta);
        getPlayerBalance(2, echo);
        getPlayerBalance(2, foxtrot);
        getPlayerBalance(3, golf);
        getPlayerBalance(3, hotel);

        getCreatorNFT(1);
        getCreatorNFT(2);
        getCreatorNFT(3);


        
        //------------------------- END OF TEST FOR BASE HACK -------------------------//


        // TEST End bet once hit 10
        // skip(5);

        // // TODO Might need to automate from our end
        // vm.startPrank(india);
        //     yesNoFactory.changeFromBet(1);
        // vm.stopPrank();

        // vm.startPrank(india);
        //     yesNoFactory.changeFromBet(2);
        // vm.stopPrank();

        // vm.startPrank(india);
        //     yesNoFactory.changeFromBet(3);
        // vm.stopPrank();



    }

}
