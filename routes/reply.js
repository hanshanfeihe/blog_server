var express = require('express')
var router = express.Router()
var ReplyDao = require('../DAOs/ReplyDao')
router.post('/insertreply', (req, res, next) => {
  console.log('新增回复')
  ReplyDao.insertReply(req.body, res)
})
module.exports = router
