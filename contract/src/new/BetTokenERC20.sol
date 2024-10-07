// SPDX-License-Identifier: MIT
// our own stablecoin, used in Base Sepolia
pragma solidity ^0.8.20;

import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract BetTokenERC20 is ERC20, Ownable {
    // To track total minted - number does not drop
    uint256 private _totalMinted;

    function totalMinted() public view returns (uint256) {
        return _totalMinted;
    }

    constructor(string memory name, string memory symbol) ERC20(name, symbol) Ownable(msg.sender) {
    }

    function mint(address _account, uint256 _amount) public onlyOwner {
            _mint(_account, _amount);
            _totalMinted += _amount;
    }

    function burn(address _account, uint256 _amount) public onlyOwner {
            _burn(_account, _amount);
    }

}
