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

    Counters.Counter private _donationCounter;

    string public title;
    IERC20 public coin;
    string public ipfs;
    IFactory factory;

    constructor(
        string memory _title,
        address _coin,
        string memory _ipfs
    ) ERC721(_title, _title) {
        title = _title;
        coin = IERC20(_coin);
        ipfs = _ipfs;
        factory = IFactory(msg.sender);
    }

    // Changing ipfs
    function setIPFS(string memory _ipfs) public onlyOwner {
        ipfs = _ipfs;
        emit SetIPFS(_ipfs);
    }

    event SetIPFS(string ipfs);

    // Donate
    function donate(uint256 amount, string memory message) public {
        require(amount > 0, "Donation amount is 0");

        coin.transferFrom(msg.sender, owner(), amount);

        _donationCounter.increment();
        _safeMint(msg.sender, _donationCounter.current());

        emit NewDonation(
            _donationCounter.current(),
            msg.sender,
            amount,
            message
        );
    }

    event NewDonation(
        uint256 id,
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
