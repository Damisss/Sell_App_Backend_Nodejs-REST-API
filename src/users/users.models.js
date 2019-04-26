const mongoose = require('mongoose')
const validator = require('validator')
const uniqueValidator = require('mongoose-unique-validator')
const {passwordReg} = require('../utils/form.validator')
const {hashSync, compareSync} = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema
const userSchema = new Schema({
    email:{
        type: String,
        uniqe: true,
        required:[true, 'email is required'],
        trim: true,
        validate:{
            validator(email){
                return validator.isEmail(email)
            }
        },
        message: `{VALUE} is required`
    },
    password:{
        type: String,
        required:[true, 'password is required'],
        trim: true,
        validate:{
            validator(password){
                return passwordReg.test(password)
            }
        },
        message: `{VALUE} is required`
    },
    articles:[{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }]
})
userSchema.plugin(uniqueValidator,{ 
    message: '{VALUE} is already taken'})
    
userSchema.pre('save', function(next){
    const user = this
    user.password = user._hashPassword(user.password)
    next()
})

userSchema.methods = {
    _hashPassword(password){
       return hashSync(password)
    },
    _comparePassword(password){
      return compareSync(password, this.password)
    },
    generateToken(){
        return jwt.sign({
            _id: this._id
        },
        'secret')
    },
    _articles(articleId){
     if(this.articles.indexOf(articleId) === -1 ){
         this.articles.push(articleId)
         this.save()
     }
    },
    toJSON(){
       return{
        _id: this._id,
        email: this.email,
        token: `JWT ${this.generateToken()}`,
        articles: articles
       }
    }
}

const User = mongoose.model('User', userSchema)
module.exports = {User}