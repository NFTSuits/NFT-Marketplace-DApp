const { assert } = require('chai');

const NFT = artifacts.require("./nftContract");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract("NFT", ([deployer,buyer,seller]) => {

    let nftContract


    before(async() => {
        nftContract = await NFT.deployed();
        console.log("before called parent");
    
    })


    describe("deployment", async () => {

        it("deploys succesfully", async () => {
            const address = await nftContract.address;
            assert.notEqual(address,"");
            assert.notEqual(address,null);
            assert.notEqual(address,undefined);
            assert.notEqual(address,0x0);

        })

        it("owner is valid", async() =>{
            const address = await nftContract.owner.call();
            assert.equal(address,deployer);
        })
        
    })

    describe("mint", async () => {

        it("owner try mint", async () => {
            const totalSupplyBefore = await nftContract.totalSupply.call();
            const maxSupply = await nftContract.maxSupply.call();
            
            
            if(totalSupplyBefore>=maxSupply){
                 await nftContract.mint(1,"name","link","rarity",{from:buyer}).should.be.rejected;
            }
            else{
                 await nftContract.mint(1,"name","link","rarity",{from:deployer}).should.be.fulfilled;
                const totalSupplyAfter = await nftContract.totalSupply.call();

                assert.equal(totalSupplyBefore.toNumber()+1,totalSupplyAfter);
                const newMinted = await nftContract.nfts.call(totalSupplyAfter.toNumber() - 1);
                assert.equal(newMinted.clothType,1);
                assert.equal(newMinted.name,"name");
                assert.equal(newMinted.cid,"link");
                assert.equal(newMinted.rarity,"rarity");
                assert.equal(newMinted.isOnSale,true);
                assert.equal(newMinted.sellPrice,1);
                assert.equal(newMinted.isBiddable,false);
                assert.equal(newMinted.maxBid,0);
                assert.equal(newMinted.maxBidder,0x0);
                assert.equal(newMinted.isWearing,false);
                const newMintedOwner = await nftContract.ownerOf.call(totalSupplyAfter);
                assert.equal(newMintedOwner, deployer);
            }
        })

        it("not owner cannot mint", async () => {
             await nftContract.mint(0,"name","link","rarity",{from:buyer}).should.be.rejected;
        })

    })
})


// beforeEach(async() => {
//     console.log("before each parent");
//     console.log("count",count);
// })

// afterEach(async() => {
//     console.log("after each parent");
//     console.log("count",count);
// })

// after(async() => {
//     console.log("after parent");
// })