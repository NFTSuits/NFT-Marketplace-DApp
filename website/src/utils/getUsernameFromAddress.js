export const getUsername = async (smart_contract_interface, address) => {
  let data = await smart_contract_interface.methods
    .users(address)
    .call()
    .then((data) => {
      // console.log("dataa", data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });

  if (data.username === "") {
    data.username =
      address.slice(0, 6) +
      "..." +
      address.slice(address.length - 4, address.length);
  }
  return data;
};
