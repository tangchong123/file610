const fs = require('fs')
const path = require('path')

const userPath = path.join(__dirname, '../../data/user.json')
const userData = fs.readFileSync(userPath, 'utf8')
const userList = JSON.parse(userData)

const messagePath = path.join(__dirname, '../../data/message.json')
const messageData = fs.readFileSync(messagePath, 'utf8')
const messageList = messageData.length?JSON.parse(messageData):[]

const delMessagePath = path.join(__dirname, '../../data/delete_message.json')
const delMessageContent = fs.readFileSync(delMessagePath, 'utf8')
const delMessageList = delMessageContent.length?JSON.parse(delMessageContent):[]


module.exports = {
    // 添加留言 body
	async add(ctx) {
		let { uid } = ctx.request.params
		let { content, nickname} = ctx.request.body

		if (!uid || !content) {
			return (ctx.body = {
				code: 400,
				msg: '参数错误',
				data: null,
			})
		}
		let isUserExist = userList.find((user) => user.id == uid)
		if (!isUserExist) {
			return (ctx.body = {
				code: 400,
				msg: '此用户不存在',
				data: null,
			})
		}

		let message = {
			id: Date.now(),
			content: content,
			createTime: Date.now(),
			deleteTime: null,
			isDel: false,
            uid,
			nickname,
		}

		messageList.push(message)

		fs.writeFileSync(messagePath, JSON.stringify(messageList, null, 2))

		ctx.body = {
			code: 200,
			msg: 'ok',
			data: message,
		}
	},

    // 删除留言 
	async remove(ctx) {
		let { id } = ctx.request.params

		let messageIndex = messageList.findIndex((message) => message.id == id)

		if (messageIndex == -1) {
			return (ctx.body = {
				code: 400,
				msg: '不存在数据',
			})
		}

		let message = messageList.splice(messageIndex, 1)[0]

		message.deleteTime = Date.now()
        message.isDel = true
		delMessageList.push(message)

		fs.writeFileSync(messagePath, JSON.stringify(messageList, null, 2))
		fs.writeFileSync(delMessagePath, JSON.stringify(delMessageList, null, 2))

		ctx.body = {
			code: 200,
			msg: 'ok',
			data: null,
		}
	},

    // 更新留言 body (项目中用不上)
	async update(ctx) {
		let { id } = ctx.request.params
		let message = messageList.find((message) => message.id == id)

        if(!message) {
            return ctx.body = {
                code: 400,
                msg: "不存在此数据",
                data: null
            }
        }

		let { content = message.content} = ctx.request.body

		message.content = content

		fs.writeFileSync(messagePath, JSON.stringify(messageList, null, 2))

		ctx.body = {
			code: 200,
			msg: 'ok',
			data: message,
		}
	},

    // 查找留言 query
	async search(ctx) {
		let { uid } = ctx.request.params
		let { query = '', size = 5, page = 1 } = ctx.request.query

		let offset = (page - 1) * size

		let data = messageList.filter(
			(message) => message.content.includes(query) && message.uid == uid
		)

		data.sort((a, b) => b.createTime - a.createTime)

		ctx.body = {
			code: 200,
			msg: 'ok',
			data: {
				total: data.length,
				size,
				page,
				query,
				result: data.slice(offset, offset + size),
			},
		}
	}
}
