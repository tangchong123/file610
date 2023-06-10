const Koa = require('koa');
const {PORT,PUBLIC_PATH} = require('./config')
const router = require('./src/router/router')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const static = require('koa-static')

require('./src/utils/writeData')

// 跨域配置
app.use(cors())

// 静态资源配置
app.use(static(PUBLIC_PATH))

// 请求体数据解析
app.use(bodyParser())

// 匹配路由
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(PORT,()=>{
  console.log(`serve running at http://localhost:${PORT}`);
});