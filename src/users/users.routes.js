const {Router} = require('express')
const validation = require('express-validator')
const {signup, signin} = require('./users.controller')
const joi = require('../utils/form.validator')
const {authLocal} = require('../utils/auth.validation')
const userRoutes = new Router()


userRoutes.post('/signup', validation(joi),  signup)
userRoutes.post('/signin', authLocal, signin )

module.exports = {userRoutes}