const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../../config');
const { authService } = require('../../services');
const { magicString: { AUTHORIZATION, DATA_BASE_TABLE: { USER } } } = require('../../constants');
const { ErrorHandler, errorMessages, errorCodes } = require('../../error');

module.exports = async (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);

        if (!token) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.NO_TOKEN.customCode, 'Token not valid!');
        }

        const isExistToken = await authService.getTokensByParams({ access_token: token }, USER);
        console.log(isExistToken);

        jwt.verify(token, jwtSecret.JWT_SECRET, (error) => {
            if (error) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.WRONG_TOKEN.customCode, 'Token not valid!');
            }
        });
        next();
    } catch (e) {
        next(e);
    }
};
