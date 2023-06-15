/**
 * 定义路由
 */
const Router = require('@koa/router')
const router = new Router()
const { userController, } = require('./controller/index.js')

//设置接口域名
router.prefix('/api')

router.get('/', (ctx) => {
	ctx.body = 'ok'
})

// 用户模块
router
	.get('/users', userController.find)
	.post('/register', userController.add)
	.post('/login', userController.login)
	.delete('/users/:id', userController.delete) // ctx.request.params

// memo 模块
// 获取数据列表（搜索接口）
// 添加
// 删除
// 修改

module.exports = router
