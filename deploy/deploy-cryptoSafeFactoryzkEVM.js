const hre = require("hardhat");

async function main() {
    const CryptoSafeFactory = await hre.ethers.getContractFactory("CryptoSafeFactory")
    const cryptoSafeFactory = await CryptoSafeFactory.deploy();

    await cryptoSafeFactory.deployed();

    console.log(
        `CryptoSafe contract deployed to https://explorer.public.zkevm-test.net/address/${cryptoSafeFactory.address}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

//0xDbdf4B0674b98A94010152F804D663a0D4213529
