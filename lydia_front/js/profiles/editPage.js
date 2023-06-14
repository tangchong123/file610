window.onload = function() {
    let user = JSON.parse(localStorage.getItem("user")||"{}")
    let historyName = JSON.parse(localStorage.getItem("historyName") || `["还没有旧名哦"]`)

    let editBox = document.querySelector(".edit_box")
    let left = editBox.querySelector(".left")
    let right = editBox.querySelector(".right")
    let to = left.querySelector(".to")
    let rights = right.querySelectorAll(".r")

    // 初始化页面数据
    function init() {
        let navCt = editBox.querySelector(".nav")
        navCt.children[0].children[0].src = user.avatar
        navCt.children[1].children[0].innerHTML = user.nickname
    }
    init()

    // 切换bar
    let preIdx = 0
    Array.from(to.children).forEach((bar,index)=> {
        bar.onclick = function() {
            rights[preIdx].style.display = "none"
            Array.from(to.children)[preIdx].classList.remove("active")
            rights[index].style.display = "block"
            Array.from(to.children)[index].classList.add("active")
            preIdx = index
        }
    })

    // 一般 页面============================================================
    let normalBox = right.querySelector(".normall_box")
    let normalCancelBtn = normalBox.querySelector(".cancel")
    let normalSaveBtn = normalBox.querySelector(".save")
    let nicknameIpt = normalBox.querySelector(".nickname>input")
    let realnameIpt = normalBox.querySelector(".realname>input")
    let selfUrlIpt = normalBox.querySelector(".self_url>input")
    let introIpt = normalBox.querySelector(".intro>textarea")
    
    // 取消按钮
    normalCancelBtn.onclick = function() {
        nicknameIpt.value = ""
        realnameIpt.value = ""
        selfUrlIpt.value = ""
        introIpt.value = ""
    }

    // 保存按钮
    normalSaveBtn.onclick = async function() {
        let {data} = await updateUsers(realnameIpt.value,nicknameIpt.value,introIpt.value)
        // 将nickname写到historyName
        historyName.push(data.nickname)
        localStorage.setItem("historyName",JSON.stringify(historyName))
        // 写到localStorage
        user.username = data.username
        user.nickname = data.nickname
        user.intro = data.intro
        localStorage.setItem("user",JSON.stringify(user))
        init()
    }

    // 头像 页面============================================================
    let avatarBox = right.querySelector(".avatar_box")
    let avatarCancelBtn = avatarBox.querySelector(".cancel")
    let avatarSaveBtn = avatarBox.querySelector(".save")
    let uploadBtn = avatarBox.querySelector("#upload")
    let imgCts = avatarBox.querySelectorAll(".imgCt")
    let avatarList = avatarBox.querySelectorAll(".avatar_list>li>.mask")
    let uploadUrl = null

    // 取消按钮
    avatarCancelBtn.onclick = function() {
        console.log("cancel");
    }

    // 上传头像
    uploadBtn.onchange = async function() {
        let file = uploadBtn.files[0]
        if(!file) {
            return alert("您未选择任何文件！")
        }
        let formData = new FormData()
        formData.append("file",file)
        // 显示图片
        let src = window.URL.createObjectURL(file)
        imgCts.forEach(img=> {
            img.src=src
        })
        // 给服务端发送数据  ?? 我获取不到data
        let data = await uploadFile(formData)
        uploadUrl = `http://localhost:8080${data}`
        // console.log(data);
    }

    // 点击您的头像 展示 保存更改为头像
    avatarList.forEach(item=> {
        item.onclick = function() {
            // 展示
            imgCts.forEach(img=> {
                img.src=this.previousElementSibling.src
            })
            // 更改头像
            uploadUrl = this.previousElementSibling.src
        }
    })

    
    // 保存按钮 即 头像上传提交按钮
    avatarSaveBtn.onclick = async function() {
        // 修改当前用户的头像为上传的头像
        let {data} = await updateAvatar(uploadUrl)
        user.avatar = data.avatar 
        localStorage.setItem("user",JSON.stringify(user))
        init()
    }
    



// *******************************请求接口************************************
    // 更新用户信息接口
    async function updateUsers(username,nickname,intro) {
        let {data} = await axios({
            method: "PATCH",
            headers:{
                Authorization: `Bearer ${localStorage.token}`
            },
            url: `http://localhost:8080/profiles/users/${user.id}`,
            data: {
                username,
                nickname,
                intro,
            }
        })
        return data
    }  

    // 更新用户头像接口
    async function updateAvatar(avatar) {
        let {data} = await axios({
            method: "PATCH",
            headers:{
                Authorization: `Bearer ${localStorage.token}`
            },
            url: `http://localhost:8080/profiles/users/${user.id}`,
            data: {
                avatar
            }
        })
        return data
    }  

}