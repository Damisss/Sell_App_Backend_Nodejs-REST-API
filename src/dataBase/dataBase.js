const mongoose = require('mongoose')
try {
    mongoose.connect('mongodb://localhost:27017/SELLAPP')
} catch (err) {
    mongoose.createConnection('mongodb://localhost:27017/SELLAPP')
}

mongoose.connection
.once('open', ()=>console.log('mongoose is running'))
.on('err', err=>{
    throw err
})
