const express = require('express')
const People = require('./models/peopleModel')
const Film = require('./models/filmModel')
const peopleRoutes = require('./routes/peopleRoutes')(People)
const filmRoutes = require('./routes/filmRoutes')(Film)
const authRoutes = require('./routes/authRoutes')(People)
const { expressjwt } = require('express-jwt')
const errorHandler = require('./middleware/errorHandler')
const httpStatus = require('./helper/httpStatus')
require('dotenv').config()

const app = express()

require('./database/db')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.all('/*',
    expressjwt({ secret: process.env.SECRET, algorithms: ['HS256']}).unless({
        path: ['/auth/login', '/auth/register']
    })
)

app.use((err, _, res, next) => {
    if(err.name === 'UnauthorizedError'){
        res.status(httpStatus.UNAUTHORIZED).json({
            error: err.name,
            cause: 'You are not authorized, enter a valid token.'
        })
    } else {
        next(err)
    }
})

app.use('/api', peopleRoutes, filmRoutes)
app.use('/', authRoutes)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log('Server is running')
})



