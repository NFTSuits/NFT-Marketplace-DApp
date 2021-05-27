pragma solidity 0.5.0;

//import "https://github.com/OpenZeppelin/openzeppelin-contracts/tree/docs-org/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract nftContract is ERC721Full {
    struct nftData {
        uint256 clothType; //--> 1 --> head, 2 --> middle, 3 --> bottom
        string name;
        string cid;
        string rarity;
        bool isOnSale;
        uint256 sellPrice;
        bool isBiddable;
        uint256 maxBid;
        address maxBidder;
        bool isWearing;
    }

    struct userData {
        //uint is reference to tokenId from openzeppelin-contracts
        uint256 head; //also the photo if do you have a head assigned
        //uint is reference to tokenId from openzeppelin-contracts
        uint256 middle;
        //uint is reference to tokenId from openzeppelin-contracts
        uint256 bottom;
        string username;
        uint256 userBalance;
        //string photo; --> will be decided later
    }

    event nftTransaction(
        uint256 indexed id,
        string transactionType,
        address fromAddress,
        address toAddress,
        uint256 value
        //address txn
    );
    mapping(address => userData) public users;
    mapping(string => bool) isExist;
    nftData[] public nfts;

    //mapping(uint => nftData) public nfts; //uint is reference to tokenId from openzeppelin-contracts
    address  public owner;
    uint public maxSupply;
    constructor() public ERC721Full("nftContract", "NFTC") {
        owner = msg.sender;
        maxSupply=100;
    }

    function setUsername(string memory _username) public {
        users[msg.sender].username = _username;
    }

    function wearItems(
        uint256 _headTokenId,
        uint256 _middleTokenId,
        uint256 _bottomTokenId
    ) public {
        require(
            _headTokenId == 0 ||
                (this.ownerOf(_headTokenId) == msg.sender &&
                    nfts[_headTokenId - 1].clothType == 1)
        ,"you must be the owner or you tried not head item on head");
        require(
            _middleTokenId == 0 ||
                (this.ownerOf(_middleTokenId) == msg.sender &&
                    nfts[_middleTokenId - 1].clothType == 2)
        ,"you must be the owner or you tried not middle item on middle");
        require(
            _bottomTokenId == 0 ||
                (this.ownerOf(_bottomTokenId) == msg.sender &&
                    nfts[_bottomTokenId - 1].clothType == 3)
        ,"you must be the owner or you tried not bottom item on bottom");
        
        require(_headTokenId == 0 || nfts[_headTokenId - 1].isOnSale == false, "head on sale, you cannot wear it!");
        require(_headTokenId == 0 || nfts[_headTokenId - 1].isBiddable == false,"head on bid, you cannot wear it!");

        require(_middleTokenId == 0 || nfts[_middleTokenId - 1].isOnSale == false,"middle on sale, you cannot wear it!");
        require(_middleTokenId == 0 || nfts[_middleTokenId - 1].isBiddable == false,"middle on bid, you cannot wear it!");

        require(_bottomTokenId == 0 || nfts[_bottomTokenId - 1].isOnSale == false,"bottom on sale, you cannot wear it!");
        require(_bottomTokenId == 0 || nfts[_bottomTokenId - 1].isBiddable == false,"middle on bid, you cannot wear it!");

        // giyili ürünleri çıkar
        
        if (users[msg.sender].head != 0) {
            nfts[users[msg.sender].head - 1].isWearing = false;
        }
        if (users[msg.sender].middle != 0) {
            nfts[users[msg.sender].middle - 1].isWearing = false;
        }
        if (users[msg.sender].bottom != 0) {
            nfts[users[msg.sender].bottom - 1].isWearing = false;
        }

        // inputdaki ürünleri giy 
        if (_headTokenId != 0) {
            nfts[_headTokenId - 1].isWearing = true;
        }
        if (_middleTokenId != 0) {
            nfts[_middleTokenId - 1].isWearing = true;
        }
        if (_bottomTokenId != 0) {
            nfts[_bottomTokenId - 1].isWearing = true;
        }

        users[msg.sender].head = _headTokenId;
        users[msg.sender].middle = _middleTokenId;
        users[msg.sender].bottom = _bottomTokenId;
    

        // if (_headTokenId != 0 && users[msg.sender].head != 0) { // wear when already wearing for head
        //     nfts[users[msg.sender].head - 1].isWearing = false; 
        //     nfts[_headTokenId - 1].isWearing = true;
        // } else if (_headTokenId != 0) { // wear when not wearing for head
        //     nfts[_headTokenId - 1].isWearing = true;
        // } else if (_headTokenId == 0 && users[msg.sender].head != 0){
        //     nfts[users[msg.sender].head - 1].isWearing = false;
        // }
        // if (_middleTokenId != 0) {
        //     nfts[_middleTokenId - 1].isWearing = true;
        // } else if (users[msg.sender].middle != 0) {
        //     nfts[users[msg.sender].middle - 1].isWearing = false;
        // }
        // if (_bottomTokenId != 0) {
        //     nfts[_bottomTokenId - 1].isWearing = true;
        // } else if (users[msg.sender].bottom != 0) {
        //     nfts[users[msg.sender].bottom - 1].isWearing = false;
        // }

        // users[msg.sender].head = _headTokenId;
        // users[msg.sender].middle = _middleTokenId;
        // users[msg.sender].bottom = _bottomTokenId;
    }

    function wearItem(uint256 _tokenId) public {
        require(this.ownerOf(_tokenId) == msg.sender, "You are not the owner of this item, so you cannot wear it.");
        require(nfts[_tokenId - 1].isOnSale == false, "You cannot wear an item while it is on sale.");
        require(nfts[_tokenId - 1].isBiddable == false, "You cannot wear an item while it is on auction.");
       

        if (nfts[_tokenId - 1].clothType == 1) {
            if (users[msg.sender].head != 0)
            {
                nfts[users[msg.sender].head - 1].isWearing = false;
            }
            users[msg.sender].head = _tokenId;
        } else if (nfts[_tokenId - 1].clothType == 2) {
            if (users[msg.sender].middle != 0)
            {
                nfts[users[msg.sender].middle - 1].isWearing = false;
            }
            users[msg.sender].middle = _tokenId;
        } else if (nfts[_tokenId - 1].clothType == 3) {
            if (users[msg.sender].bottom != 0)
            {
                nfts[users[msg.sender].bottom - 1].isWearing = false;
            }
            users[msg.sender].bottom = _tokenId;
        }
         nfts[_tokenId - 1].isWearing = true;
    }

    function unWearItem(uint256 _clothType) public {
        require(_clothType == 1 || _clothType == 2 || _clothType == 3, "Invalid cloth type.");

        if (_clothType == 1) {
            require(users[msg.sender].head !=0, "You must wear a head item first to unwear.");
            nfts[users[msg.sender].head - 1].isWearing = false;
            users[msg.sender].head = 0;
        } else if (_clothType == 2) {
            require(users[msg.sender].middle !=0, "You must wear a middle item first to unwear.");

            nfts[users[msg.sender].middle - 1].isWearing = false;
            users[msg.sender].middle = 0;
        } else if (_clothType == 3) {
            require(users[msg.sender].bottom !=0, "You must wear a bottom item first to unwear.");
            nfts[users[msg.sender].bottom - 1].isWearing = false;
            users[msg.sender].bottom = 0;
        }
    }

    function tokensOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        return _tokensOfOwner(_owner);
    }

    function putOnSale(uint256 _tokenId, uint256 _sellPrice) public {
        //msg.sender owner olmalı
        require(msg.sender == this.ownerOf(_tokenId), "You cannot put this item on sale, because you are not the owner of it.");
        //is on sale false olmalı
        require(nfts[_tokenId - 1].isOnSale == false, "Item is already on sale!");
        //item should not be on wear
        require(nfts[_tokenId - 1].isWearing == false, "You must unwear it first, then you can sell it." );
        
        nfts[_tokenId - 1].isOnSale = true; //tokenId or tokenId-1 ??????
        nfts[_tokenId - 1].sellPrice = _sellPrice; //tokenId or tokenId-1 ??????
        approve(address(this), _tokenId);

        emit nftTransaction(
            _tokenId,
            "On Sale",
            msg.sender,
            address(0x0),
            _sellPrice
        ); //tokenId or tokenId-1 ??????
    }

    function cancelSale(uint256 _tokenId) public {
        //is on sale true olması lazım
        require(nfts[_tokenId - 1].isOnSale == true, "Item should be on sale first, to be cancelled.");
        //msg.sender owner olmalı
        require(msg.sender == this.ownerOf(_tokenId), "You cannot cancel the sale of this item, because you are not the owner.");
        
        nfts[_tokenId - 1].isOnSale = false; //tokenId or tokenId-1 ??????
        nfts[_tokenId - 1].sellPrice = 0; //tokenId or tokenId-1 ??????

        emit nftTransaction(
            _tokenId,
            "Sale Cancelled",
            msg.sender,
            address(0x0),
            0
        ); //tokenId or tokenId-1 ??????
    }

    function buyFromSale(uint256 _tokenId) public payable {
        //msg.sender owner olmalalı
        require(msg.sender != this.ownerOf(_tokenId), "You cannot buy your own item!");
        //is on sale true olmalı
        require(nfts[_tokenId - 1].isOnSale == true, "Item should be on sale for you to buy it.");
        //paranın en az sellPrice kadar olmalı
        require (nfts[_tokenId - 1].sellPrice <= msg.value, "The amount you tried to buy, is less than price.");
        //approve var mı diye check et --> getApproved(uint256 tokenId) → address operator
        require(this.getApproved(_tokenId) == address(this), "Seller did not give the allowance for us to sell this item, contact with seller.");
        address sellerAddress = this.ownerOf(_tokenId); //tokenId or tokenId-1 ??????
        this.safeTransferFrom(sellerAddress, msg.sender, _tokenId); //transfer with ERC721 //change owner
        nfts[_tokenId - 1].isOnSale = false; //tokenId or tokenId-1 ??????
        nfts[_tokenId - 1].sellPrice = 0; //tokenId or tokenId-1 ??????
        users[sellerAddress].userBalance = add256(users[sellerAddress].userBalance, msg.value); //overflow attack assert ile check et prev balance + sellPrice = new balance

        //satıldı we bid açıksa bunlar yapılmalı
        if (nfts[_tokenId - 1].maxBid > 0) {
            users[nfts[_tokenId - 1].maxBidder].userBalance = add256(users[nfts[_tokenId - 1].maxBidder].userBalance ,  nfts[_tokenId - 1].maxBid); //check overflow attack
        }
        nfts[_tokenId - 1].maxBid = 0;
        nfts[_tokenId - 1].maxBidder = address(0x0);
        nfts[_tokenId - 1].isBiddable = false; //tokenId or tokenId-1 ??????

        emit nftTransaction(
            _tokenId,
            "sold",
            sellerAddress,
            msg.sender,
            msg.value
        ); //tokenId or tokenId-1 ??????
    }

    function putOnAuction(uint256 _tokenId) public {

        //msg.sender owner olmalı
        require(msg.sender == this.ownerOf(_tokenId), "Only owner of this item can put on sale" );
        //item should not be on wear
        require(nfts[_tokenId - 1].isWearing == false,  "You must unwear it first, then you can put it on auction.");
        //is bidding false olmalı
        require(nfts[_tokenId - 1].isBiddable == false, "This item is already on auction!");
        
        nfts[_tokenId - 1].isBiddable = true; //tokenId or tokenId-1 ??????
        nfts[_tokenId - 1].maxBid = 0; //tokenId or tokenId-1 ??????
        approve(address(this), _tokenId);

        emit nftTransaction(
            _tokenId,
            "Auction Starts",
            msg.sender,
            address(0x0),
            0
        ); //tokenId or tokenId-1 ??????
    }

    function cancelAuction(uint256 _tokenId) public {
        //msg.sender owner olmalı
        require(msg.sender == this.ownerOf(_tokenId), "You cannot cancel the auction of this item, because you are not the owner.");
        //is bidding true olmalı
        require(nfts[_tokenId - 1].isBiddable == true, "Item must be on auction before it can be canceled, currently it is not!");
        
        
        if (nfts[_tokenId - 1].maxBid > 0) {
            users[nfts[_tokenId - 1].maxBidder].userBalance = add256(users[nfts[_tokenId - 1].maxBidder].userBalance, nfts[_tokenId - 1].maxBid); //check overflow attack
        }
        nfts[_tokenId - 1].isBiddable = false; //tokenId or tokenId-1 ??????
        nfts[_tokenId - 1].maxBid = 0; //tokenId or tokenId-1 ??????
        nfts[_tokenId - 1].maxBidder = address(0x0); //tokenId or tokenId-1 ??????

        emit nftTransaction(
            _tokenId,
            "Auction Cancelled",
            msg.sender,
            address(0x0),
            0
        ); //tokenId or tokenId-1 ??????
    }

    function bid(uint256 _tokenId) public payable {

        // bid must be more than 0
        require(msg.value > 0, "You did not send any money");
        //item must be biddable
        require(nfts[_tokenId - 1].isBiddable == true,"Item you tried to bid, is not biddable!");
        //maxbidden büyük olmalı message.value
        require(msg.value >= nfts[_tokenId - 1].maxBid, "The amount you tried to bid, is less than current max bid.");
        //owner kendisi olmıcak
        require(msg.sender != this.ownerOf(_tokenId), "You cannot bid your own item.");
       
        if (nfts[_tokenId - 1].maxBid > 0) {
            users[nfts[_tokenId - 1].maxBidder].userBalance = add256(users[nfts[_tokenId - 1].maxBidder].userBalance, nfts[_tokenId - 1].maxBid); //check overflow attack
        }
        nfts[_tokenId - 1].maxBid = msg.value;
        nfts[_tokenId - 1].maxBidder = msg.sender;

        emit nftTransaction(
            _tokenId,
            "Bidded",
            msg.sender,
            ownerOf(_tokenId),
            msg.value
        ); //tokenId or tokenId-1 ??????
    }

    function acceptHighestBid(uint256 _tokenId) public {
        //msg.sender tokenId ownerı olmalı
        require(msg.sender == this.ownerOf(_tokenId), "You need to be owner of this item, to accept its highest bid.");
        //item must be biddable
        require(nfts[_tokenId - 1].isBiddable == true , "Item should be biddable for you to accept its highest bid.");
        //max Bid is large than 0
        require(nfts[_tokenId - 1].maxBid > 0 ,"Max bid must be more than 0 to accept it, currently it is not!");

        require(nfts[_tokenId - 1].maxBidder != msg.sender, "Max bidder cannot be the same person as seller!");

        address buyer = nfts[_tokenId - 1].maxBidder;
        uint256 soldValue = nfts[_tokenId - 1].maxBid;
        this.safeTransferFrom(
            msg.sender,
            nfts[_tokenId - 1].maxBidder,
            _tokenId
        ); //transfer with ERC721 //change owner
        users[msg.sender].userBalance = add256(users[msg.sender].userBalance, nfts[_tokenId - 1].maxBid); //check overflow attack
        nfts[_tokenId - 1].maxBid = 0; //tokenId or tokenId-1 ??????
        nfts[_tokenId - 1].maxBidder = address(0x0); //tokenId or tokenId-1 ??????
        nfts[_tokenId - 1].isBiddable = false; //tokenId or tokenId-1 ??????
        nfts[_tokenId - 1].isOnSale = false; //tokenId or tokenId-1 ??????
        nfts[_tokenId - 1].sellPrice = 0; //tokenId or tokenId-1 ??????

        emit nftTransaction(
            _tokenId,
            "Sold From Auction",
            msg.sender,
            buyer,
            soldValue
        ); //tokenId or tokenId-1 ??????
    }

    function withdrawBid(uint256 _tokenId) public {
        //msg.sender maxBidder olmalı
        require(msg.sender == nfts[_tokenId - 1].maxBidder, "You must be the max bidder to withdraw your bid!");
        uint256 withdrawnValue = nfts[_tokenId - 1].maxBid;
        users[nfts[_tokenId - 1].maxBidder].userBalance = add256(users[nfts[_tokenId - 1].maxBidder].userBalance, nfts[_tokenId - 1].maxBid); //check overflow attack
        nfts[_tokenId - 1].maxBid = 0; //tokenId or tokenId-1 ??????
        nfts[_tokenId - 1].maxBidder = address(0x0); //tokenId or tokenId-1 ??????

        emit nftTransaction(
            _tokenId,
            "Bid Withdrawn",
            msg.sender,
            address(0x0),
            withdrawnValue
        ); //tokenId or tokenId-1 ??????
    }

    function withdrawMoney(uint256 _amount) public {
        //amount balancetan küçük eşit olmalı
        require(users[msg.sender].userBalance >= _amount, "You do not have enough balance to withdraw this amount");

        uint initialBalance = users[msg.sender].userBalance;
        users[msg.sender].userBalance = sub256(initialBalance, _amount);
        msg.sender.transfer(_amount);
        
    }

    function mint(
        uint256 _clothType,
        string memory _name,
        string memory _cid,
        string memory _rarity
    ) public {
        require(isExist[_cid] == false, "Item link should be unique, for you to mint it");
        require(this.totalSupply() < maxSupply, "You cannot mint any more item since you already reached the maximum supply.");
        require(msg.sender ==owner, "Only owner can of this contract can mint, you are trying to some fraud.");
        require(_clothType == 1 || _clothType == 2 || _clothType == 3, "Invalid cloth type.");
        uint256 _id =
            nfts.push(
                nftData(
                    _clothType,
                    _name,
                    _cid,
                    _rarity,
                    false,
                    0,
                    false,
                    0,
                    address(0x0),
                    false
                )
            );
        _mint(msg.sender, _id);
        isExist[_cid] = true;
        

        emit nftTransaction(_id, "claimed", address(0x0), msg.sender, 0);

        putOnSale(_id,1);
    }



    function add256(uint256 a, uint256 b) internal pure returns (uint) {
        uint c = a + b;
        require(c >= a, "addition overflow");
        return c;
    }

    function sub256(uint256 a, uint256 b) internal pure returns (uint) {
        require(b <= a, "subtraction underflow");
        return a - b;
    }
}
