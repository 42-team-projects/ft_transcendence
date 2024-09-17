import { expect } from 'chai';
import pkg from 'hardhat';
const { ethers } = pkg;
import { printAllTournaments } from './utils/utils.js'; // Import the utility function

describe("TournamentScores", function () {
  let tournamentScoresContract;
  
  // Deploy the contract before running tests
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    const TournamentScores = await ethers.getContractFactory("TournamentScores");
    tournamentScoresContract = await TournamentScores.deploy();
    await tournamentScoresContract.deployed();
  });


  it("Should store a score correctly", async function () {
    // Store a score
    const tournamentId = 1;
    const winnerId = 100;
    const winnerScore = 50;
    const loserId = 102;
    const loserScore = 30;

    await tournamentScoresContract.storeScore(tournamentId, winnerId, winnerScore, loserId, loserScore);
    await tournamentScoresContract.storeScore(tournamentId, 5, 8, 4, 2);
    await tournamentScoresContract.storeScore(tournamentId, 77, 88, 99, 10);
    await tournamentScoresContract.storeScore(5, 77, 88, 99, 10);
    // Retrieve and print all tournaments
    await printAllTournaments(tournamentScoresContract);

    // Retrieve the stored score
    const scores = await tournamentScoresContract.getScores(tournamentId);

    // Check if the score is stored correctly
    expect(scores.length).to.equal(3);
    expect(scores[0].winnerId.toNumber()).to.equal(winnerId);
    expect(scores[0].winnerIdScore.toNumber()).to.equal(winnerScore);
    expect(scores[0].loserId.toNumber()).to.equal(loserId);
    expect(scores[0].loserIdScore.toNumber()).to.equal(loserScore);
  });

  it("Should store multiple scores for a single tournament", async function () {
    const tournamentId = 2;
    
    await tournamentScoresContract.storeScore(tournamentId, 201, 60, 202, 40);
    await tournamentScoresContract.storeScore(tournamentId, 203, 70, 204, 50);

    const scores = await tournamentScoresContract.getScores(tournamentId);
    
    expect(scores.length).to.equal(2);
    expect(scores[0].winnerId.toNumber()).to.equal(201);
    expect(scores[1].winnerId.toNumber()).to.equal(203);
  });

  it("Should retrieve empty array for tournament with no scores", async function () {
    const tournamentId = 999;
    
    const scores = await tournamentScoresContract.getScores(tournamentId);
    
    expect(scores.length).to.equal(0);
  });
});
