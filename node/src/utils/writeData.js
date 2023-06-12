const fs = require('fs')
const path = require('path')

let dir = fs.readdirSync(path.join(__dirname,'../public/upload/apps/'))
let nextDir = []
let res = []

dir.forEach((item,index)=>{
  nextDir.push(fs.readdirSync(path.join(__dirname,`../public/upload/apps/${item}`)))
  if(nextDir[index].length!=1){
    return res.push({dir:item,file:nextDir[index]})
  }
  res.push({dir:item,file:nextDir[index].toString()})
})
let gameInfo = JSON.parse(fs.readFileSync(path.join(__dirname,'../../data/gameInfo.json')))
let result = []
gameInfo.forEach(game=>{
  let temp = res.map(item=>{
    if(item.dir==game.id){
      return {
        id:game.id,
        name:game.name,
        nowPrice:game.nowPrice,
        primePrice:game.primePrice,
        dir:item.dir,
        file:item.file
      }
    }
  })
  temp = temp.filter(item=>item)
  result.push(...temp)
})
// fs.writeFileSync(path.join(__dirname,'../../data/banner.json'),JSON.stringify(result,null,2))

let saleDir = fs.readdirSync(path.join(__dirname,'../public/upload/onSale/'))
let nextDir1 = []
let res1 = []
saleDir.forEach((item,index)=>{
  nextDir1.push(fs.readdirSync(path.join(__dirname,`../public/upload/onSale/${item}`)))
  res1.push({dir:item,file:nextDir1[index].toString()})
})
let saleInfo = JSON.parse(fs.readFileSync(path.join(__dirname,'../../data/gameInfo.json')))
let result1 = []
saleInfo.forEach(game=>{
  let temp = res1.map(item=>{
    if(item){
      if(item.dir==game.id.toString()){
        if(game.info){
          let list = game.id.split('-')
          return{
            id:game.id,
            name:game.name,
            nowPrice:game.nowPrice,
            primePrice:game.primePrice,
            dir:item.dir,
            file:item.file,
            info:game.info,
            url:list[0]+'/'+list[1]
          }
        }
        return {
          id:game.id,
          name:game.name,
          nowPrice:game.nowPrice,
          primePrice:game.primePrice,
          dir:item.dir,
          file:item.file,
          info:game.info
        }
      }
    }
  })
  temp = temp.filter(item=>item)
  temp = temp.filter(item=>{
    if(item.length!=0){
      return item
    }
  })
  result1.push(...temp)
})
// fs.writeFileSync(path.join(__dirname,'../../data/saleGame.json'),JSON.stringify(result1,null,2))