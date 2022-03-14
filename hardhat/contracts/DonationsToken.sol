// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Base64.sol";

contract DonationsToken is ERC721, Ownable {
    using Strings for uint256;
    string public title;
    IERC20 public coin;

    uint256 public balance;
    uint256 public goal;
    bool public active;
    string public styling;
    string public image;
    uint256 public donationsCount = 0;

    struct Donation {
        uint256 amount;
        string message;
    }
    mapping(uint256 => Donation) public donations;

    modifier isActive() {
        require(active, "Project not active!");
        _;
    }

    constructor(
        address _coin,
        string memory _title,
        uint256 _goal,
        string memory _styling,
        string memory _image
    ) ERC721(_title, _title) {
        coin = IERC20(_coin);
        title = _title;
        goal = _goal;
        active = true;
        styling = _styling;
        image = _image;
    }

    function info()
        public
        view
        returns (
            string memory _title,
            address _coin,
            address _owner,
            uint256 _balance,
            uint256 _goal,
            bool _active,
            string memory _styling,
            string memory _image
        )
    {
        _title = title;
        _coin = address(coin);
        _owner = owner();
        _balance = balance;
        _goal = goal;
        _active = active;
        _styling = styling;
        _image = image;
        return (
            _title,
            _coin,
            _owner,
            _balance,
            _goal,
            _active,
            _styling,
            _image
        );
    }

    function edit(
        uint256 _goal,
        string memory _styling,
        string memory _image
    ) public onlyOwner isActive {
        goal = _goal;
        styling = _styling;
        image = _image;
    }

    function donate(uint256 _amount, string memory _message) public isActive {
        coin.transferFrom(msg.sender, address(this), _amount);
        balance += _amount;

        donationsCount++;
        _safeMint(msg.sender, donationsCount);
        donations[donationsCount] = Donation(_amount, _message);

        emit NewDonation(msg.sender, _amount, _message);
    }

    function cashOut() public onlyOwner{
        coin.transfer(msg.sender, coin.balanceOf(address(this)));
    }

    function end() public onlyOwner isActive {
        active = false;
        cashOut();
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
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"image":"',
                                image,
                                '", "name":"Supporter #',
                                tokenId.toString(),
                                '", "description":"Thanks for supporting ',
                                title,
                                '!", "external_url":"https://ethdon.xyz/',
                                title,
                                '", "attributes": [{"trait_type": "Donation","value":',
                                donations[tokenId].amount.toString(), // Todo wei to ETH and maybe coins in the end?
                                '},{"trait_type":"Message","value":"',
                                donations[tokenId].message,
                                '"}]',
                                "}"
                            )
                        )
                    )
                )
            );
    }

    function contractURI() public view returns (string memory) {
        return styling;
    }

    event NewDonation(address indexed sender, uint256 amount, string message);
}
