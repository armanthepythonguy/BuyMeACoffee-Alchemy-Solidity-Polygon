const hre = require("hardhat");
require("dotenv").config()
const abi = require("../artifacts/contracts/BuyMeACofee.sol/BuyMeACoffee.json")

async function getBalance(provider, address) {
    const balanceBigInt = await provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt);
}

async function main(){
    const contractAddress = "0xa11F8075bc205412A3Cf27C050f6e17Ed5892CE4"
    const contractABI = abi.abi

    const provider = new hre.ethers.providers.AlchemyProvider("maticmum",process.env.POLYGONTESTKEY)
    const signer = new hre.ethers.Wallet(process.env.POLYGONTESTACC, provider)
    const buyMeACoffee = new hre.ethers.Contract(contractAddress, contractABI, signer);

    console.log("current balance of owner: ", await getBalance(provider, signer.address), "ETH");
    const contractBalance = await getBalance(provider, buyMeACoffee.address);
    console.log("current balance of contract: ", await getBalance(provider, buyMeACoffee.address), "ETH");
    if (contractBalance !== "0.0") {
        console.log("withdrawing funds..")
        const withdrawTxn = await buyMeACoffee.withdrawCoffee();
        await withdrawTxn.wait();
    } else {
        console.log("no funds to withdraw!");
    }
    console.log("current balance of owner: ", await getBalance(provider, signer.address), "ETH");

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });