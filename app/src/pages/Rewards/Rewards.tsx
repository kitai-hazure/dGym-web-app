import { Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Animation from "../../components/Animation/Animation";
import staker from "../../services/dgymContract";
import web3 from "../../services/web3";

const Rewards = () => {
  const [uri, setUri] = useState("");

  useEffect(() => {
    const updateTargetDone = async () => {
      const tx = await staker.methods
        .updateTargetDone(1, 12, "0xACEe0D180d0118FD4F3027Ab801cc862520570d1")
        .send({
          from: "0xACEe0D180d0118FD4F3027Ab801cc862520570d1",
        });

      console.log("TXX: ", tx);
    };

    const getWinningRewardForExerciseTemp = async () => {
      const tx = await staker.methods
        .rewardMaticForExercise(
          1,
          "0xACEe0D180d0118FD4F3027Ab801cc862520570d1",
          "0x483a798c7D59eb29B1c8F59888ADcb8631F2f0C1"
        )
        .send({
          from: "0xACEe0D180d0118FD4F3027Ab801cc862520570d1",
        });

      console.log("TX FOR WINNING: ", tx);
      const tokenID = await staker.methods.getCurrentID().call();

      const tokenURI = await staker.methods.getTokenURI(tokenID).call();
      console.log("TOKEN URI ", tokenURI);
      setUri(tokenURI);
    };

    const finalCall = async () => {
      try {
        await updateTargetDone();
        const tt = await getWinningRewardForExerciseTemp();
      } catch (err) {
        console.log("ERROR: ", err);
      }
    };

    finalCall();
  }, []);

  return (
    <Paper
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div>
        <Typography
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Update your progress
        </Typography>
      </div>
      <div>
        <Typography
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Get your rewards
        </Typography>
      </div>
      <div>
        {uri === "" ? (
          <Animation src={require("../../assets/animations/loading.json")} />
        ) : (
          <p>{uri}</p>
        )}
      </div>
    </Paper>
  );
};

export default Rewards;
