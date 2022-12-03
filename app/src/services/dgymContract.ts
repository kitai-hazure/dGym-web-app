import web3 from "./web3";
import contract from "../artifacts/Staking.json";
    
// @ts-ignore
export default new web3.eth.Contract (contract.abi, '0x0d5dB80f8eAe9EB4514C08b337f8199f507e5B06');