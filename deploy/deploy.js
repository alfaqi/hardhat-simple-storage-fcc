const { ethers, run, network } = require("hardhat");

async function main() {
  //Deploying the contract
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorage.deploy();
  await simpleStorage.deployed();
  console.log("SimpleStorage deployed to:", simpleStorage.address);

  // Verification
  if (network.config.chainId === 5) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  // Interacting with contract
  const currentValue = await simpleStorage.retrieve();
  console.log(`Current value is: ${currentValue}`);

  // Update the current value
  const transaction = await simpleStorage.store(7);
  await transaction.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value is: ${updatedValue}`);
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.error("Contract already verified");
    } else {
      console.error(error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
