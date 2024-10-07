pragma solidity ^0.8.20;

import {IBonderV1Pair} from '../interface/IBonderV1Pair.sol';
import {IBonderV1PairLPFactory} from '../interface/IBonderV1PairLPFactory.sol';

import '../libraries/SafeMath.sol';

import "forge-std/Test.sol";
import {console} from "forge-std/console.sol";

library BonderV1PairLibrary {
    using SafeMath for uint;

    // returns sorted token addresses, used to handle return values from pairs sorted in this order
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'Identical address');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'Zero address');
    }

    // calculates the CREATE2 address for a pair without making any external calls
    // rewrote formula for type conversion but adjustments results in different path address.
    // call lpFactory to get the pair instead
    // a little lame. TODO: do we need library?
    function pairFor(address factory, address tokenA, address tokenB) internal view returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = IBonderV1PairLPFactory(factory).getPair(token0, token1);

        // bytes32 hash = keccak256(abi.encodePacked(
        //         hex'ff',
        //         factory,
        //         keccak256(abi.encodePacked(token0, token1)),
        //         hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // init code hash
        //     ));
        // pair = address(uint160(uint(hash)));
    }



    // fetches and sorts the reserves for a pair
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        console.log("getting reserves...");
        (address token0,) = sortTokens(tokenA, tokenB);

        console.log("tokenA:", tokenA);
        console.log("tokenB:", tokenB);
        console.log("token0:", token0);

        address pair = pairFor(factory, tokenA, tokenB);
        // address reversePair = pairFor(factory, tokenB, tokenA);

        console.log("pair:", pair);
        // console.log("reversePair:", pair);

        // (uint reserve0, uint reserve1,) = IBonderV1Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (uint reserve0, uint reserve1,) = IBonderV1Pair(pair).getReserves();
        console.log("reserve0:", reserve0 / 10**18);
        console.log("reserve1:", reserve1 / 10**18);



        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }


    // given some amount of an asset and pair reserves, returns an equivalent amount of the other asset
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'Insufficient amount');
        require(reserveA > 0 && reserveB > 0, 'Insufficient liquidity');
        amountB = amountA.mul(reserveB) / reserveA;
    }

    // given an input amount of an asset and pair reserves, returns the maximum output amount of the other asset
    // Added function parameter of fee, instead of hardcoding 0.3%
    // fee is based off 2 dp. so factor is 10_000
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut, uint fee) internal pure returns (uint amountOut) {
        require(amountIn > 0, 'Insufficient input amount');
        require(reserveIn > 0 && reserveOut > 0, 'Insufficient liquidity');
        uint amountInWithFee = amountIn.mul(10_000 - fee);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(10_000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }

    // fee is based off 2 dp. so factor is 10_000
    // given an output amount of an asset and pair reserves, returns a required input amount of the other asset
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut, uint fee) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'Insufficient output amount');
        require(reserveIn > 0 && reserveOut > 0, 'Insufficient liquidity');
        uint numerator = reserveIn.mul(amountOut).mul(10_000);
        uint denominator = reserveOut.sub(amountOut).mul(10_000 - fee);
        amountIn = (numerator / denominator).add(1);
    }

     // performs chained getAmountOut calculations on any number of pairs
    // getAmountsOut output is amounts[0] = amountIn ; amounts[1] = amountOut
    function getAmountsOut(address factory, uint amountIn, address[] memory path, uint fee) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'Invalid path');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut, fee);
        }
    }

    // performs chained getAmountIn calculations on any number of pairs
    function getAmountsIn(address factory, uint amountOut, address[] memory path, uint fee) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'Invalid path');
        amounts = new uint[](path.length);
        amounts[amounts.length - 1] = amountOut;
        for (uint i = path.length - 1; i > 0; i--) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i - 1], path[i]);
            amounts[i - 1] = getAmountIn(amounts[i], reserveIn, reserveOut, fee);
        }
    }

}
