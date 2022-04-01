// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Factory.sol";

contract Donations is ERC721, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenCounter;
    Counters.Counter private _projectCounter;

    string public title;
    Factory factory;

    struct Token {
        uint256 projectId;
        address owner;
        uint256 amount;
    }
    struct Project {
        bool active;
        IERC20 coin;
        address owner;
        uint256 donated;
    }

    mapping(uint256 => Token) public tokens;
    mapping(uint256 => Project) public projects;

    modifier onlyActive(uint256 id) {
        require(projects[id].active, "Project not active!");
        _;
    }
    modifier onlyProjectOwner(uint256 id) {
        require(
            projects[id].owner == msg.sender || owner() == msg.sender,
            "Not project owner"
        );
        _;
    }

    constructor(
        string memory _title,
        address coin,
        address projectOwner
    ) ERC721(_title, _title) {
        title = _title;
        factory = Factory(msg.sender);
        _projectCounter.increment();
        projects[_projectCounter.current()] = Project(
            true,
            IERC20(coin),
            projectOwner,
            0
        );
    }

    // URI
    function contractURI() public view virtual returns (string memory) {
        return string(abi.encodePacked(factory.getURI(), title));
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    factory.getURI(),
                    title,
                    "/",
                    tokenId.toString()
                )
            );
    }

    // New project
    function newProject(address coin, address projectOwner) public onlyOwner {
        _projectCounter.increment();
        projects[_projectCounter.current()] = Project(
            true,
            IERC20(coin),
            projectOwner,
            0
        );
        emit NewProject(_projectCounter.current(), coin, projectOwner);
    }

    event NewProject(uint256 id, address coin, address projectOwner);

    // End
    function end(uint256 id) public onlyProjectOwner(id) onlyActive(id) {
        projects[id].active = false;
        projects[id].coin.transfer(projects[id].owner, projects[id].donated);
        emit End(id);
    }

    event End(uint256 id);

    // Donate
    function donate(
        uint256 id,
        uint256 amount,
        string memory message
    ) public onlyActive(id) {
        require(amount > 0, "Donation amount is 0");

        projects[id].coin.transferFrom(msg.sender, address(this), amount);
        projects[id].donated += amount;

        _tokenCounter.increment();
        _safeMint(msg.sender, _tokenCounter.current());
        tokens[_tokenCounter.current()] = Token(id, msg.sender, amount);

        emit NewToken(_tokenCounter.current(), id, msg.sender, amount, message);
    }

    event NewToken(
        uint256 id,
        uint256 projectId,
        address owner,
        uint256 amount,
        string message
    );
}
