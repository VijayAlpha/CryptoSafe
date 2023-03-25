import { utils, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the Crypto Safe Factory contract`);

  // Initialize the wallet.
  const wallet = new Wallet(
    "0x6b204426c792645cde36b9cb39dae4dfd890da97b115aba14aab3c6bba675d70"
  );

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("CryptoSafeFactory");

  // Estimate contract deployment fee
  //const deploymentFee = await deployer.estimateDeployFee(artifact, []);

  // Deposit some funds to L2 in order to be able to perform L2 transactions.
  // const depositAmount = ethers.utils.parseEther("0.001");
  // const depositHandle = await deployer.zkWallet.deposit({
  //   to: deployer.zkWallet.address,
  //   token: utils.ETH_ADDRESS,
  //   amount: deploymentFee.mul(2),
  // });
  // Wait until the deposit is processed on zkSync
  //await depositHandle.wait();

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  // `greeting` is an argument for contract constructor.
  //const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  //console.log(`The deployment is estimated to cost ${parsedFee} ETH`);
  const cryptoSafeFactoryContract = await deployer.deploy(artifact, []);

  // Show the contract info.
  const contractAddress = cryptoSafeFactoryContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}
// 0x845835274d85d210e3377f41A4305945aD8de61F
