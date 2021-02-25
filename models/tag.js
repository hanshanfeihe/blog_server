const { DataTypes, Model } = require('sequelize')
const sequelize = require('../db')
const moment = require('moment')
const ArticleTag = require('./acticleTag')
const Article = require('./article')
class Tag extends Model {}
Tag.init(
  {
    tag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false
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
    modelName: 'Tag',
    tableName: 'tag'
    // timestamps: false //禁用此模型自动生成时间戳
  }
)

module.exports = Tag
