const Joi = require('joi');

const { regexpEnum: { PASSWORD_REGEXP, EMAIL_REGEXP } } = require('../../constants');

module.exports = Joi.object({
    email: Joi.string()
        .trim()
        .regex(EMAIL_REGEXP)
        .required(),
    password: Joi.string()
        .trim()
        .regex(PASSWORD_REGEXP)
        .required(),
});
