// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {console} from "forge-std/console.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {BonderV1Pair} from './BonderV1Pair.sol';
import {IBonderV1Pair} from '../interface/IBonderV1Pair.sol';

// FORK OF UNISWAPV2FACTORY - changes indicated in comments

contract BonderV1PairLPFactory is Ownable {

    mapping(address => bool) public betFactoryList;


    function setBetFactory(
        address _betFactoryAddr,
        bool _isPool
    ) external onlyOwner {
        betFactoryList[_betFactoryAddr] = _isPool;
    }

    modifier onlyBetFactory() {
        require(betFactoryList[msg.sender] == true, "Caller is not a bond pool");
        _;
    }

    address public feeTo;
    address public feeToSetter;

    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    event PairCreated(address indexed tokenA, address indexed tokenB, address pair, uint);

    constructor() Ownable(msg.sender) {
        feeToSetter = msg.sender;
    }

    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }

    // change visibility to internal - only our contract can call it
    function createPair(address tokenA, address tokenB) external onlyBetFactory returns (address pair) {
        require(tokenA != tokenB, 'Identical address');
        // Uniswap arranges by token address. We will stick to convention to ensure Uniswap works smooth
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'Pair already exists'); // single check is sufficient
        bytes memory bytecode = type(BonderV1Pair).creationCode;
        // IMPORTANT: this is how it fixes the sequence
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        IBonderV1Pair(pair).initialize(token0, token1);
        getPair[token0][token1] = pair;
        // good to have - to ensure reverse pairing is covered-although we won't reference it
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);


        emit PairCreated(token0, token1, pair, allPairs.length);
    }

    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'Only owner can call this function');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'Only owner can call this function');
        feeToSetter = _feeToSetter;
    }
}
