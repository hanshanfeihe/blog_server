const { DataTypes, Model } = require('sequelize')
const sequelize = require('../db')
const moment = require('moment')
class Admin extends Model {}
Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
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
    modelName: 'Admin',
    tableName: 'admin'
  }
)
module.exports = Admin
