const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("Lock"); // if you have another contract, replace name here
  const contract = await Contract.deploy(Date.now()); // sample param from default template

  await contract.waitForDeployment();

  console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
