$(function(){
  $('.store').on('mouseenter',()=>{
    $('.store>div').show()
  })
  $('.store').on('mouseleave',()=>{
    $('.store>div').hide()
  })
  $('.community').on('mouseenter',()=>{
    $('.community>div').show()
  })
  $('.community').on('mouseleave',()=>{
    $('.community>div').hide()
  })
  $('.yourStore').on('mouseenter',()=>{
    $('.yourStore>div').show()
  })
  $('.yourStore').on('mouseleave',()=>{
    $('.yourStore>div').hide()
  })
  $('.recommend').on('mouseenter',()=>{
    $('.recommend>div').show()
  })
  $('.recommend').on('mouseleave',()=>{
    $('.recommend>div').hide()
  })
  $('.gameType').on('mouseenter',()=>{
    $('.gameType>div').css('display','flex')
  })
  $('.gameType').on('mouseleave',()=>{
    $('.gameType>div').hide()
  })

  window.onresize = function(){
    if(document.documentElement.clientWidth<=1350){
      $('aside').hide()
    }else{
      $('aside').show()
    }
  }
  
  getData().then(res=>{
    let data = res.data.data
    let index = 0
    $('.bannerPic').on('click',function(){
      location.href = `https://store.steampowered.com/app/${data[index].dir}`
    })
    setBanner(data,index)
    $('.leftBtn').on('click',()=>{
      index--
      if(index<0){
        index = data.length-1
      }
      console.log(index);
      setBanner(data,index)
    })
    $('.rightBtn').on('click',()=>{
      index++
      if(index>data.length-1){
        index=0
      }
      setBanner(data,index)
    })
    let timer = null
    if(timer){
      clearInterval(timer)
    }
    timer = setInterval(()=>{
      index++
      if(index>data.length-1){
        index=0
      }
      setBanner(data,index)
    },2000)
    $('.banner').on('mouseenter',function(){
      clearInterval(timer)
    })
    $('.banner').on('mouseleave',function(){
      timer = setInterval(()=>{
        index++
        if(index>data.length-1){
          index=0
        }
        setBanner(data,index)
      },2000)
    })
  })
})

function getData(){
  let limit = 6
  return axios({
    method:'GET',
    url:`http://localhost:4400/api/getBanner/${limit}`
  })
}

function setBanner(data,index){
  $('.bannerPic').html(`
    <div class="img">
      <img src="" alt="">
    </div>
  `)
  $('.bannerPic>.img img').attr('src',`http://localhost:4400/upload/apps/${data[index].dir}/${data[index].file[0]}`)
  let template = document.createElement('div')
    template.className = 'desc'
    template.innerHTML = `
      <div class="name">${data[index].name}</div>
      <div class="picList">
        <img src='http://localhost:4400/upload/apps/${data[index].dir}/${data[index].file[1]}'></img>
        <img src='http://localhost:4400/upload/apps/${data[index].dir}/${data[index].file[2]}'></img>
        <img src='http://localhost:4400/upload/apps/${data[index].dir}/${data[index].file[3]}'></img>
        <img src='http://localhost:4400/upload/apps/${data[index].dir}/${data[index].file[4]}'></img>
      </div>
      <div class="text">
        <div>现已推出</div>
        <span class="tag">热销商品</span>
      </div>
      <div class="price">
        <div class="money">
          <div class="primePrice">${data[index].primePrice?data[index].primePrice:''}</div>
          <div class="nowPrice">${data[index].primePrice?data[index].nowPrice:'免费开玩'}</div>
        </div>
        <div class="icon"></div>
    `
    document.querySelector('.bannerPic').appendChild(template)
    $('.bannerPic .picList').on('mouseover',function(e){
      if(e.target.nodeName == 'IMG'){
        $('.bannerPic>.img img').attr('src',e.target.src)
      }
    })
    $('.bannerPic .picList').on('mouseleave',function(){
        $('.bannerPic>.img img').attr('src',`http://localhost:4400/upload/apps/${data[index].dir}/${data[index].file[0]}`)
    })
    let list = document.createElement('div')
    list.className = 'dotList'
    data.forEach((item,index)=>{
      let div = document.createElement('div')
      div.className = 'dot'
      div.index = index
      list.append(div)
    })
    $('.dotList').remove()
    $('.banner').append(list)
    $('.banner>.dotList>.dot')[index].classList.add('active')
    $('.dotList').on('click',function(e){
      if(e.target.classList.contains('dot')){
        document.querySelector('.dotList .active').classList.remove('active')
        e.target.classList.add('active')
        setBanner(data,e.target.index)
      }
    })
}