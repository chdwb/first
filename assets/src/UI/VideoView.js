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
        nowVideo: {
            default: null,
            type: cc.Label
        },
        Loading: {
            default: null,
            type: cc.Node
        },
        video: {
            default: null,
            type: cc.Node
        },
        backNode: {
            default: null,
            type: cc.Node
        },
        pauseNode: {
            default: null,
            type: cc.Node
        },
        pauseTip: {
            default: null,
            type: cc.Node
        },
        TipNode: {
            default: null,
            type: cc.Node
        },
        TipLabLabel: {
            default: null,
            type: cc.Label
        },
        faceNode: {
            default: null,
            type: cc.Node
        },
        faceNodeBtn: {
            default: null,
            type: cc.Node
        },
        videoPlayer: null,
        isLoadOver: false,
        isLoadSuccess: false,
        videoType: 0,
        videoID: 0,
    },

    onClick: function() {
        cc.log("play video " + cc.cs.PlayerInfo.playvideo)

        cc.cs.gameMgr.sendVideoDone(cc.cs.PlayerInfo.playvideo, this.videoDoneHandle, this)

    },

    videoDoneHandle: function(ret) {

        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.cs.UIMgr.closeNetView()
            cc.cs.PlayerInfo.playvideo = JasonObject.content.info.video_id;
            //cc.cs.UIMgr.showTip("视频完成", 1.0)
            cc.log("视频完成")
            cc.cs.PlayerInfo.level = JasonObject.content.info.level
            cc.cs.PlayerInfo.exp = JasonObject.content.info.exp
            this.Loading.active = false
            this.video.active = true
            cc.cs.UIMgr.closeView()
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },

    // use this for initialization
    onLoad: function() {

        //this.nowVideo.string = "正在播放视频ID "+  cc.cs.PlayerInfo.playvideo
        if(CC_JSB)
        {
        this.videoPlayer = cc.LiveVideo.creator()
        this.video._sgNode.setLocalZOrder(0)
        this.node._sgNode.addChild(this.videoPlayer, 2, 888)
        this.nowVideo.node._sgNode.setLocalZOrder(1)
        this.pauseNode._sgNode.setLocalZOrder(3)
        this.Loading._sgNode.setLocalZOrder(4)
        this.faceNode._sgNode.setLocalZOrder(5)
    }
    else
    {
        this.nowVideo.string = "正在播放视频ID "+  cc.cs.PlayerInfo.playvideo
        }


        this.schedule(function() {

            this.Loading.active = false
            this.video.active = true

        }, 5, 0);

    },

    tipCallBack: function() {
        this.TipNode.active = false

        if (this.isLoadOver) {
            this.Loading.active = false
            this.Node.stopActionByTag(999)
            if (this.isLoadSuccess) {
                if (videoType == 1) {
                    this.videoPlayer.videoPlayManualStop();
                } else {
                    this.videoPlayer.videoPlay();
                }
            } else {
                this.nowVideo.node.active = true
            }
        } else {
            this.Loading.active = true
        }
    },

    startBtnCallBack: function() {
        var levData = cc.cs.gameData.getlevelData(cc.cs.PlayerInfo.level)
        this.TipNode.active = true
        this.TipLabLabel.string = levData["LEV_STORY_VIDEO_FONT"]

        var act = cc.sequence(cc.delayTime(1.0), cc.callFunc(this.tipCallBack, this))
        act.setTag(888)
        this.TipNode.runAction(act)

    },
    loadVideo: function(err, id) {
        if (!err) {
            this.videoPlayer.preLoad(ID + "")
        } else {
            this.isLoadOver = true
            this.isLoadSuccess = false
        }
    },
    preLoadCallback: function() {
        this.isLoadOver = this.videoPlayer.isLoadOver()
        this.isLoadSuccess = this.videoPlayer.isLoadSuccess()
        if (this.isLoadOver) {

            this.Loading.active = false
            this.Node.stopActionByTag(999)
        }
    },

    getVideoType: function(videoName) {
        if (videoName.match(/12\d\d\d/)) {
            return 3
        } else if (videoName.match(/15\d\d/)) {
            return 4
        } else if (videoName.match(/11\d\d/)) {
            return 1
        } else if (videoName.match(/14\d\d/)) {
            return 2
        }
        return 0
    },

    openVideo: function(videoName) {
        this.videoType = this.getVideoType(videoName)
        if (this.videoType == 0) {
            this.video.active = false
            this.pauseNode.active = false
            this.Loading.active = false
            this.faceNode.active = false
            this.TipNode.active = false
            this.nowVideo.node.active = false
        } else if (this.videoType == 1) {
            this.video.active = false
            this.pauseNode.active = false
            this.Loading.active = false
            this.faceNode.active = false
            this.TipNode.active = false
            this.nowVideo.node.active = false
            cc.cs.UIMgr.showPopupO("", "快看看许梦甜在干什么吧？", this.startBtnCallBack)
            cc.loader.loadResDir("video/" + videoName, this.loadVideo)
            var act = cc.spawn(cc.delayTime(20.0), cc.callFunc(this.preLoadCallback, this))
            act.setTag(999)
            this.node.runAction(act)
        }
    },

    onEnable: function() {
        var self = this
        this.isLoadOver = false
        this.isLoadSuccess = false





        if (CC_JSB) {
            var nextvideoID = parseInt(cc.cs.PlayerInfo.playvideo) + 1
            cc.cs.gameMgr.getVideoUrl(cc.cs.PlayerInfo.api_token, nextvideoID, this.voidoDownloadHandle, this)

            if (cc.cs.gameData.branchVideo["PLOT_VIDEO_ID_" + nextvideoID]) {
                cc.log("有分支视频")
                var id1 = cc.cs.gameData.branchVideo["PLOT_VIDEO_ID_" + nextvideoID]["PLOT_VIDEO_LINK_VIDEO_1"]
                var id2 = cc.cs.gameData.branchVideo["PLOT_VIDEO_ID_" + nextvideoID]["PLOT_VIDEO_LINK_VIDEO_1"]

                cc.cs.gameMgr.getVideoUrl(id1, this.voidoDownloadHandle, this)
                cc.cs.gameMgr.getVideoUrl(id2, this.voidoDownloadHandle, this)

            }
        }

    },

    voidoDownloadHandle: function(ret) {
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.cs.UIMgr.closeNetView()
            var url = JasonObject.content.info.url
            var videoid = JasonObject.content.info.video_id

            cc.log("获得下载地址" + url + " " + videoid)
            cc.cs.DownloadMgr.startDownload(url, videoid + "_batch.mp4")




        } else {
            //cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
            cc.log("get video url error" + JasonObject.error)
        }

    },

       onBack:function(){
        
        //var parent = this.node.parent
        //parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
		cc.cs.UIMgr.closeView()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});