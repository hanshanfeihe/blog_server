const Admin = require('../models/admin')
const jwtCtrl = require('../controller/JWT')
/**
 * 管理员登录
 */
function login(admin, res) {
  if (admin) {
    console.log(admin)
    Admin.findOne({
      where: {
        username: admin.username,
        password: admin.password
      }
    })
      .then((data) => {
        console.log(JSON.stringify(data))
        if (data != null) {
          res.send({
            data: {
              token: jwtCtrl.setToken(data)
            },
            meta: {
              msg: '登录成功',
              status: 200
            }
          })
        } else {
          res.send({
            data: {},
            meta: {
              msg: '登录失败',
              status: 500
            }
          })
        }
      })
      .catch((error) => {
        console.log(error)
        res.send({
          data: {},
          meta: {
            msg: '登录失败',
            status: 500
          }
        })
      })
  }
}
module.exports = {
  login
}
