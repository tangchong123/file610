window.onload = function() {
    const app = new Vue({
        el: "#allMessage_box",
        data: {
            isShowTools: false
        },
        methods: {
            showTools() {
                this.isShowTools=true
            }
        }
    })
}