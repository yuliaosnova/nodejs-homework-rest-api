const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .regex(/^\+?3?8?(0\d{9})$/)
    .messages({ "string.pattern.base": `Phone number is not valid` })
    .required(),
});

module.exports = addSchema;
