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

const urlsForUsers = (id, database) => {
    let userDatabase= {};
    for (const key in database) {
        if (database[key].userID === id) {
            userDatabase[key] = {longURL:database[key].longURL};
        }
    }
    return userDatabase;
};

const verifyUser = (val, users) => {
    for (const id of Object.keys(users)) {
        if (users[id].email === val) {
            return users[id];
        } else if (id === val) {
            return users[id];
        }
    };
    return false;
};

module.exports = {
    generateRandomString,
    verifyUser,
    urlsForUsers
}
