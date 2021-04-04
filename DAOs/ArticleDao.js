const ArticleTag = require('../models/acticleTag')
const Article = require('../models/article')
const Sort = require('../models/sort')
const Tag = require('../models/tag')
const Comment = require('../models/comment')
const Visitor = require('../models/visitor')
const Reply = require('../models/reply')
const { Sequelize } = require('../db')
const { Op } = require('sequelize')
const { create, sequelize } = require('../models/reply')
// //创建实例
// const article = Article.build({
//   // id: 1001,
//   title: '测试标题',
//   content: '<p>test</p>',
//   sord_id: 1,
//   status: 1
// })
//获取所有数据
function findArticle (req,res) {
   let count = parseInt(req.query.count)
  let currentPage = parseInt(req.query.page)
  if (count) {
    Article.findAll({
    include: [
      { model: Sort, attributes: ['sort_name'] },
      { model: Tag, attributes: ['tag_id', 'tag_name'] },
      ],
       limit:count,
       offset:(currentPage-1)*count
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
  } else {
     Article.findAll({
    include: [
      { model: Sort, attributes: ['sort_name'] },
      { model: Tag, attributes: ['tag_id', 'tag_name'] },
      ],
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
 
}
// 获取最新文章 5篇
function getNewArticle (req, res) {
  Article.findAll({
    attributes:['id','title','create_time'],
    include: [
      { model: Sort, attributes: ['sort_name'] },
    ],
    order: ['create_time'],
    limit:5
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
//获取日期分类
function getYearMonth (res) {
  console.log('测试');
  Article.findAll(
    {
      group: [Sequelize.fn('date_format',Sequelize.col('Article.create_time'),'%y-%m')],
      attributes: [[Sequelize.fn('date_format', Sequelize.col('Article.create_time'), '%Y-%m'), 'date']],
    }
  ).then(date => {
    res.send(
      {
        data: JSON.stringify(date),
        meta: {
          status: 200,
          msg:'获取日期分类成功'
        }
     }
    )
  }).catch(error => {
    console.log(error);
    res.send(
      {
        data: null,
        meta: {
          status: 500,
          msg: '获取日期分类失败'
        }
      }
    )
  }
  )
}
//根据年-月获取文章
function getDateArticle (req, res) {
  console.log(req.query.date);
  sequelize.query(
    "select id,title,create_time from article as Article where date_format(create_time,'%Y-%m') = ?",
    {
        type: Sequelize.QueryTypes.SELECT, //指定查询类型
      replacements:[req.query.date]
    }
  ).then(data => {
    console.log(JSON.stringify(data));
    res.send({
      data: data,
      meta: {
        status: 200,
        msg:'获取成功'
      }
    })
  }).catch(
    error => {
      console.log(error);
       res.send({
      data: null,
      meta: {
        status: 500,
        msg:'获取失败'
      }
    })
    }
  )
}
//分类获取文章
function findSortArticle (req, res) {
  console.log(req.query);
   let count = parseInt(req.query.count)
  let currentPage = parseInt(req.query.page)
  if (count) {
    Article.findAndCountAll({
      limit:count,
       offset:(currentPage-1)*count,
      where: {
        SortSortId: req.query.sort_id
      },
      distinct: true,
      include: [
      {
        model: Sort, attributes: ['sort_name'], where: {
        sort_id:req.query.sort_id
      } },
      { model: Tag, attributes: ['tag_id', 'tag_name'] },
      ],
  
  })
    .then((article) => {
      console.log(JSON.stringify(article))
      res.send({
        data:article,
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
  } else {
    Article.findAndCountAll({
        where: {
        SortSortId:req.query.sort_id
    },
    include: [
      { model: Sort, attributes: ['sort_name'] },
      {
        model: Tag, attributes: ['tag_id', 'tag_name'] },
      ],
  })
    .then((article) => {
      console.log(JSON.stringify(article))
      res.send({
        data: article,
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
 * 按标签查找文章
 */
function gettagarticle (req, res) {
  console.log(req.query);
   let count = parseInt(req.query.count)
  let currentPage = parseInt(req.query.page)
  if (count) {
    Article.findAndCountAll({
    include: [
      { model: Sort, attributes: ['sort_name'] },
      {
        model: Tag, attributes: ['tag_id', 'tag_name'], where: {
        tag_name:req.query.tag_name
      } },
      ],
       limit:count,
       offset:(currentPage-1)*count
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
  } else {
    Article.findAndCountAll({
    include: [
      { model: Sort, attributes: ['sort_name'] },
      {
        model: Tag, attributes: ['tag_id', 'tag_name'],where: {
        tag_name:req.query.tag_name
      }  },
      ],
  })
    .then((article) => {
      console.log(JSON.stringify(article))
      res.send({
        data: article,
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
function updateArticle (articleForm, res) {
  console.log(articleForm);
   Article.findOne({
    where: {
      id: articleForm.id
    }
   }).then(article => {
     article.update(articleForm)
       Tag.findAll({
         where: {
           tag_id: articleForm.selectTagIds
         }
       }).then(tags => {
         console.log(tags);
         article.setTags(tags).then(data => {
           console.log(data);
           res.send({
          data: {},
          meta: {
            msg: '更新成功',
            status: 200
          }
        })
         })
       }).catch(error => {
          res.send({
          data: {},
          meta: {
            mag: '更新失败',
            status: 200
          }
        })
       })
      })
}

module.exports = {
  findArticle,
  getNewArticle,
  insertArticle,
  deleteArticle,
  findArticleById,
  updateArticle,
  findSortArticle,
  gettagarticle,
  getYearMonth,
  getDateArticle
}
