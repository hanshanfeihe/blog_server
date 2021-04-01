const Visitor = require('../models/visitor')
/**
 * 新增游客
 */
function insertVisitor (visitor, res) {
  Visitor.findOne({
    where: {
      email:visitor.email
    }
  }).then(v => {
    console.log(JSON.stringify(v));
    if (v.email) {
      res.send(
        {
          data: v,
           meta: {
          status: 200,
          msg: '新增成功'
        }
        }
      )
    } else {
       Visitor.create(visitor)
    .then((data) => {
      console.log(JSON.stringify(data))
      res.send({
        data: data,
        meta: {
          status: 200,
          msg: '新增成功'
        }
      })
    })
    .catch((error) => {
      console.log(error)
      res.send({
        data: {},
        meta: {
          status: 500,
          msg: '新增失败'
        }
      })
    })
    }
  }).catch(error=>{
    console.log(error);
     res.send({
        data: {},
        meta: {
          status: 500,
          msg: '新增失败'
        }
      })
  })
}
/**
 * 获取游客信息
 * @param v_id
 */
function getVisitor(v_id, res) {
  if (v_id) {
    Visitor.findOne({
      where: {
        v_id: v_id
      }
    })
      .then((data) => {
        console.log(JSON.stringify(data))
        res.send({
          data: data,
          meta: {
            msg: '获取游客信息成功',
            status: 200
          }
        })
      })
      .catch((error) => {
        console.log(error)
        res.send({
          data: {},
          meta: {
            msg: '获取游客信息失败',
            status: 500
          }
        })
      })
  }
}
// const visitor = {
//   nickname: '仰望星空的人',
//   email: '206361841@qq.com',
//   avatar: 'http://q1.qlogo.cn/g?b=qq&nk=206361841&s=100'
// }
// insertVisitor(visitor)
module.exports = {
  insertVisitor,
  getVisitor
}
