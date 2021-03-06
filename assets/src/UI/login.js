cc.Class({
    extends: cc.Component,

    properties: {
        startGameNode: {
            type: cc.Node,
            default: null
        },
        registerNode: {
            type: cc.Node,
            default: null
        },
        loginNode: {
            type: cc.Node,
            default: null
        },
        startGameBtn: {
            type: cc.Node,
            default: null
        },
        gustIDLabel: {
            type: cc.Label,
            default: null
        },

        gustIDLabel2: {
            type: cc.Label,
            default: null
        },

        zhucediban: {
            type: cc.Node,
            default: null

        },

        bangdingdiban: {
            type: cc.Node,
            default: null
        },

        LogoNode: {

            type: cc.Node,
            default: null

        },
        LogoVideoNode: {

            type: cc.Node,
            default: null

        },

        intoRegisterBangDingNodeBtn: {
            type: cc.Node,
            default: null
        },

        intoRegisterNodeBtn: {
            type: cc.Node,
            default: null
        },
        intoLoginNodeBtn: {
            type: cc.Node,
            default: null
        },
        registerBackBtn: {
            type: cc.Node,
            default: null
        },
        registerConfirmBtn: {
            type: cc.Node,
            default: null
        },
        registerIDEdit: {
            type: cc.EditBox,
            default: null
        },
        registerPasswordEdit: {
            type: cc.EditBox,
            default: null
        },
        registerConfirmPasswordEdit: {
            type: cc.EditBox,
            default: null
        },
        regisetrIntoLoginBtn: {
            type: cc.Node,
            default: null
        },
        loginBackBtn: {
            type: cc.Node,
            default: null
        },
        loginIDEdit: {
            type: cc.EditBox,
            default: null
        },
        loginPasswordEdit: {
            type: cc.EditBox,
            default: null
        },
        LoginIntoRegisterBtn: {
            type: cc.Node,
            default: null
        },
        LoginBtn: {
            type: cc.Node,
            default: null
        },
        randomNameNode: {
            type: cc.Node,
            default: null
        },
        randomNameConfirmBtn: {
            type: cc.Node,
            default: null
        },
        randomNameRandomBtn: {
            type: cc.Node,
            default: null
        },
        playerNameEdit: {
            type: cc.EditBox,
            default: null
        },
        editTip: {
            type: cc.Label,
            default: null
        },
        videoNode: {
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

        perLaber: {
            type: cc.Label,
            default: null
        },

        nativeVideoNode: {
            type: cc.Node,
            default: null
        },
        isLogin: false,
        isGuest: false,
        videoLoadOver1: false,
        videoLoadOver2: false,
        isPlayStart: false,
        playVideoID: "",
        nativeVideo: null,
        loadProcessPer: 0,
        loadScenePer: 0,
        isNativeVideoEnd: false,
        nativeVideoText: [],
        nativeNanNode: null,
        nativeNvNode: null,
        nativeVideoBtn: null,
        nativeNvTextFlag:false,
    },


    BackAudio: function() {

        cc.cs.AudioMgr.playAudio("return")

    },

    ClickAudio: function() {
        cc.cs.AudioMgr.playAudio("click")
    },

    isFirstGame: function() {

        var diviceid = cc.sys.localStorage.getItem('UUID')
        cc.log("isfirstGame diviceid = " + diviceid)
        if (diviceid != "" && diviceid != null) {
            return false;
        } else {
            return true;
        }

    },

    getDiviceID: function() {
        /* var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";
        
            var uuid = s.join("");
            return uuid;*/
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            let ret = jsb.reflection.callStaticMethod("RootViewController", "getUUID");
            cc.log("objc uuid = " + ret)

            return ret
        }
		return "cytest1111android"

    },

    setLogoNode: function() {

        this.startGameNode.active = false;
        this.registerNode.active = false;
        this.loginNode.active = false;
        this.randomNameNode.active = false;
        this.LogoNode.active = true;

        this.schedule(function() {
            var logovideo = cc.sys.localStorage.getItem('LOGOVIDEO')
                //if(logovideo == 1)
                {
                    //if (CC_JSB) {
                    this.setStartGameNode();
                    //}
                    //else
                    // {
                    //     this.setLoginNode();
                    // }
                }
                /* else
                 {
                 
                      this.LogoVideoNode.active = true;
                      this.schedule(function(){
                          cc.sys.localStorage.setItem('LOGOVIDEO',1)
                          this.setStartGameNode();
                      },5,0);
                 }*/

        }, 3, 0);

    },

    playLogoVideo: function(id) // 播放第一次的LOGO视频
        {
            /*this.startGameNode.active = false;
            this.registerNode.active = false;
            this.loginNode.active = false;
            this.randomNameNode.active = false;
            this.LogoNode.active = true;
        
            this.LogoVideoNode.active = true*/
            if (!CC_JSB) {
                this.playVideoID = id
                this.node.active = false
                this.videoNode.active = true
                this.videoLoadingNode.active = false
                this.videoPlayerNode.node.active = true
                this.videoPauseNode.active = true
                this.videoPauseTip.active = false


                this.isPlayStart = false
                this.videoPlayerNode.play()
            } else {
                this.playVideoID = id
                if (this.playVideoID == 1100) {
                    var ll = cc.sys.localStorage.getItem("1100")
                    if (ll != null && ll == 1) {
                        this.nativeVideoBtn.active = true
                    } else {
                        this.nativeVideoBtn.active = false
                    }
                } else if (this.playVideoID == 1101) {
                    
                    this.nativeVideoBtn.active = false
                }else{
                    this.nativeVideoBtn.active = false
                }
                this.node.active = false
                this.videoNode.active = false
                this.nativeVideoNode.active = true
                this.nativeVideo.videoPlay()
                this.nativeNvTextFlag = false
                this.nativeVideoNode.runAction(cc.repeatForever(cc.callFunc(this.runNativePlayer, this)))
                this.isNativeVideoEnd = false
                this.nativeNvNode.active = false
                this.nativeNanNode.active = false
            }
        },

    runNativePlayer: function() {
        var self = this
        if (!this.isNativeVideoEnd) {

            if (this.nativeVideo.getVideoCurrentFrame() == this.nativeVideo.getVideoFrameCount() && this.nativeVideo.getVideoFrameCount() != 0) {
                this.isNativeVideoEnd = true
                this.nativeVideoNode.active = false
                this.node.active = true
                this.videoNode.active = false
                self.nativeNvNode.active = false
                self.nativeNanNode.active = false
                if (this.playVideoID == 1100) {

                    
                    this.nativeVideoText = []
                    cc.cs.utils.getStr("1101", this.nativeVideoText);
                    this.setStartGameNode();
                    this.nativeVideoBtn.active = false
                    cc.sys.localStorage.setItem("1100", 1);
                    self.node.active = true
                } else
                if (this.playVideoID == 1101) {
                    this.nativeVideoText = []
                    cc.cs.utils.getStr("1102", this.nativeVideoText);
                    cc.loader.loadResDir("video/" + 1102, function(err, id) {
                        if (!err) {
                            self.nativeVideo.preLoad(id + "")
                        } else {
                            cc.log("native video load err id = " + id)
                        }
                    })
                } else if (this.playVideoID == 1102) {
                    self.preLoadGame();
                    cc.cs.gameMgr.sendVideoDone(cc.cs.PlayerInfo.playvideo, self.videoDoneHandle, self)
                    self.videoNode.active = false
                    self.node.active = true
                    self.isPlayStart = false
                }
                this.nativeVideoNode.stopAllActions()
            } else {
                var currentTime = self.nativeVideo.getVideoCurrentFrame() * (self.nativeVideo.getVideoFrameRate() * 1000)
                var text = "";
                //cc.log("self.nativeVideoText " + self.nativeVideoText.length)
                //var nativeNvTextFlag = false
                for (var i = 0; i < self.nativeVideoText.length; ++i) {
                    //cc.log("currentTime = " +currentTime  +  "     " + self.nativeVideoText[i].starttime + "     " + self.nativeVideoText[i].endtime + "     " + i)
                    if (currentTime >= self.nativeVideoText[i].starttime && currentTime <= self.nativeVideoText[i].endtime) {
                        text = self.nativeVideoText[i].text
                        if (text[0] == "0") {
                            if (i < self.nativeVideoText.length - 1) {
                                if (self.nativeVideoText[i + 1].text[0] == "0") {
                                    if (self.nativeVideoText[i + 1].starttime - self.nativeVideoText[i].endtime < 1000) {
                                        self.nativeNvTextFlag = true
                                    } else {
                                        self.nativeNvTextFlag = false
                                    }
                                } else {
                                    self.nativeNvTextFlag = false
                                }
                            } else {
                                self.nativeNvTextFlag = false
                            }
                        } else {
                            self.nativeNvTextFlag = false
                        }
                        break;
                    }
                }
                if (text != "") {
                    if (text[0] == "0") {

                        self.nativeNvNode.active = true
                        self.nativeNanNode.active = false
                        self.nativeNvNode.getChildByName("name").getComponent(cc.Label).string = "许梦甜"
                        self.nativeNvNode.getChildByName("text").getComponent(cc.Label).string = text.replace(/\d/g, "")
                    } else {
                        self.nativeNvNode.active = false
                        self.nativeNanNode.active = true
                        self.nativeNanNode.getChildByName("name").getComponent(cc.Label).string = cc.cs.PlayerInfo.PlayerNmae
                        self.nativeNanNode.getChildByName("text").getComponent(cc.Label).string = text.replace(/\d/g, "")
                    }
                } else {
                    if (self.nativeNvTextFlag) {
                        self.nativeNvNode.active = self.nativeNvTextFlag
                        self.nativeNvNode.getChildByName("text").getComponent(cc.Label).string = text;
                    } else {
                        self.nativeNvNode.active = false
                    }
                    self.nativeNanNode.active = false
                }
            }
        } else {
            self.nativeNvNode.active = false
            self.nativeNanNode.active = false
        }


        //cc.log(this.nativeVideo.getVideoCurrentFrame() + "   /  " + this.nativeVideo.getVideoFrameCount())
    },

    setStartGameNode: function() {
        this.startGameNode.active = true;
        this.registerNode.active = false;
        this.loginNode.active = false;
        this.randomNameNode.active = false;
        this.LogoNode.active = false;
        this.node.active = true

        var login_id = cc.sys.localStorage.getItem('LOGIN_ID')
        var passward = cc.sys.localStorage.getItem('PASSWORD')

        if ((login_id != null && login_id != "") && (passward != null && passward != "")) {
            this.intoRegisterBangDingNodeBtn.active = false
            this.intoRegisterNodeBtn.active = true
        } else {
            if (CC_JSB) {
                this.intoRegisterBangDingNodeBtn.active = true
                this.intoRegisterNodeBtn.active = false
            } else {
                this.intoRegisterBangDingNodeBtn.active = false
                this.intoRegisterNodeBtn.active = true
            }
            if (this.isFirstGame()) {
                var uuid = this.getDiviceID()
                cc.log("first game uuid = " + uuid)
                cc.sys.localStorage.setItem('UUID', uuid)
                this.gustIDLabel.string = "游客" + uuid.substring(0, 6)
                this.gustIDLabel2.string = this.gustIDLabel.string
            }
        }

    },

    setRegisterNode: function() {
        this.startGameNode.active = false;
        this.registerNode.active = true;
        this.loginNode.active = false;
        this.randomNameNode.active = false;
        this.LogoNode.active = false;

        var login_id = cc.sys.localStorage.getItem('LOGIN_ID')
        var passward = cc.sys.localStorage.getItem('PASSWORD')
        if ((login_id != null && login_id != "") && (passward != null && passward != "")) {
            cc.log("zhu ce")
            this.bangdingdiban.active = false
            this.zhucediban.active = true
        } else {
            cc.log("bangding")
            if (CC_JSB) {
                this.bangdingdiban.active = true
                this.zhucediban.active = false
            } else {
                this.bangdingdiban.active = false
                this.zhucediban.active = true
            }

        }
    },

    setLoginNode: function() {
        this.startGameNode.active = false;
        this.registerNode.active = false;
        this.loginNode.active = true;
        this.randomNameNode.active = false;
        this.LogoNode.active = false;
    },

    setRandomNameNode: function() {
        this.startGameNode.active = false;
        this.registerNode.active = false;
        this.loginNode.active = false;
        this.randomNameNode.active = true;
        this.LogoNode.active = false;
    },

    loginEvent: function() {
        //cc.cs.UIMgr.showTip("这里添加登陆事件", 1.0)



        cc.cs.gameMgr.sendLogin(this.loginIDEdit.string, this.loginPasswordEdit.string, this.loginHandle, this)
            //this.setRandomNameNode()
    },

    registerEvent: function() {
        //cc.cs.UIMgr.showTip("这里添加注册事件", 1.0)
        cc.cs.gameMgr.sendRegister(this.registerIDEdit.string, this.registerPasswordEdit.string, this.registerHandle, this)
    },

    playerName: function() {
        //cc.cs.UIMgr.showTip("这里添加用户名事件", 1.0)
        cc.log("setplayername")
            //var api_token = cc.sys.localStorage.getItem('API_TOKEN')
        if (this.playerNameEdit.string.length == 0) {
            cc.cs.UIMgr.showTip("名字不能为空", 1.0)
        } else {
            cc.cs.PlayerInfo.PlayerNmae = this.playerNameEdit.string
            cc.cs.gameMgr.sendName(this.sendNameHandle, this)
        }
    },

    editplayerName: function() {
        cc.log("AAAAA")
            // this.editTip.node.active = true
            //this.editTip.string = this.playerNameEdit.string;
        cc.cs.PlayerInfo.PlayerNmae = this.playerNameEdit.string
            //this.playerNameEdit.string = "";
    },



    editplayerNameBegin: function() {
        cc.log("BBBBB")
            //this.editTip.node.active = false
            //this.playerNameEdit.string = "";
    },

    randomName: function() {
        //cc.cs.UIMgr.showTip("这里添加随机用户名功能", 1.0)
        var firstNameID = parseInt(cc.random0To1() * cc.cs.gameData.role["TOTAL_COUNT"])
        if (firstNameID < cc.cs.gameData.role["FIRST"]) firstNameID = cc.cs.gameData.role["FIRST"]
        var firstName = cc.cs.gameData.getroleData(firstNameID)

        var secondNameID = parseInt(cc.random0To1() * cc.cs.gameData.role["TOTAL_COUNT"])
        if (secondNameID < cc.cs.gameData.role["FIRST"]) secondNameID = cc.cs.gameData.role["FIRST"]
        var secondName = cc.cs.gameData.getroleData(secondNameID)

        var name = firstName.FAMLIY_NAME + secondName.NAME
        cc.log(name)
            // this.editTip.string =  name
        this.playerNameEdit.string = name
    },

    startgame: function() {
        var self = this
        cc.log("isLogin = " + this.isLogin)
        if (this.isLogin) {
            cc.log("video_id = " + cc.cs.PlayerInfo.playvideo)
            if (cc.cs.PlayerInfo.playvideo == 2) // 第一次进游戏 视频
            {
				if(CC_JSB){
					cc.loader.loadResDir("video/" + 1101, function(err, id) {
                    if (!err) {
                        self.nativeVideo.preLoad(id + "")
                        self.setRandomNameNode();
                        self.playLogoVideo("1101")
                        
                    } else {
                        cc.log("native video load err id = " + id)
                    }
                })
				}else{
					self.playLogoVideo("1101")
					self.setRandomNameNode();
					
				}
                
                
            } else {
                //cc.director.loadScene('GameScene');
                this.loadGame()
            }
        } else {
            this.preLoadGame()
            var login_id = cc.sys.localStorage.getItem('LOGIN_ID')
            var passward = cc.sys.localStorage.getItem('PASSWORD')
            if ((login_id != null && login_id != "") && (passward != null && passward != "")) {
                this.gustIDLabel.string = login_id
                cc.cs.gameMgr.sendLogin(login_id, passward, this.gotoGameScene, this)
            } else {
                //this.setStartGameNode()
                //this.gustIDLabel.string = cc.cs.gameMgr.generateGustInfo()
                if (CC_JSB) {
                    cc.cs.gameMgr.sendLogin("", "", this.gotoGameScene, this)
                } else {
                    cc.cs.UIMgr.showTip("请注册账号", 2.0)
                }
            }
        }
    },
    videoDoneHandle: function(ret) {


        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.cs.PlayerInfo.playvideo = JasonObject.content.info.video_id;
            //cc.cs.UIMgr.showTip("视频完成", 1.0)
            cc.cs.PlayerInfo.level = JasonObject.content.info.level
            cc.cs.PlayerInfo.exp = JasonObject.content.info.exp

            //cc.director.loadScene('GameScene');
            this.loadGame()
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },


    updatePlayerInfo: function(JasonObject) {
        cc.cs.PlayerInfo.api_token = JasonObject.content.info.api_token
        cc.cs.PlayerInfo.PlayerNmae = JasonObject.content.info.name
        cc.log("玩家名字" + JasonObject.content.info.name)
        cc.cs.PlayerInfo.welcome = JasonObject.content.info.welcome
        cc.cs.PlayerInfo.updateLevel(JasonObject.content.info.level)
        cc.cs.PlayerInfo.sign = JasonObject.content.info.sign
        cc.cs.PlayerInfo.updateExp(JasonObject.content.info.exp)
        cc.cs.PlayerInfo.Power = JasonObject.content.info.power
        cc.cs.PlayerInfo.updateMoney(JasonObject.content.info.money)
        cc.cs.PlayerInfo.diamond = JasonObject.content.info.diamond
        cc.cs.PlayerInfo.updatePhoenID(JasonObject.content.info.phone_id)
        cc.cs.PlayerInfo.updateWechatID(JasonObject.content.info.wechat_id)
        cc.cs.PlayerInfo.zoneThumbsUp_id = JasonObject.content.info.zoneThumbsUp_id
        cc.cs.PlayerInfo.zoneReplay_id = JasonObject.content.info.zoneReplay_id
        cc.cs.PlayerInfo.work_id = JasonObject.content.info.work_id

        cc.cs.PlayerInfo.date_id = JasonObject.content.info.date_id
        for (var i = 1; i <= cc.cs.gameData.date["TOTAL_COUNT"]; ++i) {
            cc.cs.PlayerInfo.updateLoveFreeTimes(i, JasonObject.content.info["date_id" + i])
            cc.cs.PlayerInfo.updateLovePrice(i, JasonObject.content.info["Love" + i + "Price"])
            cc.log(JasonObject.content.info["Love" + i + "Price"] + "price")
        }

        for (var i = 1; i < cc.cs.gameData.work["TOTAL_COUNT"]; ++i) {
            cc.cs.PlayerInfo.updateWorkFreeTimes(i, JasonObject.content.info["work_id" + i])

        }

        for (var i = 1; i <= 5; ++i) {

            cc.cs.PlayerInfo.updateGoodsTimes(i, JasonObject.content.info["leftbuygoods" + i + "times"])
        }

        /*cc.cs.PlayerInfo.Work1LeftTImes = JasonObject.content.info.work_id1
        cc.cs.PlayerInfo.Work2LeftTImes = JasonObject.content.info.work_id2
        cc.cs.PlayerInfo.Work3LeftTImes = JasonObject.content.info.work_id3
        cc.cs.PlayerInfo.Work4LeftTImes = JasonObject.content.info.work_id4
        cc.cs.PlayerInfo.Work5LeftTImes = JasonObject.content.info.work_id5
        cc.cs.PlayerInfo.Work6LeftTImes = JasonObject.content.info.work_id6
        cc.cs.PlayerInfo.Work7LeftTImes = JasonObject.content.info.work_id7
        cc.cs.PlayerInfo.Work8LeftTImes = JasonObject.content.info.work_id8
        cc.cs.PlayerInfo.Work9LeftTImes = JasonObject.content.info.work_id9
        cc.cs.PlayerInfo.Work10LeftTImes = JasonObject.content.info.work_id10*/


        /*cc.cs.PlayerInfo.Love1LeftTImes = JasonObject.content.info.date_id1
        cc.cs.PlayerInfo.Love2LeftTImes = JasonObject.content.info.date_id2
        cc.cs.PlayerInfo.Love3LeftTImes = JasonObject.content.info.date_id3
        cc.cs.PlayerInfo.Love4LeftTImes = JasonObject.content.info.date_id4
        cc.cs.PlayerInfo.Love5LeftTImes = JasonObject.content.info.date_id5
        cc.cs.PlayerInfo.Love6LeftTImes = JasonObject.content.info.date_id6
        cc.cs.PlayerInfo.Love7LeftTImes = JasonObject.content.info.date_id7*/

        /* cc.cs.PlayerInfo.Love1Price = JasonObject.content.info.Love1Price
         cc.cs.PlayerInfo.Love2Price = JasonObject.content.info.Love2Price
         cc.cs.PlayerInfo.Love3Price = JasonObject.content.info.Love3Price
         cc.cs.PlayerInfo.Love4Price = JasonObject.content.info.Love4Price
         cc.cs.PlayerInfo.Love5Price = JasonObject.content.info.Love5Price
         cc.cs.PlayerInfo.Love6Price = JasonObject.content.info.Love6Price
         cc.cs.PlayerInfo.Love7Price = JasonObject.content.info.Love7Price*/

        cc.cs.PlayerInfo.wechat_fn = JasonObject.content.info.wechat_fn
        cc.cs.PlayerInfo.zone_fn = JasonObject.content.info.zone_fn
        cc.cs.PlayerInfo.date_fn = JasonObject.content.info.date_fn
        cc.cs.PlayerInfo.work_fn = JasonObject.content.info.work_fn



        cc.cs.PlayerInfo.playvideo = JasonObject.content.info.video_id

        cc.cs.PlayerInfo.signday = JasonObject.content.info.signday
        var itemcount = JasonObject.content.info.backpacks.length
        for (var i = 0; i < JasonObject.content.info.backpacks.length; i++) {

            cc.log("goodsid = " + JasonObject.content.info.backpacks[i].goods_id)
            cc.cs.PlayerInfo.Bag.push(JasonObject.content.info.backpacks[i])
        }
        for (var i = 0; i < JasonObject.content.info.phones.length; i++) {

            cc.log("phoneid = " + JasonObject.content.info.phones[i].phone_id)
            cc.cs.PlayerInfo.addPhonePlayerID(JasonObject.content.info.phones[i].phone_id)
        }

        for (var i = 0; i < JasonObject.content.info.wechats.length; i++) {

            //cc.log("goodsid = "+JasonObject.content.info.backpacks[i].goods_id)
            cc.cs.PlayerInfo.addWechatPlayerID(JasonObject.content.info.wechats[i].wechat_id)
        }

        for (var i = 0; i < JasonObject.content.info.thumbs.length; i++) {

            cc.cs.PlayerInfo.addZoneThumbs(JasonObject.content.info.thumbs[i].zone_id)
        }

        for (var i = 0; i < JasonObject.content.info.replies.length; i++) {
            cc.log("reply_id = " + JasonObject.content.info.replies[i].reply_id)
            cc.cs.PlayerInfo.addZoneReplies(JasonObject.content.info.replies[i].reply_id)
        }

        if (cc.cs.PlayerInfo.Phone_ID == "1" || cc.cs.PlayerInfo.Phone_ID == 1)
            cc.cs.PlayerInfo.Phone_ID = 1
        if (cc.cs.PlayerInfo.wechat_id == "0" || cc.cs.PlayerInfo.wechat_id == 0)
            cc.cs.PlayerInfo.wechat_id = 1
    },
    gotoGameScene: function(ret) {
        var self = this
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.sys.localStorage.setItem('API_TOKEN', JasonObject.content.info.api_token)
                //cc.sys.localStorage.setItem('UserID',this.loginIDEdit.string)
            this.isLogin = true
            this.updatePlayerInfo(JasonObject)
            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)
            cc.log("video_id = " + cc.cs.PlayerInfo.playvideo)
            if (cc.cs.PlayerInfo.playvideo == 2) // 第一次进游戏 视频
            {
				if(CC_JSB){
					cc.loader.loadResDir("video/" + 1101, function(err, id) {
                    if (!err) {
                        self.nativeVideo.preLoad(id + "")
                        self.setRandomNameNode();
                        self.playLogoVideo("1101")
                        
                    } else {
                        cc.log("native video load err id = " + id)
                    }
                })
				}else{
					
					self.playLogoVideo("1101")
					self.setRandomNameNode();
				}
           
				
            } else {
                //cc.director.loadScene('GameScene');
                this.loadGame()
            }


        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
        cc.cs.PlayerInfo.zoneReplay_id = 1
    },

    loadNativeVideo: function(err, id) {
        if (!err) {
            this.nativeVideo.preLoad(id + "")
        } else {
            cc.log("native video load err id = " + id)
        }
    },

    // use this for initialization
    onLoad: function() {


        var self = this
        this.videoLoadOver1 = !false
        this.videoLoadOver2 = !false
        this.nativeVideoNode.active = false

        if (!CC_JSB) {
            this.videoPlayerNode.node.on("ready-to-play", (event) => {
                if (cc.sys.browserType != "qq" && cc.sys.browserType != cc.sys.BROWSER_TYPE_QQ && cc.sys.browserType != cc.sys.BROWSER_TYPE_MOBILE_QQ && cc.sys.browserType != cc.sys.BROWSER_TYPE_WECHAT) {
                    self.videoLoadingNode.active = false
                    self.isPlayStart = true
                }

                cc.log("ready")

            })
            this.videoPlayerNode.node.on("meta-loaded", (event) => {
                if (cc.sys.browserType == "qq" || cc.sys.browserType == cc.sys.BROWSER_TYPE_QQ || cc.sys.browserType == cc.sys.BROWSER_TYPE_MOBILE_QQ || cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT) {
                    self.videoLoadingNode.active = false
                    self.isPlayStart = true
                }
                //self.videoLoadingNode.active = true
                cc.log("meta")
            })
            this.videoPlayerNode.node.on("playing", (event) => {

                cc.log("playing")
            })
            this.videoPlayerNode.node.on("stopped", (event) => {
                if (self.playVideoID == "1101") {
                    // cc.cs.gameMgr.sendVideoDone(cc.cs.PlayerInfo.playvideo,self.videoDoneHandle,self)
                    //第一段播完回调
                    self.videoPlayerNode.clip = cc.url.raw("resources/video/1102") + ".mp4"
                } else if (self.playVideoID == "1102") {
                    self.preLoadGame();
                    cc.cs.gameMgr.sendVideoDone(cc.cs.PlayerInfo.playvideo, self.videoDoneHandle, self)
                }
                self.videoNode.active = false
                self.node.active = true
                self.isPlayStart = false
                cc.log("stopped")
            })
            this.videoPlayerNode.node.on("completed", (event) => {
                this.videoPlayerNode.stop()
            })
            this.videoPauseNode.on("click", (event) => {
                    if (self.isPlayStart) {
                        if (self.videoPlayerNode.isPlaying()) {
                            self.videoPlayerNode.pause()
                            self.videoPauseTip.active = true
                        } else {
                            self.videoPlayerNode.play()
                            self.videoPauseTip.active = false
                        }
                    }
                })
                /* cc.loader.loadResDir("video/1101", (err, ass) => {
                     if(!err){
                         cc.log("ass  = success"+ "  " +typeof(ass))
                         self.videoLoadOver1 = true
                     }else{
                         cc.log(err)
                     }
                 })

                 cc.loader.loadResDir("video/1102", (err, ass) => {
                     if(!err){
                         self.videoLoadOver2 = true
                     }
                 })*/
            this.videoPlayerNode.clip = cc.url.raw("resources/video/1101") + ".mp4"
        } else {
            this.node.parent.getChildByName("update").active = false
            this.nativeVideo = cc.LiveVideo.create()
            this.nativeVideoNode._sgNode.addChild(this.nativeVideo)

            this.nativeNanNode = this.node.parent.getChildByName("nanText")
            this.nativeNvNode = this.node.parent.getChildByName("nvText")
            this.nativeVideoBtn = this.node.parent.getChildByName("nativeVideoBackBtn")
            this.nativeNvNode.active = false
            this.nativeNanNode.active = false

            cc.loader.loadResDir("video/" + 1100, function(err, id) {
                if (!err) {
                    self.nativeVideo.preLoad(id + "")
                    self.playLogoVideo(1100)
                } else {
                    cc.log("native video load err id = " + id)
                }
            })

        }

        /* cc.director.preloadScene('GameScene',function(){
             cc.log("AAAAAAAAAAABBBBBBBBBBBBBB")

         }   );*/
        //this.setStartGameNode()
        if (CC_JSB) {
            this.nativeVideoBtn.on("click", (event) => {
                self.nativeVideo.videoStop()
                //self.loadVideo1101()
                self.nativeVideoText = []
                cc.cs.utils.getStr("1101", self.nativeVideoText);
                self.setStartGameNode();
                self.nativeVideoBtn.active = false
                self.nativeVideoNode.stopAllActions()
                self.node.active = true
            }, this.nativeVideoBtn)

        }
        //this.setLogoNode()
        var login_id = cc.sys.localStorage.getItem('LOGIN_ID')
        var passward = cc.sys.localStorage.getItem('PASSWORD')
        if ((login_id != null && login_id != "") && (passward != null && passward != "")) {
            this.gustIDLabel.string = login_id


        } else {
            if (CC_JSB) {
                //this.gustIDLabel.string = cc.cs.gameMgr.generateGustInfo()
                var uuid = this.getDiviceID()
                    //cc.log("first game uuid = "+uuid)
                cc.sys.localStorage.setItem('UUID', uuid)
                this.gustIDLabel.string = "游客" + uuid.substring(0, 6)
                this.gustIDLabel2.string = this.gustIDLabel.string
            } else {
                this.gustIDLabel.string = "请注册账号"
            }

        }



        this.startGameBtn.on("click", (event) => {
            self.startgame()
        }, this.startGameBtn)
        this.registerConfirmBtn.on("click", (event) => {
            //注册账号按钮点击事件
            if (self.registerPasswordEdit.string != self.registerConfirmPasswordEdit.string) {
                cc.cs.UIMgr.showTip("输入密码不一致，请重新输入", 1.0)
                    //self.registerConfirmPasswordEdit.string = ""
                    //self.registerPasswordEdit.string = ""
                return;
            } else if (self.registerIDEdit.string == "" || self.registerIDEdit.string == null) {
                cc.cs.UIMgr.showTip("请输入6-12位数字或英文账号", 1.0)
                return;
            } else if (self.registerPasswordEdit.string == "" || self.registerPasswordEdit.string == null) {
                cc.cs.UIMgr.showTip("请输入6-12位数字或英文密码", 1.0)
                return;
            } else if (self.registerConfirmPasswordEdit.string == "" || self.registerConfirmPasswordEdit.string == null) {
                cc.cs.UIMgr.showTip("请再次输入相同的6-12位数字或英文确认密码", 1.0)
                return;
            } else {


                if (self.registerIDEdit.string.length < 6) {
                    cc.cs.UIMgr.showTip("请输入6-12位数字或英文账号", 1.0)
                } else if (self.registerPasswordEdit.string.length < 6) {
                    cc.cs.UIMgr.showTip("请输入6-12位数字或英文密码", 1.0)
                } else {
                    self.registerEvent()
                }




            }
        }, this.registerConfirmBtn)

        this.LoginBtn.on("click", (event) => {
            if (self.loginIDEdit.string == "" || self.loginIDEdit.string == null) {
                cc.cs.UIMgr.showTip("请输入6-12位数字或英文账号", 1.0)
                return;
            } else if (self.loginPasswordEdit.string == "" || self.loginPasswordEdit.string == null) {
                cc.cs.UIMgr.showTip("请输入6-12位数字或英文密码", 1.0)
                return;
            } else {
                if (self.loginIDEdit.string.length < 6) {
                    cc.cs.UIMgr.showTip("账号请输入6-12位数字或英文", 1.0)
                } else if (self.loginPasswordEdit.string.length < 6) {
                    cc.cs.UIMgr.showTip("vi.请输入6-12位数字或英文密码", 1.0)
                } else {
                    self.loginEvent()
                }

            }
        })

        this.intoRegisterNodeBtn.on("click", (event) => {
            self.setRegisterNode()
        }, this.intoRegisterNodeBtn)
        this.intoLoginNodeBtn.on("click", (event) => {
            self.setLoginNode()
        }, this.intoLoginNodeBtn)
        this.loginBackBtn.on("click", (event) => {
            self.setStartGameNode()
        }, this.loginBackBtn)
        this.registerBackBtn.on("click", (event) => {
            self.setStartGameNode()
        }, this.registerBackBtn)
        this.regisetrIntoLoginBtn.on("click", (event) => {
            self.setLoginNode()
        }, this.regisetrIntoLoginBtn)
        this.LoginIntoRegisterBtn.on("click", (event) => {
            self.setRegisterNode()
        }, this.LoginIntoRegisterBtn)
        this.randomNameConfirmBtn.on("click", (event) => {
            self.playerName()
        }, this.randomNameConfirmBtn)
        this.randomNameRandomBtn.on("click", (event) => {
            self.randomName()
        }, this.randomNameRandomBtn)




    },

    loadVideo1101: function() {
        var self = this
        cc.loader.loadResDir("video/" + 1101, function(err, id) {
            if (!err) {
                self.nativeVideo.preLoad(id + "")
            } else {
                cc.log("native video load err id = " + id)
            }
        })
    },

    registerHandle: function(ret) {
        //cc.log(this)
        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {

            cc.cs.UIMgr.showTip("注册成功", 1.0)
                //this.setLoginNode()
            this.loginIDEdit.string = this.registerIDEdit.string
            this.loginPasswordEdit.string = this.registerPasswordEdit.string

            cc.log("注册账号为：" + this.registerIDEdit.string)
            cc.log("注册账号为：" + this.loginIDEdit.string)
            this.gustIDLabel.string = this.loginIDEdit.string

            cc.cs.gameMgr.sendLogin(this.registerIDEdit.string, this.registerPasswordEdit.string, this.loginHandle, this)
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }

    },

    loginHandle: function(ret) {
        //cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.sys.localStorage.setItem('API_TOKEN', JasonObject.content.info.api_token)
                //cc.sys.localStorage.setItem('UserID',this.loginIDEdit.string)
            this.isLogin = true
            this.updatePlayerInfo(JasonObject)
            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)
            cc.log("账号为" + this.registerIDEdit.string)
            cc.log("账号为" + this.loginIDEdit.string)
            cc.sys.localStorage.setItem('LOGIN_ID', this.loginIDEdit.string)
            cc.sys.localStorage.setItem('PASSWORD', this.loginPasswordEdit.string)
            var api_token = cc.sys.localStorage.getItem('API_TOKEN')
            cc.log("登陆成功 api_token =" + api_token)

            this.setStartGameNode();
            if (this.loginIDEdit.string == "" || this.loginIDEdit.string == null) {
                this.gustIDLabel.string = this.registerIDEdit.string;


                cc.sys.localStorage.setItem('LOGIN_ID', this.registerIDEdit.string)
                cc.sys.localStorage.setItem('PASSWORD', this.registerPasswordEdit.string)

            } else if (this.registerIDEdit.string == "" || this.registerIDEdit.string == null) {
                this.gustIDLabel.string = this.loginIDEdit.string;
                cc.sys.localStorage.setItem('LOGIN_ID', this.loginIDEdit.string)
                cc.sys.localStorage.setItem('PASSWORD', this.loginPasswordEdit.string)
            }

            this.loginIDEdit.string = ""
            this.loginPasswordEdit.string = ""

            this.registerIDEdit.string = ""
            this.registerConfirmPasswordEdit.string = ""
            this.registerPasswordEdit.string = "" // 登陆成功后 清空这些输入框






        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
        cc.cs.PlayerInfo.zoneReplay_id = 1
    },

    loadPress: function(current, total, item) {
        if (total == 0) return
        this.loadProcessPer = parseInt((parseFloat(current) / parseFloat(total)) * 90.0)
        cc.log("(this.loadPress  + this.loadPress)  = " + (this.loadProcessPer + this.loadScenePer))
        this.perLaber.text = (this.loadProcessPer + this.loadScenePer) + "%"
        if (this.loadProcessPer + this.loadScenePer >= 100) {
            cc.director.loadScene('GameScene');
        }
    },

    preLoadScene: function() {
        this.loadScenePer = 10;
        cc.log("(this.preLoadScene  + this.preLoadScene)  = " + (this.loadProcessPer + this.loadScenePer))
        this.perLaber.text = (this.loadProcessPer + this.loadScenePer) + "%"

        if (this.loadProcessPer + this.loadScenePer >= 100) {
            cc.director.loadScene('GameScene');
        }
    },

    preLoadGame: function() {
        var self = this
        this.node.active = false
        this.videoNode.active = true

        this.videoLoadingNode.active = true

        this.videoPauseNode.active = false

        this.videoPlayerNode.node.active = false

        this.perLaber.node.active = false
        this.loadScenePer = 0
        this.loadProcessPer = 0
    },

    loadGame: function() {
        var self = this
        this.node.active = false
        this.videoNode.active = true

        this.videoLoadingNode.active = true

        this.videoPauseNode.active = false

        this.videoPlayerNode.node.active = false

        this.perLaber.node.active = false
        this.loadScenePer = 0
        this.loadProcessPer = 0
        if (CC_JSB) {
            cc.loader.loadResDir("picture/newRes831", (current, total, item) => {
                if (total == 0) return
                self.loadProcessPer = parseInt((parseFloat(current) / parseFloat(total)) * 90.0)
                cc.log("(this.loadPress  + this.loadPress)  = " + (self.loadProcessPer + self.loadScenePer))
                self.perLaber.string = (self.loadProcessPer + self.loadScenePer) + "%"
                if (self.loadProcessPer + self.loadScenePer >= 100) {
                    cc.director.loadScene('GameScene');
                }

            }, (err, ass) => {

            })
        } else {
            cc.loader.loadResDir("picture/newRes831/moment", (current, total, item) => {
                if (total == 0) return
                self.loadProcessPer = parseInt((parseFloat(current) / parseFloat(total)) * 90.0)
                cc.log("(this.loadPress  + this.loadPress)  = " + (self.loadProcessPer + self.loadScenePer))
                self.perLaber.string = (self.loadProcessPer + self.loadScenePer) + "%"
                if (self.loadProcessPer + self.loadScenePer >= 100) {
                    cc.director.loadScene('GameScene');
                }

            }, (err, ass) => {

            })
			
			/*cc.loader.loadResDir("picture/newRes831/love_job", (current, total, item) => {                

            }, (err, ass) => {
					
            })
			
			cc.loader.loadResDir("picture/newRes831/shop", (current, total, item) => {

            }, (err, ass) => {
					
            })*/
        }

        cc.director.preloadScene("GameScene", () => {
            self.loadScenePer = 10;
            cc.log("(this.preLoadScene  + this.preLoadScene)  = " + (self.loadProcessPer + self.loadScenePer))
            self.perLaber.string = (self.loadProcessPer + self.loadScenePer) + "%"

            if (self.loadProcessPer + self.loadScenePer >= 100) {
                cc.director.loadScene('GameScene');
            }

        })


        //cc.loader.pre
    },

    sendNameHandle: function(ret) {
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            this.playLogoVideo("1102")

            this.randomNameNode.active = false;
            //cc.cs.UIMgr.showTip("登陆成功 api_token =" + api_token, 1.0)



        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },





    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});