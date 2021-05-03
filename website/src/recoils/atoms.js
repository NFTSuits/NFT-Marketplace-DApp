import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

const myUsername = atom({
  key: "username", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

const myAddress = atom({
  key: "address", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export { myUsername, myAddress };
