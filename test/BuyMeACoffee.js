const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function printMemos(memos){
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.sender;
    const message = memo.message;
    console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`);
  }
}

async function main(){
  const [owner, giver, giver2, giver3] = await hre.ethers.getSigners();

  let buyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee")
  buyMeACoffee = await buyMeACoffee.deploy()
  await buyMeACoffee.deployed()
  console.log(`The address of the contract is :- ${buyMeACoffee.address}`)

  const addresses = [owner, giver, giver2, giver3, buyMeACoffee]

  console.log(`The balance of owner is ${await owner.getBalance()}`)
  console.log(`The balance of giver is ${await giver.getBalance()}`)
  console.log(`The balance of giver2 is ${await giver2.getBalance()}`)
  console.log(`The balance of giver3 is ${await giver3.getBalance()}`)

  await buyMeACoffee.connect(giver).buyACoffee("Arman", "Tip 1", {value: hre.ethers.utils.parseEther("1")})
  await buyMeACoffee.connect(giver2).buyACoffee("Aurobindo", "Tip 2", {value: hre.ethers.utils.parseEther("0.5")})
  await buyMeACoffee.connect(giver3).buyACoffee("Rahul", "Tip 3", {value: hre.ethers.utils.parseEther("2")})
  console.log(`The balance of owner is ${await owner.getBalance()}`)
  console.log(`The balance of giver is ${await giver.getBalance()}`)
  console.log(`The balance of giver2 is ${await giver2.getBalance()}`)
  console.log(`The balance of giver3 is ${await giver3.getBalance()}`)
  console.log("Buying process completed !!!")

  await buyMeACoffee.connect(owner).withdrawCoffee()
  console.log(`The balance of owner is ${await owner.getBalance()}`)
  console.log(`The balance of giver is ${await giver.getBalance()}`)
  console.log(`The balance of giver2 is ${await giver2.getBalance()}`)
  console.log(`The balance of giver3 is ${await giver3.getBalance()}`)
  console.log("Withdrawing process completed !!!")

  const memos = await buyMeACoffee.getMemos()
  printMemos(memos)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });