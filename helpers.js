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
    let unique = 0;
    let total = 0;
    let val = arr[0];

    arr.forEach(id => {
        if (unique === 0) {
            unique++
        }

        if (id !== val) {
            unique++;
            total++;
        } else {
            total++;
        }
    });

    return count = {
        unique,
        total
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

    for (const id in urlHistory) {
        const length = urlHistory[id].length;
        if (length === 0) {
            return { unique: 0, total: 0 };
        }

        for (const props of urlHistory[id]) {
            let data = Object.values(props);
            let visitorId = data[0];
            visitors.push(visitorId);
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
