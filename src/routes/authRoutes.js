const express = require('express')
const authController = require('../controllers/authController')
const validator = require('express-joi-validation').createValidator({})

const {bodySchema, bodyAuthSchema} = require('../validations/validationsPeople')

const routes = (People) => {
    const authRoutes = express.Router()

    const { logIn, register } = authController(People)

    authRoutes.route('/auth/login').post(validator.body(bodyAuthSchema), logIn)
    authRoutes.route('/auth/register').post(validator.body(bodySchema), register)

    return authRoutes
}

module.exports = routes