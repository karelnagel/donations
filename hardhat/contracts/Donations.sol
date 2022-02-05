// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./DonationsToken.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Donations is Ownable {
    struct Project {
        IERC20 coin;
        address owner;
        string title;
        uint256 balance;
        uint256 goal;
        string styling;
        bool active;
    }
    DonationsToken token;
    uint256 projectsCount = 0;
    mapping(uint256 => Project) public projects;

    constructor(address tokenAddress) {
        token = DonationsToken(tokenAddress);
    }

    modifier onlyProjectOwner(uint256 id) {
        require(msg.sender == projects[id].owner, "Not project owner!");
        _;
    }
    modifier activeProject(uint256 id) {
        require(projects[id].active, "Project not active!");
        _;
    }

    function startProject(
        address coin,
        string memory title,
        uint256 goal,
        string memory styling,
        string memory tokenUri
    ) public {
        projects[projectsCount] = Project(
            IERC20(coin),
            msg.sender,
            title,
            0,
            goal,
            styling,
            true
        );
        token.setUri(projectsCount, tokenUri);
        projectsCount++;
    }

    function editProject(
        uint256 id,
        uint256 goal,
        string memory styling
    ) public onlyProjectOwner(id) activeProject(id) {
        projects[id].goal = goal;
        projects[id].styling = styling;
    }

    function editProjectToken(uint256 id, string memory tokenUri)
        public
        onlyProjectOwner(id)
        activeProject(id)
    {
        token.setUri(id, tokenUri);
    }

    function endProject(uint256 id)
        public
        onlyProjectOwner(id)
        activeProject(id)
    {
        projects[id].active = false;
        projects[id].coin.transfer(msg.sender, projects[id].balance);
        projects[id].balance = 0;
    }

    event Donation(
        uint256 id,
        address indexed sender,
        uint256 amount,
        string indexed message
    );

    function donate(
        uint256 id,
        uint256 amount,
        string memory message
    ) public activeProject(id) {
        projects[id].coin.transferFrom(msg.sender, address(this), amount);
        projects[id].balance += amount;

        token.mint(msg.sender, id, 1, "");

        emit Donation(id, msg.sender, amount, message);
    }
}
