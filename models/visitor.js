const { DataTypes, Model } = require('sequelize')
const sequelize = require('../db')
const moment = require('moment')
const Comment = require('../models/comment')
const Reply = require('../models/reply')
class Visitor extends Model {}
Visitor.init(
  {
    v_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
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
    modelName: 'Visitor',
    tableName: 'visitor'
    // timestamps: false //禁用此模型自动生成时间
  }
)
Visitor.hasMany(Comment)
Comment.belongsTo(Visitor)
Visitor.hasMany(Reply, {
  foreignKey: 'from_id'
})
Visitor.hasMany(Reply, { foreignKey: 'to_id' })
Reply.belongsTo(Visitor, {
  foreignKey: 'to_id',
  as: 'to'
})
Reply.belongsTo(Visitor, {
  foreignKey: 'from_id',
  as: 'from'
})
module.exports = Visitor
