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
        BGMid:-1,
        Backid:-1,
    },

    // use this for initialization
    onLoad: function () {

        

    },

    playAudio:function (clip,isLoop)
    {
       this.BGMid = cc.audioEngine.play(clip, isLoop, 1);
    },

    playBack:function (clip,isLoop)
    {
        cc.log("backid ="+this.Backid)
        /*if(this.Backid == -1)
        {
            this.Backid = cc.audioEngine.play(clip, isLoop,1);
             //cc.log("backid ="+cc.audioEngine.play(clip, isLoop,1))
        }
        else 
        {
            cc.audioEngine.setCurrentTime(this.Backid,0)
            cc.audioEngine.resume(this.Backid)
        }*/
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
