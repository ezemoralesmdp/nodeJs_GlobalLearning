const jwt = require('jsonwebtoken')

const generateToken = () => {
    const token = 
    jwt.sign({
        data: 'Here are the date'
    }, process.env.SECRET, {expiresIn: '1d'})

    return token
}

module.exports = generateToken