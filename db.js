const { Sequelize } = require('sequelize')
const database = require('./database')
const sequelize = new Sequelize(
  database.database,
  database.name,
  database.password,
  {
    host: database.host,
    timezone: database.timezone,
    dialect: 'mysql',
    dialectOptions: {
         charset: "utf8mb4",
         collate: "utf8mb4_unicode_ci",
         supportBigNumbers: true,
         bigNumberStrings: true
    },
    logging: console.log // 默认值,显示日志函数调用的第一个参数
  }
)
sequelize
  .authenticate()
  .then(() => {
    console.log('成功连接数据库')
  })
  .catch((error) => {
    console.log('无法连接数据库', error)
  })
// async function test() {
//   try {
//     await sequelize.authenticate() //测试连接是否正常
//     console.log('成功连接数据库')
//   } catch (error) {
//     console.log('无法连接到数据库:', error)
//   }
// }
// async function closeConnection() {
//   await sequelize.close()
//   console.log('关闭连接')
// }
// test()
// closeConnection()
module.exports = sequelize
