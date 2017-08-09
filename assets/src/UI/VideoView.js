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
        nowVideo:{
            default : null,
            type : cc.Label
        }
    },

    onClick : function()
    {
       
       cc.cs.gameMgr.sendVideoDone(cc.cs.PlayerInfo.ApiToken,cc.cs.PlayerInfo.videoID,this.videoDoneHandle,this)

    },

    videoDoneHandle:function(ret)
    {
        

        var JasonObject = JSON.parse(ret);
                if (JasonObject.success === true) {
                    cc.cs.PlayerInfo.videoID = 0;
                    cc.cs.UIMgr.showTip("视频完成", 1.0)
                    cc.cs.PlayerInfo.Level = JasonObject.content.info.level
                    cc.cs.PlayerInfo.Exp = JasonObject.content.info.exp

                    var parent = this.node.parent
                    parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
                    
                } else {
                    cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
                }
     },

    // use this for initialization
    onLoad: function () {

       this.nowVideo.string = "正在播放视频ID "+  cc.cs.PlayerInfo.videoID

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
