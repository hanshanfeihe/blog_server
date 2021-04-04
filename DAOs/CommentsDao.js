const Comments = require('../models/comments');
const Visitor = require('../models/visitor');
const Article = require('../models/article')
/**
 * 新增评论
 */
function insertComment (req, res) {
  console.log(req.body);
  Comments.create(
    {
      content: req.body.content,
      v_id: req.body.v_id,
      articleId: req.body.articleId,
      parentId: req.body.parentId,
      to_id: req.body.to_id,
      p_id:req.body.p_id
    }
  ).then(data => {
    res.send({
      data: null,
      meta: {
        status: 200,
        msg:'评论成功'
      }
    })
  }).catch(error => {
    console.log(error)
    res.send(
      {
          data: null,
      meta: {
        status: 500,
        msg:'评论失败'
      }
      }
    )
  })
}
/**
 * 加载评论
 */
function getComment (req, res) {
  console.log(req.query);
  Comments.findAndCountAll(
    {
      where: {
        parentId: null,
        articleId:req.query.articleId
      },
      include: [
        {
          model: Visitor,
        },
        {
          model: Comments,
          as: 'children',
          include: [
            {
              model: Visitor,
            },
            {
              model: Visitor,
              as:'to'
            }
          ]
        }
      ],
    }
  ).then(data => {
    res.send({
      data: data,
      meta: {
        status: 200,
        msg:'获取成功'
      }
    })
    }).catch(error => {
      console.log(error);
      res.send({
        data: null,
        meta: {
          status: 500,
          msg:'获取失败'
        }
      })
  })
}
/**
 * 获取所有评论
 */
function getAllComment (req, res) {
  console.log(req.query);
  Comments.findAndCountAll(
    {
      include: [
        {
          model: Visitor,
        },
        {
          model: Article,
          attributes:['title']
        },
      ],
    }
  ).then(data => {
    res.send({
      data: data,
      meta: {
        status: 200,
        msg:'获取成功'
      }
    })
    }).catch(error => {
      console.log(error);
      res.send({
        data: null,
        meta: {
          status: 500,
          msg:'获取失败'
        }
      })
  })
}
/**
 * 删除评论
 */
function deleteComment (req, res) {
  console.log(req.query);
  if (req.query.parentId === null) {
     Comments.destroy(
    {
      where: {
        $or: [
          {
            parentId:req.query.articleId
          },
          {
            id:req.query.id
          }
        ]
      }
    }
  ).then(data => {
    res.send({
      data: null,
      meta: {
        status: 200,
        msg:'删除成功'
      }
    })
  }).catch(error => {
    console.log(error);
    res.send({
      data: null,
      meta: {
        sttsus: 500,
        msg:'删除失败'
      }
    })
  })
  } else {
    Comments.destroy(
      {
        where: {
          p_id:req.query.id
        },
      }
    )
  }
 
}
module.exports = {
  insertComment,
  getComment,
  getAllComment
}