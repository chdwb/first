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
        isPlayStart : false,
        bgNode: {
            type: cc.Node,
            default: null
        },
        videoLoadingNode: {
            type: cc.Node,
            default: null
        },
        videoPauseNode: {
            type: cc.Node,
            default: null
        },
        videoPauseTip: {
            type: cc.Node,
            default: null
        },
        videoPlayerNode: {
            type: cc.VideoPlayer,
            default: null
        },
        branchNode:{
            type: cc.Sprite,
            default: null
        },
        backBtn : {
            type: cc.Node,
            default: null
        },
        faceTimeNode:{
            type: cc.Node,
            default: null
        },
        inputTablePrefab: null,
        inputTableBtn:null,
        playVideoID : 0,
        branchData : null,
        videoType : 0,
    },

    getVideoType: function(videoName) {
        if (videoName.match(/12\d\d\d/)) {
            return 3
        } else if (videoName.match(/15\d\d/)) {//
            return 4
        } else if (videoName.match(/11\d\d/)) {
            return 1
        } else if (videoName.match(/14\d\d/)) {//facetime
            return 2
        }
        return 0
    },

    setPlayVideoID : function(id){
        this.playVideoID = id;
        var videoID =this.getVideoType(id + "")

        if( videoID != 0){
            this.backBtn.active = true
            this.videoType = videoID
            cc.log("self.videoType  setPlayVideoID " + this.videoType)
            this.isPlayStart = false
            if(videoID == 1){
                this.videoLoadingNode.active = false
                this.videoPlayerNode.node.active = true
                this.videoPauseNode.active = true
                this.videoPauseTip.active = false
                this.videoPlayerNode.clip =  cc.url.raw("resources/video/"+id) + ".mp4"
                this.videoPlayerNode.play()
                this.faceTimeNode.active = false
                this.branchNode.node.active = false
                this.branchData = cc.cs.gameData.getbranchVideoData(id)
                if(this.branchData != null){
                    cc.cs.UIMgr.changeSprite(this.branchNode.node, "commonbg/"+id)
                }
            }else if(videoID == 2){
                //facetime
                this.videoLoadingNode.active = false
                this.videoPlayerNode.node.active = false
                this.videoPauseNode.active = false
                this.faceTimeNode.active = true
                this.branchNode.node.active = false

            }else if(videoID == 3){
                //brach
            }else if(videoID == 4){
                this.videoLoadingNode.active = false
                this.videoPlayerNode.node.active = true
                this.videoPauseNode.active = true
                this.videoPauseTip.active = false
                this.videoPlayerNode.clip =  cc.url.raw("resources/video/"+id) + ".mp4"
                this.videoPlayerNode.play()
                this.faceTimeNode.active = false
                this.branchNode.node.active = false
                this.backBtn.active = true
            }
        }else{
            this.node.active = false
            this.bgNode.active = true
            cc.cs.UIMgr.showTip("视频错误 id = " + id, 1.0)
        }
    },



    showInputTable: function() {
        var self = this
        //if (phoneData["PHONE_OPTION"] == "dummy" && phoneData["PHONE_AUDIO"] != "dummy") {
            this.inputTableBtn.active = true
            var replayId = []
            var btn1 = this.inputTableBtn.getChildByName("btn1")
			var btn2 = this.inputTableBtn.getChildByName("btn2")
            var btn3 = this.inputTableBtn.getChildByName("btn3")

            var text1 = btn1.getChildByName("Label").getComponent(cc.Label)
            var text2 = btn2.getChildByName("Label").getComponent(cc.Label)
            var text3 = btn3.getChildByName("Label").getComponent(cc.Label)
			
			var colorOld = text1.node.color
			btn1.on(cc.Node.EventType.TOUCH_START, function (event) {
                cc.log("This is a callback after the trigger event");
				text1.node.color = cc.Color.RED;
            });
			
			 btn1.on(cc.Node.EventType.TOUCH_CANCEL, event => {
                text1.node.color = colorOld;
            }, this);
			
			 btn1.on(cc.Node.EventType.TOUCH_END, event => {
                text1.node.color = colorOld;
            }, this);
			
			btn2.on(cc.Node.EventType.TOUCH_START, function (event) {
                cc.log("This is a callback after the trigger event");
				text2.node.color = cc.Color.RED;
            });
			
			 btn2.on(cc.Node.EventType.TOUCH_CANCEL, event => {
                text2.node.color = colorOld;
            }, this);
			
			 btn2.on(cc.Node.EventType.TOUCH_END, event => {
                text2.node.color = colorOld;
            }, this);
			
			btn3.on(cc.Node.EventType.TOUCH_START, function (event) {
                cc.log("This is a callback after the trigger event");
				text3.node.color = cc.Color.RED;
            });
			
			 btn3.on(cc.Node.EventType.TOUCH_CANCEL, event => {
                text3.node.color = colorOld;
            }, this);
			
			 btn3.on(cc.Node.EventType.TOUCH_END, event => {
                text3.node.color = colorOld;
            }, this);
            
           

            var zs1 = btn1.getChildByName("xuanxiangkkuangdexian")
            var zs2 = btn2.getChildByName("xuanxiangkkuangdexian")
            var zs3 = btn3.getChildByName("xuanxiangkkuangdexian")

            btn1.targetOff(btn1)
            btn2.targetOff(btn2)
            btn3.targetOff(btn3)
            btn1.active = true;
            btn2.active = true;
            btn3.active = true;

            
            for (var i = 0; i < 2; ++i) {
                var item = []
                if(i == 0){
                    item["PLOT_VIDEO_OPTION_1"] = self.branchData["PLOT_VIDEO_OPTION_1"]
                    item["PLOT_VIDEO_LINK_VIDEO_1"] = self.branchData["PLOT_VIDEO_LINK_VIDEO_1"]
                }else{
                    item["PLOT_VIDEO_OPTION_2"] = self.branchData["PLOT_VIDEO_OPTION_2"]
                    item["PLOT_VIDEO_LINK_VIDEO_2"] = self.branchData["PLOT_VIDEO_LINK_VIDEO_2"]
                }
                replayId.push(item)
            }

            if(replayId.length == 2) {
                text1.string = replayId[0]["PLOT_VIDEO_OPTION_1"]
                text2.string = replayId[1]["PLOT_VIDEO_OPTION_2"]
                text1.node.y = -6
                text2.node.y = -6
                btn1.height = text1.node.height + 12
                btn2.height = text2.node.height + 12
                btn1.y = 0
                btn2.y = -btn1.height
                zs1.active = true
                zs1.y = - btn1.height
                zs2.active = false
                btn1.VIDEO_ID = replayId[0]["PLOT_VIDEO_LINK_VIDEO_1"]
                btn2.VIDEO_ID = replayId[1]["PLOT_VIDEO_LINK_VIDEO_2"]
                btn1.on("click", (event) => {
                    cc.log("VIDEO_ID = " + event.target.VIDEO_ID)
                    event.target.parent.active = false
                    self.playBranchVideo(event.target.VIDEO_ID)
                }, btn1)
                btn2.on("click", (event) => {
                    cc.log("VIDEO_ID = " + event.target.VIDEO_ID)
                    event.target.parent.active = false
                    self.playBranchVideo(event.target.VIDEO_ID)
                }, btn2)

                btn3.active = false;
                this.inputTableBtn.height = btn1.height + btn2.height
            }
       // } else {
       //     return
        //}
    },
    playBranchVideo:function(id){
        this.videoLoadingNode.active = false
        this.videoPlayerNode.node.active = true
        this.videoPauseNode.active = true
        this.videoPauseTip.active = false
        this.videoPlayerNode.clip =  cc.url.raw("resources/video/"+id) + ".mp4"
        this.isPlayStart = false
        this.videoPlayerNode.play()
        this.faceTimeNode.active = false
        this.branchNode.node.active = false
        this.branchData = null
    },
    showBranchVideo:function(){
        this.branchNode.node.active = true
        this.showInputTable()
        this.videoType = 3
    },
    // use this for initialization
    onLoad: function () {
        this.inputTablePrefab = cc.loader.getRes("prefab/inputTable", cc.Prefab)
        this.inputTableBtn = cc.instantiate(this.inputTablePrefab)
        this.branchNode.node.addChild(this.inputTableBtn)
        this.inputTableBtn.x = 0
        this.inputTableBtn.y = 0
        var self = this
        if(!CC_JSB){
            this.videoPlayerNode.node.on("ready-to-play", (event) =>{
                self.videoLoadingNode.active = false
                self.isPlayStart = true
                
            })
            this.videoPlayerNode.node.on("meta-loaded", (event) =>{
                self.videoLoadingNode.active = true
                cc.log("meta")
            })
            this.videoPlayerNode.node.on("playing", (event) =>{

                cc.log("playing")
            })
            this.videoPlayerNode.node.on("stopped", (event) =>{
                cc.log("stopped")
            })
            this.videoPlayerNode.node.on("completed", (event) =>{
                if(self.branchData != null){
                    if(self.videoType == 1 ||self.videoType == 2 ){
                        cc.cs.gameMgr.sendVideoDone(cc.cs.PlayerInfo.playvideo, self.videoDoneHandle, self)
                    }
                    self.showBranchVideo()
                }else{
                    cc.log("self.videoType  videoPlayerNode " + self.videoType)
                    if(self.videoType == 1 ||self.videoType == 2 ){
                        cc.cs.gameMgr.sendVideoDone(cc.cs.PlayerInfo.playvideo, self.videoDoneHandle, self)
                    }else{
                        self.node.active = false
                        self.bgNode.active = true
                    }
                    
                }
            })
            this.videoPauseNode.on("click", (event) => {
                if(self.isPlayStart){
                    if(self.videoPlayerNode.isPlaying()){
                        self.videoPlayerNode.pause()
                        self.videoPauseTip.active = true
                    }else{
                        self.videoPlayerNode.play()
                        self.videoPauseTip.active = false
                    }
                }
            })
            this.faceTimeNode.getChildByName("phoneBtn").on("click", (event) => {
                self.videoLoadingNode.active = false
                self.videoPlayerNode.node.active = true
                self.videoPauseNode.active = true
                self.videoPauseTip.active = false
                self.videoPlayerNode.clip =  cc.url.raw("resources/video/"+self.playVideoID) + ".mp4"
                self.videoPlayerNode.play()
                self.faceTimeNode.active = false
                self.branchNode.node.active = false
            })
            this.backBtn.on("click", (event) => {
                self.videoPlayerNode.stop()
                if(self.branchData != null){
                    if(self.videoType == 1 ||self.videoType == 2 ){
                        cc.cs.gameMgr.sendVideoDone(cc.cs.PlayerInfo.playvideo, self.videoDoneHandle, self)
                    }
                    self.showBranchVideo()
                }else{
                    cc.log("self.videoType  backBtn " + self.videoType)
                    if(self.videoType == 1 ||self.videoType == 2 ){
                        cc.cs.gameMgr.sendVideoDone(cc.cs.PlayerInfo.playvideo, self.videoDoneHandle, self)
                    }else{
                        self.node.active = false
                        self.bgNode.active = true
                    }
                    
                }
            })
        }
    },

    onEnable : function(){
        cc.cs.AudioMgr.stopBGM()
    },

    onDisable : function(){
        cc.cs.AudioMgr.startBGM()
    },

    videoDoneHandle: function(ret) {
        cc.cs.UIMgr.closeNetView()
                var JasonObject = JSON.parse(ret);
                if (JasonObject.success === true) {
                    
                    cc.cs.PlayerInfo.playvideo = JasonObject.content.info.video_id;
                    //cc.cs.UIMgr.showTip("视频完成", 1.0)
                    cc.log("视频完成")
                    cc.cs.PlayerInfo.level = JasonObject.content.info.level
                    cc.cs.PlayerInfo.exp = JasonObject.content.info.exp
                    this.node.active = false
                    this.bgNode.active = true
                } else {
                    cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
                }
            },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
