// // // require("@nomicfoundation/hardhat-toolbox");

// // // /** @type import('hardhat/config').HardhatUserConfig */
// // // module.exports = {
//   // //   solidity: "0.8.17",
//   // // };

//   require("@nomicfoundation/hardhat-toolbox");
//   require('hardhat-deploy');
//   require('hardhat-deploy-ethers');
//   require('@nomiclabs/hardhat-waffle');
//   require("@nomiclabs/hardhat-ethers");
//   require("dotenv").config()

// // const PRIVATE_KEY = process.env.PRIVATE_KEY
// // /** @type import('hardhat/config').HardhatUserConfig */
// // module.exports = {
// //   solidity: "0.8.17",
// //   defaultNetwork: "wallaby",
// //   networks: {
// //     wallaby: {
// //       url: "https://wallaby.node.glif.io/rpc/v0",
// //       accounts: [PRIVATE_KEY],
// //     }
// //   },
// //   paths: {
// //     sources: "./contracts",
// //     tests: "./test",
// //     cache: "./cache",
// //     artifacts: "./artifacts"
// //   },
// // };

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
//     version: "0.7.0",
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
require ('@nomicfoundation/hardhat-toolbox');
require ('dotenv').config ();

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;

module.exports = {
  solidity: '0.8.9',
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
};
