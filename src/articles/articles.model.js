const mongoose = require('mongoose')
const slug = require('slug')
const validator = require('validator')

const Schema = mongoose.Schema
const articleSchema = new Schema({
    title:{
        type: String,
        required: true,
        minlength: [3, 'title must be longer']
    },
   category:{
    type: String,
    required: true,
   },
   description:{
    type: String,
    required: true,
    minlength: [5, 'title must be longer']
   },
   price:{
       type: Number,
       required: true,
   },
   email: {
    type: String,
    required: true,
    trim: true,
    validate:{
        validator(email){
            return validator.isEmail(email)
        }
    },
    message: `{VALUE} is required`
   },
   location:{
       type: Number,
       required: true
   },
   articleImage: {
       type: String,
       required: true
   },
   seller: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   slug:{
       type: String,
       trim: true,
      tolowercase: true,
   }
})

articleSchema.pre('save', function(next){
    this._slugify()
    next()
})
articleSchema.methods = {
  _slugify(){
      this.slug = slug(this.title)
  }
}
const Article = mongoose.model('Article', articleSchema)

module.exports = {Article}