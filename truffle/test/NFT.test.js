const { assert } = require('chai');

const NFT = artifacts.require("./nftContract");

require('chai')
    .use(require('chai-as-promised'))
    .should()




contract("NFT", ([deployer, buyer, seller]) => {
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

        it("deployer is valid", async() =>{
            const address = await nftContract.owner.call();
            assert.equal(address,deployer);
        })
        
    })


    describe("mint", async () => {

        it("deployer try mint", async () => {
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

        
        it("not deployer cannot mint", async () => {
            await nftContract.mint(0,"name","link","rarity",{from: buyer,}).should.be.rejected;
       })

        it("deployer cannot mint the same link", async () => {
             await nftContract.mint(0,"name","link","rarity",{from: deployer}).should.be.rejected;
        })


    })

    describe("owner features", async () => {

        let tokenId_1;
        let nftId_1;
        let tokenId_2;
        let nftId_2;

        
        before(async() => {
            await nftContract.mint(1,"for owner features","special owner features 1","rarity",{from:deployer});
          
            const totalSupply_1 = await nftContract.totalSupply.call();
            
            nftId_1 = totalSupply_1.toNumber() - 1;
            tokenId_1 = totalSupply_1.toNumber();

            await nftContract.mint(1,"for owner features", "special owner features 2","rarity",{from:deployer});
          
            const totalSupply_2 = await nftContract.totalSupply.call();
        
            nftId_2 = totalSupply_2.toNumber() - 1;
            tokenId_2 = totalSupply_2.toNumber();
        })

        // initial state owner has tokenId and it is on sale

        /////////////////////////////////////////////////////////
        //           PUT ON SALE // CANCEL SALE STARTS
        /////////////////////////////////////////////////////////

        it("owner cannot putOnSale if it is sale", async () => {
            await nftContract.putOnSale(tokenId_1, 48001, {from: deployer}).should.be.rejected;
            
        });

        it("not owner cannot cancelSale", async () => {
            await nftContract.cancelSale(tokenId_1, {from: buyer}).should.be.rejected;
        });
        
        it("owner can cancelSale", async () => {
            await nftContract.cancelSale(tokenId_1, {from: deployer});

            const nftData = await nftContract.nfts.call(nftId_1);
            assert.equal(nftData.isOnSale, false);
            assert.equal(nftData.sellPrice, 0);
        });


        /////////////////////////////////////////////////////////
        //                   WEAR STARTS

        //                   State: deployer has item1 and item2
        //                    item 1 and item 2 are on sale
        //                     owner does not wear and items are not being weared.
        //                     
        /////////////////////////////////////////////////////////
        it("owner can wear item 1", async () => {
            await nftContract.wearItem(tokenId_1, {from: deployer,});
            const userData = await nftContract.users.call(deployer);
            assert.equal(userData.head, tokenId_1);
            const newClothData = await nftContract.nfts.call(nftId_1);
            assert.equal(newClothData.isWearing, true);
            
        });

        it("owner cannot wear another item 2 if it is on sale", async () => {
            await nftContract.wearItem(tokenId_2, {from: deployer,}).should.be.rejected;
            
        });

        it("owner can wear another item 2 if it is not on sale", async () => {
            await nftContract.cancelSale(tokenId_2, {from: deployer});
            await nftContract.wearItem(tokenId_2, {from: deployer,});
            const userData = await nftContract.users.call(deployer);
            assert.equal(userData.head, tokenId_2);
            const oldClothData = await nftContract.nfts.call(nftId_1);
            assert.equal(oldClothData.isWearing, false);
            const newClothData = await nftContract.nfts.call(nftId_2);
            assert.equal(newClothData.isWearing, true);
        });
        
        it("not owner cannot wear", async () => {
            await nftContract.wearItem(tokenId_1, {from: buyer}).should.be.rejected;
        });

    
        it("owner can unwear", async () => {
            await nftContract.unWearItem(1, {from: deployer});
            const userData = await nftContract.users.call(deployer);
            assert.equal(userData.head, 0);
            const oldClothData = await nftContract.nfts.call(nftId_2);
            assert.equal(oldClothData.isWearing, false);
        });

        it("owner cannot unwear not wear item ", async () => {
            await nftContract.unWearItem(1, {from: deployer}).should.be.rejected;
        });


        it("someone cannot wear not existing token", async () => {
            const totalSupply = await nftContract.totalSupply.call();
            await nftContract.wearItem(totalSupply.toNumber() + 1, {from: deployer}).should.be.rejected;
        });
        

        /////////////////////////////////////////////////////////
        //                   WEAR ENDS
        /////////////////////////////////////////////////////////

        it("owner cannot cancelSale if not on sale", async () => {
            await nftContract.cancelSale(tokenId_1 ,{from: deployer}).should.be.rejected;
        });

        it("not owner cannot putOnSale", async () => {
            await nftContract.putOnSale(tokenId_1, 48001, {from: buyer}).should.be.rejected;
        });

        it("someone cannot sell if item does not exist", async() =>{
            const totalSupply = await nftContract.totalSupply.call();
            await nftContract.putOnSale(totalSupply.toNumber() + 1, 48001, {from: deployer}).should.be.rejected;
        });

        it("owner cannot putOnSale if wearing the item", async () => {
            await nftContract.wearItem(tokenId_1, {from: deployer}).should.be.fulfilled;
            await nftContract.putOnSale(tokenId_1, 48001, {from: deployer}).should.be.rejected;
            await nftContract.unWearItem(1, {from: deployer});
        });

        it("owner can putOnSale while item is not wearing", async () => {
            await nftContract.putOnSale(tokenId_1, 48001, {from: deployer});
            const nftData = await nftContract.nfts.call(nftId_1);
            assert.equal(nftData.isOnSale, true);
            assert.equal(nftData.sellPrice, 48001);
            const approvedAddress = await nftContract.getApproved(tokenId_1);
            assert.equal(approvedAddress, nftContract.address);
        });


        

        //
        //          deploy have item1 and item2 both Items are not work
        //          item1 and item2 are not worn


        /////////////////////////////////////////////////////////
        //           PUT ON SALE // CANCEL SALE ENDS
        /////////////////////////////////////////////////////////
        
        /////////////////////////////////////////////////////////
        //                 BUYS ITEM STARTS
        /////////////////////////////////////////////////////////


        it("owner cannot buy his own item", async() =>{
            await nftContract.buyFromSale(tokenId_1, {from: deployer, value: 48001}).should.be.rejected;
        });

        it("someone cannot buy if item does not exist", async() =>{
            const totalSupply = await nftContract.totalSupply.call();
            await nftContract.buyFromSale(totalSupply.toNumber() + 1, {from: deployer, value: 48001}).should.be.rejected;
        });

        it("buyer cannot buy if item not on sale", async() =>{
            //tokenId_2 is not on sale
            await nftContract.buyFromSale(tokenId_2, {from: buyer, value: 48001}).should.be.rejected;
        });

        it("buyer cannot buy if sending value is less then sellPrice", async() =>{
            await nftContract.buyFromSale(tokenId_1, {from: buyer, value: 310}).should.be.rejected;
        });

        it("buyer can buy owner's item", async() =>{
            await nftContract.buyFromSale(tokenId_1, {from: buyer, value: 48001});
         
            const clothData = await nftContract.nfts.call(nftId_1);
            const newOwnerAddress = await nftContract.ownerOf.call(tokenId_1);
            assert.equal(newOwnerAddress, buyer);
            assert.equal(clothData.isOnSale, false);
            assert.equal(clothData.sellPrice, 0);
            assert.equal(clothData.isBiddable, false);
            assert.equal(clothData.maxBid, 0);
            assert.equal(clothData.maxBidder, 0x0);
        });

        /////////////////////////////////////////////////////////
        //                 BUYS ITEM ENDS
        /////////////////////////////////////////////////////////


        /////////////////////////////////////////////////////////
        //                  WITHDRAW MONEY STARTS
        /////////////////////////////////////////////////////////


        it("owner cannot withdrawMoney if withdraw amount is higher then owner has", async () => {
            await nftContract.withdrawMoney(40600000, {from: deployer}).should.be.rejected;
        });

        it("owner cannot withdrawMoney if owner trys to trick us with negative values", async () => {
            await nftContract.withdrawMoney(-2, {from: deployer}).should.be.rejected;
        });

        it("owner can withdrawMoney", async () => {
            const startingUserData = await nftContract.users.call(deployer); 
            await nftContract.withdrawMoney(48001, {from: deployer});
            const endingUserData = await nftContract.users.call(deployer); 
            assert.equal(startingUserData.userBalance.toNumber() - 48001, endingUserData.userBalance.toNumber());
        });
   
        /////////////////////////////////////////////////////////
        //                  WITHDRAW MONEY ENDS
        /////////////////////////////////////////////////////////
        

        // state buyer has item1  deployer has item2
        // no one wears anything
    


        /////////////////////////////////////////////////////////
        //                  AUCTION STARTS
        /////////////////////////////////////////////////////////


        it("owner cannot cancelAuction if not biddable", async () => {
            await nftContract.cancelAuction(tokenId_2, {from: deployer}).should.be.rejected;
        })

        it("someone cannot cancelAuction if item not exists", async () => {
            const totalSupply = await nftContract.totalSupply.call();
            await nftContract.cancelAuction(totalSupply.toNumber() + 1, {from: deployer}).should.be.rejected;
        })

        it("owner cannot putOnAuction if wearing", async () => {
            //console.log("aaa");
            //const nftData = await nftContract.nfts.call(tokenId_2);
            //console.log("nftData", nftData.isBiddable);
            await nftContract.wearItem(tokenId_2, {from: deployer});
            await nftContract.putOnAuction(tokenId_2, {from: deployer}).should.be.rejected;
            await nftContract.unWearItem(1, {from: deployer});
        })

        it("someone cannot putOnAuction random one", async () => {
            const totalSupply = await nftContract.totalSupply.call();
            await nftContract.putOnAuction(totalSupply.toNumber() + 1, {from: deployer}).should.be.rejected;
        })

        it("not owner cannot putOnAuction", async () => {
            await nftContract.putOnAuction(tokenId_2, {from: buyer}).should.be.rejected;
        })

        it("buyer cannot bid if item is not biddable", async () => {
            await nftContract.bid(tokenId_2, {from: buyer, value: 48001}).should.be.rejected;

        })

        it("owner cannot accept bid if item is not biddable", async () => {
            await nftContract.acceptHighestBid(tokenId_2, {from: deployer}).should.be.rejected;
        })

        it("owner can putOnAuction", async () => {
            await nftContract.putOnAuction(tokenId_2, {from: deployer});
            assert.equal(1,2);
            //write all other asserts
        })

        it("buyer cannot bid on a biddable item with cash equals 0 at beggining or any time", async () => {
            await nftContract.bid(tokenId_2, {from: buyer, value: 0}).should.be.rejected;
        })
        
        it("owner cannot putOnAuction if already on auction", async () => {
            await nftContract.putOnAuction(tokenId_2, {from: deployer}).should.be.rejected;
        })

        it("not owner cannot cancelAuction", async () => {
            await nftContract.cancelAuction(tokenId_2, {from: buyer}).should.be.rejected;
        })

        it("owner can cancelAuction if biddable", async () => {
            await nftContract.cancelAuction(tokenId_2, {from: deployer});
            assert.equal(1,2);
            //write all other asserts
        })

        //burda bidibblea çevrilmeli AGAIN
        it("owner can putOnAuction again", async () => {
            await nftContract.putOnAuction(tokenId_2, {from: deployer});
            assert.equal(1,2);
            //copy paste written cases before for the same case above somewhere
        })

        it("someone cannot bid item not exist ", async () => {
            const totalSupply = await nftContract.totalSupply.call();
            await nftContract.bid(totalSupply.toNumber() + 1, {from: deployer, value: 48001}).should.be.rejected;
        })

        it("owner cannot bid", async () => {
            await nftContract.bid(tokenId_2, {from: deployer, value: 48001}).should.be.rejected;
        })

        it("owner cannot accept bid if maxBid == 0", async () => {
            await nftContract.acceptHighestBid(tokenId_2, {from: deployer}).should.be.rejected;
        })

        it("buyer can bid on a biddable item with cash biggrer than 0 at beggining", async () => {
            await nftContract.bid(tokenId_2, {from: buyer, value: 406});
            assert.equal(1,2);
            //write all other asserts
        })

        it("another buyer cannot bid if bid amount is smaller then max bid", async () => {
            await nftContract.bid(tokenId_2, {from: seller, value: 306}).should.be.rejected;
        })

        it("another buyer (or same buyer) can bid on a biddable item with enough cash (max bid)", async () => {
            await nftContract.bid(tokenId_2, {from: seller, value: 48001});
            assert.equal(1,2);
            //write all other asserts
            
        })

        it("not maxBidder cannot withdrawBid", async () => {
            //current maxBidder is seller so trying withdraw with buyer
            await nftContract.withdrawBid(tokenId_2, {from: buyer,}).should.be.rejected;
        })

        it("maxBidder can withdrawBid", async () => {
            await nftContract.withdrawBid(tokenId_2, {from: seller});
            assert.equal(1,2);
            //write all other asserts
        })

        //burda bi daha bid AGAIN
        it("buyer can bid on a biddable item with cash biggrer than 0 at beggining", async () => {
            await nftContract.bid(tokenId_2, {from: buyer, value: 204});
            assert.equal(1,2);
            //copy paste written cases before for the same case above somewhere
        })

        it("not owner cannot accept bid", async () => {
            await nftContract.acceptHighestBid(tokenId_2, {from: buyer}).should.be.rejected;
        })

        it("someone cannot accept bid of not existing item", async () => {
            const totalSupply = await nftContract.totalSupply.call();
            await nftContract.acceptHighestBid(totalSupply.toNumber() + 1, {from: deployer}).should.be.rejected;
        })

        it("owner can accept bid maxbid > 0 item is biddable", async () => {
            await nftContract.acceptHighestBid(tokenId_2, {from: deployer});
            assert.equal(1,2);
            //write all other asserts
        })
        
        it("owner can withdrawMoney", async () => {
            const startingUserData = await nftContract.users.call(deployer); 
            await nftContract.withdrawMoney(204, {from: deployer});
            const endingUserData = await nftContract.users.call(deployer); 
            assert.equal(startingUserData.userBalance.toNumber() - 204, endingUserData.userBalance.toNumber());
        })

        /////////////////////////////////////////////////////////
        //                     AUCTION ENDS
        /////////////////////////////////////////////////////////
    })
})