const { userService } = require('../services');

module.exports = {
    activateAccount: async (req, res, next) => {
        try {
            const { user } = req;

            console.log(user);
            await userService.updateUser({ _id: user._id }, {
                activate_token: null,
                activate_status: true
            });

            res.json('Account activate!').status(201);
        } catch (e) {
            next(e);
        }
    }
};
