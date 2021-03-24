var express = require('express')
var router = express.Router()
var AboutInfoDao = require('../DAOs/AboutInfoDao')
/**
 * 新增关于本站信息
 */
router.post('/insertaboutinfo', (req, res, next) => {
  console.log('添加关于本站信息')
  AboutInfoDao.insertAboutInfo(req,res)
})
/**
 * 获取内容
 */
router.get('/getaboutinfo', (req, res, next) => {
  console.log('获取关于本站内容');
  AboutInfoDao.getAboutInfo(res)
})
/**
 * 更新内容
 */
router.put('/updateaboutinfo', (req, res, next) => {
  console.log('修改关于本站信息')
  AboutInfoDao.updateAboutInfo(req,res)
})
module.exports = router