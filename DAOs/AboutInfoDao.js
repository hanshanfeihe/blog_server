const AboutInfo = require('../models/aboutInfo')
/**
 * 创建关于本站内容
 */
function insertAboutInfo (req, res) {
  console.log(req.body);
  if (req.body) {
    AboutInfo.create(
      req.body
    ).then(
      data => {
        res.send({
          data: {},
          meta: {
            status: 200,
            msg:'添加成功'
          }
        })
      }
    ).catch(error => {
      console.log(error);
      res.send(
        {
          data: {},
          meta: {
            status: 500,
            msg:'添加失败'
          }
        }
      )
    })
  }
}
/**
 * 获取内容
 */
function getAboutInfo (res) {
  AboutInfo.findAll().then(
    data => {
      res.send(
        {
          data: data,
          meta: {
            msg: '获取成功',
            status:200
          }
        }
      )
    }
  )
}
/**
 * 修改关于本站内容
 */
function updateAboutInfo (req, res) {
  if (req.body) {
    AboutInfo.findOne(
      {
        where: {
          id:req.body.id
        }
      }
    ).then(data => {
      AboutInfo.update(
        {
          content: req.body.content,
        },
        {
           where: {
          id:req.body.id
        }
        }
      ).then(
        data => {
          res.send(
            {
              data: {},
              meta: {
                msg: '保存成功',
                status:200
              }
            }
          )
        }
      )
    }).catch(error => {
      console.log(error);
       res.send(
            {
              data: {},
              meta: {
                msg: '保存失败',
                status:500
              }
            }
          )
    })
  }
}
module.exports = {
  insertAboutInfo,
  getAboutInfo,
  updateAboutInfo
}