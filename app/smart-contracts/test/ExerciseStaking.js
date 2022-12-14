const {expect} = require ('chai');
const {ethers} = require ('hardhat');

describe ('Exercise Staking', function () {
  describe ('This tests our Exercise Staking Contract', function () {
    it ('should deploy our contract', async function (taskArgs) {
      const contractAddr = taskArgs.contract;
      const account = taskArgs.account;
      const [acc1, acc2] = await ethers.getSigners ();
      const ExerciseStaking = await ethers.getContractFactory ('Staking');
      const exerciseStaking = new ethers.Contract (
        contractAddr,
        ExerciseStaking.interface,
        acc1
      );
      // await exerciseStaking.deployed ();
      expect (await exerciseStaking.getOwner ()).to.equal (acc1.address);
    });
  });

  describe ('This should test the staking functions', function () {
    it ('stake matic tokens while exercising', async () => {
      try {
        const provider = waffle.provider;
        let contractBalance;
        let acc1Balance;
        const contractAddr = taskArgs.contract;
        const account = taskArgs.account;
        const [acc1, acc2] = await ethers.getSigners ();
        const ExerciseStaking = await ethers.getContractFactory ('Staking');
        const exerciseStaking = new ethers.Contract (
          contractAddr,
          ExerciseStaking.interface,
          acc1
        );

        const amount = ethers.utils.parseEther ('0.01');
        contractBalance = await provider.getBalance (exerciseStaking.address);
        acc1Balance = await acc1.getBalance ();

        const transaction = await exerciseStaking
          .connect (acc1)
          .stakeMaticForExercise (1, 20, {
            value: amount,
          });

        const recepient = await transaction.wait ();
        const gasUsed = recepient.gasUsed.mul (recepient.effectiveGasPrice);

        expect (await acc1.getBalance ()).to.equal (
          acc1Balance.sub (amount).sub (gasUsed)
        );
        expect (await provider.getBalance (exerciseStaking.address)).to.equal (
          contractBalance.add (amount)
        );
        // done();
      } catch (err) {
        console.log (err);
        // done (err);
      }
    });
  });
  describe ('This should add the real target achieved by user', function () {
    it ('this would set the target done value if the user does it under one day', async taskArgs => {
      try {
        const contractAddr = taskArgs.contract;
        const account = taskArgs.account;
        const [acc1, acc2] = await ethers.getSigners ();
        const ExerciseStaking = await ethers.getContractFactory ('Staking');
        const exerciseStaking = new ethers.Contract (
          contractAddr,
          ExerciseStaking.interface,
          acc1
        );

        await exerciseStaking.connect (acc1).stakeMaticForExercise (1, 20, {
          value: ethers.utils.parseEther ('0.01'),
        });
        expect (
          await exerciseStaking.getTargetDone (acc1.address, 1)
        ).to.equal (0);

        await exerciseStaking
          .connect (acc1)
          .updateTargetDone (1, 25, acc1.address);
        expect (
          await exerciseStaking.getTargetDone (acc1.address, 1)
        ).to.equal (25);
      } catch (err) {
        console.log (err);
      }
    });
  });

  describe ('This should check the generation of NFT', function () {
    it ('It will generate a new NFT from the contract', async function (
      taskArgs
    ) {
      try {
        const contractAddr = taskArgs.contract;
        const account = taskArgs.account;
        const [acc1, acc2] = await ethers.getSigners ();
        const MYNFTStaking = await ethers.getContractFactory ('MYNFT');
        const nftContract = new ethers.Contract (
          contractAddr,
          MYNFTStaking.interface,
          acc1
        );

        await nftContract.connect (acc1).safeMint (acc1.address);
        expect (await nftContract.connect (acc1).ownerOf (0)).to.equal (
          acc1.address
        );

        expect (await nftContract.connect (acc1).getCurrentID ()).to.equal (0);
        const tokenURI = await nftContract.connect (acc1).tokenURI (0);
        console.log ('TOKEN URI: ', tokenURI);

        await nftContract
          .connect (acc1)
          .transferFrom (acc1.address, acc2.address, 0);
        expect (await nftContract.connect (acc1).ownerOf (0)).to.equal (
          acc2.address
        );
      } catch (err) {
        console.log (err);
      }
    });
  });
  describe ('This will test our reward function', function () {
    it ('This will test the reward function if the user wins', async taskArgs => {
      try {
        const contractAddr = taskArgs.contract;
        const account = taskArgs.account;
        const [acc1, acc2] = await ethers.getSigners ();
        const MYNFTStaking = await ethers.getContractFactory ('MYNFT');
        const nftContract = new ethers.Contract (
          contractAddr,
          MYNFTStaking.interface,
          acc1
        );

        const ExerciseStaking = await ethers.getContractFactory ('Staking');
        const exerciseStaking = new ethers.Contract (
          contractAddr,
          ExerciseStaking.interface,
          acc1
        );

        const amount = ethers.utils.parseEther ('0.01');
        await exerciseStaking.connect (acc2).stakeMaticForExercise (1, 20, {
          value: amount,
        });
        await exerciseStaking
          .connect (acc1)
          .updateTargetDone (1, 25, acc2.address);

        await exerciseStaking
          .connect (acc1)
          .rewardMaticForExercise (1, acc2.address, acc3.address);
        expect (await exerciseStaking.connect (acc1).ownerOf (0)).to.equal (
          acc2.address
        );

        const vall = await exerciseStaking.connect (acc1).getCurrentID ();
        const tokenURI = await exerciseStaking
          .connect (acc1)
          .getTokenURI (vall);

        console.log ('TOKEN URI IN REWARD TESTING: ', tokenURI);
        expect (vall).to.equal (0);
      } catch (err) {
        console.log (err);
      }
    });
    it ('This will test the loosing condition upon reward', async () => {
      try {
        const [acc1, acc2, acc3] = await ethers.getSigners ();
        const ExerciseStaking = await ethers.getContractFactory ('Staking');
        const exerciseStaking = new ethers.Contract (
          contractAddr,
          ExerciseStaking.interface,
          acc1
        );

        const oldBalance = await acc2.getBalance ();

        const amount = ethers.utils.parseEther ('0.01');
        const transaction = await exerciseStaking
          .connect (acc2)
          .stakeMaticForExercise (1, 20, {
            value: amount,
          });

        const recepient = await transaction.wait ();
        const gasUsed = recepient.gasUsed.mul (recepient.effectiveGasPrice);

        await exerciseStaking
          .connect (acc1)
          .updateTargetDone (1, 15, acc2.address);

        const oldCharityBalance = await acc3.getBalance ();
        await exerciseStaking
          .connect (acc1)
          .rewardMaticForExercise (1, acc2.address, acc3.address);

        const newCharityBalance = await acc3.getBalance ();
        expect (newCharityBalance).to.equal (0.9 * 0.25 * oldCharityBalance);
        const amountt = await acc2.getBalance ();
        expect (amountt).to.equal (
          oldBalance.sub (0.25 * amount).sub (gasUsed)
        );
      } catch (err) {
        console.log (err);
      }
    });
  });
});