const generateRandomString = () => {
    let result = '';
    const str = '0987654321ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgijklmnopqrstuvwxyz';
    const length = str.length;

    let i = 0;
    while (i < 6) {
        i++;
        result += str.charAt(Math.floor(Math.random() * length));
    };
    return result;
};

const urlsForUsers = (id, urlDatabase) => {
    let userDatabase= {};
    for (const key in urlDatabase) {
        if (urlDatabase[key].userID === id) {
            userDatabase[key] = {longURL:urlDatabase[key].longURL};
        }
    };
    return userDatabase;
};

const verifyUser = (val, usersDatabase) => {
    for (const id of Object.keys(usersDatabase)) {
        if (
            usersDatabase[id].email === val || id === val
        ) {
            return usersDatabase[id];
        }
    };
    return false;
};

module.exports = {
    generateRandomString,
    verifyUser,
    urlsForUsers
}
