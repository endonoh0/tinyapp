const { urlDatabase } = require("./database");

/**
 * Generate a random 6 character string
 */
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

/**
 * Fetch the user's url in database.
 *
 * @param  string id
 * @param  object urlDatabase
 * @return object
 */
const urlsForUsers = (id, urlDatabase) => {
    let userDatabase= {};
    for (const key in urlDatabase) {
        if (urlDatabase[key].userID === id) {
            userDatabase[key] = {longURL:urlDatabase[key].longURL};
        }
    };
    return userDatabase;
};

/**
 * Fetch the user's URL history.
 *
 * @param  string id
 * @param  object urlDatabase
 * @return object
 */
const urlHistoryForUsers = (id, urlDatabase) => {
    let historyDatabase = {};
    for (const URL in urlDatabase) {
        if (urlDatabase[URL].userID === id) {
            historyDatabase[URL] = {
                history: urlDatabase[URL].history
            }
        } else {
            return null;
        }
    }
    return historyDatabase;
}
// let result = urlHistoryForUsers("aJ48lW", urlDatabase);
// console.log(result["b6UTxQ"])
// console.log(result);

/**
 * Verify if the user exists in database.
 *
 * @param  string val
 * @param  object usersDatabase
 * @return object
 */
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
    urlsForUsers,
    urlHistoryForUsers
}
