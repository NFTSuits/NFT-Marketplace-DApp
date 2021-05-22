contract myContract {
    mapping(address => string) public usernames;

    event usernameSet(address setter, string username);

    function setUsername(string calldata username) public {
        require(msg.sender != address(0x0));
        usernames[msg.sender] = username;

        emit usernameSet(msg.sender, username);
    }
}
