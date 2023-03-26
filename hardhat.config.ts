import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";

module.exports = {
  zksolc: {
    version: "1.3.5",
    compilerSource: "binary",
    settings: {},
  },
  defaultNetwork: "zkSyncTestnet",

  networks: {
    zkSyncTestnet: {
      url: "https://zksync2-testnet.zksync.dev",
      ethNetwork:
        "https://goerli.infura.io/v3/64a2fd0eb9d9412eab4c1aa039ab0ec8", // Can also be the RPC URL of the network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
      zksync: true,
    },
    zkEVM: {
      url: `https://rpc.public.zkevm-test.net`,
      accounts: [
        "0x30b4c3b47bbfc13745328b90492e66d3a8a19204bf4367cfd327d49b95617904",
      ],
    },
  },
  solidity: {
    version: "0.8.17",
  },
};
