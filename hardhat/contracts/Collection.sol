// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

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

    Counters.Counter private _dc;
    Counters.Counter private _vc;
    mapping(uint256 => uint256) voteEndTime;

    string public title;
    IERC20 public coin;
    string public ipfs;
    IFactory public factory;

    constructor(string memory _title, address _coin) ERC721(_title, _title) {
        title = _title;
        coin = IERC20(_coin);
        factory = IFactory(msg.sender);
    }

    // Changing ipfs
    function setIPFS(string memory _ipfs) public onlyOwner {
        emit SetIPFS(_ipfs);
    }

    event SetIPFS(string ipfs);

    // Donate
    function donate(uint256 amount, string memory message) public {
        require(amount > 0, "Donation amount is 0");

        coin.transferFrom(msg.sender, owner(), amount);

        _dc.increment();
        _safeMint(msg.sender, _dc.current());

        emit NewDonation(_dc.current(), amount, message, msg.sender);
    }

    event NewDonation(
        uint256 id,
        uint256 amount,
        string message,
        address sender
    );

    // Add content
    function addContent(string memory _ipfs) public onlyOwner {
        emit AddContent(_ipfs);
    }

    event AddContent(string ipfs);

    function startVote(uint256 time, string memory data) public onlyOwner {
        _vc.increment();
        voteEndTime[_vc.current()] = block.timestamp + time;
        emit StartVote(_vc.current(), voteEndTime[_vc.current()], data);
    }

    event StartVote(uint256 voteId, uint256 endTime, string data);

    function newVote(uint256 voteId, uint256 answer) public {
        require(block.timestamp <= voteEndTime[voteId], "Voting ended");
        emit NewVote(voteId, answer);
    }

    event NewVote(uint256 voteId, uint256 answer);

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
