const Reply = require('../models/reply')
/**
 * 新增评论回复
 */
function insertReply(reply, res) {
  console.log(reply)
  if (reply) {
    Reply.create(reply)
      .then((data) => {
        console.log(JSON.stringify(data))
        res.send({
          data: {},
          meta: {
            msg: '回复成功',
            status: 200
          }
        })
      })
      .catch((error) => {
        console.log(error)
        res.send({
          data: {},
          meta: {
            msg: '回复失败',
            status: 500
          }
        })
      })
  }
}
module.exports = {
  insertReply
}
