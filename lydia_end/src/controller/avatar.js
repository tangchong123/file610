const multer = require('@koa/multer')
const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const { parse } = require('querystring')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let query = parse(req.url.split('?')[1])

		let filepath = path.join(
			__dirname,
			'../public/avatar/temp/',
			query.name
		)
		if (!fs.existsSync(filepath)) {
			fs.mkdirSync(filepath)
		}

		cb(null, filepath)

		// cb(null, path.join(__dirname, '../public/upload/'))
	},
	filename: function (req, file, cb) {
		let query = parse(req.url.split('?')[1])

		cb(null, `${query.index}-${query.name}`)

		// cb(null, `${Date.now()}-${file.originalname}`)
	},
})

const upload = multer({
	storage,
})

function uploadFile(ctx) {
	ctx.msg = ' 上传成功'
    // console.log(ctx);
	ctx.data = `/avatar/${ctx.file.filename}`
}

function uploadChunk(ctx) {
	ctx.data = 'ok'
}

async function mergeChunk(ctx) {
	let { name, filename, size } = ctx.request.body

	let filepath = path.join(__dirname, '../public/avatar/temp/', String(name))

	let fileList = fs.readdirSync(filepath)
	fileList.sort((a, b) => a.split('-')[0] - b.split('-')[0])

	let files = fileList.map((name) => path.join(filepath, name))

	await merge(filename, files, size)

	// 合并后删除保存切片的目录
	fse.rmdirSync(filepath)

	ctx.data = `/avatar/${filename}`
}

function merge(filename, files, size) {
	return new Promise(async (resolve) => {
		let newPath = path.join(__dirname, '../public/avatar/', filename)

		// 并发写入文件
		await Promise.all(
			files.map((chunkPath, index) =>
				pipeStream(
					chunkPath,
					// 根据 size 在指定位置创建可写流
					fse.createWriteStream(newPath, {
						start: index * size,
					})
				)
			)
		)

		resolve()
	})
}

// 写入文件流
const pipeStream = (path, writeStream) =>
	new Promise((resolve) => {
		const readStream = fse.createReadStream(path)
		readStream.on('end', () => {
			fse.unlinkSync(path)
			resolve()
		})
		readStream.pipe(writeStream)
	})

module.exports = {
	uploadFile,
	upload,
	uploadChunk,
	mergeChunk,
}
