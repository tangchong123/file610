window.onload = function() {
    let user = JSON.parse(localStorage.getItem("user") || "{}")

    let avatarCt = document.querySelector(".nav>.avatar>img")
    let nicknameCt = document.querySelectorAll(".nickname")
    let moreBtn = document.querySelector(".more")
    function init() {
        avatarCt.src = user.avatar
        nicknameCt.forEach(item=> {
            item.innerHTML = user.nickname
        })
    }
    init()

    document.onclick = function(e) {
        if(e.target.matches(".m")) {
            moreBtn.children[2].style.display = "block"
        }else {
            moreBtn.children[2].style.display = "none"
        }
    }
}