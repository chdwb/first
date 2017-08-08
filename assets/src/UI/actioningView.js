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
        rightNowBtn: {
            default: null,
            type: cc.Node
        },
        backBtn: {
            default: null,
            type: cc.Node
        },
        isWork : false,
        totalTime: 0,
        currentTime: 0,
        isAction: false,
        handle: null,
        handleobj: null,
    },

    setActionInfo: function(time, id, iswork, callback,obj) {
        cc.log("setActionInfosetActionInfosetActionInfosetActionInfo")
        this.isAction = true
        this.totalTime = parseInt(time) * 0.3
        cc.log(" handle == totalTime " + this.handle + "     "  )
        this.isWork = iswork
        cc.log(" handle == iswork " + this.handle + "     "  )
        this.currentTime = 0
        cc.log(" handle == currentTime " + this.handle + "     "  )
        this.handle = callback
        cc.log(" handle == callback "+ "     "  )
        this.handleobj = obj

        cc.log(" handle == handleobj " + "     "  + obj.workLogID )
        
    },
    // use this for initialization
    onLoad: function() {
        var self = this
        this.backBtn.on("click", (event) => {
            var parent = this.node.parent
            if(self.isWork)
                parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MISSONVIEW)
            else
                parent.getComponent("GameScene").SetView(cc.cs.UIMgr.LOVEVIEW)
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
       

                //if(this.handle !== null){
                this.handle(this.handleobj);
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