// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Collection.sol";

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract Factory is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    using Strings for uint256;

    mapping(string => address) public collections;
    string private _uri;

    function initialize(string memory uri) initializer public {
        __Ownable_init();
        __UUPSUpgradeable_init();
        
        _uri = uri;
        emit SetURI(uri);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}

    function newCollection(
        string memory title,
        address coin,
        string memory ipfs
    ) public {
        require(collections[title] == address(0), "Title already exists");

        Collection collection = new Collection(
            title,
            coin,
            ipfs
        );
        collection.transferOwnership(msg.sender);
        collections[title] = address(collection);

        emit NewCollection(
            title,
            collections[title],
            msg.sender,
            coin,
            ipfs
        );
    }

    event NewCollection(
        string title,
        address collection,
        address owner,
        address coin,
        string ipfs
    );

    function getContractURI(string memory title)
        public
        view
        virtual
        returns (string memory)
    {
        return string(abi.encodePacked(_uri, title));
    }

    function getTokenURI(string memory title, uint256 tokenId)
        public
        view
        virtual
        returns (string memory)
    {
        return string(abi.encodePacked(_uri, title, "/", tokenId.toString()));
    }

    function setURI(string memory uri) public onlyOwner {
        _uri = uri;
        emit SetURI(uri);
    }

    event SetURI(string uri);
}
