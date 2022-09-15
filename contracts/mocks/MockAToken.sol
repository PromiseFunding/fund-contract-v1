// SPDX-License-Identifier:MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {MockPool} from "./MockPool.sol";

error MockAToken__NotOwner();

contract MockAToken is ERC20 {
    address public i_owner;

    modifier onlyOwner() {
        if (msg.sender != i_owner) revert MockAToken__NotOwner();
        _;
    }

    constructor(address contractAddress)
        ERC20("Aave Ethereum USDT", "aEthUSDT")
    {
        i_owner = contractAddress;
        _mint(contractAddress, 100000000000000000000000000000);
        MockPool(contractAddress).setAssetAddress();
    }

    function burnTokens(address wallet, uint256 amount) public onlyOwner {
        _burn(wallet, amount);
    }
}
