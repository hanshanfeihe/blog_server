const { DataTypes, Model } = require('sequelize')
const sequelize = require('../db')
const moment = require('moment')
const Reply = require('../models/reply')
// const moment = require('moment')
class Comment extends Model {}
Comment.init(
  {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      // defaultValue: 1000,
      unique: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adminComment: {
      type: DataTypes.STRING
    },
    parentCommentId: {
      type: DataTypes.INTEGER
    },
    ArticleId: {
      type: DataTypes.INTEGER,
      field: 'article_id'
    },
    VisitorVId: {
      type: DataTypes.INTEGER,
      field: 'v_id'
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('createdAt')).format(
          'YYYY-MM-DD HH:mm:ss'
        )
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('updatedAt')).format(
          'YYYY-MM-DD HH:mm:ss'
        )
      }
    }
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comment'
    // timestamps: false //禁用此模型自动生成时间
  }
)
Comment.hasMany(Reply)
Reply.belongsTo(Comment, {
  foreignKey: 'parent_id'
})
module.exports = Comment
