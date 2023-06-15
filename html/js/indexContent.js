const app = new Vue({
  el:'#app',
  data:{
    isLogin:true,
    canGetData:false,
    moreDataList:[],
    url:[],
    onSearch:false,
    searchKey:'',
    searchList:[],
    dataVaild:false
  },
  watch:{
    canGetData(val){
      if(val){
        this.getSingleData().then(res=>{
          let data = res.data.data
          this.dataHandler(data)
        })
      }
    }
  },
  created() {
    window.onscroll=()=>{
      if(window.scrollY>2800){
        if(this.isLogin){
          this.canGetData = true
        }
      }
    }
  },
  methods:{
    getSingleData(){
      return axios({
        method:'GET',
        url:`http://localhost:4400/api/getBanner/1`
      })
    },
    dataHandler(data){
      this.moreDataList.push(...data)
      let nowScrollY = window.scrollY
      renderPic()
      window.onscroll=()=>{
        if(window.scrollY-nowScrollY>260){
          nowScrollY = window.scrollY
          axios({
            method:'GET',
            url:`http://localhost:4400/api/getBanner/1`
          }).then(res=>{
            let data = res.data.data
            this.moreDataList.push(...data)
            renderPic()
          })
        }
      }
    },
    searchInput(){
      this.onSearch = true
      if(this.searchKey){
        antiShake(this.getSearch(this.searchKey),2000)
      }
    },
    getSearch(keyword){
      if(keyword.trim()===''){
        this.searchList = []
      }
      axios({
        method:'GET',
        url:`http://localhost:4400/api/searchGame/${keyword}`
      }).then(res=>{
          this.searchList = res.data.data
          if(this.searchList.length!=0){
            this.dataVaild = true
          }else{
            this.dataVaild = false
          }
      })
    }
  },
})

// 防抖函数
function antiShake(fn,delay){
  let timer = null
  return function(){
    // 无论时间到没到都会清除定时器
    clearTimeout(timer)
    // 清除上一次 设置下一次
    // 设置定时器 延迟delay秒执行 将timer设为null
    timer = setTimeout(()=>{
      fn()
    },delay)
    // 执行传入的函数
  }
}

 // 获取列表
let navList = document.querySelectorAll('.showGameList .navTab ul li')
navList.forEach((item,index)=>{
getData().then(res=>{
  let {data} = res.data
  let list = document.createDocumentFragment()
  // 渲染数据
  let ul = document.createElement('ul')
  ul.index = index
  data.forEach((item,index)=>{
    let li = document.createElement('li')
    li.innerHTML = `<div class="basicInfo">
    <div class="img">
      <img src="http://localhost:4400/upload/apps/${item.dir}/${item.file[0]}" alt="">
    </div>
    <div class="desc">
      <div class="name">${item.name}</div>
      <div class="icon"></div>
      <div class="tag">休闲 动作</div>
    </div>
    <div class="priceBox">
      <div class="primePrice">
        ${item.primePrice?item.primePrice:''}
      </div>
      <div class="nowPrice">
        ${item.primePrice?item.nowPrice:'免费游玩'}
      </div>
    </div>
  </div>
  <div class="detail">
    <div class="desc">
      <div class="name">${item.name}</div>
      <div class="assessment">
        总体用户评价
        <div>特别好评(60)</div>
      </div>
      <div class="tag">
        <ul>
          <li>角色扮演</li>
          <li>运动</li>
          <li>休闲</li>
        </ul>
      </div>
    </div>
    <div class="picList">
      <ul>
        <li><img src="http://localhost:4400/upload/apps/${item.dir}/${item.file[1]}" alt=""></li>
        <li><img src="http://localhost:4400/upload/apps/${item.dir}/${item.file[2]}" alt=""></li>
        <li><img src="http://localhost:4400/upload/apps/${item.dir}/${item.file[3]}" alt=""></li>
        <li><img src="http://localhost:4400/upload/apps/${item.dir}/${item.file[4]}" alt=""></li>
      </ul>
    </div>
    </div>`
    ul.append(li)
  list.append(ul)
  $('.showGameList .showList').append(list)
  })
  document.querySelectorAll('.showGameList .showList>ul')[0].classList.add('active')
  document.querySelectorAll('.showGameList .showList>.active>li')[0].classList.add('active')
// 移入显示detail  
document.querySelectorAll('.showGameList .showList>.active>li').forEach((item,index)=>{
  item.onmouseenter = ()=>{
    document.querySelector('.showGameList .showList>.active>.active').classList.remove('active')
    document.querySelectorAll('.showGameList .showList>.active>li')[index].classList.add('active')
  }
})

  navList.forEach((item,index)=>{
    item.index = index
  })
  // 切换列表
  $('.showGameList .navTab ul').on('click',function(e){
    if(e.target.nodeName == 'LI'){
      document.querySelector('.showGameList .navTab ul .active').classList.remove('active')
      e.target.classList.add('active')

      document.querySelector('.showGameList .showList>.active').classList.remove('active')
      document.querySelectorAll('.showGameList .showList>ul')[e.target.index].classList.add('active')

      if(document.querySelector('.showGameList .showList>.active>.active')){
        document.querySelector('.showGameList .showList>.active>.active').classList.remove('active')
      }
      document.querySelectorAll('.showGameList .showList>.active>li')[0].classList.add('active')

      // 移入显示detail  
      document.querySelectorAll('.showGameList .showList>.active>li').forEach((item,index)=>{
        item.onmouseenter = ()=>{
          document.querySelector('.showGameList .showList>.active>.active').classList.remove('active')
          document.querySelectorAll('.showGameList .showList>.active>li')[index].classList.add('active')
        }
      })
    }
  })
})
})

function getData(){
  let limit = 8
  return axios({
    method:'GET',
    url:`http://localhost:4400/api/getBanner/${limit}`
  })
}
function renderPic(){
  if(document.querySelectorAll('.showMoreData .picList').length!=0){
    app.moreDataList.forEach((item,index)=>{
      if(document.querySelectorAll('.showMoreData .picList')[index]){
        document.querySelectorAll('.showMoreData .picList')[index].innerHTML = `
        <div class="img"><img src='http://localhost:4400/upload/apps/${item.dir}/${item.file[1]}'></img></div>
        <div class="sImg"><img src='http://localhost:4400/upload/apps/${item.dir}/${item.file[2]}'></img></div>
        <div class="sImg"><img src='http://localhost:4400/upload/apps/${item.dir}/${item.file[3]}'></img></div>
        <div class="sImg"><img src='http://localhost:4400/upload/apps/${item.dir}/${item.file[4]}'></img></div>
      `
      }
    })
  }
}