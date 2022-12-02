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
    }
    
    constructor() {
        admin = msg.sender;
    }
   
    // user => exerciseID => StakingDetails
    mapping(address => mapping(uint256 => StakingDetails)) public stakingDetails;
    
    modifier onlyOwnerPersonal() {
        require(admin == msg.sender, "Only owner can change it");
        _;
    }

    function stakeMaticForExercise(uint256 _exerciseID, uint256 _target, uint256 _amount) public payable{
        require(_amount > 0, "Amount should be greater than 0");
        // todo -> think about min
        require(_target > 5, "Target should be greater than 5");
        stakingDetails[msg.sender][_exerciseID] = StakingDetails(msg.value, _target, 0, false);
    }

    function updateTargetDone(uint256 _exerciseID, uint256 _targetDone, address _userAddr) public onlyOwnerPersonal {
        stakingDetails[_userAddr][_exerciseID].targetDone = _targetDone;
    }

    function rewardMaticForExercise(uint256 exerciseID, address userAddr) external returns (uint256){
        // can be executed only once
        // TODO -> create session kind of requirement so that user cannot access the same route.
        require(stakingDetails[userAddr][exerciseID].isCompleted == false, "Already rewarded");

        uint256 amountStaked = stakingDetails[userAddr][exerciseID].amount;
        uint256 target = stakingDetails[userAddr][exerciseID].target;
        uint256 targetDone = stakingDetails[userAddr][exerciseID].targetDone;
        stakingDetails[userAddr][exerciseID].isCompleted = true;

        if(stakingDetails[userAddr][exerciseID].targetDone >= stakingDetails[userAddr][exerciseID].target) {
            uint256 amountPerTarget = amountStaked / target;

            // todo -> create a logic for reward distribution from the rewardPool = 10matic
            // we give an NFT to the user + amount staked
            safeMint(admin);
            uint256 tokenId = getCurrentID();
            transferFrom(admin, userAddr, tokenId);
            payable(userAddr).transfer(amountStaked);
            return tokenId;
        } else {
            uint256 amountToCut = amountStaked/4;
            rewardPool = rewardPool + amountToCut;
            payable(userAddr).transfer(amountStaked-amountToCut);
            return type(uint256).min;
        }
    }

    // function that returns owner 
    function getOwner() public view returns (address) {
        return admin;
    }

    function getStakingDetails(address _userAddr, uint256 _exerciseID) external view returns (uint256) {
        // return (stakingDetails[_userAddr][_exerciseID].amount, stakingDetails[_userAddr][_exerciseID].target, stakingDetails[_userAddr][_exerciseID].targetDone, stakingDetails[_userAddr][_exerciseID].isCompleted);
        return stakingDetails[_userAddr][_exerciseID].targetDone;
    }

    function getTokenURI(uint256 _tokenID) public view returns (string memory) {
        return tokenURI(_tokenID);
    }
}
