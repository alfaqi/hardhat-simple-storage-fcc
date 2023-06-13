const { network, ethers } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  if (chainId == 31337 || chainId == 1337) {
    log("-------------------------------------------");
    // log("Local network detected.");
    log(`Deploying contract at ${networkConfig[chainId].name}...`);
    log("-------------------------------------------");

    const simpleStorage = await deploy("SimpleStorage", {
      from: deployer,
      args: [],
      log: true,
      waitConfirmations: network.config.blockConfirmations || 1,
    });

    log("-------------------------------------------");
    log("Done!");
    log("-------------------------------------------");
  } else {
    log("-------------------------------------------");
    log("Please deploy locally.");
    log("-------------------------------------------");
  }
};
module.exports.tags = ["all", "local"];
