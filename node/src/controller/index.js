const fs = require('fs')
const path = require('path')

function getRandom(x,y){
  if(x>=y){
    return undefined
  }else{
    return Math.floor(Math.random()*(y-x+1)+x)
  }
}

module.exports = {
  async getBanner(ctx){
    let {limit} = ctx.request.params
    let bannerList = JSON.parse(fs.readFileSync(path.join(__dirname,'../../data/banner.json')))
    let res = []
    for(let i =1;i<=limit;i++){
      let random = getRandom(0,bannerList.length-1)
      res.push(bannerList[random])
      bannerList.splice(random,1)
    }
    return ctx.body = {
      code:200,
      msg:'获取成功',
      data:res
    }
  },
  async getSale(ctx){
    let saleList = JSON.parse(fs.readFileSync(path.join(__dirname,'../../data/saleGame.json')))
    return ctx.body = {
      code:200,
      msg:'获取成功',
      data:saleList
    }
  },
  async getGameList(ctx){
    let {limit} = ctx.request.params
    let gameList = JSON.parse(fs.readFileSync(path.join(__dirname,'../../data/gameList.json')))
    let res = []
    for(let i =1;i<=limit;i++){
      let random = getRandom(0,gameList.length-1)
      res.push(gameList[random])
      gameList.splice(random,1)
    }
    return ctx.body ={
      code:200,
      msg:'获取成功',
      data:res
    }
  },
  async searchData(ctx){
    let {keyword} = ctx.request.params
    let file = JSON.parse(fs.readFileSync(path.join(__dirname,'../../data/gameList.json')))
    file = file.filter(item=>{
      return item.name.toLowerCase().includes(keyword.toLowerCase())
    })
    console.log(file);
    if(file.length!=0){
      return ctx.body = {
        code:200,
        msg:'搜索成功',
        data:file
      }
    }
    return ctx.body = {
      code:400,
      msg:'暂无商品',
      data:[]
    }
  }
}