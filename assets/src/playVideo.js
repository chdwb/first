cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        playTime: 0
    },

    // use this for initialization
    onLoad: function() {
        var s =  cc.find("Canvas/sprite")
        s.setLocalZOrder(1)
        this.node.setLocalZOrder(1111)
       
        this.node.on("clicked", function(event) {
             event.target.getComponent(cc.VideoPlayer).isFullScreenEnabled()
            if (event.target.getComponent(cc.VideoPlayer).isPlaying()) {
                event.target.getComponent(cc.VideoPlayer).pause()
            } else {
                event.target.getComponent(cc.VideoPlayer).play()
            }
        }, this.node)
    },

    // called every frame, uncomment this function to activate update callback
    update: function(dt) {
        this.playTime += dt;
        if (this.playTime > 3 && this.playTime < 4) {
            this.node.getComponent(cc.VideoPlayer).play()
            this.playTime += 10
        }
    },
});