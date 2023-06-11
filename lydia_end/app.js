const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const static = require('koa-static')
const {PORT,PUBLIC_PATH} = require('./config')
const router = require('./src/router')

const app = new Koa();


// 跨域配置
app.use(cors())

// 静态资源配置
app.use(static(PUBLIC_PATH))

// 请求体数据解析
app.use(bodyParser()) // ctx.request.body

// 匹配路由
app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
})