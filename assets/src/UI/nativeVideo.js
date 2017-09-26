cc.Class({
    extends: cc.Component,

    properties: {
        

    },

    createrNativeVideo : function(n){

        return cc.LiveVideo.creator()
    },



    // use this for initialization
    onLoad: function () {
        //this.node._sgNode.addChild
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
