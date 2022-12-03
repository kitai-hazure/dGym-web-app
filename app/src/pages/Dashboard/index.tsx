import React, {useContext} from "react";
import { MetaMaskContext } from "../../hooks/useMetamask";
import staker from "../../services/dgymContract";
import web3 from "../../services/web3";
import runNFT from "../../services/revise/level";
const Dashboard = () => {
    console.log("sTAKER: ", staker);
    // @ts-ignore
    const {accountAddress, accountBalance} = useContext(MetaMaskContext);
    // console.log("DGYM: ", dgym);
    interface IProps {
        amount: number;
        totalRepsPromised: number;
        exerciseID: number;
    }

    const stakeAmountForExerciseTemp = async ({amount, totalRepsPromised, exerciseID}: IProps) => {
            const tx = await staker.methods.stakeMaticForExercise(exerciseID, totalRepsPromised).send({from: '0x8eCa03D1735Ae35b6B939C3E9Ca656a8e18FAFF0', value: web3.utils.toWei("0.002", 'ether')});
            console.log("TX: ", tx);
    }

    interface IProps2 {
        exerciseID: number;
        userAddress: string;
        charityAddress: string;
    }

    const getWinningRewardForExerciseTemp = async ({exerciseID, userAddress, charityAddress}: IProps2) => {
        const tx = await staker.methods.rewardMaticForExercise(exerciseID, userAddress, charityAddress).send({
            from: userAddress,
        });
        
        // const image = await runNFT();
        // console.log("IMAGE: ",image);
    //     const member = await revise.fetchNFT('2172115f-9d08-48d3-ab7f-245c304285c9')
    //     revise.nft(player)
    //   .setProperty("level", data.level)
    //   .setProperty("offense", data.offense)
    //   .setProperty("defense", data.defense)
    //   .setProperty("stamina", data.stamina)
    //   .setProperty("skill", data.skill)
    //   .setImage(data.image)
    //   .save()

        console.log("TX FOR WINNING: ", tx);
        const tokenID = await staker.methods.getCurrentID().call();

        const tokenURI = await staker.methods.getTokenURI(tokenID).call();
        console.log("TOKEN URI ", tokenURI);
    }

    const getTokenss = async () => {
        // const tokenID = await staker.methods.getCurrentID().call();
        // console.log("TOKEN ID: ", tokenID);
        const tokenURI = await staker.methods.getTokenURI(0).call();
        console.log("TOKEN URI: ", tokenURI);
    }

    const getCurrentTokens = async () => {
        const tx = await staker.methods.getStakingDetails('0x8eCa03D1735Ae35b6B939C3E9Ca656a8e18FAFF0', 1).call();
        console.log("TX: ", tx);
    }

    const updateTargetDone = async () => {
        const tx = await staker.methods.updateTargetDone(1, 15, '0x8eCa03D1735Ae35b6B939C3E9Ca656a8e18FAFF0').send({
            from: '0x8eCa03D1735Ae35b6B939C3E9Ca656a8e18FAFF0',
        });
        
        console.log("TXX: ", tx);
    }

    const getOwner = async () => {
        const tx = await staker.methods.getOwner().call();
        console.log("TX: ", tx);
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => stakeAmountForExerciseTemp({amount: 10, totalRepsPromised: 10, exerciseID: 1})}>Stake 10 for 10 reps</button>
            <button onClick={() => updateTargetDone()}>UPDATE TARGET DONE</button>
            <button onClick={() => getWinningRewardForExerciseTemp({exerciseID: 1, userAddress: '0x8eCa03D1735Ae35b6B939C3E9Ca656a8e18FAFF0', charityAddress: '0x73b794FcA37Dc5951dcdb2674401C299f9775493'})}>GET YOUR REWARDS</button>
            <button onClick={() => getTokenss()}>GET TOKEN</button>
            <button onClick={() => getCurrentTokens()}>GET STAKING DETS</button>
            <button onClick={() => getOwner()}>GET OWNER</button>
        </div>
    )
}

export default Dashboard;