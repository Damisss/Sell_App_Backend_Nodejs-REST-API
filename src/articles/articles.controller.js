const {Article} = require('./articles.model')
const httpStatus = require('http-status')
const {User} = require('../users/users.models')

exports.getArticles = async (req, res)=>{
    try {
        const articles = await Article.find()
        return res.status(httpStatus.OK).json(articles)
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(error)
    }
}
exports.postArticle  = async (req, res)=>{
    
   try {
    const article =  new Article({...req.body, seller: req.user._id, articleImage: req.file.path})
       await article.save()
        req.user._articles(article._id)
       return res.status(httpStatus.OK).json(article)
   } catch (error) {
       return res.status(httpStatus.BAD_REQUEST).json(error)
   }
}
exports.updateArticle = async (req, res)=>{
   try {
      
    const {id} = req.params
    const article = await Article.findById(id)
    if(!article.seller.equals(req.user._id)){
        return res.status(httpStatus.NOT_FOUND).json('Such article doesn\'t exist')
    }
    for(let key in req.body){
        article[key]=req.body[key]
    }
    if( req.file.path ){
        article.articleImage = req.file.path
      }
     await article.save()
    return res.status(httpStatus.OK).json(article)
   } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(error)
   }
}
exports.deleteArticle = async (req, res)=>{
    try {
        const {id} = req.params
        const article = await Article.findById(id)
        if(!article.seller.equals(req.user._id)){
            return res.status(httpStatus.NOT_FOUND).json('Such article doesn\'t exist')
        }
        // if(!article){
        //     return res.status(httpStatus.NOT_FOUND).json('Such article doesn\'t exist')
        // }
        await article.remove()
        return res.status(httpStatus.OK).json(article) 
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(error) 
    }
}
