// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import {BonderV1ERC20} from 'src/modules/erc/BonderV1ERC20.sol';

contract BonderV1BetToken is BonderV1ERC20 {
    // To track total minted - number does not drop
    // uint256 public totalMinted;
    address public owner;


    constructor(
        string memory name, 
        string memory symbol,
        uint8 decimal
        ) BonderV1ERC20(name, symbol, decimal) {
        owner = msg.sender;
    }

    // because it's minted when you bet
    function betMint(address _account, uint256 _amount) public {
            require(msg.sender == owner, "Only owner can mint");
            _mint(_account, _amount);
            // totalMinted += _amount;
    }

    // because it's burned when you claim
    function claimBurn(address _account, uint256 _amount) public {
            require(msg.sender == owner, "Only owner can mint");
            _burn(_account, _amount);
    }
}