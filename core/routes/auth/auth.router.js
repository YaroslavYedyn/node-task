const router = require('express').Router();

const { userMiddleware } = require('../../middlewares');
const { authController } = require('../../controllers');

router.post('/', userMiddleware.checkLoginUser, authController.login);

module.exports = router;
