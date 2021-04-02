const router = require('express').Router();

const { userMiddleware, authMiddleware } = require('../../middlewares');
const { authController } = require('../../controllers');

router.post('/', userMiddleware.checkLoginUser, authController.login);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);
router.get('/logout', authMiddleware.checkAccessToken, authController.logout);

module.exports = router;
