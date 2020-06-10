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

const verifyUserEmail = (email, users) => {
    for (const user of Object.values(users)) {
        if (user.email === email) {
            return false;
        }
    }
};

module.exports = {
    generateRandomString,
    verifyUserEmail
}
