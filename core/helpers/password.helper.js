const bcrypt = require('bcrypt');

const { ErrorHandler, errorMessages: { WRONG_EMAIL_OF_PASSWORD }, errorCodes } = require('../error');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const isPasswordEquals = await bcrypt.compare(password, hashPassword);
        if (!isPasswordEquals) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, WRONG_EMAIL_OF_PASSWORD.customCode, 'Wrong email of password!');
        }
    }
};
