const express = require('express')
const peopleController = require('../controllers/peopleController')
const validator = require('express-joi-validation').createValidator({})
const { paramsSchema, querySchema, bodySchema } = require('../validations/validationsPeople')

const routes = (People) => {
    const peopleRoutes = express.Router()

    const { getAllPeople, postPeople, getPeopleById, putPeopleById, deletePeopleById } = peopleController(People)

    peopleRoutes
    .route('/people')
    .get(validator.query(querySchema), getAllPeople)
    .post(validator.body(bodySchema), postPeople)

    peopleRoutes.route('/people/:id')
    .get(validator.params(paramsSchema), getPeopleById)
    .put(validator.body(bodySchema), putPeopleById)
    .delete(validator.params(paramsSchema), deletePeopleById)
    
    return peopleRoutes
}

module.exports = routes

