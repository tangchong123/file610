window.onload = function() {
    let user = JSON.parse(localStorage.getItem("user") || "{}")

    let avatarCt = document.querySelector(".nav>.avatar>img")
    let nicknameCt = document.querySelector(".nickname")
    // let nicknameCt1 = document.querySelector(".nicknameCt1")
    // let nicknameCt2 = document.querySelector(".self_info>.nn")
    // nicknameCt1.innerHTML = user.nickname
    // nicknameCt2.innerHTML = user.nickname
    function init() {
        avatarCt.src = user.avatar
        nicknameCt.innerHTML = user.nickname
    }
    init()
}