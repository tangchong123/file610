window.onload = function(){
    let user = JSON.parse(localStorage.getItem("user")||"{}")
    let historyName = JSON.parse(localStorage.getItem("historyName") || `["还没有旧名哦"]`)
    let mainBox = document.querySelector("#main_box")
    let message_listCt = mainBox.querySelector(".message_list>.message_list_Ct")
    let pagination = mainBox.querySelectorAll(".pagination")
    let seeAllMessageBtn = mainBox.querySelector(".see")
    let addMessageIpt = mainBox.querySelector(".addMessageIpt")
    let addMessageBtn = mainBox.querySelector(".tools>.submit")
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
        return `${y} 年 ${m} 月 ${d} 日  ${hh}:${mm}:${ss}`
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
        data.result.forEach(message=> {
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
                    <div class="content">${message.content}</div>
                </div>
                <div class="del">
                    <img src="../../img/profile/trash.png" alt="">
                    <div class="del_hint">删除</div>
                </div>
            </div>
            `
            message_listCt.innerHTML+=str
        })

        // 分页器和查看所有流言的显隐
        if(data.total<5) {  // 隐藏
            pagination.forEach(p=> {
                p.style.display = "none"
            })
            seeAllMessageBtn.style.display = "none"
        }else {  // 渲染并显示
            pagination.forEach(p=> {
                p.children[1].innerHTML = ""
                // 渲染分页器
                for(let i=1;i<=Math.ceil(data.total/data.size);i++) {
                    let li = document.querySelector("li")
                    li.innerHTML = i
                    p.children[1].appendChild(li)
                }
            })
            let seeMessageNum = seeAllMessageBtn.querySelector("i")
            seeMessageNum.innerHTML = data.total
        }
    }

    // 清除用户旧名
    function clearUserOldName() {
        let userInfo = mainBox.querySelector(".container .top .user_info")
        let oldInfo = userInfo.querySelector(".old_info")
        let oldNameContainer = oldInfo.querySelector(".old_name_container")
        let clearold_popup_window = mainBox.querySelector(".popup_window_clearold")

        mainBox.onclick = function(e) {
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

        }
    }
    clearUserOldName()

      

    // 点击编辑个人资料按钮
    let edit_profile_btn = mainBox.querySelector(".self_profile>.edit_profile")
    edit_profile_btn.onclick = function() {
        location.href = "../../html/profile/editPage.html"
    }

    // 点击分页器事件 ????????? 页数显示不正确
    function paginnationClick(i) {
        pagination[i].onclick = async function(e){
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
    }
    paginnationClick(0)
    paginnationClick(1)

    // 添加留言
    addMessageBtn.onclick = async function() {
        let content = addMessageIpt.value
        let {data} = await addMessage(content,user.nickname)
        addMessageIpt.value = ""
        init()
    }

    // 点击格式帮助 弹窗弹出


    



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

}