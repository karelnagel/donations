// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Collection.sol";

contract Factory is Ownable {
    using Strings for uint256;

    mapping(string => address) public collections;
    string private _uri;

    constructor(string memory uri) {
        _uri = uri;
        emit SetURI(uri);
    }

    function newCollection(
        string memory title,
        address projectCoin,
        address projectOwner,
        string memory projectIpfs
    ) public {
        require(collections[title] == address(0), "Title already exists");

        Collection collection = new Collection(
            title,
            projectCoin,
            projectOwner,
            projectIpfs
        );
        collection.transferOwnership(msg.sender);
        collections[title] = address(collection);

        emit NewCollection(
            title,
            collections[title],
            msg.sender,
            projectCoin,
            projectOwner,
            projectIpfs
        );
    }

    event NewCollection(
        string title,
        address collection,
        address owner,
        address projectCoin,
        address projectOwner,
        string projectIpfs
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
