const { ErrorHandler, errorMessages, errorCodes } = require('../../error');
const { userService } = require('../../services');
const { userValidator } = require('../../validators');
const { activateTokenHelper } = require('../../helpers');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await userService.getSingleUser({ email });

        if (user) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.USER_EXIST.customCode, 'User exist!');
        }
        const activate_token = activateTokenHelper();

        const newUser = {
            ...req.body,
            activate_token,
            activate_status: false
        };

        const { error } = userValidator.createUserValidator.validate(newUser);

        if (error) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BODY_NOT_VALID.customCode, error[0].message);
        }

        req.user = newUser;
        next();
    } catch (e) {
        next(e);
    }
};
