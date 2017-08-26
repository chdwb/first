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
        cc.loadingBg.node.opacity = 102
        this.juhua.active = false

        var act = cc.sequence(cc.delayTime(1.50),cc.callFunc(function(target) {
            self.showLoadingAction()
        },this.node))

    },

    openLoading : function(){
        var self = this
        this.juhua.active = false
        cc.loadingBg.node.opacity = 0
        var act = cc.sequence(cc.delayTime(1.50),cc.callFunc(function(target) {
            self.showLoadingAction()
        },this.node))

        this.node.runAction(act)
        this.node.active = true
    },

    closeLoading : function(){
        this.node.active = false
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
