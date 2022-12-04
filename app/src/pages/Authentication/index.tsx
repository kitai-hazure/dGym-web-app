import { Button, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Animation from "../../components/Animation/Animation";
import { MetaMaskContext } from "../../hooks/useMetamask";

const Authentication = () => {
  // @ts-ignore
  const {haveMetamask,isConnected,accountAddress,accountBalance,connectWallet,
  } = useContext(MetaMaskContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate("/dashboard");
    }
  }, [isConnected, navigate]);

  return (
    <div className="App">
      <h1 style={{
        color: "white",
        fontSize: "40px",
        fontWeight: "bold",
        fontStyle: "italic",
        position: "absolute",
        top: "10%",
        left: "38%",
      }}>Welcome to DGym</h1>
      <header className="App-header">
        {haveMetamask ? (
          <div className="App-header">
            {isConnected ? (
              <div className="card">
                <div className="card-row">
                  <h3>Wallet Address:</h3>
                  <p>
                    {accountAddress.slice(0, 4)}...
                    {accountAddress.slice(38, 42)}
                  </p>
                </div>
                <div className="card-row">
                  <h3>Wallet Balance:</h3>
                  <p>{accountBalance}</p>
                </div>
              </div>
            ) : (
              <Animation src={require("../../assets/animations/pushup.json")} />
            )}
            {isConnected ? (
              <Animation src={require("../../assets/animations/pushup.json")} />
            ) : (
              <Button
                onClick={connectWallet}
                variant="contained"
                color="inherit"
                style={{ marginTop: 25 }}
              >
                <Typography
                  style={{
                    color: "black",
                  }}
                >
                  Connect Wallet
                </Typography>
              </Button>
            )}
          </div>
        ) : (
          <p>Please Install MataMask</p>
        )}
      </header>
    </div>
  );
};

export default Authentication;
