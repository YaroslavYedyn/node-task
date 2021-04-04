const router = require('express').Router();

const { userController } = require('../../controllers');
const { userMiddleware, fileMiddleware, authMiddleware } = require('../../middlewares');

router.post('/',
    fileMiddleware.checkFile,
    fileMiddleware.checkAvatar,
    userMiddleware.checkCreateUser,
    userController.createUser);

router.get('/:id', authMiddleware.checkAccessToken, userController.findOneUser);
router.put('/:id',
    authMiddleware.checkAccessToken,
    fileMiddleware.checkFile,
    fileMiddleware.checkAvatar,
    userMiddleware.checkUpdateUser,
    userController.updateUserById);
router.patch('/:id', authMiddleware.checkAccessToken, userMiddleware.checkIsChangePassword, userController.changePassword);
router.delete('/:id', authMiddleware.checkAccessToken, userController.removeUserById);

router.post('/forgotPassword', userMiddleware.checkIsForgotPassword, userController.forgotPassword);

module.exports = router;
