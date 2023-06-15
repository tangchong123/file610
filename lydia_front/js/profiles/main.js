window.onload = function(){
    let user = JSON.parse(localStorage.getItem("user")||"{}")
    let historyName = JSON.parse(localStorage.getItem("historyName") || `[""]`)

    let mainBox = document.querySelector("#main_box")
    let clearold_popup_window = mainBox.querySelector(".popup_window_clearold")
    let text_format_popup_window = mainBox.querySelector(".popup_window_text_format")
    let message_listCt = mainBox.querySelector(".message_list>.message_list_Ct")
    let pagination = mainBox.querySelector(".pagination")
    let seeAllMessageBtn = mainBox.querySelector(".see")
    let addMessageIpt = mainBox.querySelector(".addMessageIpt")
    let addMessageBtn = mainBox.querySelector(".tools>.submit")
    let tools = mainBox.querySelector(".tools")
    let helpBtn = tools.querySelector(".help")
    let emjBtn = tools.querySelector(".emj")
    let emjArr = [  // 表情包数组
        {
            name: "steambored",
            src: "../../img/profile/e1.png"
        },
        {
            name: "steamfacepalm",
            src: "../../img/profile/e2.png"
        },
        {
            name: "steamhappy",
            src: "../../img/profile/e3.png"
        },
        {
            name: "steammocking",
            src: "../../img/profile/e4.png"
        },
        {
            name: "steamsad",
            src: "../../img/profile/e5.png"
        },
        {
            name: "steamsalty",
            src: "../../img/profile/e6.png"
        },
        {
            name: "steamthis",
            src: "../../img/profile/e7.png"
        },
        {
            name: "steamthumbsup",
            src: "../../img/profile/e8.png"
        },
        {
            name: "steamthumbsdown",
            src: "../../img/profile/e9.png"
        }
    ]
    let page = 1

    // 格式化时间 
    function formatTime(pastTime) {
        let dt = new Date(pastTime)
        let y = dt.getFullYear()
        let m = (dt.getMonth()+1+"").padStart(2,0)
        let d = (dt.getDate()+"").padStart(2,0)
        let hh = (dt.getHours()+"").padStart(2,0)
        let mm = (dt.getMinutes()+"").padStart(2,0)
        let ss = (dt.getSeconds()+"").padStart(2,0)
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }

    // 初始化信息。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
    async function init() {
        let userAvatar = mainBox.querySelectorAll(".avatar>img")
        let nicknameCt = mainBox.querySelectorAll(".nickname>span")
        let realnameCt = mainBox.querySelector(".realname")
        let infoIntroCt = mainBox.querySelector(".info_intro")

        
        // 渲染用户头像
        userAvatar.forEach(cur=> {
            cur.src = user.avatar
        })

        // 渲染用户昵称
        nicknameCt.forEach(cur=> {
            cur.innerHTML = user.nickname
        })

        // 渲染用户真名
        realnameCt.innerHTML = user.username

        // 渲染用户自我介绍
        infoIntroCt.innerHTML = user.intro

        // 渲染离线状态和等级 需要什么？？？？？。。。。。。。。。。。。。。。
        // 离线状态取决于 用户在客户端Steam登录状态
        // 等级取决于获取徽章数
        let {data} = await getMessage(page)
        initMessage(data)
    }
    init()

    // 初始化留言信息
    async function initMessage(data) {
        // 先清除留言列表
        message_listCt.innerHTML = ""
        data.result.forEach((message,index)=> {

            // 转换表情包
            let content = message.content
            let contentArr = content.split(":")
            let ename = contentArr[1]
            for(let i=0;i<emjArr.length;i++) {
                if(ename==emjArr[i].name) {
                    let img = `<img src=${emjArr[i].src}>`
                    content = contentArr[0]+img+contentArr[2]
                }
            }

            let str = `
            <div class="list">
                <div class="message_avatar">
                    <img src="${user.avatar}" alt="">
                </div>
                <div class="content_box">
                    <div class="content_top">
                        <a href="#" class="message_nickname">${message.nickname}</a>
                        <span class="past_time">${formatTime(message.createTime)}</span>
                    </div>
                    <div class="content">${content}</div>
                </div>
                <div class="del">
                    <img class="delImg" data-index=${index} src="../../img/profile/trash.png" alt="">
                    <div class="del_hint">删除</div>
                </div>
            </div>
            `
            message_listCt.innerHTML+=str
        })

        // 分页器和查看所有流言的显隐
        if(data.total<5) {  // 隐藏
            // pagination.forEach(p=> {
                pagination.style.visibility = "hidden"
            // })
            seeAllMessageBtn.style.display = "none"
        }else {  // 渲染并显示
            // pagination.forEach(p=> {
                pagination.style.visibility = "visible"
            // })
            initPagination(data)
            seeAllMessageBtn.style.display = "block"
            let seeMessageNum = seeAllMessageBtn.querySelector("i")
            seeMessageNum.innerHTML = data.total
        }
    }

    // 初始化分页器
    function initPagination(data) {
        let len = Math.ceil(data.total/data.size)
        if(len<1) {
            len = 0
        }
        // pagination.forEach(p=> {
            pagination.children[1].innerHTML = ""
            // 渲染分页器
            for(let i=1;i<=len;i++) {
                let li = document.querySelector("li")
                li.innerHTML = i
                pagination.children[1].appendChild(li)
            }
        // })
    }
    

    // 清除用户旧名 和 点击表情包
    function clearUserOldName() {
        let userInfo = mainBox.querySelector(".container .top .user_info")
        let oldInfo = userInfo.querySelector(".old_info")
        let oldNameContainer = oldInfo.querySelector(".old_name_container")
        let emj_list = emjBtn.querySelector(".emj_list")
        

        mainBox.onclick = function(e) {
            // 清除用户旧名
            if(e.target.matches(".showClearOldName")) {
                // 先清空
                oldNameContainer.innerHTML = ""
                // 初始化 清除页
                historyName.forEach(cur=> {
                    let li = document.createElement("li")
                    li.innerHTML = cur
                    oldNameContainer.appendChild(li)
                })
                // 显示清除页
                oldInfo.style.display = "block"

                // 弹出 确定窗口
                let clearOld = oldInfo.querySelector(".clear_old")
                clearOld.onclick = function() {
                    clearold_popup_window.style.display = "block"
                }

                // 点叉叉和取消 退出
                let no = clearold_popup_window.querySelector(".no")
                let n = clearold_popup_window.querySelector(".n")
                no.onclick = function() {
                    clearold_popup_window.style.display = "none"
                }
                n.onclick = function() {
                    clearold_popup_window.style.display = "none"
                }

                // 点确定 清空historyName 并关闭窗口
                let y = clearold_popup_window.querySelector(".y")
                y.onclick = function() {
                    // 先清空localStorage里面的
                    localStorage.removeItem("historyName")
                    clearold_popup_window.style.display = "none"
                    historyName = ["还没有旧名哦"]
                }
            }else {
                // 隐藏清除页
                oldInfo.style.display = "none"
            }

            // 点击表情包
            if(e.target.matches(".img1")||e.target.matches(".emj")) {
                e.target.onclick = function() {
                    emj_list.style.visibility = "visible"
                }
            }else {
                emj_list.style.visibility = "hidden"
            }
            // 点击里面的某个表情包, 将其放入textarea中?????????????????????
            // addMessageIpt.value+=e.target.innerHTML
            // console.log(e.target);
            // 用字体图标实现  在textarea中写入字体图标url ，在渲染到留言列表
        }
    }
    clearUserOldName()

      

    // 点击编辑个人资料按钮
    let edit_profile_btn = mainBox.querySelector(".self_profile>.edit_profile")
    edit_profile_btn.onclick = function() {
        location.href = "../../html/profile/editPage.html"
    }

    // 点击分页器事件 ????????? 页数显示不正确
    // pagination.forEach(p=> {
        pagination.onclick = async function(e) {
            let {data} =await getMessage()
            let total = data.total
            let size = data.size
            // 点击上一页
            if(e.target.matches(".prev")) {
                page--
                if(page<=1) {
                    e.target.disabled = true
                    e.target.nextElementSibling.nextElementSibling.disabled = false
                    page=1
                }
                init()
            }

            // 点击下一页
            if(e.target.matches(".next")) {
                page++
                if(page>=Math.ceil(total/size)) {
                    e.target.disabled = true
                    e.target.previousElementSibling.previousElementSibling.disabled=false
                    page=Math.ceil(total/size)
                }
                init()
            }
        }
    // })

    // 判断留言框是否有内容
    addMessageIpt.oninput = function() {
        let content = addMessageIpt.value
        if(content.trim()=="") {
            tools.style.visibility = "hidden"
        }else {
            tools.style.visibility = "visible"
        }
    }
    // 添加留言
    
    addMessageBtn.onclick = async function() {
        let content = addMessageIpt.value
        await addMessage(content,user.nickname)
        addMessageIpt.value = ""
        tools.style.visibility = "hidden"
        init()
    }

    // 删除留言
    message_listCt.onclick = async function(e) {
        if(e.target.className=="delImg") {
            let {data} = await getMessage(page)
            let index = e.target.getAttribute("data-index")
            let id = data.result[index].createTime
            await removeMessage(id)
            init()
        }
    }

    // 点击格式帮助 弹窗弹出
    helpBtn.onclick = function() {
        text_format_popup_window.style.display = "block"
        let text_format_no = text_format_popup_window.querySelector(".text_format_no")
        let text_format_y = text_format_popup_window.querySelector(".text_format_y")
        text_format_no.onclick = function() {
            text_format_popup_window.style.display = "none"
        }
        text_format_y.onclick = function() {
            text_format_popup_window.style.display = "none"
        }
    }

    // 发送表情包
    let emjList = emjBtn.querySelector(".emj_list")
    emjList.onclick = function(e) {
        if(e.target.matches(".emj_img")) {
            addMessageIpt.value += e.target.nextElementSibling.children[1].children[0].innerHTML
        }
    }

    


    



    // **************************接口***********************************
    // 获取所有的留言信息
    async function getMessage(page=1) {
        let {data} = await axios({
            method: "GET",
            headers:{
                Authorization: `Bearer ${localStorage.token}`
            },
            url: `http://localhost:8080/profiles/message/${user.id}?page=${page}`,
        })
        return data
    }  

    // 增加留言
    async function addMessage(content,nickname) {
        let {data} = await axios({
            method: "POST",
            headers:{
                Authorization: `Bearer ${localStorage.token}`
            },
            url: `http://localhost:8080/profiles/message/${user.id}`,
            data: {
                content,
                nickname
            }
        })
        return data
    }

    // 删除留言
    async function removeMessage(id) {
        let {data} = await axios({
            method: "DELETE",
            headers:{
                Authorization: `Bearer ${localStorage.token}`
            },
            url: `http://localhost:8080/profiles/message/${id}`,
        })
        return data
    }

}