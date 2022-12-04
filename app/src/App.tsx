import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Authentication from "./pages/Authentication/index";
import "./App.css";
import PoseDetector from "./pages/PoseDetector";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Button, Typography } from "@material-ui/core";
import Rewards from "./pages/Rewards/Rewards";

const PoseButtons = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        color="inherit"
        style={{ marginRight: 10 }}
        onClick={() => navigate("/dashboard")}
      >
        <Typography>Done</Typography>
      </Button>
      <Button
        variant="contained"
        color="inherit"
        style={{
          marginLeft: 10,
        }}
        onClick={() => navigate("/rewards")}
      >
        <Typography>Fetch Reward</Typography>
      </Button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route
          path="/pose-detection"
          element={
            <>
              <PoseDetector />
              <PoseButtons />
            </>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
    </Router>
  );
}

export default App;
