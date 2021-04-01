const Comment = require('../models/comment')
const Reply = require('../models/reply')
const Visitor = require('../models/visitor')
/**
 * 新增评论
 * @param Object comment,
 */
function insertComment(comment, res) {
  console.log(comment)
  Comment.create({
    VisitorVId: comment.VisitorVId,
    content: comment.content,
    ArticleId: comment.articleId
  })
    .then((data) => {
      console.log(JSON.stringify(data))
      res.send({
        data: {
          data
        },
        meta: {
          msg: '添加成功',
          status: 200
        }
      })
    })
    .catch((error) => {
      console.log(JSON.stringify(error))
      res.send({
        data: {},
        meta: {
          msg: '添加失败',
          status: 500
        }
      })
    })
}
/**
 * 获取评论
 */
function getComment (res) {
  Comment.findAndCountAll(
    {
      where: {
        ArticleId: null,
      },
       include: [
          {
            model: Visitor
          },
          {
            model: Reply,
            include: [
              { model: Visitor, as: 'from' },
              { model: Visitor, as: 'to' }
              // where:''
            ]
          }
      ]
    }
  ).then(data => {
    res.send({
      data: data,
      meta: {
        msg: '获取成功',
        status:200
      }
    })
  }).catch(error => {
    res.send({
      data: null,
      meta: {
        msg: '获取失败',
        status:500
      }
    })
  })
}
module.exports = {
  insertComment,
  getComment
}
