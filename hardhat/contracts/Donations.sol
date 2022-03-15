// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./DonationsToken.sol";

contract Donations is Ownable {
    mapping(string => DonationsToken) public tokens;
    uint256 public projectCount;
    mapping(uint256 => string) public titles;

    function startProject(
        address coin,
        string memory title,
        uint256 goal,
        string memory styling,
        string memory image
    ) public {
        require(
            tokens[title] == DonationsToken(address(0)),
            "Title already exists"
        );

        titles[projectCount] = title;
        projectCount++;
        tokens[title] = new DonationsToken(title, coin, goal, styling, image);
        tokens[title].transferOwnership(msg.sender);
        emit NewProject(title, msg.sender);
    }

    event NewProject(string indexed title, address indexed owner);
}
