const ArticleTag = require('../models/acticleTag')
const Article = require('../models/article')
const Sort = require('../models/sort')
const Tag = require('../models/tag')
const Comment = require('../models/comment')
const Visitor = require('../models/visitor')
const Reply = require('../models/reply')
// //创建实例
// const article = Article.build({
//   // id: 1001,
//   title: '测试标题',
//   content: '<p>test</p>',
//   sord_id: 1,
//   status: 1
// })
//获取所有数据
function findArticle(res) {
  Article.findAll({
    include: [
      { model: Sort, attributes: ['sort_name'] },
      { model: Tag, attributes: ['tag_id', 'tag_name'] },
      {
        model: Comment,
        attributes: ['content', 'createdAt']
      }
    ]
  })
    .then((article) => {
      console.log(JSON.stringify(article))
      res.send({
        data: JSON.stringify(article),
        meta: {
          status: 200,
          msg: '获取成功'
        }
      })
    })
    .catch((err) => {
      console.log(err)
      res.send({
        data: '',
        meta: {
          status: 500,
          msg: '获取失败'
        }
      })
    })
}
//新增文章
function insertArticle(article, res) {
  Article.create(article)
    .then((data) => {
      Tag.findAll({
        where: {
          tag_id: article.selectTagIds
        }
      }).then((data2) => {
        data
          .setTags(data2)
          .then((data3) => {
            console.log(data3)
            res.send({
              meta: {
                status: 200,
                msg: '添加成功'
              }
            })
          })
          .catch((error) => {
            console.log(error)
          })
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
 * 删除文章
 * @params id
 */
function deleteArticle(id, res) {
  Article.destroy({
    where: {
      id: id
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
 * 查找文章
 * @params id
 */
function findArticleById(id, res) {
  console.log(id)
  Article.findOne({
    where: {
      id: id.id
    },
    include: [
      Sort,
      { model: Tag, attributes: ['tag_id', 'tag_name'] },
      {
        model: Comment,
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
        ],
        attributes: ['comment_id', 'content', 'createdAt']
      }
    ]
  })
    .then((article) => {
      console.log(JSON.stringify(article))
      res.send({
        data: JSON.stringify(article),
        meta: {
          status: 200,
          msg: '获取成功'
        }
      })
    })
    .catch((err) => {
      console.log(err)
      res.send({
        data: '',
        meta: {
          status: 500,
          msg: '获取失败'
        }
      })
    })
}
/**
 * 更新文章
 * @params article
 */
async function updateArticle(articleForm, res) {
  const article = await Article.findOne({
    where: {
      id: articleForm.id
    }
  })
  article.update(articleForm)
  if (articleForm.selectTagIds && articleForm.selectTagIds.length) {
    console.log(articleForm.selectTagIds)
    let tags = await Tag.findAll({
      where: {
        tag_id: articleForm.selectTagIds
      }
    })
    console.log(JSON.stringify(tags))
    article
      .setTags(tags)
      .then((data) => {
        res.send({
          data: {},
          meta: {
            msg: '更新成功',
            status: 200
          }
        })
      })
      .catch((error) => {
        res.send({
          data: {},
          meta: {
            mag: '更新失败',
            status: 200
          }
        })
      })
  }
}
module.exports = {
  findArticle,
  insertArticle,
  deleteArticle,
  findArticleById,
  updateArticle
}
