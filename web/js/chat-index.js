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
        isShowSetting:false,
        friendsSetting:[
            "好友列表","聊天","大小与缩放","通知","语音"
        ],
        settingActivateIndex:3,
        notifyList: [
            "好友加入游戏时","好友上线时","收到直接聊天信息时","收到聊天室通知时","组活动与公告"
        ],
        voiceInputDevice: [
            "default"
        ],
        voiceInputDeviceIndex:0,
        voiceOutDevice:[
            "default"
        ],
        voiceOutDeviceIndex:0,
        activateMicrophone:1

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
        changeAvatar(){},
        toAddFriend(){
            window.location.href = "../html/add_friends.html"
        },
        ShowSetting(){
            this.isShowSetting = !this.isShowSetting
        },
        changeNotify(i){
            this.settingActivateIndex = i
        },
        changeVoiceInputDevice(i){
            this.voiceInputDeviceIndex  = i
        },
        changeVoiceOutDevice(i){
            this.voiceOutDeviceIndex  = i
        },
        changeMicrophone(i){
            this.activateMicrophone = i
        },
        cancelSetting(){
            this.isShowSetting = false
            console.log("aaa")
        }

     },
    watch: {

    },
})