async function main() {
  const [acc1, acc2] = await ethers.getSigners ();

  const ExerciseStaking = await ethers.getContractFactory ('Staking', acc1);
  const exerciseStaking = await ExerciseStaking.deploy ();
  await exerciseStaking.deployed ();
  
  console.log(
    `DEPLOYED OUR EXERCISE CONTRACT ON QUICK NODE ON ADDRESS ${exerciseStaking.address} USING OWNER AS ${acc1.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
