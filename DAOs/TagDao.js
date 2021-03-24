const Tag = require('../models/tag')
const { Op } = require('sequelize')
/**
 * 添加分类
 * @params tag,res
 */
function insertTag(tag, res) {
  console.log(tag)
  Tag.create(tag)
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
 * 获取所有标签列表
 *@return Array
 */
function getAllTags (req, res) {
  let count = parseInt(req.query.count)
  let currentPage = parseInt(req.query.page)
  console.log(req.query);
  if (!req.query.count) {
     Tag.findAll()
    .then((data) => {
      console.log(JSON.stringify(data))
      console.log('then')
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
    Tag.findAll(
      {
        limit: count,
        offset:(currentPage-1)*count
      }
     )
    .then((data) => {
      console.log(JSON.stringify(data))
      console.log('then')
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
 * 删除标签
 * @params tag_id
 */
function deleteTagById(id, res) {
  Tag.destroy({
    where: {
      tag_id: id
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
 * 更新标签
 * @params tag
 */
function updateTag(tag, res) {
  Tag.update({ tag_name: tag.tag_name }, { where: { tag_id: tag.tag_id } })
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
 * @params tag_name
 * @return type Array
 */
function findTagByName(tag_name, res) {
  Tag.findAll({
    where: {
      tag_name: {
        //模糊查询
        [Op.like]: '%' + tag_name + '%'
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
  getAllTags,
  insertTag,
  deleteTagById,
  updateTag,
  findTagByName
}
