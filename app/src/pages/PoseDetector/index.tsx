import React from "react";
import PoseEstimator from "../../components/PoseEstimator/PoseEstimator";
// import { useWeb3 } from "../../services/web3";
import staker from "../../services/dgymContract";
const PoseDetector = () => {
    // const dgym = useWeb3();
    return (
        <PoseEstimator dgym={staker}/>
    )
}

export default PoseDetector;