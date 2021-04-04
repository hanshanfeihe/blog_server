var express = require('express')
var router = express.Router()
var commentDao = require('../DAOs/CommentDao')
router.post('/insertcomment', (req, res, next) => {
  console.log('新增评论')
  commentDao.insertComment(req.body, res)
})
router.get('/getcomment', (req, res, next) => {
  console.log("获取留言")
  commentDao.getComment(req,res)
})
router.get('/getsortcomment', (req, res, next) => {
  console.log("按分类获取留言")
  commentDao.getSortComment(req,res)
})
router.get('/getallcomment', (req, res, next) => {
  console.log("获取所有评论")
  commentDao.getAllComment(req,res)
})
module.exports = router
