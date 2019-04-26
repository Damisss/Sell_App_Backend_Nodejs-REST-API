const {Router} = require('express')
const {postArticle, getArticles, updateArticle, deleteArticle} = require('./articles.controller')
const {jwtCheck} = require('../utils/auth.validation')
const { article} = require('../utils/form.validator')
const validator = require('express-validator')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './upload/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}
const upload = multer({storage: storage, 
limits:{
    fieldSize: 1024*1024*5
},
fileFilter: fileFilter
})


const articlesRoutes = new Router()

articlesRoutes.get('/get/articles', getArticles)
articlesRoutes.post('/post/article',jwtCheck, upload.single('articleImage') ,postArticle )
articlesRoutes.patch('/update/article/:id',jwtCheck, validator(article),upload.single('articleImage') ,updateArticle )
articlesRoutes.delete('/delete/article/:id',jwtCheck, deleteArticle )

 
module.exports = {articlesRoutes}