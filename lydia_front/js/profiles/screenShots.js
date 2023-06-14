window.onload = function() {
    let user = JSON.parse(localStorage.getItem("user") || "{}")

    let tos = document.querySelectorAll(".to>li")
    let froms = document.querySelectorAll(".from>li")
    let avatarCt = document.querySelector(".nav>.avatar>img")
    let nicknameCt = document.querySelector(".nickname")
    let titleCt = document.querySelector(".nav_bar>.edit")
    
    let preIdx = 0

    function init() {
        avatarCt.src = user.avatar
        nicknameCt.innerHTML = user.nickname
    }
    init()

    tos.forEach((to,index)=> {
        to.onclick = function() {
            froms[index].style.display = "block"
            froms[preIdx].style.display = "none"
            this.classList.add("active")
            tos[preIdx].classList.remove("active")

            titleCt.innerHTML = tos[index].innerHTML
            preIdx = index
        }
    })
}