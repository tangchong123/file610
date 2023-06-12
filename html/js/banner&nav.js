$(function(){
  // 绑定事件
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
  // 界面大小改变 控制aside
  window.onresize = function(){
    if(document.documentElement.clientWidth<=1350){
      $('aside').hide()
    }else{
      $('aside').show()
    }
  }
  // 获取banner数据
  getData().then(res=>{
    let data = res.data.data
    let index = 0
    $('.bannerPic').on('click',function(){
      location.href = `https://store.steampowered.com/app/${data[index].dir}`
    })
    setBanner(data,index)
    $('.banner .leftBtn').on('click',()=>{
      index--
      if(index<0){
        index = data.length-1
      }
      setBanner(data,index)
    })
    $('.banner .rightBtn').on('click',()=>{
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
  // 获取折扣商品
  getSaleData().then(res=>{
    let data = res.data.data
    let index = 0
    setSale(data,index)
    $('.saleGame .dot')[index].classList.add('active')
    $('.saleGame .leftBtn').on('click',function(){
      index-=2
      if(index<0){
        index = 2
      }
      setSale(data,index)
      $('.saleGame .dot')[index/2].classList.add('active')
    })
    $('.saleGame .rightBtn').on('click',function(){
      index+=2
      if(index>3){
        index=0
      }
      setSale(data,index)
      $('.saleGame .dot')[index/2].classList.add('active')
    })
  })

  // 类别切换
  let ulList = document.querySelectorAll('.type .list ul')
  let typeListIndex = 0
  let div = document.createElement('div')
  div.className='dots'
  ulList.forEach((item,index)=>{
    let dot = document.createElement('div')
    dot.className='dot'
    dot.index = index
    div.append(dot)
  })
  $('.type').append(div)
  $('.type .dots .dot')[0].classList.add('active')
  $('.type .dots').on('click',function(e){
    if(e.target.classList.contains('dot')){
      document.querySelector('.type .dots .active').classList.remove('active')
      e.target.classList.add('active')
      document.querySelector('.type .list .active').classList.remove('active')
      ulList[e.target.index].classList.add('active')
    }
  })
  $('.type .rightBtn').on('click',function(){
    typeListIndex++
    document.querySelector('.type .list .active').classList.remove('active')
    if(typeListIndex>ulList.length-1){
      typeListIndex=0
    }
    ulList[typeListIndex].classList.add('active')
    document.querySelector('.type .dots .active').classList.remove('active')
    $('.type .dots .dot')[typeListIndex].classList.add('active')
  })
  $('.type .leftBtn').on('click',function(){
    typeListIndex--
    document.querySelector('.type .list .active').classList.remove('active')
    if(typeListIndex<0){
      typeListIndex=ulList.length-1
    }
    ulList[typeListIndex].classList.add('active')
    document.querySelector('.type .dots .active').classList.remove('active')
    $('.type .dots .dot')[typeListIndex].classList.add('active')
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

function getSaleData(){
  return axios({
    method:'GET',
    url:`http://localhost:4400/api/getSale`
  })
}
function setSale(data,index){
  $('.content').html('')
  let template = document.createElement('div')
    template.className = 'gameList'
    template.innerHTML = `
    <div class="big">
      <a href="https://store.steampowered.com/app/${data[index].id}">
        <div class="img">
          <img src='http://localhost:4400/upload/onSale/${data[index].dir}/${data[index].file}'></img>
        </div>
        <div class='text'>
          <div>周末特惠</div>
          <div class='time'>优惠截至时间：10月13日 上午1:00</div>
          <div class='priceBox'>
            ${data[index].info?data[index].info:''}
            <div class='primePrice'>
              ${data[index].info?'':data[index].primePrice}
            </div>
            <div class='nowPrice'>
              ${data[index].info?'':data[index].nowPrice}
            </div>
          </div>
        </div>
      </a>
    </div>
    <div class="big">
      <a href="${data[++index].url?'https://store.steampowered.com/'+data[index].url:'https://store.steampowered.com/app/'+data[index].id}">
        <div class="img">
        <img src='http://localhost:4400/upload/onSale/${data[index].dir}/${data[index].file}'></img>
        </div>
        <div class='text'>
          <div>周末特惠</div>
          <div class='time'>优惠截至时间：10月13日 上午1:00</div>
          <div class='priceBox'>
            ${data[index].info?data[index].info:''}
            <div class='primePrice'>
              ${data[index].info?'':data[index].primePrice}
            </div>
            <div class='nowPrice'>
              ${data[index].info?'':data[index].nowPrice}
            </div>
          </div>
        </div>
      </a>
    </div>
    <div class="small">
      <a href="https://store.steampowered.com/bundle/${data[5].id}">
        <div class="img">
        <img src='http://localhost:4400/upload/onSale/${data[5].dir}/${data[5].file}'></img>
        </div>
        <div class='text'>
          <span>今日特惠</span>
          <div class='priceBox'>
            <div class='primePrice'>${data[5].primePrice}</div>
            <div class='nowPrice'>${data[5].nowPrice}</div>
          </div>
        </div>
      </a>
    </div>
    <div class="small">
      <a href="https://store.steampowered.com/bundle/${data[6].id}">
        <div class="img">
        <img src='http://localhost:4400/upload/onSale/${data[6].dir}/${data[6].file}'></img>
        </div>
        <div class='text'>
          <span>今日特惠</span>
          <div class='priceBox'>
            <div class='primePrice'>${data[6].primePrice}</div>
            <div class='nowPrice'>${data[6].nowPrice}</div>
          </div>
        </div>
      </a>
    </div>
    `
    $('.saleGame .content').append(template)
    let dots = document.createElement('div')
    dots.className = 'dots'
    data.forEach((item,index)=>{
    if((index*2)<(data.length-3)){
      let div = document.createElement('div')
      div.className = 'dot'
      div.index = index
      dots.append(div)
    }
  })
  $('.saleGame .content').append(dots)
  $('.saleGame .dots').on('click',function(e){
    if(e.target.classList.contains('dot')){
      document.querySelector('.dots   .active').classList.remove('active')
      e.target.classList.add('active')
      setSale(data,e.target.index+1)
      $('.saleGame .dot')[e.target.index].classList.add('active')
    }
  })
}