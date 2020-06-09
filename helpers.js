const generateRandomString = () => {
    let str = '';
    let random = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321abcdefgijklmnopqrstuvwxyz';
    let length = random.length;

    let i = 0;
    while (i < 7) {
        i++;
        str += random.charAt(Math.floor(Math.random() * length));
    }
    return str;
}

module.exports = {
    generateRandomString
}
