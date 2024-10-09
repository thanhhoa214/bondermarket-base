// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

interface IBonderV1ERC20 {

    // OG ERC20
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function totalSupply() external view returns (uint256);
    
    function balanceOf(address account) external view returns (uint256);
    
    function transfer(address to, uint256 value) external returns (bool);
    
    function allowance(address owner, address spender) external view returns (uint256);
    
    function approve(address spender, uint256 value) external returns (bool);

    function transferFrom(address from, address to, uint256 value) external returns (bool);    
    
    // Our addons    
    function totalMinted() external view returns (uint256);
    
    function name() external view returns (string memory);
    
    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);

}

contract BonderV1ERC20 is IBonderV1ERC20 {
    uint256 public totalSupply;
    uint256 public totalMinted;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    string public name;
    string public symbol;
    uint8 public decimals;

    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_
    ) {
        name = name_;
        symbol = symbol_;
        decimals = decimals_;
    }

    function _mint(address account, uint256 value) internal {
        _update(address(0), account, value);
    }

    function _burn(address account, uint256 value) internal {
        _update(account, address(0), value);
    }

    function _transfer(address from, address to, uint256 value) internal {
        _update(from, to, value);
    }

    function _update(address from, address to, uint256 value) internal {
        if (from == address(0)) {
            totalSupply += value;
            totalMinted += value;
        } else {
            uint256 fromBalance = balanceOf[from];
            require(fromBalance >= value, "ERC20: insufficient balance");

            unchecked {
                balanceOf[from] = fromBalance - value;
            }
        }

        if (to == address(0)) {
            unchecked {
                totalSupply -= value;
            }
        } else {
            unchecked {
                balanceOf[to] += value;
            }
        }

        emit Transfer(from, to, value);
    }

    function _approve(
        address owner,
        address spender,
        uint256 value
    ) internal {
        allowance[owner][spender] = value;
        emit Approval(owner, spender, value);
    }

    function transferFrom(address from, address to, uint256 value) external returns (bool) {
        address spender = msg.sender;

        uint256 currentAllowance = allowance[from][spender];
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= value, "ERC20: insufficient allowance");
            unchecked {
                _approve(from, spender, currentAllowance - value);
            }
        }

        _transfer(from, to, value);
        return true;
    }

    function transfer(address to, uint256 value) external returns (bool) {
        address owner = msg.sender;
        _transfer(owner, to, value);
        return true;
    }

    function approve(address spender, uint256 value) external returns (bool) {
        address owner = msg.sender;
        _approve(owner, spender, value);
        return true;
    }
}