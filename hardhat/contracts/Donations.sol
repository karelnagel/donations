// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./DonationsToken.sol";

contract Donations is Ownable {
    mapping(string => DonationsToken) public tokens;

    function startProject(
        string memory title,
        address coin,
        string memory styling,
        string memory image
    ) public {
        require(
            tokens[title] == DonationsToken(address(0)),
            "Title already exists"
        );

        tokens[title] = new DonationsToken(title, coin, styling, image);
        tokens[title].transferOwnership(msg.sender);
        emit NewToken(title, coin, msg.sender, styling, image);
    }

    event NewToken(
        string title,
        address token,
        address owner,
        string styling,
        string image
    );
}
