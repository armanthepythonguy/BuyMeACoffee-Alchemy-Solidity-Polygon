require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

POLYGONTESTURL = process.env.POLYGONTESTURL
POLYGONTESTACC = process.env.POLYGONTESTACC

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    polygontest:{
      url: POLYGONTESTURL,
      accounts: [POLYGONTESTACC]
    }
  }
};
