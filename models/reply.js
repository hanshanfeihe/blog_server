const { DataTypes, Model } = require('sequelize')
const sequelize = require('../db')
// const Visitor = require('../models/visitor')
const moment = require('moment')
class Reply extends Model {}
Reply.init(
  {
    reply_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    from_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    to_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    reply_content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CommentCommentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'parent_id'
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
    modelName: 'Reply',
    tableName: 'reply'
  }
)
// Reply.belongsTo(Visitor,{foreignKey:'to_id'})
module.exports = Reply
