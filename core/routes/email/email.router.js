const router = require('express').Router();

const { userMiddleware } = require('../../middlewares');
const { emailController } = require('../../controllers');

router.post('/activate', userMiddleware.checkIsActivateToken,emailController.activateAccount);

module.exports = router;
