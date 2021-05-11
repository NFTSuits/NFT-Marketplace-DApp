export const allFilterCheck = (
  temp,
  tempIsBiddable,
  tempIsOnSale,
  tempRarityLevel
) => {
  return temp.filter((item) => {
    if (
      tempIsBiddable === true &&
      tempIsOnSale === true &&
      tempRarityLevel !== "all"
    ) {
      return (
        tempIsBiddable === item.isBiddable &&
        tempIsOnSale === item.isOnSale &&
        tempRarityLevel === item.rarity
      );
    }
    if (
      tempIsBiddable === false &&
      tempIsOnSale === true &&
      tempRarityLevel !== "all"
    ) {
      // burda biddable undefined
      return tempIsOnSale === item.isOnSale && tempRarityLevel === item.rarity;
    }
    if (
      tempIsBiddable === true &&
      tempIsOnSale === false &&
      tempRarityLevel !== "all"
    ) {
      // burda onsale undefined
      return (
        tempIsBiddable === item.isBiddable && tempRarityLevel === item.rarity
      );
    }

    if (
      tempIsBiddable === true &&
      tempIsOnSale === true &&
      tempRarityLevel === "all"
    ) {
      // burda rarity undefined
      return (
        tempIsBiddable === item.isBiddable && tempIsOnSale === item.isOnSale
      );
    }
    if (
      tempIsOnSale === false &&
      tempIsBiddable === false &&
      tempRarityLevel !== "all"
    ) {
      // burda biddable ve onsale undefined
      return tempRarityLevel === item.rarity;
    }

    if (
      tempIsOnSale === true &&
      tempIsBiddable === false &&
      tempRarityLevel === "all"
    ) {
      // burda biddable ve rarity undefined
      return tempIsOnSale === item.isOnSale;
    }

    if (
      tempIsOnSale === false &&
      tempIsBiddable === true &&
      tempRarityLevel === "all"
    ) {
      // burda onsale ve rarity undefined
      return tempIsBiddable === item.isBiddable;
    }

    if (
      tempIsBiddable === false &&
      tempIsOnSale === false &&
      tempRarityLevel === "all"
    ) {
      return true;
    }

    //   console.log(
    //     "ERROR ERROR ERROR ERROR",
    //     "tempIsBiddable:",
    //     tempIsBiddable,
    //     "tempIsOnSale: ",
    //     tempIsOnSale,
    //     "tempRarityLevel: ",
    //     tempRarityLevel
    //   );
  });
};
