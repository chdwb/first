cc.Class({
    extends: cc.Component,

    properties: {
        isLoadComplete: null,
    },

    loadRes: function(funCall) {
        var self = this
        cc.loader.loadResDir("prefab", (err, prefab) => {

            if (!err) {
                cc.cs.UIMgr.init()
                
                

            } else {
                cc.log("load error prefab " +err)
            }
        })
        cc.loader.loadResDir("picture/newRes831", (err, ass) => {
            if (!err) {
                self.isLoadComplete = true
            } else {
                cc.log(err)
            }
        })

         cc.loader.loadResDir("audio", (err, ass) => {
            if (!err) {
                //self.isLoadComplete = true
            } else {
                cc.log(err)
            }
        })




    },
    // use this for initialization
    onLoad: function() {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});