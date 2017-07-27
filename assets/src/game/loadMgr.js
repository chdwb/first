cc.Class({
    extends: cc.Component,

    properties: {
        isLoadComplete : null,
    },

    loadRes:function(funCall){

        cc.loader.loadResDir ("prefab",(err, prefab) => {
            if(!err){
                this.isLoadComplete = true
                funCall()
            }else
            {
                cc.log(err)
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
