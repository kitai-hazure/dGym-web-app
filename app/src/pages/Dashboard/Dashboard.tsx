import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Animation from "../../components/Animation/Animation";
import { useNavigate } from "react-router-dom";
import { Grid, TextField } from "@material-ui/core";
import Loading from "../../components/Loading/Loading";
import staker from "../../services/dgymContract";
import web3 from "../../services/web3";

interface IProps {
  amount: string;
  totalRepsPromised: number;
  exerciseID: number;
}

const stakeAmountForExerciseTemp = async ({
  amount,
  totalRepsPromised,
  exerciseID,
}: IProps) => {
  console.log("AMOUNT: ", amount);
  console.log("TOTAL REPS: ", totalRepsPromised);
  console.log("EXERCISE ID: ", exerciseID);
  return await staker.methods
    .stakeMaticForExercise(exerciseID, totalRepsPromised)
    .send({
      from: "0xACEe0D180d0118FD4F3027Ab801cc862520570d1",
      value: web3.utils.toWei(amount, "ether"),
    });
};

const cardData: {
  title: string;
  description: string;
  animation: any;
}[] = [
  {
    title: "Squats",
    description:
      "A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up.",
    animation: require("../../assets/animations/squat.json"),
  },
  {
    title: "Pushups",
    description:
      "Pushups is a strength exercise in which the trainee pushes their ",
    animation: require("../../assets/animations/pushup.json"),
  },
  {
    title: "Reverse Crunches",
    description: "Reverse Crunches are bleh bleh bleh",
    animation: require("../../assets/animations/revcrunch.json"),
  },
];

const Card = ({
  title,
  description,
  animation,
  index,
  setIndex,
  toggleModal,
}: {
  title: string;
  description: string;
  animation: string;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  toggleModal: () => void;
}) => {
  const goToTitle = (title: string) => {
    setIndex(index);
    toggleModal();
  };

  return (
    <Paper
      style={{
        padding: 20,
        margin: 20,
        height: 430,
      }}
    >
      <Animation
        src={animation}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Typography variant="h4" component="h4">
        {title}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        style={{
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        {description}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => goToTitle(title)}
      >
        Go to {title}
      </Button>
    </Paper>
  );
};

const Footer = () => {
  const data = ["logo1", "logo2"];
  return (
    <>
      {data.map((logo) => (
        <img src={logo} alt="logos" />
      ))}
    </>
  );
};

interface ModalScreenProps {
  isOpen: boolean;
  index: number;
  handleClose: () => void;
}

const ModalScreen = ({ index, isOpen, handleClose }: ModalScreenProps) => {
  const navigate = useNavigate();
  const [reps, setReps] = useState<number>();
  const [etherToState, setEtherToState] = useState<string>();
  const [isStaking, setIsStaking] = useState<boolean>(false);
  const [wasSuccess, setWasSuccess] = useState<boolean>(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      {/* @ts-ignore */}
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* @ts-ignore */}
        <Box sx={style}>
          <Typography>Lets get started with {cardData[index].title}</Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              id="standard-basic"
              label="Reps"
              variant="standard"
              onChange={(e) => setReps(parseInt(e.target.value))}
              placeholder="Enter number of reps"
              style={{ marginTop: 10 }}
            />
            <TextField
              id="standard-basic"
              label="Ether"
              variant="standard"
              onChange={(e) => setEtherToState(e.target.value)}
              placeholder="Enter amount of ether to stake"
              style={{ marginTop: 10 }}
            />
            {isStaking ? (
              <Loading />
            ) : (
              <>
                {wasSuccess && <Typography>Staking successfull</Typography>}
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 15 }}
                  onClick={async () => {
                    setIsStaking(true);
                    const res = await stakeAmountForExerciseTemp({
                      amount: etherToState,
                      totalRepsPromised: reps,
                      exerciseID: 1,
                    });
                    if (res.blockHash) {
                      setWasSuccess(true);
                    }
                    setIsStaking(false);
                  }}
                >
                  <Typography>Stake</Typography>
                </Button>
              </>
            )}
            <Button
              style={{ marginTop: 10 }}
              onClick={() => {
                navigate("/pose-detection");
              }}
            >
              <Typography>Start excercise</Typography>
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const handleClose = () => setIsOpen(false);
  const toggleModal = () => setIsOpen((cur) => !cur);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Paper style={{ padding: 20, margin: 20 }}>
        <Typography variant="h4" component="h4">
          Welcome to dGym
        </Typography>
      </Paper>
      <Grid
        md={4}
        item
        spacing={4}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {cardData.map((card, index) => (
          <Card
            key={card.title}
            title={card.title}
            description={card.description}
            animation={card.animation}
            index={index}
            setIndex={setIndex}
            toggleModal={toggleModal}
          />
        ))}
      </Grid>
      <Paper style={{ margin: 20, padding: 20 }}>
        <Typography>HEATMAP</Typography>
      </Paper>
      <Paper style={{ margin: 20, padding: 20 }}>
        <Grid sm={8}>
          <Typography>NFTS</Typography>
        </Grid>
      </Paper>
      <ModalScreen {...{ setIsOpen, index, handleClose, isOpen, setIndex }} />
    </div>
  );
};

export default Dashboard;
