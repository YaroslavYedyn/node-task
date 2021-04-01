const jwt = require('jsonwebtoken');

const { userService } = require('../../services');
const { errorCodes, ErrorHandler, errorMessages: { NO_TOKEN, WRONG_TOKEN } } = require('../../error');
const { jwtSecret: { JWT_ACTIVATE_SECRET } } = require('../../config');

module.exports = async (req, res, next) => {
    try {
        const { token } = req.body;

        if (!token) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, NO_TOKEN.customCode, 'Wrong token!');
        }

        const user = await userService.getSingleUser({ activate_token: token }).select('+activate_token,');

        if (!user) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, WRONG_TOKEN.customCode, 'Wrong token!');
        }

        jwt.verify(token, JWT_ACTIVATE_SECRET, (error) => {
            if (error) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, WRONG_TOKEN.customCode, error.details[0].message);
            }
        });

        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
};
