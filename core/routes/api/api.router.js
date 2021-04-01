const router = require('express').Router();

const { userRouter } = require('../user');
const { emailRouter } = require('../email');
const { authRouter } = require('../auth');

router.use('/users', userRouter);
router.use('/email', emailRouter);
router.use('/auth', authRouter);

module.exports = router;
