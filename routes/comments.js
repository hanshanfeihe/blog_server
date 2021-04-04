var express = require('express')
var router = express.Router()
var commentsDao = require('../DAOs/CommentsDao')
router.post('/insertcomments', (req, res, next) => {
  console.log('新增评论')
  commentsDao.insertComment(req, res)
})
router.get('/getcomments', (req, res, next) => {
  console.log('获取评论')
  commentsDao.getComment(req, res)
})
router.get('/getallcomments', (req, res, next) => {
  console.log('获取所有评论')
  commentsDao.getAllComment(req, res)
})
module.exports = router