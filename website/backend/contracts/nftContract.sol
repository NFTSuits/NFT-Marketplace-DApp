pragma solidity 0.5.0;

//import "https://github.com/OpenZeppelin/openzeppelin-contracts/tree/docs-org/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/docs-org/contracts/token/ERC721/ERC721Full.sol";

//import "https://github.com/OpenZeppelin/openzeppelin-contracts/tree/docs-org/contracts/token/ERC721/ERC721.sol";

//contract ERC721Full is ERC721, ERC721Enumerable, ERC721Metadata {
//    constructor (string memory name, string memory symbol) public ERC721Metadata(name, symbol) {
//        // solhint-disable-previous-line no-empty-blocks
//    }
//}

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
    }

    struct userData {
        bool isHeadAssigned;
        //uint is reference to tokenId from openzeppelin-contracts
        uint256 head; //also the photo if do you have a head assigned
        bool isMiddleAssigned;
        //uint is reference to tokenId from openzeppelin-contracts
        uint256 middle;
        bool isBottomAssigned;
        //uint is reference to tokenId from openzeppelin-contracts
        uint256 bottom;
        string username;

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

    constructor() public ERC721Full("nftContract", "NFTC") {}

    function mint(
        uint256 _clothType,
        string memory _name,
        string memory _cid,
        string memory _rarity
    ) public {
        require(isExist[_cid] == false);
        uint256 _id =
            nfts.push(
                nftData(_clothType, _name, _cid, _rarity, false, 0, false, 0)
            );
        _mint(msg.sender, _id);
        isExist[_cid] = true;

        emit nftTransaction(_id, "claimed", address(0x0), msg.sender, 0);
    }
}
