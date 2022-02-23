// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Donations is ERC1155, Ownable {
    struct Project {
        IERC20 coin;
        address owner;
        string title;
        uint256 balance;
        uint256 goal;
        string uri;
        bool active;
    }
    uint256 public projectsCount = 0;
    mapping(uint256 => Project) public projects;
    mapping(string => uint256) public titles;

    modifier onlyProjectOwner(uint256 _id) {
        require(msg.sender == projects[_id].owner, "Not project owner!");
        _;
    }
    modifier activeProject(uint256 _id) {
        require(projects[_id].active, "Project not active!");
        _;
    }

    constructor() ERC1155("Donations") {}

    function uri(uint256 _id)
        public
        view
        virtual
        override
        returns (string memory)
    {
        return projects[_id].uri;
    }

    function startProject(
        address _coin,
        string memory _title,
        uint256 _goal,
        string memory _uri
    ) public {
        require(titles[_title] == 0, "Title already exists");
        projectsCount++;
        projects[projectsCount] = Project(
            IERC20(_coin),
            msg.sender,
            _title,
            0,
            _goal,
            _uri,
            true
        );
        titles[_title] = projectsCount;
        emit NewProject(projectsCount, _title, msg.sender);
    }

    function editProject(
        uint256 _id,
        uint256 _goal,
        string memory _uri
    ) public onlyProjectOwner(_id) activeProject(_id) {
        projects[_id].goal = _goal;
        projects[_id].uri = _uri;
    }

    function endProject(uint256 _id)
        public
        onlyProjectOwner(_id)
        activeProject(_id)
    {
        projects[_id].active = false;
        projects[_id].coin.transfer(msg.sender, projects[_id].balance);
    }

    function changeProjectOwner(uint256 _id, address _newOwner)
        public
        onlyProjectOwner(_id)
        activeProject(_id)
    {
        projects[_id].owner = _newOwner;
    }

    function donate(
        uint256 _id,
        uint256 _amount,
        string memory _message
    ) public activeProject(_id) {
        projects[_id].coin.transferFrom(msg.sender, address(this), _amount);
        projects[_id].balance += _amount;

        _mint(msg.sender, _id, 1, "");

        emit Donation(_id, msg.sender, _amount, _message);
    }

    event Donation(
        uint256 indexed id,
        address indexed sender,
        uint256 amount,
        string message
    );
    event NewProject(
        uint256 indexed id,
        string indexed title,
        address indexed owner
    );
}
