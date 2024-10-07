// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

interface IBonderV1BetFactory {
    function getSwapFee() external returns(uint256 swapFee);
}
