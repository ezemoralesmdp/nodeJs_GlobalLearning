const express = require('express')
const filmController = require('../controllers/filmController')
const validator = require('express-joi-validation').createValidator({})
const { paramsSchema, querySchema, bodySchema } = require('../validations/validationsFilms')

const routes = (Film) => {
    const filmRoutes = express.Router()

    const { getAllFilms, postFilm, putFilmById, getFilmById, deleteFilmById } = filmController(Film)

    filmRoutes
    .route('/film')
    .get(validator.query(querySchema), getAllFilms)
    .post(validator.body(bodySchema), postFilm)

    filmRoutes.route('/film/:id')
    .get(validator.params(paramsSchema), getFilmById)
    .put(validator.body(bodySchema), putFilmById)
    .delete(validator.params(paramsSchema), deleteFilmById)
    
    return filmRoutes
}

module.exports = routes

