var express = require('express')
var router = express.Router()
var commentDao = require('../DAOs/CommentDao')
router.post('/insertcomment', (req, res, next) => {
  console.log('新增评论')
  commentDao.insertComment(req.body, res)
})
router.get('/getcomment', (req, res, next) => {
  console.log("获取留言")
  commentDao.getComment(res)
})
module.exports = router
