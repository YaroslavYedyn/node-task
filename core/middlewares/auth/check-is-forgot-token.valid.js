const { userService } = require('../../services');
const { ErrorHandler, errorMessages, errorCodes } = require('../../error');

module.exports = async (req, res, next) => {
    try {
        const { forgot_token } = req.body;

        const user = await userService.getSingleUser({ forgot_token }).select('+forgot_password');
        if (!user) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.WRONG_TOKEN.customCode, 'Forgot token not valid!');
        }

        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
};
