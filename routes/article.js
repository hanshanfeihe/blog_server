var express = require('express')
var router = express.Router()
var articleDao = require('../DAOs/ArticleDao')
/**
 * 新增文章
 */
router.post('/insertarticle', (req, res, next) => {
  console.log('我被请求了')
  articleDao.insertArticle(req.body, res)
  // res.send('ok')
})
router.get('/getarticle', (req, res, next) => {
  console.log('获取文章')
  articleDao.findArticle(res)
})
router.delete('/deletearticle', (req, res, next) => {
  console.log(req.query)
  articleDao.deleteArticle(req.query.id, res)
})
router.get('/findarticlebyid', (req, res, next) => {
  console.log(req.query)
  articleDao.findArticleById(req.query, res)
})
router.put('/updatearticle', (req, res, next) => {
  console.log('更新文章')
  articleDao.updateArticle(req.body, res)
})
module.exports = router
