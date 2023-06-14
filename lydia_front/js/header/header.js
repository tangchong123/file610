window.onload = function() {
    let infoList = document.querySelector(".self_info>.info_list")
    document.onclick = function(e) {
        if(e.target.matches(".self")) {
            infoList.style.display = "block"
        }else {
            infoList.style.display = "none"
        }
    }
   
}