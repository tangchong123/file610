Vue.component("header",{
    data(){
        return {msg:"子组件的msg"}
    }
})
let header =  new Vue({
    el: "#header"
})
module.exports = {
    header
}