const { DataTypes, Model } = require('sequelize')
const sequelize = require('../db')
const Article = require('./article')
const Tag = require('./tag')
const moment = require('moment')
class ArticleTag extends Model {}
ArticleTag.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    articleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Article,
        key: 'id'
      }
    },
    tagId: {
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
        key: 'tag_id'
      }
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
    modelName: 'ArticleTag',
    tableName: 'tag_article_mapping',
    // timestamps: false //禁用此模型自动生成时间戳
  }
)
// ArticleTag.sync({ force: false })
// Article.belongsToMany(Tag, { through: 'ArticleTag' })
// Tag.belongsToMany(Article, { through: 'ArticleTag' })
Tag.belongsToMany(Article, {
  through: {
    model: ArticleTag
  },
  foreignKey: 'tagId'
  // targetKey: 'tag_id'
})
Article.belongsToMany(Tag, {
  through: {
    model: ArticleTag
  },
  foreignKey: 'articleId'
})
module.exports = ArticleTag
