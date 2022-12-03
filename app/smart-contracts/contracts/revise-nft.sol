// Let’s start by importing the Openzeppelin ERC-721 template into our file
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Next, let’s add our NFT smart contract and name the NFT token (Dynamic NFT)
contract ReviseNFT is ERC721, ERC721Enumerable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    string baseuri = "https://kitaihazure.revise.link/";

    constructor() ERC721("Dynamic NFT", "dNFT") {}

    // Last but not the least, let’s add functions to enable minting and to enable setting the _baseURI().
    function mint(address to) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function _baseURI() internal view override(ERC721) returns (string memory) {
        return baseuri;
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    
    function getCurrentID() public view returns (uint256) {
        return _tokenIdCounter.current()-1;
    }
}
