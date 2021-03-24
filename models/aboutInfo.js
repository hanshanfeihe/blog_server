const { DataTypes, Model } = require('sequelize')
const sequelize = require('../db')
const moment = require('moment')
class AboutInfo extends Model{ }
AboutInfo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1001,
      primaryKey:true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull:false
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
    modelName: 'AboutInfo',
    tableName: 'aboutInfo',
    // timestamps: false //禁用此模型自动生成时间戳
  }
)
module.exports = AboutInfo