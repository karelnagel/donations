// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./DonationsToken.sol";

contract Donations is Ownable {
    mapping(string => DonationsToken) public tokens;
    uint256 public projectCount;
    mapping(uint256 => string) public titles;

    function startProject(
        string memory title,
        address coin,
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
        emit NewProject(
            projectCount,
            address(tokens[title]),
            title,
            msg.sender,
            goal,
            styling,
            image
        );

        projectCount++;
    }

    event NewProject(
        uint256 id,
        address token,
        string title,
        address owner,
        uint256 goal,
        string styling,
        string image
    );
}
