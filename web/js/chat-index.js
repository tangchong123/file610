let app = new Vue({
    el: "#app",
    data: {
        msg: "index页面msg",
        isLoading: true,
        userInfo:{
            nickName:"abc",
            avatar:"https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg",
            state:0,
            friendsList:[]
        },
        //控制显示隐藏内容
        isOnclick:false,
        isShowGroup:true,
        isShowStates: false,
        isShowCreateGroup:false,
        states:["在线","离开","隐身","请勿打扰"],
        groupName:"",
        inviteFriend:[],

    },
    methods: {
        showGroup(){
            this.isShowGroup = !this.isShowGroup;
        },
        showStates(){
            this.isShowStates = !this.isShowStates
            let statesEl = document.querySelector(".states-box")
            statesEl.children[this.userInfo.state].style.color = "#6dcff6"
        },
        changeStates(event) {
            if(!event.target.getAttribute("i")){
                return
            }
            let statesEl = document.querySelector(".states-box")

            statesEl.children[this.userInfo.state].style.color = "white"

            this.userInfo.state = event.target.getAttribute("i")
            event.target.style.color = "#6dcff6"
         },
        createGroup(){
            this.isShowCreateGroup = !this.isShowCreateGroup
        },
        cancelCreateGroup(){
            this.isShowCreateGroup = false
        },
        //换头像
        changeAvatar(){}
     },
    watch: {

    },
})