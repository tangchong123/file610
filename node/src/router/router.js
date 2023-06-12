// 定义路由
const Router = require('@koa/router')
const router = new Router()
const {indexController} = require('../controller/export')

router.prefix('/api')
router
  .get('/getBanner/:limit',indexController.getBanner)
  .get('/getSale',indexController.getSale)
module.exports = router