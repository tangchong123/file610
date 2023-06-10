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
