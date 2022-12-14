// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC1155LazyMint.sol";

contract PokemonEvolveContract is ERC1155LazyMint {
    constructor(
        string memory _name,
        string memory _symbol
    ) ERC1155LazyMint(_name, _symbol, msg.sender, 5) {}

    function verifyClaim(
        address _claimer,
        uint256 _tokenId,
        uint256 _quantity
    ) public view override {
        require(_tokenId == 0, "Only Charmeleon is mintable");
        require(_quantity == 1, "Only 1 Charmeleon can be claimed at a time!");
    }

    function evolve(uint8 stage) public {
        require(stage < 2, "Stage should be 0 or 1");
        _burn(msg.sender, stage, 2);
        _mint(msg.sender, stage + 1, 1, "");
    }
}