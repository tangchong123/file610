const app = new Vue({
  el:'#app',
  data(){
    return {
      isLogin:true,
    }
  },
  method:{

  },
  created() {

  },
})

$(function(){
  $('.showGameList .navTab ul').on('click',function(e){
    if(e.target.nodeName == 'LI'){
      document.querySelector('.showGameList .navTab ul .active').classList.remove('active')
      e.target.classList.add('active')
    }
  })
  let lis = document.querySelectorAll('.showGameList .navTab ul li')
  lis.forEach((item,index)=>{
    item.index = index
  })
})