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
router.get('/getsortarticle', (req, res, next) => {
  console.log('获取分类文章')
  articleDao.findSortArticle(req,res)
})
router.get('/gettagarticle', (req, res, next) => {
  console.log('获取某个标签下的文章')
  articleDao.gettagarticle(req,res)
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
}),
router.get('/finddatesort', (req, res, next) => {
  console.log("获取按日期分类");
  articleDao.getYearMonth(res)
})
router.get('/findarticlebydate', (req, res, next) => {
  console.log("获取对应日期下的文章",req.query)
  articleDao.getDateArticle(req, res)
}),
router.put('/updatearticle',Jwt.checkToken,(req, res, next) => {
  console.log('更新文章')
  articleDao.updateArticle(req.body, res)
})
router.get('/getbloglist', (req, res, next) => {
  console.log('获取所有页面标题和id');
  articleDao.getBlogList(res)
})
module.exports = router
