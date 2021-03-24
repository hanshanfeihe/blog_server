var express = require('express')
var router = express.Router()
var sortDao = require('../DAOs/SortDao')
/**
 * 获取分类列表
 */
router.get('/getsortlists', (req, res, next) => {
  console.log('获取分类列表')
  sortDao.getAllSorts(req,res)
})
router.post('/insertsort', (req, res, next) => {
  console.log('新增分类')
  sortDao.insertSort(req.body, res)
})
router.delete('/deletesort', (req, res, next) => {
  console.log(req.query)
  sortDao.deleteSortById(req.query.id, res)
})
router.put('/updatesort', (req, res, next) => {
  console.log('更新分类')
  sortDao.updateSort(req.body, res)
})
router.get('/getsortbyname', (req, res, next) => {
  console.log('查找分类')
  sortDao.findSortByName(req.query.sort_name, res)
})
module.exports = router
