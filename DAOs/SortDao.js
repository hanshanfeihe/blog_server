const { Sequelize } = require('../db')
const Sort = require('../models/sort')
const { Op } = require('sequelize')
const Article = require('../models/article')
/**
 * 添加分类
 * @params sort,res
 */
function insertSort(sort, res) {
  console.log(sort)
  Sort.create(sort)
    .then((data) => {
      console.log(JSON.stringify(data))
      res.send({
        meta: {
          status: 200,
          msg: '添加成功'
        }
      })
    })
    .catch((error) => {
      console.log(error)
      res.send({
        data: '',
        meta: {
          status: 500,
          msg: '添加失败'
        }
      })
    })
}
/**
 * 获取所有分类列表
 *@return Array
 */
function getAllSorts (req, res) {
  console.log(req.query);
  let count = parseInt(req.query.count)
  let currentPage = parseInt(req.query.page)
  if (!req.query.count) {
     Sort.findAll({
    include: [
      {
        model: Article
      },
    ],
  })
    .then((data) => {
      console.log(JSON.stringify(data))
      res.send({
        data: JSON.stringify(data),
        meta: {
          status: 200,
          msg: '获取成功'
        }
      })
    })
    .catch((error) => {
      console.log(error)
      res.send({
        data: '',
        meta: {
          status: 500,
          msg: '获取失败'
        }
      })
    })
  } else {
     Sort.findAll({
    include: [
      {
        model: Article
         },
       ],
       limit:count,
       offset:(currentPage-1)*count
  })
    .then((data) => {
      console.log(JSON.stringify(data))
      res.send({
        data: JSON.stringify(data),
        meta: {
          status: 200,
          msg: '获取成功'
        }
      })
    })
    .catch((error) => {
      console.log(error)
      res.send({
        data: '',
        meta: {
          status: 500,
          msg: '获取失败'
        }
      })
    })
  }
}
/**
 * 删除分类
 * @params sort_id
 */
function deleteSortById(id, res) {
  Sort.destroy({
    where: {
      sort_id: id
    }
  })
    .then((data) => {
      console.log(JSON.stringify(data))
      res.send({
        meta: {
          status: 200,
          msg: '删除成功'
        }
      })
    })
    .catch((error) => {
      console.log(error)
      res.send({
        meta: {
          status: 500,
          msg: '删除失败'
        }
      })
    })
}
/**
 * 更新分类
 * @params sort
 */
function updateSort(sort, res) {
  Sort.update(
    { sort_name: sort.sort_name },
    { where: { sort_id: sort.sort_id } }
  )
    .then((data) => {
      console.log(JSON.stringify(data))
      res.send({
        meta: {
          status: 200,
          msg: '更新成功'
        }
      })
    })
    .catch((error) => {
      console.log(error)
      res.send({
        meta: {
          status: 500,
          msg: '更新失败'
        }
      })
    })
}
/**
 * 模糊查询分类
 * @params sort_name
 */
function findSortByName(sort_name, res) {
  Sort.findAll({
    where: {
      sort_name: {
        //模糊查询
        [Op.like]: '%' + sort_name + '%'
      }
    }
  })
    .then((data) => {
      console.log(JSON.stringify(data))
      res.send({
        data: JSON.stringify(data),
        meta: {
          status: 200,
          msg: '查找成功'
        }
      })
    })
    .catch((error) => {
      console.log(error)
      res.send({
        data: '',
        meta: {
          status: 500,
          msg: '查找失败'
        }
      })
    })
}
// insertSort(sort)
module.exports = {
  getAllSorts,
  insertSort,
  deleteSortById,
  updateSort,
  findSortByName
}
