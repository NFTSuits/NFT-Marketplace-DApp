import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

const myUsername = atom({
  key: "username", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

const profileDataAtom = atom({
  key: "profileDataAtom", // unique ID (with respect to other atoms/selectors)
  default: { username: "loading...", head: 0, middle: 0, bottom: 0 }, // default value (aka initial value)
});

const myAddress = atom({
  key: "address", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

const isThirdPersonAtom = atom({
  key: "isThirdPersonAtom", // unique ID (with respect to other atoms/selectors)
  default: true,
});

const allItems = atom({
  key: "allItems", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const itemData = atom({
  key: "itemData", // unique ID (with respect to other atoms/selectors)
  default: {},
});

const transactionData = atom({
  key: "transactionData", // unique ID (with respect to other atoms/selectors)
  default: [],
});

const isBiddable = atom({
  key: "isBiddable", // unique ID (with respect to other atoms/selectors)
  default: false,
});

const isOnSale = atom({
  key: "isOnSale", // unique ID (with respect to other atoms/selectors)
  default: false,
});

const rarityLevel = atom({
  key: "rarityLevel", // unique ID (with respect to other atoms/selectors)
  default: "all",
});

const itemIdAtom = atom({
  key: "itemIdAtom", // unique ID (with respect to other atoms/selectors)
  default: undefined,
});

const snackbarControllerAtom = atom({
  key: "snackbarControllerAtom", // unique ID (with respect to other atoms/selectors)
  default: false,
});

const snackbarTextAtom = atom({
  key: "snackbarTextAtom", // unique ID (with respect to other atoms/selectors)
  default: "",
});


export {
  myUsername,
  profileDataAtom,
  myAddress,
  allItems,
  itemData,
  transactionData,
  isBiddable,
  isOnSale,
  rarityLevel,
  isThirdPersonAtom,
  itemIdAtom,
  snackbarControllerAtom,
  snackbarTextAtom,
};
