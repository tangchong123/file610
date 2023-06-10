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
  
  getData().then(res=>{
    let data = res.data.data
    let index = 0
    $('.bannerPic>.img img').attr('src',`http://localhost:4400/upload/apps/${data[index].dir}/${data[index].file[0]}`)
    $('.bannerPic>.img a').attr('href',`https://store.steampowered.com/app/${data[index].dir}`)
  })
})

function getData(){
  let limit = 6
  return axios({
    method:'GET',
    url:`http://localhost:4400/api/getBanner/${limit}`
  })
}