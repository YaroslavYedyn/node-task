const Joi = require('joi');

const { regexpEnum: { PASSWORD_REGEXP } } = require('../../constants');

module.exports = Joi.object({
    old_password: Joi.string()
        .trim()
        .required()
        .regex(PASSWORD_REGEXP),
    new_password: Joi.string()
        .trim()
        .regex(PASSWORD_REGEXP)
        .required(),
    user_id: Joi.string()
        .trim()
        .required(),
});
