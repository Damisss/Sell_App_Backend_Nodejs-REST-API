const bodyParser = require('body-parser')
const passport = require('passport')

const middleware = (app)=>{
   app.use(bodyParser.json())
   app.use(bodyParser.urlencoded({extended: false}))
   app.use(passport.initialize())
}
module.exports = {middleware}