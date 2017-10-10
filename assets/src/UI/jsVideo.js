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
        videoAnimationNode:{
            type: cc.Node,
            default: null
        },
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
        videoPlayerNode1: {
            type: cc.VideoPlayer,
            default: null
        },
        videoPlayerNode2: {
            type: cc.VideoPlayer,
            default: null
        },
        videoPlayerNativeNode: {
            type: cc.Node,
            default: null
        },
        videoPlayerNativeNode1: {
            type: cc.Node,
            default: null
        },
        videoPlayerNativeNode2: {
            type: cc.Node,
            default: null
        },
        
        videoPlayerNative:null,
        videoPlayerNative1:null,
        videoPlayerNative2:null,
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

        loadingBG1:{
            type: cc.Node,
            default: null
        },
        loadingBG2:{
            type: cc.Node,
            default: null
        },
        loadingBG3:{
            type: cc.Node,
            default: null
        },
        inputTablePrefab: null,
        inputTableBtn:null,
        playVideoID : 0,
        branchData : null,
        videoType : 0,
        videoloadingEnd:true,
        videoIsReadToPlay:false,
        videoLoadingAnimation : null,
        branchVideo1Ready : false,
        branchVideo2Ready : false,
        startBranchVideo : false,
        videoList:[],
        _downloader:null,
        _storagePath:"",
        currentDownLoadID : 0,
        isNativeVideoEnd:false,
        nativeVideoText1:[],
        nativeVideoText2:[],
        nativeVideoText3:[],
        nativeNanNode : null,
        nativeNvNode : null,
        facetimeAudioID : 0,
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

    startDownload : function(url,filename)
    {
        if(this._downloader == null){
            this._downloader = new jsb.Downloader();
            this._downloader.setOnFileTaskSuccess(this.onDownLoadSuccess.bind(this));
            this._downloader.setOnTaskProgress(this.onDownLoadProgress.bind(this));
            this._downloader.setOnTaskError(this.onDownLoadError.bind(this));
            this._storagePath = jsb.fileUtils.getWritablePath() + '/video-cases/downloader/'
            this._inited = jsb.fileUtils.createDirectory(this._storagePath);
        }
        this._downloader.createDownloadFileTask(url, this._storagePath + filename);
        cc.log("开始下载 dir = "+this._storagePath + filename)
    },

    getIndexOf : function (a, v){
        for (var i = 0; i < a.length; i++) {
            if (a[i] == v) return i;
            }
            return -1;
    },

    removeIndex : function(a, val){
        var index = this.getIndexOf(a,val);
        if (index > -1) {
            a.splice(index, 1);
        }
    },
    getVideoLev : function(id){
        var nextVideoID = 0
        for(var i = cc.cs.gameData.level["FIRST"]; i <= cc.cs.gameData.level["LAST"]; ++i){
            var data = cc.cs.gameData.getlevelData(i)
            if(data["LEV_STORY_VIDEO_ID"] == id ||data["LEV_STORY_VIDEO_ID"] + "" == id ){
                nextVideoID =  i+1
                break;
            }
        }
        var videoData = cc.cs.gameData.getlevelData(nextVideoID)
        if(videoData != null){
            var bData = cc.cs.gameData.getbranchVideoData(videoData["PLOT_VIDEO_ID"])
            if(bData != null){
                this.startDownload("http://112.74.36.182:8888/newvideo7/"+bData["PLOT_VIDEO_LINK_VIDEO_1"]+".mp4",bData["PLOT_VIDEO_LINK_VIDEO_1"]+".mp4")
                this.startDownload("http://112.74.36.182:8888/newvideo7/"+bData["PLOT_VIDEO_LINK_VIDEO_2"]+".mp4",bData["PLOT_VIDEO_LINK_VIDEO_2"]+".mp4")
            }
            this.startDownload("http://112.74.36.182:8888/newvideo7/"+videoData["LEV_STORY_VIDEO_ID"]+".mp4",videoData["LEV_STORY_VIDEO_ID"]+".mp4")
            if(videoData["LEV_VIDEO_ID"] != "dummy"){
                this.startDownload("http://112.74.36.182:8888/newvideo7/"+videoData["LEV_VIDEO_ID"]+".mp4",videoData["LEV_VIDEO_ID"]+".mp4")
            }
        }
    },
    setPlayVideoID : function(id){
        var self = this
        this.playVideoID = id;
        var videoID =this.getVideoType(id + "")
        this.videoAnimationNode.getComponent(cc.Animation).setCurrentTime(0)
        if(CC_JSB){
            this.getVideoLev(id)
            if (1103 == id || "1103" == id) {
                cc.loader.loadResDir("video/" + 1103,  function(err, id) {
                    if (!err) {
                        self.videoPlayerNative.preLoad(id + "")
                        self.videoIsReadToPlay = true;
                    } else {
                        cc.log("native video load err id = " + id)
                    }
                })
                //this.videoPlayerNative.preLoad(this._storagePath + "" + id + ".mp4");
                //this.videoIsReadToPlay = true;
                this.videoPlayerNativeNode.videoID = id
                this.nativeVideoText1 = []
                cc.cs.utils.getStr(id+"", this.nativeVideoText1);
            }else{
                this.videoIsReadToPlay = false
                this.videoList = []
                this.videoList.push(id)
                var bData =cc.cs.gameData.getbranchVideoData(id)
                this.videoPlayerNativeNode.videoID = id
                this.nativeVideoText1 = []
                cc.cs.utils.getStr(id+"", this.nativeVideoText1);
                if(bData != null){
                   
                    this.videoPlayerNativeNode1.videoID = bData["PLOT_VIDEO_LINK_VIDEO_1"]
                    this.videoPlayerNativeNode2.videoID = bData["PLOT_VIDEO_LINK_VIDEO_2"]
                    this.videoList.push( bData["PLOT_VIDEO_LINK_VIDEO_1"])
                    this.videoList.push( bData["PLOT_VIDEO_LINK_VIDEO_2"])
                    this.nativeVideoText2 = []
                    cc.cs.utils.getStr(bData["PLOT_VIDEO_LINK_VIDEO_1"]+"", this.nativeVideoText2);
                    this.nativeVideoText3 = []
                    cc.cs.utils.getStr(bData["PLOT_VIDEO_LINK_VIDEO_2"]+"", this.nativeVideoText3);
                    if(this.checkVideoOK(this.videoPlayerNativeNode1.videoID)){
                        this.videoPlayerNative1.preLoad(this._storagePath +this.currentDownLoadID + ".mp4")
                        this.branchVideo1Ready = true
                    }else{
                        this.startDownload("http://112.74.36.182:8888/newvideo7/"+this.videoPlayerNativeNode1.videoID+".mp4",this.videoPlayerNativeNode1.videoID+".mp4")
                    }

                    if(this.checkVideoOK(this.videoPlayerNativeNode2.videoID)){
                        this.videoPlayerNative2.preLoad(this._storagePath +this.currentDownLoadID + ".mp4")
                        this.branchVideo2Ready = true
                    }else{
                        this.startDownload("http://112.74.36.182:8888/newvideo7/"+this.videoPlayerNativeNode2.videoID+".mp4",this.videoPlayerNativeNode2.videoID+".mp4")
                    } 
                }
                this.currentDownLoadID = id
                if(this.checkVideoOK(this.currentDownLoadID)){
                    this.videoPlayerNative.preLoad(this._storagePath +this.currentDownLoadID + ".mp4")
                    this.videoIsReadToPlay = true
                }else{
                    this.startDownload("http://112.74.36.182:8888/newvideo7/"+id+".mp4",id+".mp4")
                }
                
            }
        }

        this.loadingBG1.active = false
        this.loadingBG2.active = false
        this.loadingBG3.active = false
        this.videoPlayerNode.node.active = false
        this.videoPlayerNode1.node.active = false
        this.videoPlayerNode2.node.active = false
        this.videoPlayerNativeNode.active = false
        this.videoPlayerNativeNode1.active = false
        this.videoPlayerNativeNode2.active = false




        this.startBranchVideo = false
        var bgindex = (parseInt( cc.random0To1() * 10 ) )%3
        if(bgindex == 0)
            this.loadingBG1.active = true
        else if(bgindex == 1)
            this.loadingBG2.active = true
        else if(bgindex == 2)
            this.loadingBG3.active = true
        this.backBtn.active = true
        if( videoID != 0){
            this.backBtn.active = false
            this.videoType = videoID
            cc.log("self.videoType  setPlayVideoID " + this.videoType)
            this.isPlayStart = false
            if(videoID == 1){
                this.videoLoadingNode.active = false
                
                this.videoPauseNode.active = true
                this.videoPauseTip.active = false
                this.videoloadingEnd = false
                
                if(!CC_JSB){
                    this.videoIsReadToPlay = false
                    this.videoPlayerNode.node.active = true
                    this.videoPlayerNode.clip =  cc.url.raw("resources/video/"+id) + ".mp4"
                }
                
                //var act = cc.sequence(cc.delayTime(2.0), cc.callFunc(this.loadEndFunc, this))
                //this.node.runAction(act)
                //this.videoLoadingAnimation.play()
                this.videoLoadingNode.active = true
                this.faceTimeNode.active = false
                this.branchNode.node.active = false
                this.branchData = cc.cs.gameData.getbranchVideoData(id)
                if(this.branchData != null){
                    this.branchVideo1Ready = false
                    this.branchVideo2Ready = false
                    if(!CC_JSB){
                        this.videoPlayerNode1.clip = cc.url.raw("resources/video/"+this.branchData["PLOT_VIDEO_LINK_VIDEO_1"]) + ".mp4"
                        this.videoPlayerNode2.clip = cc.url.raw("resources/video/"+this.branchData["PLOT_VIDEO_LINK_VIDEO_2"]) + ".mp4"
                    }

                    cc.cs.UIMgr.changeSprite(this.branchNode.node, "commonbg/"+id)
                }
               // this.videoPlayerNode.play()
            }else if(videoID == 2){
                //facetime
                this.videoLoadingNode.active = false
                this.videoPlayerNode.node.active = false
                this.videoPauseNode.active = false
                this.faceTimeNode.active = true
                this.facetimeAudioID = cc.cs.AudioMgr.playAudio("facetime",true)
                this.branchNode.node.active = false
                if(CC_JSB){
                    //this.videoIsReadToPlay = false
                }
            }else if(videoID == 3){
                //brach
            }else if(videoID == 4){
                this.videoLoadingNode.active = false
                this.videoPauseNode.active = true
                this.videoPauseTip.active = false
                this.videoloadingEnd = false
               // this.videoIsReadToPlay = false
                if(!CC_JSB){
                    this.videoPlayerNode.node.active = true
                    this.videoPlayerNode.clip =  cc.url.raw("resources/video/"+id) + ".mp4"
                }
               
                //var act = cc.sequence(cc.delayTime(2.0), cc.callFunc(this.loadEndFunc, this))
                //this.node.runAction(act)
                //this.videoLoadingAnimation.play()
                this.videoLoadingNode.active = true
                
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
                btn1.VIDEO_ID = 1
                btn2.VIDEO_ID = 2
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
    playNativeVideo : function(){
        this.videoPlayerNative.videoPlay()
        this.videoPlayerNativeNode.active = true
        this.videoPlayerNativeNode.runAction(cc.repeatForever(cc.callFunc(this.runNativePlayer, this)))
        this.isNativeVideoEnd = false;
    },

    runNativeBranchVideo1Player : function(){
        var self = this
        if(!this.isNativeVideoEnd){
            if(this.videoPlayerNative1.getVideoCurrentFrame() == this.videoPlayerNative1.getVideoFrameCount()){
                self.nativeNvNode.active = false
				self.nativeNanNode.active = false
                this.isNativeVideoEnd = true
                self.node.active = false
                self.bgNode.active = true
                jsb.fileUtils.removeFile(this._storagePath + this.videoPlayerNative1.videoID+".mp4" )
                cc.sys.localStorage.setItem(this.videoPlayerNative1.videoID + "", 0)
            }else{
                var currentTime = self.videoPlayerNative1.getVideoCurrentFrame()* (self.videoPlayerNative1.getVideoFrameRate() * 1000)
                var text = "";
                //cc.log("self.nativeVideoText2 " + self.nativeVideoText2.length)
                
                for(var i = 0 ; i < self.nativeVideoText2.length; ++i){
                    //cc.log("currentTime = " +currentTime  +  "     " + self.nativeVideoText2[i].starttime + "     " + self.nativeVideoText2[i].endtime + "     " + i)
                    if(currentTime >= self.nativeVideoText2[i].starttime && currentTime <= self.nativeVideoText2[i].endtime){
                        text = self.nativeVideoText2[i].text
                        break;
                    }
                }
                if(text != ""){
                    if(text[0] == "0"){
                        
                        self.nativeNvNode.active = true
                        self.nativeNanNode.active = false
                        self.nativeNvNode.getChildByName("name").getComponent(cc.Label).string = "许梦甜"
                        self.nativeNvNode.getChildByName("text").getComponent(cc.Label).string = text.replace(/^\d/, "")
                    }else{
                        self.nativeNvNode.active = false
                        self.nativeNanNode.active = true
                        self.nativeNanNode.getChildByName("name").getComponent(cc.Label).string = cc.cs.PlayerInfo.PlayerNmae
                        self.nativeNanNode.getChildByName("text").getComponent(cc.Label).string = text.replace(/^\d/, "")
                    }
                }else{
                    self.nativeNvNode.active = false
                    self.nativeNanNode.active = false
                }
            }

        }else{
            self.nativeNvNode.active = false
            self.nativeNanNode.active = false
        }
        
    },

    runNativeBranchVideo2Player : function(){
        var self = this
        if(!this.isNativeVideoEnd){
            if(this.videoPlayerNative2.getVideoCurrentFrame() == this.videoPlayerNative2.getVideoFrameCount()){
                self.nativeNvNode.active = false
				self.nativeNanNode.active = false
                this.isNativeVideoEnd = true
                self.node.active = false
                self.bgNode.active = true
                jsb.fileUtils.removeFile(this._storagePath + this.videoPlayerNative2.videoID+".mp4" )
                cc.sys.localStorage.setItem(this.videoPlayerNative2.videoID + "", 0)
            }else{
                var currentTime = self.videoPlayerNative2.getVideoCurrentFrame()* (self.videoPlayerNative2.getVideoFrameRate() * 1000)
                var text = "";
                //cc.log("self.nativeVideoText3 " + self.nativeVideoText3.length)
                
                for(var i = 0 ; i < self.nativeVideoText3.length; ++i){
                    //cc.log("currentTime = " +currentTime  +  "     " + self.nativeVideoText3[i].starttime + "     " + self.nativeVideoText3[i].endtime + "     " + i)
                    if(currentTime >= self.nativeVideoText3[i].starttime && currentTime <= self.nativeVideoText3[i].endtime){
                        text = self.nativeVideoText3[i].text
                        break;
                    }
                }
                if(text != ""){
                    if(text[0] == "0"){
                        
                        self.nativeNvNode.active = true
                        self.nativeNanNode.active = false
                        self.nativeNvNode.getChildByName("name").getComponent(cc.Label).string = "许梦甜"
                        self.nativeNvNode.getChildByName("text").getComponent(cc.Label).string = text.replace(/^\d/, "")
                    }else{
                        self.nativeNvNode.active = false
                        self.nativeNanNode.active = true
                        self.nativeNanNode.getChildByName("name").getComponent(cc.Label).string = cc.cs.PlayerInfo.PlayerNmae
                        self.nativeNanNode.getChildByName("text").getComponent(cc.Label).string = text.replace(/^\d/, "")
                    }
                }else{
                    self.nativeNvNode.active = false
                    self.nativeNanNode.active = false
                }
            }
        }else{
            self.nativeNvNode.active = false
            self.nativeNanNode.active = false
        }
        
    },

    downLoadXZVideo : function(){
        var count  = 0;
        for(var i = cc.cs.gameData.video["FIRST"]; i <=  cc.cs.gameData.video["LAST"]; ++i){
            videoData = cc.cs.gameData.getvideoData(i)
            if(videoData != null){
                if(!this.checkVideoOK(videoData["VIDEO_ID"])){
                    this.startDownload("http://112.74.36.182:8888/newvideo7/"+videoData["VIDEO_ID"]+".mp4",videoData["VIDEO_ID"]+".mp4")
                    count++
                    if(count >= 2 )
                    break;
                }
            }
        }
    },

    checkVideoOK : function(id){
        var s = cc.sys.localStorage.getItem(id + "")
        if(s == null) return false
        if(jsb.fileUtils.isFileExist(this._storagePath + ""+ id+".mp4" ) && s == 1){
            return true
        }else{
            return false
        }
    },

    runNativePlayer : function(){
        var self = this
        if(!this.isNativeVideoEnd){
            if(this.videoPlayerNative.getVideoCurrentFrame() == this.videoPlayerNative.getVideoFrameCount()){
                self.nativeNvNode.active = false
                self.nativeNanNode.active = false
                if(this.videoType != 4){
                    jsb.fileUtils.removeFile(this._storagePath + this.videoPlayerNative.videoID+".mp4" )
                    cc.sys.localStorage.setItem(this.videoPlayerNative.videoID + "", 0)
                }
                
                this.isNativeVideoEnd = true
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
            }else{
                if(this.videoType != 2){
                    var currentTime = self.videoPlayerNative.getVideoCurrentFrame()* (self.videoPlayerNative.getVideoFrameRate() * 1000)
                    var text = "";
                    //cc.log("self.nativeVideoText1 " + self.nativeVideoText1.length)
                    
                    for(var i = 0 ; i < self.nativeVideoText1.length; ++i){
                        //cc.log("currentTime = " +currentTime  +  "     " + self.nativeVideoText1[i].starttime + "     " + self.nativeVideoText1[i].endtime + "     " + i)
                        if(currentTime >= self.nativeVideoText1[i].starttime && currentTime <= self.nativeVideoText1[i].endtime){
                            text = self.nativeVideoText1[i].text
                            break;
                        }
                    }
                    if(text != ""){
                        if(text[0] == "0"){
                            
                            self.nativeNvNode.active = true
                            self.nativeNanNode.active = false
                            self.nativeNvNode.getChildByName("name").getComponent(cc.Label).string = "许梦甜"
                            self.nativeNvNode.getChildByName("text").getComponent(cc.Label).string = text.replace(/^\d/, "")
                        }else{
                            self.nativeNvNode.active = false
                            self.nativeNanNode.active = true
                            self.nativeNanNode.getChildByName("name").getComponent(cc.Label).string = cc.cs.PlayerInfo.PlayerNmae
                            self.nativeNanNode.getChildByName("text").getComponent(cc.Label).string = text.replace(/^\d/, "")
                        }
                    }else{
                        self.nativeNvNode.active = false
                        self.nativeNanNode.active = false
                    }
                }
            }
        }else{
            self.nativeNvNode.active = false
            self.nativeNanNode.active = false
        }
        
        cc.log(this.videoPlayerNative.getVideoCurrentFrame() + "   /  " + this.videoPlayerNative.getVideoFrameCount())
    },

    loadEndFunc : function(){
        if(this.videoIsReadToPlay){
            this.videoLoadingNode.active = false
            this.isPlayStart = true
            if(CC_JSB){
                this.playNativeVideo()
            }else{
                this.videoPlayerNode.play()
            }
            
            //this.videoLoadingAnimation.stop()
        }
    },
    playBranchVideo:function(id){
        this.videoLoadingNode.active = false
        this.videoPlayerNode.node.active = false
        this.videoPauseNode.active = true
        this.videoPauseTip.active = false
        
        //this.videoPlayerNode.clip =  cc.url.raw("resources/video/"+id) + ".mp4"
        this.videoloadingEnd = false
        this.videoIsReadToPlay = false
        //var act = cc.sequence(cc.delayTime(2.0), cc.callFunc(this.loadEndFunc, this))
        //this.node.runAction(act)
       // this.videoLoadingAnimation.play()
       /*this.loadingBG1.active = false
       this.loadingBG2.active = false
       this.loadingBG3.active = false

       var bgindex = (parseInt( cc.random0To1() * 10 ) )%3
       if(bgindex == 0)
           this.loadingBG1.active = true
       else if(bgindex == 1)
           this.loadingBG2.active = true
       else if(bgindex == 2)
           this.loadingBG3.active = true

        this.videoLoadingNode.active = true*/
        if(id == 1){
            this.videoPlayerNode.node.active = false
            this.videoPlayerNode1.node.active = true
            this.videoPlayerNode2.node.active = false
            this.videoPlayerNativeNode.active = false
            this.videoPlayerNativeNode1.active = true
            this.videoPlayerNativeNode2.active = false


            if(this.branchVideo1Ready){
                if(!CC_JSB){
                    this.videoPlayerNode1.play()
                }else{
                    this.videoPlayerNative1.videoPlay()
                    this.isNativeVideoEnd = false;
                    this.videoPlayerNativeNode1.active = true
                    this.videoPlayerNativeNode1.runAction(cc.repeatForever(cc.callFunc(this.runNativeBranchVideo1Player, this)))
                }
            }
        }else if(id == 2){
            this.videoPlayerNode.node.active = false
            this.videoPlayerNode1.node.active = false
            this.videoPlayerNode2.node.active = true

            this.videoPlayerNativeNode.active = false
            this.videoPlayerNativeNode1.active = false
            this.videoPlayerNativeNode2.active = true
            if(this.branchVideo2Ready){
                if(!CC_JSB){
                    this.videoPlayerNode2.play()
                }else{
                    this.videoPlayerNative2.videoPlay()
                    this.videoPlayerNativeNode2.active = true
                    this.videoPlayerNativeNode2.runAction(cc.repeatForever(cc.callFunc(this.runNativeBranchVideo2Player, this)))
                    this.isNativeVideoEnd = false;
                }
                
            }
        }
        this.isPlayStart = false
       // this.videoPlayerNode.play()
        this.faceTimeNode.active = false
        this.branchNode.node.active = false
        this.branchData = null
        this.startBranchVideo = true
    },
    showBranchVideo:function(){
        this.branchNode.node.active = true
        this.showInputTable()
        this.videoType = 3
    },

    onDownLoadSuccess : function(task){
        var s = task.requestURL + ""
        s=s.replace(/\?.*$/,'')
        s=s.replace(/^.*\//,'')
        s=s.replace(/.mp4/,'')
        
        this.currentDownLoadID = parseInt(s)
        cc.sys.localStorage.setItem(""+this.currentDownLoadID, 1)
       // this.removeIndex(this.videoList,this.currentDownLoadID)
        if(this.videoPlayerNativeNode.videoID == this.currentDownLoadID){
            this.videoPlayerNative.preLoad(this._storagePath +this.currentDownLoadID + ".mp4")
            this.videoIsReadToPlay = true
        }
        if(this.videoPlayerNativeNode1.videoID == this.currentDownLoadID){
            this.videoPlayerNative1.preLoad(this._storagePath +this.currentDownLoadID + ".mp4")
            
            this.branchVideo1Ready = true
        }
        if(this.videoPlayerNativeNode2.videoID == this.currentDownLoadID){
            this.videoPlayerNative2.preLoad(this._storagePath +this.currentDownLoadID + ".mp4")
            this.branchVideo2Ready = true
        }
        

    },
    onDownLoadProgress : function(task, bytesReceived, totalBytesReceived, totalBytesExpected){
        
    },
    onDownLoadError:function(task, errorCode, errorCodeInternal, errorStr){
        this.startDownload("http://112.74.36.182:8888/newvideo7/"+this.currentDownLoadID+".mp4",this.currentDownLoadID+".mp4")
    },
    // use this for initialization
    onLoad: function () {
        
        this.inputTablePrefab = cc.loader.getRes("prefab/inputTable", cc.Prefab)
        this.inputTableBtn = cc.instantiate(this.inputTablePrefab)
        this.branchNode.node.addChild(this.inputTableBtn)
        this.inputTableBtn.x = 0
        this.inputTableBtn.y = 0
        var self = this
        this.nativeNanNode = this.node.getChildByName("nanText")
        this.nativeNvNode = this.node.getChildByName("nvText")

        this.videoLoadingAnimation = this.videoLoadingNode.getChildByName("New Node").getComponent("cc.Animation")
        //this.videoLoadingAnimation.stop()
        this.videoLoadingAnimation.on('lastframe',  this.loadEndFunc,    this);
        if(CC_JSB){
            this.nativeNanNode.active = false
            this.nativeNvNode.active = false
            if(this._downloader == null){
                this._downloader = new jsb.Downloader();
                this._downloader.setOnFileTaskSuccess(this.onDownLoadSuccess.bind(this));
                this._downloader.setOnTaskProgress(this.onDownLoadProgress.bind(this));
                this._downloader.setOnTaskError(this.onDownLoadError.bind(this));
                this._storagePath = jsb.fileUtils.getWritablePath() + '/video-cases/downloader/'
                this._inited = jsb.fileUtils.createDirectory(this._storagePath);
            }
            
            if (!this._inited) {
                cc.log('Failed to create storage path, downloader won\'t work correctly')
            }
            this.videoPlayerNative = cc.LiveVideo.create()
            this.videoPlayerNativeNode._sgNode.addChild(this.videoPlayerNative)
            this.videoPlayerNative1 = cc.LiveVideo.create()
            this.videoPlayerNativeNode1._sgNode.addChild(this.videoPlayerNative1)
            this.videoPlayerNative2 = cc.LiveVideo.create()
            this.videoPlayerNativeNode2._sgNode.addChild(this.videoPlayerNative2)
        }
        if(!CC_JSB){
            this.nativeNanNode.active = false
            this.nativeNvNode.active = false
            this.videoPlayerNode.node.on("ready-to-play", (event) =>{
                cc.log("ready-to-play")
                if(cc.sys.browserType != "qq" &&cc.sys.browserType != cc.sys.BROWSER_TYPE_QQ && cc.sys.browserType != cc.sys.BROWSER_TYPE_MOBILE_QQ &&  cc.sys.browserType != cc.sys.BROWSER_TYPE_WECHAT )
                    self.videoIsReadToPlay = true
                
            })

            this.videoPlayerNode.node.on("meta-loaded", (event) =>{
                cc.log("cc.sys.browserType   =   " + cc.sys.browserType + "  " + cc.sys.BROWSER_TYPE_QQ + "   " + cc.sys.BROWSER_TYPE_MOBILE_QQ)
                if(cc.sys.browserType == "qq" || cc.sys.browserType == cc.sys.BROWSER_TYPE_QQ || cc.sys.browserType == cc.sys.BROWSER_TYPE_MOBILE_QQ || cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT )
                    self.videoIsReadToPlay = true
                cc.log("meta")
            })
            this.videoPlayerNode.node.on("playing", (event) =>{

                cc.log("playing")
            })
            this.videoPlayerNode.node.on("stopped", (event) =>{
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
            this.videoPlayerNode.node.on("completed", (event) =>{
                self.videoPlayerNode.stop()
            })

            this.videoPlayerNode1.node.on("ready-to-play", (event) =>{
                cc.log("ready-to-play")
                if(cc.sys.browserType != "qq" &&cc.sys.browserType != cc.sys.BROWSER_TYPE_QQ && cc.sys.browserType != cc.sys.BROWSER_TYPE_MOBILE_QQ &&  cc.sys.browserType != cc.sys.BROWSER_TYPE_WECHAT ){
                    if(self.startBranchVideo){
                        self.videoPlayerNode1.play()
                    }
                    self.branchVideo1Ready = true
                }
            })

            this.videoPlayerNode1.node.on("meta-loaded", (event) =>{
                cc.log("cc.sys.browserType   =   " + cc.sys.browserType + "  " + cc.sys.BROWSER_TYPE_QQ + "   " + cc.sys.BROWSER_TYPE_MOBILE_QQ)
                if(cc.sys.browserType == "qq" || cc.sys.browserType == cc.sys.BROWSER_TYPE_QQ || cc.sys.browserType == cc.sys.BROWSER_TYPE_MOBILE_QQ || cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT ){
                    if(self.startBranchVideo){
                        self.videoPlayerNode1.play()
                    }
                    self.branchVideo1Ready = true
                }
                    
                cc.log("meta")
            })
            this.videoPlayerNode1.node.on("stopped", (event) =>{
                self.node.active = false
                self.bgNode.active = true
            })
            this.videoPlayerNode1.node.on("completed", (event) =>{
                self.videoPlayerNode.stop()
            })


            this.videoPlayerNode2.node.on("ready-to-play", (event) =>{
                cc.log("ready-to-play")
                if(cc.sys.browserType != "qq" &&cc.sys.browserType != cc.sys.BROWSER_TYPE_QQ && cc.sys.browserType != cc.sys.BROWSER_TYPE_MOBILE_QQ &&  cc.sys.browserType != cc.sys.BROWSER_TYPE_WECHAT ){
                    if(self.startBranchVideo){
                        self.videoPlayerNode2.play()
                    }
                    self.branchVideo2Ready = true
                }
            })

            this.videoPlayerNode2.node.on("meta-loaded", (event) =>{
                cc.log("cc.sys.browserType   =   " + cc.sys.browserType + "  " + cc.sys.BROWSER_TYPE_QQ + "   " + cc.sys.BROWSER_TYPE_MOBILE_QQ)
                if(cc.sys.browserType == "qq" || cc.sys.browserType == cc.sys.BROWSER_TYPE_QQ || cc.sys.browserType == cc.sys.BROWSER_TYPE_MOBILE_QQ || cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT ){
                    if(self.startBranchVideo){
                        self.videoPlayerNode2.play()
                    }
                    self.branchVideo2Ready = true
                }
                    
                cc.log("meta")
            })
            this.videoPlayerNode2.node.on("stopped", (event) =>{
                self.node.active = false
                self.bgNode.active = true
            })
            this.videoPlayerNode2.node.on("completed", (event) =>{
                self.videoPlayerNode.stop()
            })


            
            
        }
        this.videoPauseNode.on("click", (event) => {
            if(CC_JSB){
                return;
                if(self.isPlayStart){
                    if (!self.videoPlayerNative.isVideoPause()) {
                        self.videoPlayerNative.videoPause()
                        self.videoPauseTip.active = true
                    }else{
                        self.videoPlayerNative.videoResume()
                        self.videoPauseTip.active = false
                    }
                }
            }else{
                if(self.isPlayStart){
                    if(self.videoPlayerNode.isPlaying()){
                        self.videoPlayerNode.pause()
                        self.videoPauseTip.active = true
                    }else{
                        self.videoPlayerNode.play()
                        self.videoPauseTip.active = false
                    }
                }
            }
            
        })
        this.faceTimeNode.getChildByName("phoneBtn").on("click", (event) => {
            
            self.videoPauseNode.active = true
            self.videoPauseTip.active = false
            if(CC_JSB){
                self.videoPlayerNode.node.active = false
                self.videoPlayerNativeNode.active = true
            }else{
                self.videoPlayerNode.node.active = true
                self.videoPlayerNode.clip =  cc.url.raw("resources/video/"+self.playVideoID) + ".mp4"
            }
            cc.cs.AudioMgr.StopAudio(self.facetimeAudioID)
            
            self.videoloadingEnd = false
            //self.videoIsReadToPlay = false
            self.videoLoadingNode.active = true
            //var act = cc.sequence(cc.delayTime(2.0), cc.callFunc(self.loadEndFunc, self))
            //self.node.runAction(act)
            //self.videoLoadingAnimation.play()
           // self.videoPlayerNode.play()
            self.faceTimeNode.active = false
            self.branchNode.node.active = false
        })
        this.backBtn.on("click", (event) => {
            if(CC_JSB){
                self.videoPlayerNative.videoStop()
            }else{
                self.videoPlayerNode.stop()
            }
            
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
    },

    onEnable : function(){
		if(!cc.cs.AudioMgr.GetSoundOff())
        cc.cs.AudioMgr.stopBGM()
    },

    onDisable : function(){
		if(!cc.cs.AudioMgr.GetSoundOff())
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
                    if(this.branchData == null){
                        this.node.active = false
                        this.bgNode.active = true
                    }
                    
                } else {
                    cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
                }
            },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
