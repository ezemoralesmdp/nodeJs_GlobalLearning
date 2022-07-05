const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/people')
.then(() => console.log('DB connected'))
.catch((err) => console.error(err))