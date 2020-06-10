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

const users = {
    "userRandomID": {
        id: "userRandomID",
        email: "user@example.com",
        password: "purple-monkey-dinosaur"
    },
    "user2RandomID": {
        id: "user2RandomID",
        email: "user2@example.com",
        password: "dishwasher-funk"
    }
}
// const verifyUser = (val, users) => {
//     for (const user of Object.values(users)) {
//         if (user.email === email) {
//             return user.email;
//         }
//     }
//     return false
// };
const verifyUser = (email, users) => {
    for (const id of Object.keys(users)) {
        if (users[id].email === email) {
            return users[id];
        };
    };
    return false;
};

console.log(verifyUser("user2@example.com", users));

module.exports = {
    generateRandomString,
    verifyUser
}
