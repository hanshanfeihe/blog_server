const express = require('express')
const router = express.Router()
// const http = require('http')
const fs = require('fs')
const path = require('path')
const request = require('request')
//上传图片的模板
var multer = require('multer')
//生成的图片放入uploads文件下
var upload = multer({ dest: 'uploads/images' })
let data = {
  data: {
    imgPath: '',
    url: ''
  },
  meta: {
    msg: '',
    status: ''
  }
}
router.post('/uploadimg', upload.single('file'), (req, res) => {
  console.log(req.file)
  if (!req.file) {
    // console.log(req.file)
    const imgURL = req.body.url
    console.log(path.extname(imgURL))
    let reg = '[^/]+(?!.*/)'
    let pattern = new RegExp(reg)
    let filename = imgURL.match(pattern)[0]
    console.log(path.join(__dirname + '/../uploads/contentImages/' + filename))
    console.log(filename)
    request.head(imgURL, (err, resd, body) => {
      // console.log(req.path)
      // if (res) {
      //   fs.writeFile()
      // }
      request(imgURL).pipe(
        fs.createWriteStream(
          path.join(__dirname + '/../uploads/contentImges/' + filename)
        )
      )
      res.status(200).send({
        data: {
          originPath: imgURL,
          imgPath: '/uploads/contentImges' + filename,
          url: 'http://127.0.0.1:3000/uploads/contentImges/' + filename
        },
        meta: {
          status: 200,
          msg: '上传成功'
        }
      })
    })
  } else {
    // console.log(imgURL)

    // fs.readFile(imgURL, (error, data) => {
    //   if (error) {
    //     console.log(error)
    //     console.log('读取错误')
    //   } else {
    //     console.log(path.extname(req.body.url))
    //   }
    // })
    // if (!req.file) {
    //    const extname = path.extname(req.body.url.originalname)
    // }
    const extname = path.extname(req.file.originalname)
    const filename = req.file.filename + extname
    // //读取文件(图片)
    // fs.readFile(req.file.path, (err, data) => {
    //   //读取失败，说明没有上传成功
    //   if (err) {
    //     return res.send('上传失败')
    //   } else {
    //     fs.writeFile(path.join(__dirname,'/images'))
    //   }
    // })
    fs.rename(
      req.file.path,
      path.join(path.dirname(req.file.path), filename),
      (error) => {
        if (!error) {
          console.log(1)
          data.data.imgPath = '/uploads/images/' + filename
          data.data.filename = filename
          data.data.url = 'http://127.0.0.1:3000/uploads/images/' + filename
          data.meta.msg = '上传成功'
          data.meta.status = 200
          res.status(200).send(data)
        } else {
          res.status(500).send('上传失败')
        }
      }
    )
  }
})
module.exports = router
