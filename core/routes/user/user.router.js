const router = require('express')
    .Router();

const { userController } = require('../../controllers');
const { userMiddleware, fileMiddleware } = require('../../middlewares');

router.post('/',
    fileMiddleware.checkFile,
    fileMiddleware.checkAvatar,
    userMiddleware.checkCreateUser,
    userController.createUser);

router.get('/:id', userController.findOneUser);
router.put('/:id',
    fileMiddleware.checkFile,
    fileMiddleware.checkAvatar,
    userMiddleware.checkUpdateUser,
    userController.updateUserById);
router.delete('/:id', userController.removeUserById);

module.exports = router;
