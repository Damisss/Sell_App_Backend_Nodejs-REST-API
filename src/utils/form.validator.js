const Joi = require('joi')

//const password = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
exports.joi = {
    signup:{
        email: Joi.string().email().required(),
        password: Joi.string().regex(password).required()
    },
    signin:{
        email: Joi.string().email().required(),
        password: Joi.string().regex(password).required()
    }
}
exports.article ={
    updateArticle:{
        email: Joi.string().email(),
        title: Joi.string(),
        description: Joi.string(),
        price: Joi.number(),
        location: Joi.string(),
        articleImage: Joi.string()
    }
}
exports.passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/