import { useContext } from "react";
import Animation from "../../components/Animation";
import { MetaMaskContext } from "../../hooks/useMetamask";
import { Button } from "@mui/material";

const Authentication = () => {
    // @ts-ignore
  const {haveMetamask,isConnected,accountAddress,accountBalance,connectWallet} = useContext(MetaMaskContext);
  return (
    <div className="App">
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
              <Animation uri="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"/>
            )}
            {isConnected ? (
              <p className="info">🎉 Connected Successfully</p>
            ) : (
              <Button variant="contained" onClick={connectWallet}>Start Application</Button>
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
