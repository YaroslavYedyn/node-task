const router = require('express').Router();

const { userMiddleware, authMiddleware } = require('../../middlewares');
const { emailController } = require('../../controllers');

router.post('/activate', userMiddleware.checkIsActivateToken, emailController.activateAccount);
router.post('/forgot', authMiddleware.checkIsForgotPassword, emailController.forgotPassword);
router.post('/forgot/check', authMiddleware.checkIsForgotToken, emailController.deleteForgotToken);

module.exports = router;
