const { userService } = require('../../services');
const { userValidator } = require('../../validators');
const { ErrorHandler, errorMessages, errorCodes } = require('../../error');

module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await userService.getSingleUser({ _id: id });

        if (!user) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.USER_NOT_FOUND.customCode, 'User not Found');
        }

        const { error } = userValidator.updateUserValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BODY_NOT_VALID.customCode, 'Body not valid!');
        }

        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
};
