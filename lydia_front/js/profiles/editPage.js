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
    let uploadUrl = null

    // 取消按钮
    avatarCancelBtn.onclick = function() {
        console.log("cancel");
    }

    // 上传头像
    uploadBtn.onchange = function() {
        let file = this.files[0]
        let src = window.URL.createObjectURL(file)
        imgCts.forEach(img=> {
            img.src=src
        })
    }
    
    // 保存按钮 即 头像上传提交按钮
    avatarSaveBtn.onclick = async function() {
        let file = uploadBtn.files[0]
        if(!file) {
            return alert("您未选择任何文件！")
        }
        let formData = new FormData()
        formData.append("file",file)
        let data = await uploadFile(formData)
        uploadUrl = data
        
        console.log(data);
        // let data = await 
        // let {data} = await updateUsers()
        // 写到localStorage
        // user.avatar = data.avatar
        // localStorage.setItem("user",JSON.stringify(user))
        

        init()
    }
    



// *******************************请求接口************************************
    // 更新用户信息接口
    async function updateUsers(username,nickname,intro,avatar) {
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
                avatar
            }
        })
        return data
    }  

    // 上传头像
    async function uploadFile() {
        let data = await axios({
            method: "POST",
            headers:{
                Authorization: `Bearer ${localStorage.token}`
            },
            url: `http://localhost:8080/profiles/upload`,
        })
        return data
    }

}