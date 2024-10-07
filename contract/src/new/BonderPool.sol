// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// REMOVE BEFORE FLIGHT
import {console} from "forge-std/console.sol";

contract BonderPool is ERC20, Ownable {

    IERC20 baseUSDC;
    uint256 public bondPoolAmt;
    uint256 public bondPoolLimit;
    uint256 public timeLock;
    mapping(address => bool) public betFactoryList;

    event DepositPool(
        address indexed bonder,
        uint256 indexed depositAmount,
        uint256 time
    );

    event WithdrawPool(
        address indexed bonder,
        uint256 indexed withdrawAmount,
        uint256 time
    );

    event FactoryMint(
        address indexed bonder,
        uint256 indexed mintAmount,
        uint256 time
    );

    event FactoryBurn(
        address indexed bonder,
        uint256 indexed burnAmount,
        uint256 time
    );

    function setBondPoolLimit(
        uint256 _bondPoolLimit
    ) external onlyOwner {
        bondPoolLimit = _bondPoolLimit;
    }

    function setTimeLock(
        uint256 _timeLock
    ) external onlyOwner {
        timeLock = _timeLock;
    }

    function setBetFactory(
        address _betFactoryAddr,
        bool _isPool
    ) external onlyOwner {
        betFactoryList[_betFactoryAddr] = _isPool;
    }

    // list of addresses that can mint or burn tokens. allowed by bonder pool lp contract
    modifier onlyBetFactory() {
        require(betFactoryList[msg.sender] == true, "Caller is not a bond pool");
        _;
    }

    constructor(address _baseUSDCAddr) ERC20("BonderPoolLPToken", "BONDER-POOL-LP") Ownable(msg.sender)
    {
      baseUSDC = IERC20(_baseUSDCAddr);
    }


    function factoryMint(address _account, uint256 _amount) public onlyBetFactory {
            _mint(_account, _amount);
            emit FactoryMint(_account, _amount, block.timestamp)
    }

    function factoryBurn(address _account, uint256 _amount) public onlyBetFactory {
            _burn(_account, _amount);
            emit FactoryBurn(_account, _amount, block.timestamp)
    }

    mapping(address => uint256) public bonderLastDepositTime;


    function depositBondPool(uint256 _amount) external {
        // CHECKS
        require(_amount > 0 , "Deposit must be greater than zero");
        require(
            baseUSDC.balanceOf(msg.sender) >= _amount,
            "Not enough balance"
        );

        require(
            (_amount + bondPoolAmt) <= bondPoolLimit,
            "Bond pool is at its limit"
        );

        require(
            baseUSDC.transferFrom(msg.sender, address(this), _amount),
            "Transfer failed"
        );

        // require(
        //     baseUSDC.transfer(msg.sender, _amount),
        //     "Transfer failed"
        // );

        uint256 totalSupply = totalSupply();
        uint256 lpAmount;

        if (totalSupply == 0 || bondPoolAmt == 0) {
            lpAmount = _amount;
        } else {
            lpAmount = (_amount * totalSupply) / bondPoolAmt;
        }

        bondPoolAmt += _amount;

        bonderLastDepositTime[msg.sender] = block.timestamp;
        _mint(msg.sender, lpAmount);

        emit DepositPool(msg.sender, _amount, block.timestamp);
    }


    function withdrawBondPool(uint256 _lpAmount) external {
        require(_lpAmount > 0 , "Deposit must be greater than zero");
        require(
            balanceOf(msg.sender) >= _lpAmount,
            "Not enough pool tokens to withdraw"
        );

        uint256 timeLockDuration = timeLock;

        // BonderInfo storage bonder = bonderInfo[msg.sender];
        uint256 lastDepositTime = bonderLastDepositTime[msg.sender];
        require(block.timestamp >= lastDepositTime + timeLockDuration, "Funds are still locked");
        // bonder.totalLpAmount -= _lpAmount;

        uint256 totalSupply = totalSupply();
        uint256 bondPoolShare = (_lpAmount * bondPoolAmt) / totalSupply;
        bondPoolAmt -= bondPoolShare;

        _burn(msg.sender, _lpAmount);
        require(
            baseUSDC.transfer(msg.sender, bondPoolShare),
            "Transfer failed"
        );

        emit WithdrawPool(msg.sender, bondPoolShare, block.timestamp);
    }



















}
