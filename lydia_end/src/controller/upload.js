const multer = require("@koa/multer")
let path = require("path")

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,path.join(__dirname,"../public/upload/"))
    },
    filename: function(req,file,cb) {
        cb(null,file.fieldname+"-"+Date.now())
    }
})

const upload = multer({
    storage,
})

function uploadFile(ctx) {
    console.log(ctx.file);
    ctx.msg = "上传成功"
}

module.exports = {
    uploadFile,
    upload,
}