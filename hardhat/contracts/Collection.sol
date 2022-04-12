// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface IFactory {
    function getContractURI(string memory title)
        external
        view
        returns (string memory);

    function getTokenURI(string memory title, uint256 tokenId)
        external
        view
        returns (string memory);
}

contract Collection is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _donationCounter;
    Counters.Counter private _projectCounter;

    string public title;
    IFactory factory;

    struct Project {
        bool active;
        IERC20 coin;
        address owner;
        string ipfs;
    }

    mapping(uint256 => Project) public projects;

    modifier onlyActive(uint256 id) {
        require(projects[id].active, "Project not active!");
        _;
    }

    constructor(
        string memory _title,
        address projectCoin,
        address projectOwner,
        string memory projectIpfs
    ) ERC721(_title, _title) {
        title = _title;
        factory = IFactory(msg.sender);
        _newProject(projectCoin, projectOwner, projectIpfs);
    }

    // New project
    function newProject(
        address coin,
        address owner,
        string memory ipfs
    ) public onlyOwner {
        _newProject(coin, owner, ipfs);
        emit NewProject(_projectCounter.current(), coin, owner, ipfs);
    }

    function _newProject(
        address coin,
        address owner,
        string memory ipfs
    ) private {
        _projectCounter.increment();
        projects[_projectCounter.current()] = Project(
            true,
            IERC20(coin),
            owner,
            ipfs
        );
    }

    event NewProject(uint256 id, address coin, address owner, string ipfs);

    // Changing ipfs
    function setIPFS(uint256 id, string memory ipfs)
        public
        onlyOwner
        onlyActive(id)
    {
        projects[id].ipfs = ipfs;
        emit SetIPFS(id, ipfs);
    }

    event SetIPFS(uint256 id, string ipfs);

    // End
    function end(uint256 id) public onlyOwner onlyActive(id) {
        projects[id].active = false;
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

        projects[id].coin.transferFrom(msg.sender, projects[id].owner, amount);

        _donationCounter.increment();
        _safeMint(msg.sender, _donationCounter.current());

        emit NewDonation(
            _donationCounter.current(),
            id,
            msg.sender,
            amount,
            message
        );
    }

    event NewDonation(
        uint256 id,
        uint256 projectId,
        address owner,
        uint256 amount,
        string message
    );

    // URI
    function contractURI() public view virtual returns (string memory) {
        return factory.getContractURI(title);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        return factory.getTokenURI(title, tokenId);
    }
}
