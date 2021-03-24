var express = require('express')
var router = express.Router()
var articleDao = require('../DAOs/ArticleDao')
var Jwt = require('../controller/JWT')
/**
 * 新增文章
 */
router.post('/insertarticle',Jwt.checkToken, (req, res, next) => {
  console.log('我被请求了')
  articleDao.insertArticle(req.body, res)
  // res.send('ok')
})
router.get('/getarticle', (req, res, next) => {
  console.log('获取文章')
  articleDao.findArticle(req,res)
})
router.get('/getnewarticle', (req, res, next) => {
  console.log('获取最新文章')
  articleDao.getNewArticle(req,res)
})
router.delete('/deletearticle', (req, res, next) => {
  console.log(req.query)
  articleDao.deleteArticle(req.query.id, res)
})
router.get('/findarticlebyid', (req, res, next) => {
  console.log(req.query)
  articleDao.findArticleById(req.query, res)
})
router.put('/updatearticle',Jwt.checkToken,(req, res, next) => {
  console.log('更新文章')
  articleDao.updateArticle(req.body, res)
})
module.exports = router
