require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-waffle');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
};


// ------------ QUICK NODE CONFIGS ------------

// require("@nomiclabs/hardhat-ethers");
// require("@nomicfoundation/hardhat-toolbox");
// require('@nomiclabs/hardhat-waffle');
// require('dotenv').config();

// module.exports = {
//   defaultNetwork: "matic",
//   networks: {
//     hardhat: {
//     },
//     matic: {
//       url: "https://maximum-wild-gadget.matic-testnet.discover.quiknode.pro/863e129e6ff07f3dbb9d5c6bbc5d003c537de67a/",
//       accounts: [process.env.PRIVATE_KEY]
//     }
//   },
//   solidity: {
//     version: "0.8.17",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200
//       }
//     }
//   },
//   paths: {
//     sources: "./contracts",
//     tests: "./test",
//     cache: "./cache",
//     artifacts: "./artifacts"
//   },
//   mocha: {
//     timeout: 20000
//   }
// }