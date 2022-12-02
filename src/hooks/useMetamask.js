import React, {createContext, useEffect, useState, useReducer} from 'react';
import {ethers} from 'ethers';

export const MetaMaskContext = createContext ({});

const MetaMaskProvider = props => {
  const [haveMetamask, sethaveMetamask] = useState (true);
  const [accountAddress, setAccountAddress] = useState ('');
  const [accountBalance, setAccountBalance] = useState ('');
  const [isConnected, setIsConnected] = useState (false);
  const {ethereum} = window;

  const provider = new ethers.providers.Web3Provider (window.ethereum);

  useEffect (() => {
    // @ts-ignore
    const {ethereum} = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask (false);
      }
      sethaveMetamask (true);
    };
    checkMetamaskAvailability ();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask (false);
      }
      const accounts = await ethereum.request ({
        method: 'eth_requestAccounts',
      });
      let balance = await provider.getBalance (accounts[0]);
      let bal = ethers.utils.formatEther (balance);
      setAccountAddress (accounts[0]);
      setAccountBalance (bal);
      setIsConnected (true);
    } catch (error) {
      setIsConnected (false);
    }
  };
  return (
    <MetaMaskContext.Provider
      value={{
        haveMetamask,
        accountAddress,
        accountBalance,
        isConnected,
        connectWallet,
      }}
    >
      {props.children}
    </MetaMaskContext.Provider>
  );
};

export default MetaMaskProvider;
