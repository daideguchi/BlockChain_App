require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  defaultNetwork: "goerli",
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/9k1Zxi1y7LhwdyjsqcxdmCD-5H0Msx-l",
      accounts: [
        "3aa1bb3642694bb0cb203c7c931ef6abae583b3d7bb055b28ac2a947ddc07b56",
      ],
    },
  },
};
