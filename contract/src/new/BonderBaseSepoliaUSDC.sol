// SPDX-License-Identifier: MIT
// our own stablecoin, used in Base Sepolia
pragma solidity ^0.8.20;

import { ERC20 } from '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract BonderBaseSepoliaUSDC is ERC20 {
    constructor() ERC20("BonderBaseUSDC", "BBUSDC") {
        // TODO: How much to mint? 1 bn? to be distributed for testing
        _mint(msg.sender, 1_000_000_000 * 10 ** decimals());
    }
}