// async function main () {
//   const [acc1, acc2] = await ethers.getSigners ();

//   const ExerciseStaking = await ethers.getContractFactory ('Staking');
//   const exerciseStaking = new ethers.Contract (
//     contractAddr,
//     ExerciseStaking.interface,
//     acc1
//   );

//   console.log (
//     `DEPLOYED OUR EXERCISE CONTRACT ON QUICK NODE ON ADDRESS ${exerciseStaking.address} USING OWNER AS ${acc1.address}`
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main ().catch (error => {
//   console.error (error);
//   process.exitCode = 1;
// });

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Staking = await ethers.getContractFactory("Staking");
  const staking = await Staking.deploy();

  // const Pushh = await ethers.getContractFactory("Push");
  // const pushh = await Pushh.deploy();

  // console.log("PUSH Address: ", pushh.address);
  console.log("Staking address:", staking.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });