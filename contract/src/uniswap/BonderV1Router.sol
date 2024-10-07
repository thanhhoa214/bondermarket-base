pragma solidity ^0.8.20;

// import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';

// import '../interface/IUniswapV2Router02.sol';
import '../libraries/SafeMath.sol';
import '../interface/IERC20.sol';

import '../libraries/TransferHelper.sol';
import {BonderV1Pair} from './BonderV1Pair.sol';
import {IBonderV1Pair} from '../interface/IBonderV1Pair.sol';
import {BonderV1PairLibrary} from './BonderV1PairLibrary.sol';
import {IBonderV1PairLPFactory} from '../interface/IBonderV1PairLPFactory.sol';
import {IBonderV1BetFactory} from '../interface/IBonderV1BetFactory.sol';
import {IERC20} from "../interface/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import "forge-std/Test.sol";
import {console} from "forge-std/console.sol";

// FORK OF UNISWAPV2ROUTER02 - changes indicated in comments
contract BonderV1Router is Ownable {
    using SafeMath for uint;

    address public immutable factory;

    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'Time expired');
        _;
    }

    // Added
    IERC20 baseUSDC;
    IBonderV1BetFactory betFactory;
    uint256 swapFee;

    function setSwapFee (
        uint256 _swapFee
    ) external onlyOwner {
        swapFee = _swapFee;
    }

    constructor(address _pairLpfactory, address _baseUSDCAddr, uint256 _swapFee) Ownable(msg.sender) {
        factory = _pairLpfactory;
        baseUSDC = IERC20(_baseUSDCAddr);
        swapFee = _swapFee;
        // betFactory = IBonderV1BetFactory(_betFactory);
    }

    // **** ADD LIQUIDITY ****
    // tokenA or tokenB can either be USDC
    function _addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin
    ) internal virtual returns (uint amountA, uint amountB) {
        // pair is created during bet initialization
        // if (IBonderV1PairLPFactory(factory).getPair(tokenA, tokenB) == address(0)) {
        //     IBonderV1PairLPFactory(factory).createPair(tokenA, tokenB);
        // }
        require(IBonderV1PairLPFactory(factory).getPair(tokenA, tokenB) != address(0),"Pair does not exist");
        console.log("get reserves?");
        console.log("_addLiquidity pair:",IBonderV1PairLPFactory(factory).getPair(tokenA, tokenB));

        (uint reserveA, uint reserveB) = BonderV1PairLibrary.getReserves(factory, tokenA, tokenB);
        console.log(reserveA);
        console.log(reserveB);
        // for first liquidity, what you added are both accepted since there's no existing ratio
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
        } else {
            uint amountBOptimal = BonderV1PairLibrary.quote(amountADesired, reserveA, reserveB);
            // start by checking if optimal amount is less than what you added (BDesired)
            // if it is, the optimal amount can be used based on what you added for A
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'Insufficient B amount');
                (amountA, amountB) = (amountADesired, amountBOptimal);
            } else {
                // if you did not put in enough B, (BOptimal > BDesired), we check A then
                uint amountAOptimal = BonderV1PairLibrary.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'Insufficient A amount');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
            }
        }
    }


    function addLiquidity(
        address tokenA,
        address tokenB,
        // see if you have enough tokens to do the trade
        uint amountADesired, // what you added
        uint amountBDesired, // what you added
        uint amountAMin, // what min A is based on amountBDesired
        uint amountBMin, // what min B is based on amountBDesired
        address to, // recipient of pool tokens
        uint deadline // deadline is time when txn is sent, vs when txn is confirmed
    ) external ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        // amountA and amount B is final number that you can add/deposit
        // _addLiquidity calculates what the ratio is
         console.log("tokenA",tokenA);
         console.log("tokenB",tokenB);

        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = BonderV1PairLibrary.pairFor(factory, tokenA, tokenB);
        // transfer
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
        // mint the amount of pair lp tokens to the depositer, and return the figure
        liquidity = BonderV1Pair(pair).mint(to);
    }

    // **** REMOVE LIQUIDITY ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to, // msg.sender
        uint deadline
    ) public ensure(deadline) returns (uint amountA, uint amountB) {
        address pair = BonderV1PairLibrary.pairFor(factory, tokenA, tokenB);

        console.log("Removing liquidity....");
        console.logAddress(pair);
        console.log("liquidity:", liquidity / 10**18);
        IBonderV1Pair(pair).transferFrom(msg.sender, pair, liquidity); // send liquidity to pair
        console.log("transfer done");
        (uint amount0, uint amount1) = IBonderV1Pair(pair).burn(to);
        (address token0,) = BonderV1PairLibrary.sortTokens(tokenA, tokenB);
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
        require(amountA >= amountAMin, 'Insufficient A amount');
        require(amountB >= amountBMin, 'Insufficient B amount');
    }

    // **** SWAP ****
    // requires the initial amount to have already been sent to the first pair
    function _swap(uint[] memory amounts, address[] memory path, address _to, uint256 fee) internal virtual {
        // path.length is 2 - this loop runs only once
        for (uint i; i < path.length - 1; i++) {

            (address input, address output) = (path[i], path[i + 1]);
            console.log("input and output address");
            console.logAddress(input);
            console.logAddress(output);
            (address token0,) = BonderV1PairLibrary.sortTokens(input, output);
            console.logAddress(token0);

            uint amountOut = amounts[i + 1];
            console.log("amountOut:", amountOut / 10 **18);
            // figure if the amountOut is betTokens or USDC. the other one should be zero
            // for us, amount1Out should be the answer - i.e. (uint(0), amountOut)
            // but token0 is output for some reason

            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
            // (uint amount0Out, uint amount1Out) = (uint(0), amountOut);
            // address to = i < path.length - 2 ? BonderV1PairLibrary.pairFor(factory, output, path[i + 2]) : _to;
            console.log("preparing to swap here");
            IBonderV1Pair(BonderV1PairLibrary.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, _to, new bytes(0), fee
                // 0, amountOut, _to, new bytes(0)
            );
            console.log("swap done!");

        }
    }

    // fee parameter from betFactory
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external ensure(deadline) returns (uint[] memory amounts) {
        uint256 fee = swapFee;

        // uint256 fee = 10;
        console.log("msg.sender:", msg.sender);
        console.log("to:", to);
        console.log("fee:", fee / 10**18);

        amounts = BonderV1PairLibrary.getAmountsOut(factory, amountIn, path, fee);
        console.log("amountIn:", amounts[0]/ 10**18);
        console.log("amountOut:", amounts[1]/ 10**18);

        require(amounts[amounts.length - 1] >= amountOutMin, 'Insufficient output amount');
        console.log("prepare to transfer");
        // console.log("amounts[0]:",amounts[0]/ 10**18);
        // amountIn token transfer in from sender

        // uint256 allowance = IERC20(path[0]).allowance(msg.sender, address(this));
        // console.log("amountInAllowance:",allowance/ 10**18);

        TransferHelper.safeTransferFrom(
            // token, from, to (tokenPairContract), amount
            path[0], msg.sender, BonderV1PairLibrary.pairFor(factory, path[0], path[1]), amounts[0]
        );

        uint balance0 = IERC20(path[0]).balanceOf(BonderV1PairLibrary.pairFor(factory, path[0], path[1]));
        uint balance1 = IERC20(path[1]).balanceOf(BonderV1PairLibrary.pairFor(factory, path[0], path[1]));

       console.log('balance0:', balance0);
       console.log('balance1:', balance1);


        // amounts = [amountIn, amountOut]
        _swap(amounts, path, to, fee);
        console.log("swap done");
    }

    // fee parameter from betFactory
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path, // path[0] = input token path[1] = output token
        address to,
        uint deadline
    ) external ensure(deadline) returns (uint[] memory amounts) {
        uint256 fee = swapFee;

        // amounts = [amountIn, amountOut]
        amounts = BonderV1PairLibrary.getAmountsIn(factory, amountOut, path, fee);
        console.log("amountIn:", amounts[0] / 10**18);
        console.log("amountsInMax:", amountInMax);
        require(amounts[0] <= amountInMax, 'Excessive input amount');


        TransferHelper.safeTransferFrom(
            path[0], msg.sender, BonderV1PairLibrary.pairFor(factory, path[0], path[1]), amounts[0]
        );

        _swap(amounts, path, to, fee);
    }
}
