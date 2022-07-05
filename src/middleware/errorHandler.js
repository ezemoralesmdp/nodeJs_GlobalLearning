const httpStatus = require('../helper/httpStatus')

const ERROR_HANDLERS = {
    SyntaxError: (res, err) => {
        res.status(httpStatus.BAD_REQUEST).send({error: err.name, cause: err.message, message: 'error de tipado, porfavor revisa el tipado' })
    },
    defaultError: (res, err) => {
        res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({error: err.name, cause: err.message})
    },
}

const errorHandler = (err, req, res, next) => {
    const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError
    handler(res, err)
}

module.exports = errorHandler