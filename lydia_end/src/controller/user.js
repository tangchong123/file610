const fs = require('fs');
const path = require('path')
const userPath =  path.join(__dirname, '../../data/user.json')
const userContent = fs.readFileSync(userPath,'utf8')
const userList = JSON.parse(userContent)

module.exports = {
    // 用户注册 body
    async register(ctx){
        let {username,password,email="",nickname=username} = ctx.request.body;

        if(!username || !password){
            return ctx.body = {
                code: 400,
                msg: '用户名或密码未填写',
                data: null
            }
        }

        let isExist = userList.some(user => user.username === username);

        if(isExist){
            return ctx.body = {
                code: 400,
                msg: '用户名已被使用，请更换后注册！',
                data: null
            }
        }
        let user = {
            id: Date.now(),
            username,
            nickname,
            password,
            avatar: "../src/public/avatar/large.jpg",
            email,
            intro: "未提供信息"
        }
        userList.push(user)
        fs.writeFileSync(userPath, JSON.stringify(userList,null,2))

        ctx.body = {
            code: 200,
            msg: 'ok',
            data: null
        }
    },

    // 用户登录 body
    async login(ctx){
        let {username,password} = ctx.request.body;

        if(!username || !password){
            return ctx.body = {
                code: 400,
                msg: '用户名或密码未填写',
                data: null
            }
        }

        let user = userList.find(user => user.username === username && user.password === password)

        if(!user){
            return ctx.body = {
                code: 400,
                msg: '用户名或密码错误',
                data: null
            }
        }

        ctx.body = {
            code: 200,
            msg: '登录成功',
            data: user
        }
    },

    // 删除用户 
    async delete(ctx){
        let {id} = ctx.request.params
        if(!userList.find(user=>user.id==id)) {
            return ctx.body = {
                code: 400,
                msg: "没有此用户, 删除失败！",
                data: userList
            }
        }
        // 删除用户
        let idx;
        userList.forEach((cur,index) => {
            if(cur.id==id) {
                idx = index
            }
        });
        userList.splice(idx,1)
        fs.writeFileSync(userPath,JSON.stringify(userList,null,2))
        ctx.body = {
            code: 200,
            msg: "删除用户成功",
            data: ctx.request.params
        }
    },

    // 查找用户
    async find(ctx){
        let {id} = ctx.request.params
        if(!userList.find(user=>user.id==id)) {
            return ctx.body = {
                code: 400,
                msg: "没有此用户, 查找失败！",
                data: userList
            }
        }
        // 返回查找到的用户的信息
        let info;
        userList.forEach((cur,index,userList) => {
            if(cur.id==id) {
                info = userList[index]
            }
        });
        ctx.body = {
            code: 200,
            msg: "查找用户成功",
            data: info
        }
    },

    // 更新用户信息 body
    async update(ctx) {
        let {id} = ctx.request.params
        let user = userList.find(user=>user.id==id)

        if(!user) {
            return ctx.body = {
                code: 400,
                msg: "此用户不存在！",
                data: null
            }
        }

        let {username=user.username,nickname=username,password=user.password,avatar=user.avatar,intro=user.avatar} = ctx.request.body

        // 更新用户信息
        user.username=username
        user.nickname=nickname
        user.password=password
        user.avatar=avatar
        user.intro=intro

        // 重新写入文件
        fs.writeFileSync(userPath,JSON.stringify(userList,null,2))

        ctx.body = {
            code: 200,
            msg: "ok",
            data: user
        }

    }
}