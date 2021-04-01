const { ErrorHandler, errorMessages, errorCodes } = require('../../error');
const { userService } = require('../../services');
const { userValidator } = require('../../validators');
const { passwordHelper } = require('../../helpers');

module.exports = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userService.getSingleUser({ email })
            .select('+password');

        if (!user) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.USER_NOT_FOUND.customCode, 'User not found!');
        }

        if (!user.activate_status) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST,
                errorMessages.ACCOUNT_NOT_ACTIVATE.customCode,
                'Account not activate!');
        }

        const { error } = userValidator.loginUserValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BODY_NOT_VALID.customCode, 'Body not valid!');
        }
        await passwordHelper.compare(password, user.password);

        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
};
