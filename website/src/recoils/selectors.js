import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

import { myUsername, myAddress } from "./atoms";

const getUsername = selector({
  key: "getUsername", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const username = get(myUsername);
    const address = get(myAddress);

    if (address && address !== "" && username.length > 3) {
      return username;
    } else if (address && address !== "") {
      return (
        address.slice(0, 6) +
        "..." +
        address.slice(address.length - 4, address.length)
      );
    } else {
      return null;
    }
  },
});

export { getUsername };
