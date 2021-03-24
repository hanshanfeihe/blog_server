var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var fs = require('fs')
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var articleRouter = require('./routes/article')
var sortRouter = require('./routes/sort')
var tagRouter = require('./routes/tag')
var commentRouter = require('./routes/comment')
var visitorRouter = require('./routes/visitor')
var replyRouter = require('./routes/reply')
var adminRouter = require('./routes/admin')
var uploadRouter = require('./routes/upload')
var aboutInfoRouter = require('./routes/aboutInfo')
var app = express()
// 解决跨域
app.all('*', function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*')
  response.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With,Content-Type, Accept, Authorization,token'
  )
  response.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  response.header('X-Powered-By', '3.2.1')
  next()
})
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/article', articleRouter)
app.use('/upload', uploadRouter)
app.use('/sort', sortRouter)
app.use('/tag', tagRouter)
app.use('/comment', commentRouter)
app.use('/visitor', visitorRouter)
app.use('/reply', replyRouter)
app.use('/admin', adminRouter)
app.use('/aboutinfo',aboutInfoRouter)
app.get('/uploads/*', (req, res) => {
  console.log(__dirname + '/' + req.url)
  fs.readFile(__dirname + '/' + req.url, (err, data) => {
    if (!err) {
      console.log('获取成功')
      res.write(data)
      res.end()
    } else {
      console.log('获取失败')
      res.send('获取失败')
    }
  })
  console.log('Request for ' + req.url + ' received.')
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
