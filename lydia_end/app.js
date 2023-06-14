const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const static = require('koa-static')
const {PORT,PUBLIC_PATH,SECRET_KEY} = require('./config')
// const tojwt = require("jsonwebtoken")
// const fromjwt = require("koa-jwt")
const router = require('./src/router')

const app = new Koa();

// 全局响应
app.use(async (ctx, next) => {
	await next()

	if (ctx.body) return

	ctx.body = {
		code: ctx.code || (ctx.errMsg ? 400 : 200),
		msg: ctx.errMsg || ctx.msg || 'ok',
		data: ctx.data || null,
	}
})

// 错误捕获处理
app.use(async (ctx, next) => {
	try {
		await next()
	} catch (err) {
		console.log(err)

		// 数据库验证错误
		if (err.name == 'ValidationError') {
			let errs = []
			for (const errorsKey in err.errors) {
				// console.log(errorsKey, err.errors[errorsKey].properties.message)
				errs.push(err.errors[errorsKey].properties.message)
			}

			return (ctx.errMsg = errs.toString())
		}

		// token 验证错误
		if (err.status === 401) {
			ctx.code = 401
			ctx.errMsg = 'token 验证失败，请重新登录'
			return
		}

		ctx.code = 500
		ctx.errMsg = '服务端错误'
	}
})

// 跨域配置
app.use(cors())

// 静态资源配置
app.use(static(PUBLIC_PATH))

// JWT
// app.use(fromjwt({secret: SECRET_KEY}).unless({
//     path: ["/profiles/login","/profiles/register"]
// }))

// 请求体数据解析
app.use(bodyParser()) // ctx.request.body

// 匹配路由
app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
})