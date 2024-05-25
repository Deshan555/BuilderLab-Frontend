import CryptoJS from 'crypto-js';

const secretKey = '473%*#@298437928347@^jhjfhdfj082932?';

const LocalStroage = {
    setItem(key, value) {
        localStorage
            .setItem(key, JSON.stringify(CryptoJS.AES.encrypt(value, secretKey).toString()));
    },
    getItem(key) {
        return JSON.parse(localStorage
            .getItem(key ? CryptoJS.AES.decrypt(localStorage.getItem(key), secretKey).toString(CryptoJS.enc.Utf8) : null));
    },
    removeItem(key) {
        localStorage
            .removeItem(key);
    },
    clear() {
        localStorage.clear();
    },
};

export { LocalStroage }

 