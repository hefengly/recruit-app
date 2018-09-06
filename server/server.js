const express = require('express')
const mongoose = require('mongoose')

// 链接mongo
const DB_URL = 'mongodb://127.0.0.1:27017/immoc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
    console.log('mongo connect success')
})

const app = express()
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/data', (req,res) => {
    res.json({name:'linzifan', type: 'xiaobai'})
})

app.listen(9093, () => {
    console.log('服务器启动啦')
})