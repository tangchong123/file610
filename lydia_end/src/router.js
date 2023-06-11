/**
 * 定义路由
 */
const Router = require('@koa/router')
const router = new Router()
const userController = require('./controller/user')
const messageController = require("./controller/message")

router.prefix('/profiles')


// 用户模块
router
	.get('/users/:id', userController.find)
	.post('/register', userController.register)
	.post('/login', userController.login)
	.delete('/users/:id', userController.delete) // ctx.request.params
    .patch("/users/:id",userController.update)

// message 模块
// 获取数据列表（搜索接口）
// 添加
// 删除
// 修改
router
	.post('/message/:uid', messageController.add)
	.delete('/message/:id', messageController.remove)
	.patch('/message/:id', messageController.update)
    .get('/message/:uid', messageController.search)

module.exports = router
