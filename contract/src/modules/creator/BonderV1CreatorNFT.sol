// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IBonderV1ERC721Creator, BonderV1ERC721Creator} from 'src/modules/erc/BonderV1ERC721Creator.sol';
import {IERC20} from 'src/interface/IERC20.sol';

contract BonderV1CreatorNFT is BonderV1ERC721Creator {
    address public minter;
    address public controller;
    address public dev;
    address public feeAddr;

    IERC20 public usdc;

    constructor(
        address minter_,
        address controller_,
        address dev_,
        address feeAddr_,
        address usdc_
    ) BonderV1ERC721Creator('BonderV1CreatorNFT', 'Creator-NFT-V1') {
        minter = minter_;
        controller = controller_;
        dev = dev_;
        feeAddr = feeAddr_;
        usdc = IERC20(usdc_);
    }

    function setMinter(address minter_) external {
        require(msg.sender == minter_, 'Only minter can set minter');
        minter = minter_;
    }

    function setController(address controller_) external {
        require(msg.sender == controller, 'Only controller can set controller');
        controller = controller_;
    }

    function setDev(address dev_) external {
        require(msg.sender == dev_, 'Only dev can set dev');
        dev = dev_;
    }

    function setFeeAddr(address feeAddr_) external {
        require(msg.sender == dev, "Only dev can set feeAddr");
        feeAddr = feeAddr_;
    }

    uint256 public createBetDeposit;

    function setCreateBetDeposit(uint256 betDeposit_) external {
        require(msg.sender == controller, "Only controller can set creator settings");
        createBetDeposit = betDeposit_;
    }

    mapping(address => bool) public betFactoryList;

    function setBetFactory(address betFactoryAddr_, bool allowed_) external {
        require(msg.sender == controller, 'Only controller can set bet factory');
        betFactoryList[betFactoryAddr_] = allowed_;
    }

    modifier onlyBetFactory() {
        require(betFactoryList[msg.sender] == true, 'Caller is not a bet factory');
        _;
    }

    function addBetToCreatorNFT(uint256 tokenId_, uint256 betId_) external onlyBetFactory {
        creatorProfile[tokenId_].betIdArray.push(betId_);
    }

    function createMint(address to_) external onlyBetFactory returns (uint256 tokenId) {
        tokenId = _mint(to_);

        creatorProfile[tokenId] = CreatorProfile({
            feeCap: 0,
            betIdArray: new uint256[](0),
            totalBetDeposit: 0,
            completeBetCount: 0,
            nullBetCount: 0,
            rank: 0,
            publicMintNFTFloor: 0
        });
    }

    struct CreatorProfile {
        uint256 feeCap;
        uint256[] betIdArray;
        uint256 totalBetDeposit;
        uint256 completeBetCount;
        uint256 nullBetCount;
        uint256 rank;
        uint256 publicMintNFTFloor;
    }

    mapping(uint256 => CreatorProfile) public creatorProfile;

    function creatorFeeCap(uint256 tokenId_) external view returns (uint256) {
        return creatorProfile[tokenId_].feeCap;
    }

     function getCreatorProfile(uint256 tokenId) public view returns (
        uint256 feeCap,
        uint256[] memory betIdArray,
        uint256 totalBetDeposit,
        uint256 completeBetCount,
        uint256 nullBetCount,
        uint256 rank,
        uint256 publicMintNFTFloor
    ) {
        // Fetch the creator profile for the given tokenId
        CreatorProfile storage profile = creatorProfile[tokenId];
        
        // Return each field of the struct, including the copy of betIdArray
        return (
            profile.feeCap,
            profile.betIdArray, // Returning the original betIdArray (memory is automatically handled)
            profile.totalBetDeposit,
            profile.completeBetCount,
            profile.nullBetCount,
            profile.rank,
            profile.publicMintNFTFloor
        );
    }
}