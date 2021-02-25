const Comment = require('../models/comment')
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
module.exports = {
  insertComment
}
