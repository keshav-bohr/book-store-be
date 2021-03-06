const User = require('../../models/user')
const error = require('../../utils/error')
const jwt = require('jsonwebtoken')

async function loginHandler(req, res, next) {
    try {
        const { email, password } = req.body
        const userFound = await User.findOne({
            email
        })
        const matched = await userFound.verifyPassword(password)
        if (!matched) {
            return error(res, 401, 'Password incorrect')
        }
        const token = jwt.sign({
            id: userFound._id
        }, process.env.JWT_SECRET_KEY)
        res.json({
            success: true,
            token
        })
    } catch (error) {
        next(error)
    }
}

module.exports = exports = loginHandler
