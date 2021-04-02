const Joi = require('joi');

const { regexpEnum: { PASSWORD_REGEXP } } = require('../../constants');

module.exports = Joi.string()
    .trim()
    .regex(PASSWORD_REGEXP)
    .required();
