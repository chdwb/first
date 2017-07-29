cc.Class({
    extends: cc.Component,

    properties: {
        actionBg: {
            default: null,
            type: cc.Sprite
        },
        process: {
            default: null,
            type: cc.ProgressBar
        },
        processText: {
            default: null,
            type: cc.Label
        },
        DescText: {
            default: null,
            type: cc.Label
        },
        rightNowBtn: {
            default: null,
            type: cc.Node
        },
        backBtn: {
            default: null,
            type: cc.Node
        },
        totalTime: 0,
        currentTime: 0,
        isAction: false,
        handle: null,
        handleobj: null,
    },

    setActionInfo: function(time, desc, image, callback,obj) {
        //this.isAction = true
        this.totalTime = time
        this.currentTime = 0
        this.DescText.string = desc
        //callback.apply(obj, ["666"]);
        this.handle = callback
        this.handleobj = obj

        //this.handle.apply(this.handleobj, ["666"]);
    },
    // use this for initialization
    onLoad: function() {
        this.backBtn.on("click", (event) => {

        }, this.backBtn)

        this.rightNowBtn.on("click", (event) => {

        }, this.rightNowBtn)

        //this.setActionInfo(10, "test", "", this.cccc) for test
    },

    update: function(dt) {
        if (this.isAction) {
            this.currentTime += dt;
            if (this.currentTime >= this.totalTime) {
                this.process.progress = 1.0
                this.processText.string = 100 + "%"

               // cc.log("6666"+this.handle)
       

                //if(this.handler !== null){
                this.handler.apply(this.handleobj, ["666"]);
               // }    
                
                this.isAction = false;
                this.currentTime = 0
                this.totalTime = 0
            } else {
                this.process.progress = this.currentTime / this.totalTime
                this.processText.string = parseInt(this.process.progress * 100.0) + "%"
            }
        }

    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});