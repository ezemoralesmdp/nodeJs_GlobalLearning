const Joi = require('joi')

const paramsSchema = Joi.object({
    id: Joi.string().min(24).max(24).required()
})

const querySchema = Joi.alternatives().try(
    Joi.object({
        name: Joi.string().required(),
    }),
    Joi.object({
        genre: Joi.string().required(),
    }),
    Joi.object({
        year: Joi.string().required(),
    }),
    Joi.object({
        director: Joi.string().required(),
    }),
    Joi.object({})
)

const bodySchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).trim().required(),
    genre: Joi.string().alphanum().min(3).max(30).trim().required(),
    year: Joi.string().min(4).max(4).required(),
    director: Joi.string().min(3).max(30).trim().required(),
    duration: Joi.string().min(5).max(30).required()
})

module.exports = { paramsSchema, querySchema, bodySchema }