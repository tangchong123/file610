window.onload = function() {
    let user = JSON.parse(localStorage.getItem("user") || "{}")

    let avatarCt = document.querySelector(".nav>.avatar>img")
    let nicknameCt = document.querySelector(".nickname")
    function init() {
        avatarCt.src = user.avatar
        nicknameCt.innerHTML = user.nickname
    }
    init()
}