// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Donations.sol";

contract Factory is Ownable {
    mapping(string => Donations) public tokens;
    string uri = "https://ethdon.xyz/api/tokens/";

    function newToken(
        string memory _title,
        address _coin,
        address _projectOwner
    ) public {
        require(
            tokens[_title] == Donations(address(0)),
            "Title already exists"
        );

        tokens[_title] = new Donations(_title, _coin, _projectOwner);
        tokens[_title].transferOwnership(msg.sender);
        emit NewContract(
            _title,
            address(tokens[_title]),
            msg.sender,
            _coin,
            _projectOwner
        );
    }

    function getURI() public view virtual returns (string memory) {
        return uri;
    }

    function setURI(string memory _uri) public  onlyOwner {
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
