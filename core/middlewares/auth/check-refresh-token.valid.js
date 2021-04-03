const jwt = require('jsonwebtoken');

const { ErrorHandler, errorCodes, errorMessages } = require('../../error');
const { jwtSecret: { JWT_REFRESH_SECRET } } = require('../../config');
const { magicString: { AUTHORIZATION, DATA_BASE_TABLE: { USER } }, } = require('../../constants');
const { authService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        let { token } = req.body;

        if (!token) {
            token = req.get(AUTHORIZATION);
            if (!token) {
                throw new ErrorHandler(errorCodes.FORBIDDEN, errorMessages.NO_TOKEN.customCode, 'Token not valid!');
            }
        }
        console.log(token);

        if (!token) {
            throw new ErrorHandler(errorCodes.FORBIDDEN, errorMessages.NO_TOKEN.customCode, 'Token not valid!');
        }

        const isExist = await authService.getTokensByParams({ refresh_token: token }, 'user_id');

        console.log(isExist);
        if (!isExist) {
            throw new ErrorHandler(errorCodes.FORBIDDEN, errorMessages.WRONG_TOKEN.customCode, 'Token not valid!');
        }

        jwt.verify(token, JWT_REFRESH_SECRET, (error) => {
            if (error) {
                throw new ErrorHandler(errorCodes.UNAUTHORIZED, errorMessages.WRONG_TOKEN.customCode, 'Token not valid!');
            }
        });

        req.refresh_token = token;
        req.user = isExist.user_id;
        next();
    } catch (e) {
        next(e);
    }
};
