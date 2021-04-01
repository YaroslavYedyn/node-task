const Joi = require('joi');

module.exports = Joi.object({
    username: Joi.string()
        .trim()
        .alphanum()
        .min(4)
        .max(35),
    name: Joi.string()
        .trim(),
    age: Joi.number()
        .min(12)
        .max(100),
    avatar: Joi.string()
        .trim(),
});
