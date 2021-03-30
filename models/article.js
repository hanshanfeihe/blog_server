const { DataTypes, Model } = require('sequelize')
const sequelize = require('../db')
const moment = require('moment')
const ArticleTag = require('./acticleTag')
const Comment = require('./comment')
const Tag = require('./tag')
const { options } = require('./reply')
class Article extends Model {}
Article.init(
  {
    //定义模型属性
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    SortSortId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'sort_id'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    blog_desc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    create_time: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('create_time')).format(
          'YYYY-MM-DD HH:mm:ss'
        )
      }
      // defaultValue:
      // allowNull: false
    },
    update_time: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('update_time')).format(
          'YYYY-MM-DD HH:mm:ss'
        )
      }
      // allowNull: false
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    }
  },
  {
    sequelize,
    modelName: 'Article',
    tableName: 'article',
    timestamps: false //禁用此模型自动生成时间戳
  }
)
// console.log(Article === sequelize.models.Article)
Article.hasMany(Comment)
Comment.belongsTo(Article)
module.exports = Article
