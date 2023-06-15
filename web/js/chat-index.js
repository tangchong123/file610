let app = new Vue({
    el: "#app",
    data: {
        msg: "index页面msg",
        isLoading: true,
        userInfo: {
            nickName: "abc",
            avatar: "https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg",
            state: 0,
            friendsList: []
        },
        //控制显示隐藏内容
        isOnclick: false,
        isShowGroup: true,
        isShowStates: false,
        isShowCreateGroup: false,
        isShowChatBox:false,
        states: ["在线", "离开", "隐身", "请勿打扰"],
        groupName: "",
        newGroupName:"",
        inviteFriend: [
            {
                nickName: "abc",
                avatar: "https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg",
                state: 1,
                friendsList: []
            },
            {
                nickName: "a",
                avatar: "https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg",
                state: 0,
                friendsList: []
            },
            {
                nickName: "b",
                avatar: "https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg",
                state: 1,
                friendsList: []
            },
            {
                nickName: "c",
                avatar: "https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg",
                state: 0,
                friendsList: []
            },
            {
                nickName: "abcaa",
                avatar: "https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg",
                state: 1,
                friendsList: []
            },
            {
                nickName: "aa",
                avatar: "https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg",
                state: 0,
                friendsList: []
            },
            {
                nickName: "bb",
                avatar: "https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg",
                state: 1,
                friendsList: []
            },
            {
                nickName: "cc",
                avatar: "https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg",
                state: 0,
                friendsList: []
            }
        ],
        onlineFriend:0,
        isShowSetting: false,
        friendsSetting: [
            "好友列表", "聊天", "大小与缩放", "通知", "语音"
        ],
        chattingFriend:null,
        settingActivateIndex: 0,
        notifyList: [
            "好友加入游戏时", "好友上线时", "收到直接聊天信息时", "收到聊天室通知时", "组活动与公告"
        ],
        voiceInputDevice: [
            "default"
        ],
        voiceInputDeviceIndex: 0,
        voiceOutDevice: [
            "default"
        ],
        voiceOutDeviceIndex: 0,
        activateMicrophone: 1,
        messageList:[
            {
                avatar:"",
                content:"",
                time:""
            }
        ],
        //弹出框控制按钮样式
        changeNickName:false,
        groupFriend: true,
        hiddenFriend:false,
        hiddenKindFriend:true,
        ignoreState:true,
        noSrcImg:false,
        rememberMessage:true,
        showHours:true,
        noAnimation:true,
        simpleList: true,
        simpleLike:true,

        //拖拽接受event
        dragged :null

    },
    methods: {
        dragCommitStart(e,i){
            // console.log(e.target)
            this.dragged = e.target
        },
        // dragCommitEnd(e,i){
        //     console.log(e.target)
        // },
        targetDragOver(e){
            e.preventDefault();
        },
        targetDrag(e){
            e.preventDefault();
            e.target.appendChild(this.dragged);
            // console.log(this.dragged)
        },
        showGroup() {
            this.isShowGroup = !this.isShowGroup;
        },
        showStates() {
            this.isShowStates = !this.isShowStates
            let statesEl = document.querySelector(".states-box")
            statesEl.children[this.userInfo.state].style.color = "#6dcff6"
        },
        changeStates(event) {
            if (!event.target.getAttribute("i")) {
                return
            }
            let statesEl = document.querySelector(".states-box")

            statesEl.children[this.userInfo.state].style.color = "white"

            this.userInfo.state = event.target.getAttribute("i")
            event.target.style.color = "#6dcff6"
        },
        createGroup() {
            this.isShowCreateGroup = !this.isShowCreateGroup
        },
        cancelCreateGroup() {
            this.isShowCreateGroup = false
        },
        //换头像
        changeAvatar() {
            document.querySelector(".avatarInput").click()

        },
        uploadImg() {
            let files = document.querySelector(".avatarInput");
            //获取第一个文件内容
            let imgFile = files.files[0]
            // console.dir(imgFile.name)
            if (!/\.(jpg|png)$/.test(imgFile.name)) {
                alert("文件类型不正确")
                // this.uploadImg()
                return
            }
            let reader = new FileReader()
            reader.onload = function (event) {
                console.log(event.target.result)
            }
            let a = reader.readAsDataURL(imgFile)
            // console.log(a)
            // console.log(file.files)
        },
        toAddFriend() {
            window.location.href = "../html/add_friends.html"
        },
        ShowSetting() {
            this.isShowSetting = !this.isShowSetting
        },
        changeNotify(i) {
            this.settingActivateIndex = i
        },
        changeVoiceInputDevice(i) {
            this.voiceInputDeviceIndex = i
        },
        changeVoiceOutDevice(i) {
            this.voiceOutDeviceIndex = i
        },
        changeMicrophone(i) {
            this.activateMicrophone = i
        },
        cancelSetting() {
            this.isShowSetting = false
            console.log("aaa")
        },
        showChatBox(i){
            this.isShowChatBox = true
            if(this.chattingFriend != this.inviteFriend[i]){
                this.chattingFriend = this.inviteFriend[i]
            }
            // console.log(i)
        },
        sendInfo(){
            let messageEl = document.querySelector(".message-value")
            if(messageEl.value === ""){
                messageEl.placeholder = "信息不能为空"
                return
            }
            this.messageList.push({
                nickName:this.chattingFriend.nickName,
                avatar:this.userInfo.avatar,
                content: messageEl.value,
                data: new Date().format('yyyy-MM-dd hh:mm:ss')
            })
            messageEl.value = ""

        },


    },
    created(){
        this.inviteFriend.sort((a,b) => a.state - b.state)
        this.inviteFriend.forEach((item,index)=>{
            if(item.state === 0){
                this.onlineFriend +=1
            }
        })
        this.countFriends = this.inviteFriend.length
    },
    watch: {

    },
})