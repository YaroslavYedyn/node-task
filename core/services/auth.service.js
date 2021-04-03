const { O_Auth } = require('../dataBase');

module.exports = {
    getTokensByParams: (params, model) => O_Auth.findOne(params).populate(model),
    createToken: (object) => O_Auth.create(object),
    deleteToken: (params) => O_Auth.deleteMany(params)

};
