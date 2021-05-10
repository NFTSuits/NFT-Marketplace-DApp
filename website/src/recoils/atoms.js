import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

const myUsername = atom({
  key: "username", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

const myAddress = atom({
  key: "address", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
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

export { myUsername, myAddress, allItems, itemData, transactionData };
