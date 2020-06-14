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
 * @return object userURLDatabase
 */
const urlsForUsers = (id, urlDatabase) => {
    let userURLDatabase= {};
    for (const key in urlDatabase) {
        if (urlDatabase[key].userID === id) {
            userURLDatabase[key] = {longURL:urlDatabase[key].longURL};
        }
    };
    return userURLDatabase;
};


/**
 * Fetch the user's URL history.
 *
 * @param  string id
 * @param  object urlDatabase
 * @return object hisitoryDatabase
 */
const urlHistoryForUsers = (id, urlDatabase) => {
    let historyDatabase = {};
    for (const url in urlDatabase) {
        if (urlDatabase[url].userID === id) {
            historyDatabase[url] = {
                history: urlDatabase[url].history
            }
        } else {
            return urlDatabase;
        }
    }
    return historyDatabase;
}

/**
 *  Count the number of visiters and unique visiters
 *
 * @param  array arr
 * @return object
 */
const countCollection = (arr) => {
    let count = {}
    let uniqueCount = 0;
    let totalCount = 0;
    let val = arr[0];

    arr.forEach(id => {
        if (id !== val) {
            uniqueCount++
        } else {
            totalCount++
        }
    });

    return count = {
        totalCount,
        uniqueCount
    }
}

/**
 * Fetch a collection of visit counts
 *
 * @param  obj urlHistory
 * @return obj
 */
const calculateVisitCount = (urlHistory) => {
    let visitors = [];

    for (const history in urlHistory) {
        for (const count of urlHistory[history]) {
            let stats = Object.values(count);
            let id = stats[0];
            visitors.push(id);
        }
    }
    return countCollection(visitors);
}

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
    urlHistoryForUsers,
    calculateVisitCount,
    countCollection
}
