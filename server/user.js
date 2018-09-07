const express = require('express')
const utils = require('utility')
const Router = express.Router()

const models = require('./model')
const User = models.getModel('user')
const _filter = {'pwd':0,'_v':0}

Router.get('/list', (req, res) => {
  // User.remove({}, (e, d) => {})
  User.find({}, (err, doc) => {
    return res.json(doc)
  })
})

Router.post('/login', (req, res) => {
  const {user, pwd} = req.body
  // {pwd:0} 是为了让返回的数据中不含pwd字段
  User.findOne({user, pwd:md5Pwd(pwd)}, {pwd:0}, (err,doc) => {
    if (!doc) {
      return res.json({code:1, msg:'用户名或密码错误'})
    }
    // 设置cookie
    res.cookie('userid', doc._id)
    return res.json({code:0,data:doc})
  })
})

Router.post('/register', (req, res) => {
  const {user, pwd, type} = req.body
  User.findOne({user: user}, (err, doc) => {
    if (doc) {
      return res.json({code:1, msg:'用户名重复'})
    }
    // 这样的新增数据方法可以拿到id
    const userModel = new User({user,pwd:md5Pwd(pwd),type})
    userModel.save((e,d) => {
      if (e) {
        return res.json({code:1,msg:'服务器出错了'})
      }
      const {user, type, _id} = d
      res.cookie('userid', _id)
      return res.json({code:0,data:{user, type, _id}})
    })
    // User.create({user,pwd:md5Pwd(pwd),type}, (e, d) => {
    //   if (e) {
    //     return res.json({code:1, msg: '服务器出错了'})
    //   }
    //   return res.json({code:0, msg:'注册成功'})
    // })
  })
})

Router.get('/info', (req, res) => {
  const {userid} = req.cookies
  if(!userid) {
    return res.json({code:1})
  }
  User.findOne({_id:userid}, _filter, (err,doc) => {
    if (err) {
      return res.json({code:1, msg:'后端出错了'})
    } 
    if (doc) {
      return res.json({code:0, data:doc})
    }
  })
})

// md5 加盐加密
function md5Pwd(pwd) {
  // 随意写一个字符串，增加密码的复杂程度
  const salt = 'li_zi_fan64639/66@?>_+_+ADFDAF~~'
  // 双重加密，增加密码的复杂度
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router 