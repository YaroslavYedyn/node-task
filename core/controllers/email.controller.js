const { userService, emailService } = require('../services');
const { emailActions } = require('../constants');

module.exports = {
    activateAccount: async (req, res, next) => {
        try {
            const { user } = req;

            console.log(user);
            await userService.updateUser({ _id: user._id }, {
                activate_token: null,
                activate_status: true
            });

            res.json('Account activate!')
                .status(201);
        } catch (e) {
            next(e);
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const { user, forgot_token } = req;

            await emailService.sendMail(user.email, emailActions.FORGOT_PASSWORD, {
                token: forgot_token
            });

            res.json('Please check email')
                .status(200);
        } catch (e) {
            next(e);
        }
    },
    deleteForgotToken: async (req, res, next) => {
        try {
            const { user } = req;

            await userService.updateUser({ _id: user._id }, { forgot_token: null });

            res.json('UPDATED').status(200);
        } catch (e) {
            next(e);
        }
    }
};
