// SPDX-License-Identifier:MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20Token is ERC20 {
    constructor() ERC20("TetherToken", "USDT") {
        _mint(msg.sender, 100000000000000000000000000000);
    }
}
