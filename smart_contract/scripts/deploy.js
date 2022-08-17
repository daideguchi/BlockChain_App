const hre = require("hardhat");

const deploy = async () => {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = hre.ethers.utils.parseEther("1");

  const Transactions = await hre.ethers.getContractFactory("Transactions");
  // const transactions = await Lock.deploy(unlockTime, { value: lockedAmount });
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log(
    "Transactions deployed to:", transactions.address
    // `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${Transactions.address}`
  );
}

const runDeploy = async () => {
  try {
    await deploy();
    process.exit(0);
  } catch (err) {
    console.log(err)
    process.exit(1);
  }
};

runDeploy();