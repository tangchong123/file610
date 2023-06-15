const multer = require('@koa/multer')
const path = require('path')
const {PORT} =require('../../config')

// 配置
const storage = multer.diskStorage({
  // 存放位置
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../public/upload/'))
	},
  // 文件
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`)
	},
})
const upload = multer({
  storage
})
async function handlerUpload(ctx){
  if(ctx.file){
    return ctx.body = {
      code:200,
      msg:'上传成功',
      data:{
        url:`http://localhost:${PORT}/upload/${ctx.file.filename}`
      }
    }
  }
  return ctx.body = {
    code:400,
    msg:'上传失败',
    data:null
  }
}

module.exports = {
  upload,
  handlerUpload
}