// SPDX-License-Identifier: MIT

/*
*  @dev Our mock USDC with our ERC20 implementation with 6 decimal points
*/ 

pragma solidity ^0.8.20;

import { BonderV1ERC20 } from 'src/modules/erc/BonderV1ERC20.sol';


contract BonderUSDC is BonderV1ERC20 {
    constructor() BonderV1ERC20("BonderUSDC", "BonderUSDC", 6) {
        _mint(msg.sender, 1_000_000_000 * 10 ** 6);
    }
}