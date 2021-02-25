var express = require('express')
var router = express.Router()
var adminDao = require('../DAOs/AdminDao')
router.post('/login', (req, res, next) => {
  console.log('管理员登录')
  adminDao.login(req.body, res)
})
module.exports = router
