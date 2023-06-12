window.onload = function(){
    let user = JSON.parse(localStorage.getItem("user")||"{}")
    let historyName = JSON.parse(localStorage.getItem("historyName") || `["还没有旧名哦"]`)
    let mainBox = document.querySelector("#main_box")

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

        // 渲染留言信息
        let {data} = await getMessage()
        console.log(data);
        
    }
    init()

    // 获取所有的留言信息
    async function getMessage() {
        let {data} = await axios({
            method: "GET",
            headers:{
                Authorization: `Bearer ${localStorage.token}`
            },
            url: `http://localhost:8080/profiles/message/${user.id}`,
        })
        return data
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

    // 

}