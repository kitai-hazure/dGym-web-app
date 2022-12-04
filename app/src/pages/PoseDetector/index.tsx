import React from "react";
import PoseEstimator from "../../components/PoseEstimator/PoseEstimator";
import staker from "../../services/dgymContract";
const PoseDetector = () => {
  return <PoseEstimator dgym={staker} />;
};

export default PoseDetector;
