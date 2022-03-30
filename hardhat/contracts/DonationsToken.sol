// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Base64.sol";

contract DonationsToken is ERC721, Ownable {
    using Strings for uint256;

    string _title;
    IERC20 _coin;
    uint256 _balance;
    uint256 _goal;
    bool _active;
    string _styling;
    string _image;
    uint256 _donationsCount = 0;

    struct Donation {
        uint256 amount;
        string message;
        address donator;
    }
    mapping(uint256 => Donation) public donations;

    modifier isActive() {
        require(_active, "Project not active!");
        _;
    }

    constructor(
        string memory title,
        address coin,
        uint256 goal,
        string memory styling,
        string memory image
    ) ERC721(_title, _title) {
        _coin = IERC20(coin);
        _title = title;
        _goal = goal;
        _active = true;
        _styling = styling;
        _image = image;
    }

    // Todo remove
    function info()
        public
        view
        returns (
            string memory title,
            address coin,
            address currentOwner,
            uint256 balance,
            uint256 goal,
            bool active,
            string memory styling,
            string memory image,
            uint256 donationsCount
        )
    {
        title = _title;
        coin = address(_coin);
        currentOwner = owner();
        balance = _balance;
        goal = _goal;
        active = _active;
        styling = _styling;
        image = _image;
        donationsCount = _donationsCount;
        return (
            title,
            coin,
            currentOwner,
            balance,
            goal,
            active,
            styling,
            image,
            donationsCount
        );
    }

    function edit(
        uint256 goal,
        string memory styling,
        string memory image
    ) public onlyOwner isActive {
        _goal = goal;
        _styling = styling;
        _image = image;
        emit Edit(goal, styling, image);
    }

    function donate(uint256 amount, string memory message) public isActive {
        require(amount > 0, "Donation amount is 0");

        _coin.transferFrom(msg.sender, address(this), amount);
        _balance += amount;

        _donationsCount++;
        _safeMint(msg.sender, _donationsCount);
        donations[_donationsCount] = Donation(amount, message, msg.sender);

        emit NewDonation(msg.sender, amount, message);
    }

    function cashOut() public onlyOwner {
        _coin.transfer(msg.sender, _coin.balanceOf(address(this)));
    }

    function end() public onlyOwner isActive {
        _active = false;
        cashOut();
        emit End();
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
                                _image,
                                '", "name":"Supporter #',
                                tokenId.toString(),
                                '", "description":"',
                                donations[tokenId].message,
                                '", "external_url":"https://ethdon.xyz/#/',
                                _title,
                                '", "attributes": [{"trait_type": "Donation","value":',
                                donations[tokenId].amount.toString(), // Todo wei to ETH and maybe coins in the end?
                                '},{"trait_type":"Message","value":"',
                                donations[tokenId].message,
                                '"},{"trait_type":"Original donator","value":"0x',
                                toAsciiString(donations[tokenId].donator),
                                '"}]',
                                "}"
                            )
                        )
                    )
                )
            );
    }

    function contractURI() public view returns (string memory) {
        return _styling;
    }

    event NewDonation(address indexed sender, uint256 amount, string message);
    event Edit(uint256 goal, string styling, string image);
    event End();

    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint256 i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint256(uint160(x)) / (2**(8 * (19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2 * i] = char(hi);
            s[2 * i + 1] = char(lo);
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
}
