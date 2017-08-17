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
       cc.log("play video " + cc.cs.PlayerInfo.playvideo)
       cc.cs.gameMgr.sendVideoDone(cc.cs.PlayerInfo.playvideo,this.videoDoneHandle,this)

    },

    videoDoneHandle:function(ret)
    {
        

        var JasonObject = JSON.parse(ret);
                if (JasonObject.success === true) {
                    cc.cs.PlayerInfo.playvideo = JasonObject.content.info.video_id;
                    cc.cs.UIMgr.showTip("视频完成", 1.0)
                    cc.cs.PlayerInfo.level = JasonObject.content.info.level
                    cc.cs.PlayerInfo.exp = JasonObject.content.info.exp

                    var parent = this.node.parent
                    parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
                    
                } else {
                    cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
                }
     },

    // use this for initialization
    onLoad: function () {

       //this.nowVideo.string = "正在播放视频ID "+  cc.cs.PlayerInfo.playvideo

    },

    onEnable: function () {

        this.nowVideo.string = "正在播放视频ID "+  cc.cs.PlayerInfo.playvideo
       if (CC_JSB) {
          var nextvideoID = parseInt(cc.cs.PlayerInfo.playvideo)+1
          cc.cs.gameMgr.getVideoUrl(cc.cs.PlayerInfo.api_token,nextvideoID,this.voidoDownloadHandle,this)

          if(cc.cs.gameData.branchVideo["PLOT_VIDEO_ID_"+nextvideoID])
          {
              cc.log("有分支视频")
             var id1 =  cc.cs.gameData.branchVideo["PLOT_VIDEO_ID_"+nextvideoID]["PLOT_VIDEO_LINK_VIDEO_1"]
             var id2 = cc.cs.gameData.branchVideo["PLOT_VIDEO_ID_"+nextvideoID]["PLOT_VIDEO_LINK_VIDEO_1"]

             cc.cs.gameMgr.getVideoUrl(cc.cs.PlayerInfo.api_token,id1,this.voidoDownloadHandle,this)
             cc.cs.gameMgr.getVideoUrl(cc.cs.PlayerInfo.api_token,id2,this.voidoDownloadHandle,this)

          }
       }

    },

    voidoDownloadHandle:function(ret)
    {
         var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            
            var url = JasonObject.content.info.url
            var videoid = JasonObject.content.info.video_id

            cc.log("获得下载地址"+url+" "+videoid)
            cc.cs.DownloadMgr.startDownload(url,videoid+".mp4")
            
           
           
           
        } else {
            //cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
            cc.log("get video url error"+JasonObject.error)
        }

    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
