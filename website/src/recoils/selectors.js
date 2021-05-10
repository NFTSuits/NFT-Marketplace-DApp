import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

import { myUsername, myAddress, allItems } from "./atoms";

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

const getHeads = selector({
  key: "getHeads", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const temp = get(allItems);
    let a = temp.filter((item) => {
      return item.clothType === "1";
    });
    console.log("aaaaaaaaaa", a);
    return a;
  },
});

const getMiddles = selector({
  key: "getMiddles", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const temp = get(allItems);
    return temp.filter((item) => {
      return item.clothType === "2";
    });
  },
});

const getBottoms = selector({
  key: "getBottoms", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const temp = get(allItems);
    return temp.filter((item) => {
      return item.clothType === "3";
    });
  },
});

// const getMyHeads = selector({
//   key: "myHeads", // unique ID (with respect to other atoms/selectors)
//   get: ({ get }) => {
//     const allItems = get(allItems);
//     const userName = get(getUsername);
//     return allItems.filter((item) => {
//       return (item.clothType === 1) && (item.name === myUsername);
//     });
//   },
// });

// const getMyMiddles = selector({
//   key: "myMiddles", // unique ID (with respect to other atoms/selectors)
//   get: ({ get }) => {
//     const allItems = get(allItems);
//     return allItems.filter((item) => {
//       return item.clothType === 2;
//     });
//   },
// });

// const getMyBottoms = selector({
//   key: "myBottoms", // unique ID (with respect to other atoms/selectors)
//   get: ({ get }) => {
//     const allItems = get(allItems);
//     return allItems.filter((item) => {
//       return item.clothType === 3;
//     });
//   },
// });

export {
  getUsername,
  getHeads,
  getMiddles,
  getBottoms,
  // getMyHeads,
  // getMyMiddles,
  // getMyBottoms,
};
