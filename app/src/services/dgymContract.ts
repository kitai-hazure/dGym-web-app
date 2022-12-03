import web3 from "./web3";
import contract from "../artifacts/Staking.json";
    
// @ts-ignore
export default new web3.eth.Contract (contract.abi, '0x4137F10B625160270f9e896a78079fEDd156918A');