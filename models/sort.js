const { DataTypes, Model } = require('sequelize')
const sequelize = require('../db')
const Article = require('./article')
const moment = require('moment')
const { Sequelize } = require('../db')
// const moment = require('momentjs')
class Sort extends Model {}
Sort.init(
  {
    sort_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    sort_name: {
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
    modelName: 'Sort',
    tableName: 'sort'
    // timestamps: false //禁用此模型自动生成时间戳
  }
)
//外键关联 一对多
Sort.hasMany(Article)
Article.belongsTo(Sort)
module.exports = Sort
