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
    bool public active;
    string _contractURI;
    uint256 public donated = 0;
    uint256 public donationsCount = 0;
    uint256 public currentProject = 0;

    struct Donation {
        address sender;
        uint256 amount;
        string message;
        uint256 projectId;
    }
    mapping(uint256 => string) public projects;
    mapping(uint256 => Donation) public donations;

    modifier isActive() {
        require(active, "Project not active!");
        _;
    }

    constructor(
        string memory _title,
        address _coin,
        string memory _contractUri,
        string memory _image
    ) ERC721(_title, _title) {
        coin = IERC20(_coin);
        title = _title;
        active = true;
        _contractURI = _contractUri;
        projects[currentProject] = _image;
    }

    //Contract URI
    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    function setContractURI(string memory _contractUri)
        public
        onlyOwner
        isActive
    {
        _contractURI = _contractUri;
        emit SetContractURI(_contractUri);
    }

    event SetContractURI(string contractUri);

    // Project
    function newProject(string memory _image) public onlyOwner isActive {
        currentProject++;
        projects[currentProject] = _image;
        emit NewProject(_image);
    }

    event NewProject(string image);

    // Cashing out
    function cashOut() public onlyOwner {
        uint256 amount = coin.balanceOf(address(this));
        coin.transfer(msg.sender, amount);
        emit CashOut(amount);
    }

    event CashOut(uint256 amount);

    // Ending
    function end() public onlyOwner isActive {
        active = false;
        cashOut();
        emit End();
    }

    event End();

    // Donate
    function donate(uint256 _amount, string memory _message) public isActive {
        require(_amount > 0, "Donation amount is 0");

        coin.transferFrom(msg.sender, address(this), _amount);
        donated += _amount;

        donationsCount++;
        _safeMint(msg.sender, donationsCount);
        donations[donationsCount] = Donation(
            msg.sender,
            _amount,
            _message,
            currentProject
        );

        emit NewDonation(
            donationsCount,
            msg.sender,
            _amount,
            _message,
            currentProject
        );
    }

    event NewDonation(
        uint256 id,
        address sender,
        uint256 amount,
        string message,
        uint256 projectId
    );

    // TokenUri
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
                                projects[donations[tokenId].projectId],
                                '", "name":"Supporter #',
                                tokenId.toString(),
                                '", "description":"',
                                donations[tokenId].message,
                                '", "external_url":"https://ethdon.xyz/projects/',
                                title,
                                '", "attributes": [{"trait_type": "Donation","value":',
                                donations[tokenId].amount.toString(), // Todo wei to ETH and maybe coins in the end?
                                '},{"trait_type":"Message","value":"',
                                donations[tokenId].message,
                                '"},{"trait_type":"Original donator","value":"0x',
                                toAsciiString(donations[tokenId].sender),
                                '"}]',
                                "}"
                            )
                        )
                    )
                )
            );
    }

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
