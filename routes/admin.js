var express = require('express')
var router = express.Router()
var adminDao = require('../DAOs/AdminDao')
router.post('/login', (req, res, next) => {
  console.log('管理员登录')
  adminDao.login(req.body, res)
})
router.put('/updateblogerinfo', (req, res, next) => {
  console.log('更新博主信息')
  adminDao.updateBlogerInfo(req.body, res)
})
router.put('/updateloginform', (req, res, next) => {
  console.log('更新登录信息')
  adminDao.setLoginForm(req.body, res)
})
router.put('/setblogerinfo', (req, res, next) => {
  console.log('更新博主展示的信息')
  adminDao.setBlogerInfo(req.body, res)
})
router.get('/loginform', (req, res, next) => {
  console.log('获取用户名和密码')
  adminDao.getLoginForm(res)
})
module.exports = router
