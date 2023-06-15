let app = new Vue({ 
    el:"#app",
    data: {
        controlIndex:null,
        myFriendsCode:"123456789",
        friendsMenu:[
            {
                "icon":"../imgs/我的.png",
                "menu":"您的好友",
                "id":0
            },
            {
                "icon":"../imgs/group-add.png",
                "menu":"添加好友",
                "id":1
            },
            {
                "icon":"../imgs/邮件.png",
                "menu":"待处理邀请",
                "id":2
            },
            {
                "icon":"../imgs/屏蔽.png",
                "menu":"已屏蔽",
                "id":3
            },
            {
                "icon":"../imgs/倒计时.png",
                "menu":"近期共同游戏玩家",
                "id":4
            },
        ],
        focusing: [
            {
                "icon":"../imgs/我的关注.png",
                "menu":"关注的玩家",
                "id":5
            },
            {
                "icon":"../imgs/通知.png",
                "menu":"关注的游戏",
                "id":6
            },
        ],
        myGroups:[
            {
                "icon":"../imgs/group-add.png",
                "menu":"您的组",
                "id":7
            },
            {
                "icon":"../imgs/邮件.png",
                "menu":"待处理邀请",
                "id":8
            },
            {
                "icon":"../imgs/search.png",
                "menu":"查找组...",
                "id":9
            },
            {
                "icon":"../imgs/group-add.png",
                "menu":"创建组...",
                "id":10
            },
         ],
         friendsList:[],
     },
     created(){
        this.controlIndex = this.friendsMenu[0].id;
        // 获取用户信息
        this.userInfo={
            nickName:"abc",
            avatar:"https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg",
            state:0,
            friendsList:[]
        }
     },
     methods:{
        changeIndex(i){
            this.controlIndex = i 
        }
     }
    })