const Joi = require('joi');

const { regexpEnum: { EMAIL_REGEXP, PASSWORD_REGEXP } } = require('../../constants');

module.exports = Joi.object({
    username: Joi.string()
        .trim()
        .alphanum()
        .min(4)
        .max(35)
        .required(),
    email: Joi.string()
        .trim()
        .regex(EMAIL_REGEXP)
        .required(),
    name: Joi.string()
        .trim(),
    age: Joi.number()
        .min(12)
        .max(100),
    password: Joi.string()
        .trim()
        .regex(PASSWORD_REGEXP),
    avatar: Joi.string()
        .trim(),
    activate_token: Joi.string()
        .trim()
        .required(),
    activate_status: Joi.boolean()
        .required(),

});
