const { userService, emailService, fileService } = require('../services');
const { passwordHelper } = require('../helpers');
const { emailActions, magicString: { FILE_FOLDER_NAME } } = require('../constants');

module.exports = {
    findAllUser: async (req, res, next) => {
        try {
            const { query } = req;

            const users = await userService.findAllUser(query);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    findOneUser: async (req, res, next) => {
        try {
            const { id } = req.params;

            const user = await userService.getSingleUser({ _id: id });

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const {
                user: {
                    password, activate_token, email, username
                }, avatar
            } = req;

            const passwordHash = await passwordHelper.hash(password);

            if (avatar) {
                const uploadPath = await fileService.downloadFile(avatar, FILE_FOLDER_NAME.PHOTOS, 'user');
                const avatarPath = uploadPath.split('\\')
                    .join('/');
                req.user = {
                    ...req.user,
                    avatar: avatarPath
                };
            }
            await userService.createUser({
                ...req.user,
                password: passwordHash
            });

            await emailService.sendMail(email, emailActions.ACTIVATE, {
                token: activate_token,
                name: username
            });

            res.json('Please check email!');
        } catch (e) {
            fileService.deleteFile(req.user.avatar);
            next(e);
        }
    },
    updateUserById: async (req, res, next) => {
        try {
            const { user, avatar } = req;

            if (avatar) {
                await fileService.deleteFile(user.avatar);
                const uploadPath = await fileService.downloadFile(avatar, FILE_FOLDER_NAME.PHOTOS, 'user');
                const avatarPath = uploadPath.split('\\')
                    .join('/');
                req.body = {
                    ...req.body,
                    avatar: avatarPath
                };
            }
            await userService.updateUser({ _id: user._id }, req.body);
            const updateUser = await userService.getSingleUser({ _id: user._id });

            res.json(updateUser);
        } catch (e) {
            next(e);
        }
    },
    removeUserById: async (req, res, next) => {
        try {
            const { params: { id } } = req;

            const user = await userService.removeUser({ _id: id });
            await fileService.deleteFile(user.avatar);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const { user, password } = req;

            const passwordHash = await passwordHelper.hash(password);

            console.log(user._id);
            console.log(passwordHash);
            await userService.updateUser({ _id: user._id }, {
                forgot_token: null,
                password: passwordHash
            });

            res.json('UPDATED')
                .status(200);
        } catch (e) {
            next(e);
        }
    }
};
