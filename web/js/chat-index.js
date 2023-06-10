let app = new Vue({
    el: "#app",
    data: {
        msg: "index页面msg",
        isLoading: true,
        userInfo:{
            nickName:"abc",
            avatar:"https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg",
            state:"在线",
            friendsList:[11,22,33,44]
             
        }
    },
    watch: {

    },
})