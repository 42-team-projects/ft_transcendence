const hre = require("hardhat");
async function main() {
    // Get the contract factory object from Hardhat's ethers.js
    const TournamentScores = await hre.ethers.getContractFactory("TournamentScores"); // Get the contract factory ==> ABI, bytecode ...  
    // console.log("TournamentScores ==> \n", TournamentScores);

    // Deploys the contract to the blockchain
    // The transaction has been put into the block.
    const tournamentScores = await TournamentScores.deploy(); // I get an instance of the deployed contract, which i can use to interact with it.

    // Wait for the contract to be deployed (transaction to be mined)
    // This transaction block has been added to the blockchain.
    await tournamentScores.deployed();
  
    // Output the contract address to the console
    // console.log("TournamentScores deployed to:", tournamentScores.address);



    // Interact with the deployed contract
    // Store a score
    const tx = await tournamentScores.storeScore(1, 101, 50, 102, 30);
    await tx.wait();
    console.log("Score stored");
    console.log("transaction hash ==> ", tx);

    // Retrieve scores
    const scores = await tournamentScores.getScores(1);
    // console.log("Scores:", scores);
  }
  
  // This pattern allows for proper error handling in async functions
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });