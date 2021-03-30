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
/** 
 * 修改用户名和密码
*/
function setLoginForm (loginForm, res) {
  console.log(loginForm);
  Admin.update(
    {
     username: loginForm.username,
      password: loginForm.password,
    },
    {
       where: {
        id:loginForm.id
        }
    }
  ).then(data => {

    res.send(
      {
        data: null,
        meta: {
          msg: '修改成功',
          status:200
        }
      }
    )
  }).catch(error => {
    console.log(error);
    res.send(
      {
        data: null,
        meta: {
          msg: '修改失败',
          status:500
        }
      }
    )
  })
}
/**
 *修改展示信息
 */
function setBlogerInfo (blogerInfo, res) {
  console.log(blogerInfo);
  Admin.update(
    {
      git: blogerInfo.git,
      weibo: blogerInfo.weibo,
      avatar: blogerInfo.avatar,
      name:blogerInfo.name
    },
    {
       where: {
        id:blogerInfo.id
        }
    }
  ).then(data => {

    res.send(
      {
        data: null,
        meta: {
          msg: '修改成功',
          status:200
        }
      }
    )
  }).catch(error => {
    console.log(error);
    res.send(
      {
        data: null,
        meta: {
          msg: '修改失败',
          status:500
        }
      }
    )
  })
}

/** 
 * 获取用户名和密码
*/
function getLoginForm (res) {
  Admin.findOne(
  ).then(data => {
    console.log(JSON.stringify(data));
    res.send({
      data: data,
      meta: {
        status: 200,
        msg:'获取用户名和密码成功'
      }
    })
  }).catch(error => {
    console.log('报错信息',error);
     res.send({
      data: null,
      meta: {
        status: 500,
        msg:'获取用户名和密码失败'
      }
    })
  })
}
/**
 * 编辑博主身份信息
 */
function updateBlogerInfo (admin, res) {
  Admin.update(admin).then(data => {
    res.send({
      data: {},
      meta: {
        status: 200,
        msg:'更新信息成功'
      }
    })
  }).catch(
    res.send({
      data: {},
      meta: {
        status: 500,
        msg:'更新信息失败'
      }
    })
  )
}
module.exports = {
  login,
  updateBlogerInfo,
  getLoginForm,
  setLoginForm,
  setBlogerInfo
}
