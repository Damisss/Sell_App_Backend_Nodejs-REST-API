const passport = require('passport')
const LocalStrategy = require('passport-local')
const {Strategy, ExtractJwt} = require('passport-jwt')
const {User} = require('../users/users.models')

//credential validation
const localOpts = {
    usernameField: 'email'
}

const localStrategy = new LocalStrategy(localOpts, async (email, password, done)=>{
      try {
        const user = await User.findOne({email: email})
        if(!user){
            return done(null, false)
        }else if(!user._comparePassword(password)){
            return done(null, false)
        }
       return done(null, user)
      } catch (error) {
          return done(error, false)
      }
})
//token validatin
const jwtOpts ={
    secretOrKey: 'secret',
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
}
const jwtStrategy = new Strategy(jwtOpts, async (payload, done)=>{
    try {
        const user = await User.findById({_id: payload._id})
         if(!user){
             return done(null, false)
         }
         return done(null, user)
    } catch (error) {
        return done(error, false)
    }
})
passport.use(localStrategy)
passport.use(jwtStrategy)

const authLocal = passport.authenticate('local', {session: false})
const jwtCheck = passport.authenticate('jwt', {session: false})

module.exports = {authLocal, jwtCheck}