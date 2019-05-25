"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();
const Koa = require('koa')
const logger = require('koa-logger')
const formidable = require('formidable')
const koaBody = require('koa-body')
const util = require('util')
const path = require('path')
const staticCache = require('koa-static-cache')
const fs = require('fs')
var readDir = fs.readdirSync("./img");
// console.log(readDir);
// readDir.map(item=>{
//   console.log(item)

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/
// fs.readFile('./img/'+item,function(err, data){
//   if(err) console.log('写文件操作失败',err);
//   else{
//     console.log('写文件操作成功',data);
//     fs.writeFile('./img/teset.jpg', data,function(errs){
//       if(errs) console.log('写文件操作失败');
//       else console.log('写文件操作成功');
//     });
//   }
// });
// })
// 创建账号接口
router.post('/api', (req, res) => {
  console.log(req.body)
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
  let newAccount = new models.Login({
    account: req.body.account,
    password: req.body.password
  });
  // 保存数据newAccount数据进mongoDB
  newAccount.save((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send('createAccount successed');
    }
  });
});
// 图片上传
router.post('/img', (req, res) => {
  const form = new formidable.IncomingForm()
  form.encoding = 'utf-8';
  form.uploadDir = path.join(__dirname + "/img");
  form.keepExtensions = true;//保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;
  // form.uploadDir = "./uploads";
  form.parse(req, function (err, frelds, files) {
    var filename =files.tweetPic.name
    var nameArray = filename.split('.');
    var type = nameArray[nameArray.length - 1];
    var name = '';
    for (var i = 0; i < nameArray.length - 1; i++) {
      name = name + nameArray[i];
    }
    var date = new Date();
    var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
    var avatarName = name + time + '.' + type;
    var newPath = form.uploadDir + "/" + avatarName;

    fs.renameSync(files.tweetPic.path, newPath);  //重命名
    res.send({data:"/upload/"+avatarName,files:files})
  })
})
module.exports = router;
