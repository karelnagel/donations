// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./DonationsToken.sol";

contract Donations is Ownable {
    mapping(string => DonationsToken) public tokens;
    string[] public titles;

    function startProject(
        address _coin,
        string memory _title,
        uint256 _goal,
        string memory _styling,
        string memory _image
    ) public {
        require(
            tokens[_title] == DonationsToken(address(0)),
            "Title already exists"
        );

        titles.push(_title);
        tokens[_title] = new DonationsToken(_coin, _title, _goal, _styling,_image);
        tokens[_title].transferOwnership(msg.sender);
        emit NewProject(_title, msg.sender);
    }

    event NewProject(string indexed title, address indexed owner);
}
