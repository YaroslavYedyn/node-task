const jwt = require('jsonwebtoken');

const { jwtSecret: { JWT_SECRET } } = require('../../config');
const { authService } = require('../../services');
const { magicString: { AUTHORIZATION } } = require('../../constants');
const { ErrorHandler, errorMessages, errorCodes } = require('../../error');

module.exports = async (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);


        if (!token) {
            throw new ErrorHandler(errorCodes.FORBIDDEN, errorMessages.NO_TOKEN.customCode, 'Token not valid!');
        }

        const isExistToken = await authService.getTokensByParams({ access_token: token }, 'user_id');

        if (!isExistToken) {
            throw new ErrorHandler(errorCodes.FORBIDDEN, errorMessages.WRONG_TOKEN.customCode, 'Token not valid!');
        }

        jwt.verify(token, JWT_SECRET, (error) => {
            if (error) {
                throw new ErrorHandler(errorCodes.UNAUTHORIZED, errorMessages.WRONG_TOKEN.customCode, 'Token not valid!');
            }
        });

        req.user = isExistToken.user_id;
        req.access_token = token;
        next();
    } catch (e) {
        next(e);
    }
};
