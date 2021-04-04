const { User } = require('../dataBase');

module.exports = {
    findAllUser: (query) => User.find(query),
    getSingleUser: (query) => User.findOne(query),
    createUser: (user) => User.create(user),
    updateUser: (query, updateBody) => User.updateOne(query, updateBody),
    removeUser: (query) => User.delete(query),
};
