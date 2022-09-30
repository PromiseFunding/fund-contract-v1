// SPDX-License-Identifier:MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import {MockPool} from "./MockPool.sol";

error MockAToken__NotOwner();

contract MockAToken is ERC20, Ownable {
    address public i_owner;

    constructor(address contractAddress) ERC20("Aave Ethereum USDT", "aEthUSDT") {
        i_owner = contractAddress;
        transferOwnership(i_owner);
        _mint(contractAddress, 100000000000000000000000000000);
        MockPool(contractAddress).setAssetAddress();
    }

    function burnTokens(address wallet, uint256 amount) public onlyOwner {
        _burn(wallet, amount);
    }
}
