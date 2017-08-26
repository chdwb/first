cc.Class({
    extends: cc.Component,

    properties: {
        loadingBg: {
            type: cc.Sprite,
            default: null
        },
        juhua: {
            type: cc.Node,
            default: null
        },
    },
    showLoadingAction : function(){
        if(!this.node.active){
            return;
        }
        var self = this
        this.loadingBg.node.opacity = 102
        this.juhua.active = true
        this.node.stopAllActions()
        this.juhua.stopAllActions()

        cc.log("dasdddddddddddddddddddddddddddddddshowLoadingAction")
        
        var act = cc.sequence(cc.repeat(cc.rotateBy(0.5, 360), 3.0),cc.callFunc(this.showEnd, this))

        this.juhua.runAction(act)
    },

    showEnd:function(){
        cc.cs.UIMgr.showPopupO("网络错误","请检查网络",this.closeLoading())
    },

    openLoading : function(){
        var self = this
        this.node.active = true
        this.juhua.active = false
        this.loadingBg.node.opacity = 0
        var act = cc.sequence(cc.delayTime(2.0), cc.callFunc(this.showLoadingAction, this))

        this.node.runAction(act)
        
    },

    closeLoading : function(){
        this.node.active = false
        this.node.stopAllActions()
        this.juhua.stopAllActions()
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
