// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "./MyNFT.sol";

contract Staking is MYNFT {
    address public admin;
    uint256 public rewardPool;

    struct StakingDetails {
        uint amount;
        uint target;
        uint targetDone;
        bool isCompleted;
        uint stakeDay;
    }
    
    constructor() {
        admin = msg.sender;
    }

    // user => exerciseID => StakingDetails
    mapping(address => mapping(uint256 => StakingDetails[])) public stakingDetails;
    
    modifier onlyOwnerPersonal() {
        require(admin == msg.sender, "Only owner can change it");
        _;
    }


    function stakeMaticForExercise(uint256 _exerciseID, uint256 _target) public payable{
        require(msg.value > 0, "Amount should be greater than 0");
        require(_target > 5, "Target should be greater than 5");

        if(stakingDetails[msg.sender][_exerciseID].length > 0){
            require(stakingDetails[msg.sender][_exerciseID][stakingDetails[msg.sender][_exerciseID].length - 1].isCompleted == true, "Previous staking is not completed");
        }
        
        stakingDetails[msg.sender][_exerciseID].push(StakingDetails(msg.value, _target, 0, false, block.timestamp));
    }

    function updateTargetDone(uint256 _exerciseID, uint256 _targetDone, address _userAddr) public onlyOwnerPersonal {
        if(stakingDetails[_userAddr][_exerciseID].length > 0){
            require(block.timestamp - stakingDetails[_userAddr][_exerciseID][stakingDetails[_userAddr][_exerciseID].length - 1].stakeDay < 1 days, "You cant update after 1 day");
        }
        stakingDetails[_userAddr][_exerciseID][stakingDetails[_userAddr][_exerciseID].length-1].targetDone += _targetDone;
    }

    function rewardMaticForExercise(uint256 exerciseID, address userAddr) external returns (uint256){
        // can be executed only once
        // TODO -> create session kind of requirement so that user cannot access the same route.
        if(stakingDetails[userAddr][exerciseID].length > 0){
            require(stakingDetails[userAddr][exerciseID][stakingDetails[userAddr][exerciseID].length - 1].isCompleted == false, "Already rewarded");
        }

        StakingDetails memory st = stakingDetails[userAddr][exerciseID][stakingDetails[userAddr][exerciseID].length - 1];


        uint256 amountStaked = st.amount;
        uint256 target = st.target;
        uint256 targetDone = st.targetDone;
        st.isCompleted = true;

        if(st.targetDone >= st.target) {
            uint256 amountPerTarget = amountStaked / target;

            safeMint(admin);
            uint256 tokenId = getCurrentID();
            transferFrom(admin, userAddr, tokenId);
            payable(userAddr).transfer(amountStaked);
           
            // return tokenId;
        } else {
            // todo -> SAFE USE
            uint256 amountToCut = amountStaked/4;
            rewardPool = rewardPool + amountToCut;
            payable(userAddr).transfer(amountStaked-amountToCut);
            // return type(uint256).min;
        }
    }

    // function that returns owner 
    function getOwner() public view returns (address) {
        return admin;
    }

    function getStakingDetails(address _userAddr, uint256 _exerciseID) external view returns (uint256,uint256,uint256,bool,uint256) {
        require(stakingDetails[_userAddr][_exerciseID].length > 0, "No staking details found");
        StakingDetails memory st = stakingDetails[_userAddr][_exerciseID][stakingDetails[_userAddr][_exerciseID].length - 1];
        return (st.amount, st.target, st.targetDone, st.isCompleted, st.stakeDay);
    }

    function getTokenURI(uint256 _tokenID) public view returns (string memory) {
        return tokenURI(_tokenID);
    }

    function getTargetDone(address _userAddr, uint256 _exerciseID) external view returns (uint256) {
        require(stakingDetails[_userAddr][_exerciseID].length > 0, "No staking details found");
        StakingDetails memory st = stakingDetails[_userAddr][_exerciseID][stakingDetails[_userAddr][_exerciseID].length - 1];
        return st.targetDone;
    }
}
