/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers"); // Add this line to require the Ethers plugin

// import "@nomiclabs/hardhat-ethers";

module.exports = {
  solidity: "0.8.24",
  // networks: {
  //   sepolia: {
  //     url: process.env.SEPOLIA_URL, // RPC URL from Infura, Alchemy, etc.
  //     accounts: [`0x${process.env.PRIVATE_KEY}`] // Your wallet private key
  //   }
  // }
};
