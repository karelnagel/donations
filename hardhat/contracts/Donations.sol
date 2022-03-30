// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./DonationsToken.sol";

contract Donations is Ownable {
    mapping(string => DonationsToken) public tokens;

    function startProject(
        string memory _title,
        address _coin,
        string memory _contractURI,
        string memory _image
    ) public {
        require(
            tokens[_title] == DonationsToken(address(0)),
            "Title already exists"
        );

        tokens[_title] = new DonationsToken(
            _title,
            _coin,
            _contractURI,
            _image
        );
        tokens[_title].transferOwnership(msg.sender);
        emit NewToken(_title,address(tokens[_title]), _coin, msg.sender, _contractURI, _image);
    }

    event NewToken(
        string title,
        address token,
        address coin,
        address owner,
        string contractURI,
        string image
    );
}
