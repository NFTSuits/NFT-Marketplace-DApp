const NFT = artifacts.require("nftContract");

module.exports = function(deployer) {
  deployer.deploy(NFT);
};
