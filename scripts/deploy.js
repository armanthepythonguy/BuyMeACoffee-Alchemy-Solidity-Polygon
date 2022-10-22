const hre = require("hardhat");

async function main(){
  let buyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee")
  buyMeACoffee = await buyMeACoffee.deploy()
  await buyMeACoffee.deployed()
  console.log(`The address of the contract is :- ${buyMeACoffee.address}`)


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });