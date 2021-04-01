const router = require('express').Router();

router.use('*', (req, res) => res.json('Not Found Router!'));

module.exports = router;
