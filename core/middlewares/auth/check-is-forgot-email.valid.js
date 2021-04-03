const { ErrorHandler, errorMessages, errorCodes } = require('../../error');
const { userService } = require('../../services');
const { activateTokenHelper } = require('../../helpers');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await userService.getSingleUser({ email });

        if (!user) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.EMAIL_NOT_VALID.customCode, 'Email not valid');
        }

        const token = await activateTokenHelper();

        await userService.updateUser({ _id: user._id }, { forgot_token: token });

        req.user = user;
        req.forgot_token = token;
        next();
    } catch (e) {
        next(e);
    }
};
