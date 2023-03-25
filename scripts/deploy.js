const hre = require("hardhat");

async function main() {
  const CryptoSafeFactory = await hre.ethers.getContractFactory("CryptoSafeFactory");
  const cryptoSafeFactory = await CryptoSafeFactory.deploy();

  await cryptoSafeFactory.deployed();

  console.log(`CryptoSafeFactory contract deployed to ${cryptoSafeFactory.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
