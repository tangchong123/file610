const fs = require("fs")
const path = require("path")
const userPath =  path.join(__dirname, '../../data/user.json')
const userContent = fs.readFileSync(userPath,'utf8')
const userList = JSON.parse(userContent)

class User {
    async getInfo() {

     }
}