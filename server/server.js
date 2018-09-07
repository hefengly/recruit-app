const express = require('express')
const userRouter = require('./user')

const app = express()
app.use('/user', userRouter)
 
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})
app.listen(9093, () => {
    console.log('服务器启动啦')
})