const jwt = require('jwt-simple')
const Admin = require('../models/admin')
/**
 * 设置token
 * @param admin
 */
function setToken(admin) {
  return jwt.encode(admin, 'xykzzt') //返回token,jwt.encode('加密的对象','加密的密匙')
}
/**
 * 检查token
 * @param req,res,next
 */
function checkToken(req, res, next) {
  const token = req.headers.token //获取请求头携带过来的token值
  //如果token不存在
  if (!token) {
    res.send({
      data: {},
      meta: {
        status: 500,
        msg: 'no token'
      }
    })
    return
  }
  const t = jwt.decode(token, 'xykzzt') //存在token,进行解密
  //解密失败
  if (!t) {
    res.send({
      data: {},
      meta: {
        msg: '解密不成功',
        status: 500
      }
    })
    return
  }
  //如果解密成功，进行查询
  Admin.findOne({
    where: {
      id: t.id
    }
  })
    .then((r) => {
      req.TOKEN_ADMIN = r
      next()
    })
    .catch((error) => {
      res.send({
        data: {},
        meta: {
          status: 500,
          msg: 'token验证失败'
        }
      })
    })
}
module.exports = {
  setToken,
  checkToken
}
