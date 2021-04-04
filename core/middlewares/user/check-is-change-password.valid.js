const { ErrorHandler, errorCodes, errorMessages } = require('../../error');
const { userValidator } = require('../../validators');
const { userService } = require('../../services');
const { passwordHelper } = require('../../helpers');

module.exports = async (req, res, next) => {
    try {
        const { old_password, user_id } = req.body;
        console.log(req.body);

        const { error } = userValidator.changePasswordValidator.validate(req.body);

        console.log(error);
        if (error) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BODY_NOT_VALID.customCode, 'Body not valid!');
        }

        const user = await userService.getSingleUser({ _id: user_id })
            .select('+password');

        if (!user) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.USER_NOT_FOUND.customCode, 'User not found!');
        }

        await passwordHelper.compare(old_password, user.password);

        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
};
