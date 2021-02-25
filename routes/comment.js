var express = require('express')
var router = express.Router()
var commentDao = require('../DAOs/CommentDao')
router.post('/insertcomment', (req, res, next) => {
  console.log('新增评论')
  commentDao.insertComment(req.body, res)
})
module.exports = router
