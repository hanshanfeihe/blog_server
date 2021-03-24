var express = require('express')
var router = express.Router()
var tagDao = require('../DAOs/TagDao')
/**
 * 获取标签列表
 */
router.get('/gettaglists', (req, res, next) => {
  console.log('获取标签列表')
  tagDao.getAllTags(req,res)
})
router.post('/inserttag', (req, res, next) => {
  console.log('新增标签')
  tagDao.insertTag(req.body, res)
})
router.delete('/deletetag', (req, res, next) => {
  console.log(req.query)
  tagDao.deleteTagById(req.query.id, res)
})
router.put('/updatetag', (req, res, next) => {
  console.log('更新标签')
  tagDao.updateTag(req.body, res)
})
router.get('/gettagbyname', (req, res, next) => {
  console.log('查找标签')
  tagDao.findTagByName(req.query.tag_name, res)
})
module.exports = router
