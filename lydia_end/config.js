const path = require('path')

module.exports = {
    PORT: 8080,

    SECRET_KEY: "thisisasteamsecretkey",

    PUBLIC_PATH: path.join(__dirname,'./src/public')
}