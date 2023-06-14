window.onload = function() {
    let user = JSON.parse(localStorage.getItem("user")|| "{}")

    let headerCt = document.querySelector(".header_container")
    let avatarCt = headerCt.querySelector(".avatar>img")
    let infoList = document.querySelector(".self_info>.info_list")
    document.onclick = function(e) {
        if(e.target.matches(".self")) {
            infoList.style.display = "block"
        }else {
            infoList.style.display = "none"
        }
    }
    avatarCt.src = user.avatar
}