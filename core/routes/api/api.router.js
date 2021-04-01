const router = require('express').Router();

const { userRouter } = require('../user');
const { emailRouter } = require('../email');

router.use('/users', userRouter);
router.use('/email', emailRouter);

module.exports = router;
