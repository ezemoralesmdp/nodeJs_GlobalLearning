const mongoose = require('mongoose')

const { Schema } = mongoose

const filmModel = new Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 30 },
    genre: { type: String, required: true, minLength: 3, maxLength: 30 },
    year: { type: String, required: true, minLength: 4, maxLength: 4 },
    director: { type: String, required: true, minLength: 3, maxLength: 30 },
    duration: { type: String, required: true, minLength: 5, maxLength: 30 }
})

module.exports = mongoose.model('Film', filmModel)