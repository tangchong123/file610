const multer = require("@koa/multer")
let path = require("path")

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,path.join(__dirname,"../public/upload/"))
    },
    filename: function(req,file,cb) {
        cb(null,Date.now()+"-"+file.originalname)
    }
})

const upload = multer({
    storage,
})

function uploadFile(ctx) {
    ctx.msg = "上传成功"
    ctx.data = `/upload/${ctx.file.filename}`
}

module.exports = {
    uploadFile,
    upload,
}