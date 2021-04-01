const router = require('express').Router();

const { userController } = require('../../controllers');
const { userMiddleware, fileMiddleware } = require('../../middlewares');

router.get('/:id', userController.findOneUser);
router.post('/', fileMiddleware.checkFile, fileMiddleware.checkAvatar, userMiddleware.checkCreateUser, userController.createUser);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.removeUserById);

module.exports = router;
