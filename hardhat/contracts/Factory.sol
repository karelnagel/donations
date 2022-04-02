// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Donations.sol";

contract Factory is Ownable {
    mapping(string => Donations) public tokens;
    string uri = "https://ethdon.xyz/api/tokens/";

    function newToken(
        string memory title,
        address coin,
        address projectOwner
    ) public {
        require(tokens[title] == Donations(address(0)), "Title already exists");

        tokens[title] = new Donations(title, coin, projectOwner);
        tokens[title].transferOwnership(msg.sender);
        emit NewContract(
            title,
            address(tokens[title]),
            msg.sender,
            coin,
            projectOwner
        );
    }

    function getURI() public view virtual returns (string memory) {
        return uri;
    }

    function setURI(string memory _uri) public onlyOwner {
        uri = _uri;
        emit SetURI(_uri);
    }

    event NewContract(
        string title,
        address token,
        address owner,
        address coin,
        address projectOwner
    );
    event SetURI(string uri);
}
