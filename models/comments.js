const { DataTypes, Model } = require('sequelize')
const sequelize = require('../db')
const moment = require('moment')
class Comments extends Model { }
Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    articleId: {
      type: DataTypes.INTEGER,
    },
    v_id: {
      type: DataTypes.INTEGER,
    },
    to_id: {
      type: DataTypes.INTEGER,
    },
     parentId: {
       type: DataTypes.INTEGER,
    },
    p_id: {
        type: DataTypes.INTEGER,
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
    modelName: 'Comments',
    tableName: 'comments'
    // timestamps: false //禁用此模型自动生成时间
  }
)

Comments.hasMany(Comments, {
  foreignKey: 'parentId',
  as:'children'
})
module.exports = Comments