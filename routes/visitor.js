var express = require('express')
var router = express.Router()
var visitorDao = require('../DAOs/VisitorDao')
router.post('/insertvisitor', (req, res, next) => {
  console.log('新增游客')
  visitorDao.insertVisitor(req.body, res)
})
module.exports = router
