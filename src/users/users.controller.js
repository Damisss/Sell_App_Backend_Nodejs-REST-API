const {User} = require('./users.models')
const httpStatus = require('http-status')

exports.signup = async (req, res)=>{
    try {
        const user =  new User(req.body)
      await user.save()
      return res.status(httpStatus.CREATED).json(user)
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(error)
    }
}

exports.signin =  async (req, res, next)=>{
   await  res.status(httpStatus.OK).json(req.user)
   return next()
}
