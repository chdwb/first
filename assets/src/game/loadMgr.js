cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    loadRes:function(func){
        cc.loader.loadResDir("prefab",(err, prefab) => {
            if(!err){
                func()
            }
        })
    },
    // use this for initialization
    onLoad: function () {
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
