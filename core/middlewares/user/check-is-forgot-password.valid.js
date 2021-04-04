const { userService } = require('../../services');
const { userValidator } = require('../../validators');
const { ErrorHandler, errorMessages, errorCodes } = require('../../error');

module.exports = async (req, res, next) => {
    try {
        const { forgot_token, password } = req.body;

        const user = await userService.getSingleUser({ forgot_token }).select('+forgot_token');
        if (!user) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.WRONG_TOKEN.customCode, 'Forgot token not valid!');
        }

        const { error } = userValidator.forgotPasswordValidator.validate(password);

        if (error) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BODY_NOT_VALID, 'Body not valid!');
        }

        req.user = user;
        req.forgot_token = forgot_token;
        req.password = password;
        next();
    } catch (e) {
        next(e);
    }
};
