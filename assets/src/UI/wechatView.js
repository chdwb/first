cc.Class({
    extends: cc.Component,

    properties: {
        expText: {
            type: cc.Label,
            default: null
        },
        goldText: {
            type: cc.Label,
            default: null
        },
        talkScroll: {
            type: cc.ScrollView,
            default: null
        },
        backBtn: {
            type: cc.Node,
            default: null
        },
        sendBtn: {
            type: cc.Node,
            default: null
        },
        castText: {
            type: cc.Label,
            default: null
        },

        quikeTip: {
            type: cc.Node,
            default: null
        },

        inputBtn: {
            type: cc.Node,
            default: null
        },

        sendBtn: {
            type: cc.Node,
            default: null
        },

        msgText: {
            type: cc.Label,
            default: null
        },

        nvzhuSize: 0,

        nanzhuSize: 0,

        nvzhuTalkPrefab: null,

        nanzhuTalkPrefab: null,

        inputTablePrefab: null,

        tianshuPrefab: null,

        inputTableBtn: null,

        currentPlayerWechatID: 0,

        currentTime: 0,
        totalTime: 0,
        NPCID: 0,
        isAction: false,
        talkAction: null,
        selectedid:0,
    },

    sendDisable: function() {
        this.sendBtn.getComponent(cc.Button).interactable = false
            //this.inputBtn.getComponent(cc.Button).interactable = false
            // this.tipText.active = false
    },
    sendEnable: function() {
        this.sendBtn.getComponent(cc.Button).interactable = true
            //this.tipText.active = true
    },


    setExp: function(currentExp, levlExp) {
        this.expText.string = currentExp + "/" + levlExp;
		 var heartTarget = this.node.getChildByName("expBG").getChildByName("qinmitaoxindi")
        cc.cs.UIMgr.setHeart(heartTarget, currentExp,levlExp)
    },



    setGold: function(gold) {
        //cc.log("set gold"+gold)
        this.goldText.string = gold + ""
    },

     goShop2: function() {
        //var parent = this.node.parent
        //parent.getComponent("GameScene").SetView(cc.cs.UIMgr.SHOPVIEW)
       // cc.cs.UIMgr.currentShopType = 3
        //cc.cs.UIMgr.openView(cc.cs.UIMgr.SHOPVIEW)


         cc.log("goShop LoveView")
        cc.cs.UIMgr.setShopType(2)
        cc.log("cc.cs.UIMgr = " + cc.cs.UIMgr.currentShopType)
        cc.cs.UIMgr.openView(cc.cs.UIMgr.SHOPVIEW)
    },

    getDay: function(id) {
        var wechatID = cc.cs.gameData.getwechatData(id)

        var levelData = cc.cs.gameData.getlevelData(wechatID["WECHAT_LEVEL"])
        var currentlevelData = cc.cs.gameData.getlevelData(cc.cs.PlayerInfo.level)
        var d = currentlevelData["LEV_DAY"] - levelData["LEV_DAY"]
        if (d == 0)
            return "今天"
        if (d == 1)
            return "昨天"
        if (d == 2)
            return "前天"

        return d + "天前"
    },
    isShowDay: function(id) {
        if (id == cc.cs.gameData.wechat["FIRST"])
            return true
        var wechatID = cc.cs.gameData.getwechatData(id - 1)
        if (wechatID["WECHAT_NEXT"] == "dummy")
            return true
        return false
    },

    loadFormerInfo: function() {
        if (cc.cs.PlayerInfo.wechat_player_ID.length == 0) return
        var startIndex = cc.cs.gameData.wechat["FIRST"]
        var index = 0


        while (startIndex <= cc.cs.PlayerInfo.wechat_id) {
            if (this.isShowDay(startIndex)) {
                this.loadCruuentTalk(this.talkScroll, true, this.getDay(startIndex), "", true)
            }
            var wechatData = cc.cs.gameData.getwechatData(startIndex)
            if (wechatData["WECHAT_OPTION"] == "dummy") {
                var wechatData = cc.cs.gameData.getwechatData(startIndex)
                this.loadCruuentTalk(this.talkScroll, false, wechatData["WECHAT_CONTENT"], cc.cs.PlayerInfo.NPCName, false);
                startIndex += 1
            } else {
                startIndex = cc.cs.PlayerInfo.wechat_player_ID[index]
                wechatData = cc.cs.gameData.getwechatData(startIndex)
                this.loadCruuentTalk(this.talkScroll, true, wechatData["WECHAT_CONTENT"], cc.cs.PlayerInfo.PlayerNmae, false);
                index++
                startIndex = wechatData["WECHAT_NEXT"]
            }
        }
    },

    sendWechat: function(id) {
        this.currentPlayerWechatID = id
        
        cc.cs.gameMgr.sendWechat(id, this.SendWechatHandle, this)
        
        

    },

    SendWechatHandle: function(ret) {
        var JasonObject = JSON.parse(ret);
		cc.cs.UIMgr.closeNetView()
        if (JasonObject.success == true) {
            //cc.cs.UIMgr.closeNetView()
        
            var heartTarget = this.node.getChildByName("expBG")
            this.currentExp = parseInt(JasonObject.content.info.exp) - parseInt(cc.cs.PlayerInfo.exp)
            cc.cs.UIMgr.showExpTip(this.currentExp, heartTarget, this)

        var wechatData = cc.cs.gameData.getwechatData(this.currentPlayerWechatID )
       /* var exp = wechatData["WECHAT_EXP"]
        if (parseInt(exp) < 0)
            {
                cc.cs.UIMgr.showTip("恋爱值减少"+exp,1.0)
            }
            else
            {
                cc.cs.UIMgr.showTip("恋爱值增加"+exp,1.0)
            }*/
            if (cc.cs.PlayerInfo.wechat_fn == true) {
                this.inputTableBtn.WECHAT_ID = 0
                this.msgText.node.active = false
                this.quikeTip.active = false
                this.inputBtn.getComponent(cc.Button).interactable = true
                cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)
                this.NPCID = JasonObject.content.info.wechat_next
                this.setInputMsg(this.currentPlayerWechatID)
                if (cc.cs.PlayerInfo.canWechat()) {
                    this.isAction = true;
                    this.currentTime = 0
                    this.totalTime = 0
                    this.talkAction = cc.sequence(cc.delayTime(this.totalTime), cc.callFunc(this.step, this))
                    cc.cs.UIMgr.gameScene.node.runAction(this.talkAction)
                } else {
                    this.sendDisable()
                    this.setInputMsg(this.NPCID)
                }

            } else {
                this.inputTableBtn.WECHAT_ID = 0
                this.msgText.node.active = false
                this.quikeTip.active = true
                this.inputBtn.getComponent(cc.Button).interactable = true
                cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)

                this.NPCID = JasonObject.content.info.wechat_next

                this.setInputMsg(this.currentPlayerWechatID)
                this.isAction = true;
                this.currentTime = 0
                this.totalTime = (cc.random0To1() + 0.4) * 8
                if (this.totalTime > 8) this.totalTime = 8

                this.talkAction = cc.sequence(cc.delayTime(this.totalTime), cc.callFunc(this.step, this))
                cc.cs.UIMgr.gameScene.node.runAction(this.talkAction)
                if (!cc.cs.PlayerInfo.canWechat()) {
                    this.sendDisable()
                }
            }

            this.updateui()

        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
        //弹窗
    },


    showInputTable: function(id) {
        var wechatOption = 0
        var self = this
        id = parseInt(id)
        var wecharData = cc.cs.gameData.getwechatData(id)
        var wecharDataNext = cc.cs.gameData.getwechatData(id + 1)

        if (wecharData["WECHAT_OPTION"] != "dummy") {
            wechatOption = wecharData["WECHAT_OPTION"]
        } else {
            wechatOption = wecharDataNext["WECHAT_OPTION"]
        }

        this.inputTableBtn.active = true


        var p = this.inputBtn.parent.convertToWorldSpaceAR(cc.v2(this.inputBtn.x, this.inputBtn.y))
        var p2 = this.inputTableBtn.parent.convertToNodeSpaceAR(cc.v2(p.x, p.y))
        this.inputTableBtn.x = p2.x


        //this.inputTableBtn.x = -93

        this.inputTableBtn.y = this.node.height * -0.5 + this.inputTableBtn.height + ((this.node.height * 0.5 + this.inputBtn.parent.y) - (this.inputBtn.parent.height * 0.5 + (this.inputBtn.parent.height - this.inputBtn.height) * 0.5))


        this.sendBtn.getComponent(cc.Button).interactable = false

        var replayId = []
        var btn1 = this.inputTableBtn.getChildByName("btn1")
        var btn2 = this.inputTableBtn.getChildByName("btn2")
        var btn3 = this.inputTableBtn.getChildByName("btn3")

        var text1 = btn1.getChildByName("Label").getComponent(cc.Label)
        var text2 = btn2.getChildByName("Label").getComponent(cc.Label)
        var text3 = btn3.getChildByName("Label").getComponent(cc.Label)

        var zs1 = btn1.getChildByName("xuanxiangkkuangdexian")
        var zs2 = btn2.getChildByName("xuanxiangkkuangdexian")
        var zs3 = btn3.getChildByName("xuanxiangkkuangdexian")

        btn1.targetOff(btn1)
        btn2.targetOff(btn2)
        btn3.targetOff(btn3)
        btn1.active = true;
        btn2.active = true;
        btn3.active = true;
        for (var i = cc.cs.gameData.wechat["FIRST"]; i <= cc.cs.gameData.wechat["TOTAL_COUNT"]; ++i) {
            var itemData = cc.cs.gameData.getwechatData(i)

            if (itemData["WECHAT_OPTION"] == wechatOption) {
                replayId.push(itemData)
            }
            if (itemData["WECHAT_OPTION"] != "dummy" && (itemData["WECHAT_OPTION"] > wecharData["PHONE_AUDIO"] || itemData["WECHAT_OPTION"] > wecharDataNext["PHONE_AUDIO"]))
                break;
        }

        if (replayId.length == 1) {
            text1.string = replayId[0]["WECHAT_CONTENT"]
            text1.node.y = -6
            btn1.height = text1.node.height + 12
            btn1.y = 0
            zs1.active = false
            btn1.WECHAT_ID = replayId[0]["WECHAT_ID"]
            btn1.on("click", (event) => {
                self.inputTableBtn.active = false
                self.sendBtn.getComponent(cc.Button).interactable = true
                var wechatData = cc.cs.gameData.getwechatData(event.target.WECHAT_ID)
                self.msgText.node.active = true
                self.msgText.string = wechatData["WECHAT_CONTENT"]
                self.inputTableBtn.WECHAT_ID = event.target.WECHAT_ID
            }, btn1)
            btn2.active = false;
            btn3.active = false;
            this.inputTableBtn.height = btn1.height
                //this.inputTableBtn.x = -93
            var p = this.inputBtn.parent.convertToWorldSpaceAR(cc.v2(this.inputBtn.x, this.inputBtn.y))
            var p2 = this.inputTableBtn.parent.convertToNodeSpaceAR(cc.v2(p.x, p.y))
            this.inputTableBtn.x = p2.x
            this.inputTableBtn.y = this.node.height * -0.5 + this.inputTableBtn.height + ((this.node.height * 0.5 + this.inputBtn.parent.y) - (this.inputBtn.parent.height * 0.5 + (this.inputBtn.parent.height - this.inputBtn.height) * 0.5)) + 20
        } else
        if (replayId.length == 2) {
            text1.string = replayId[0]["WECHAT_CONTENT"]
            text2.string = replayId[1]["WECHAT_CONTENT"]
            text1.node.y = -6
            text2.node.y = -6
            btn1.height = text1.node.height + 12
            btn2.height = text2.node.height + 12
            btn1.y = 0
            btn2.y = -btn1.height
            zs1.active = true
            zs1.y = -btn1.height
            zs2.active = false
            btn1.WECHAT_ID = replayId[0]["WECHAT_ID"]
            btn2.WECHAT_ID = replayId[1]["WECHAT_ID"]
            btn1.on("click", (event) => {
                self.inputTableBtn.active = false
                self.sendBtn.getComponent(cc.Button).interactable = true
                var wechatData = cc.cs.gameData.getwechatData(event.target.WECHAT_ID)
                self.msgText.node.active = true
                self.msgText.string = wechatData["WECHAT_CONTENT"]
                self.inputTableBtn.WECHAT_ID = event.target.WECHAT_ID
            }, btn1)
            btn2.on("click", (event) => {
                self.inputTableBtn.active = false
                self.sendBtn.getComponent(cc.Button).interactable = true
                var wechatData = cc.cs.gameData.getwechatData(event.target.WECHAT_ID)
                self.msgText.node.active = true
                self.msgText.string = wechatData["WECHAT_CONTENT"]
                self.inputTableBtn.WECHAT_ID = event.target.WECHAT_ID
            }, btn2)

            btn3.active = false;
            this.inputTableBtn.height = btn1.height + btn2.height
                //this.inputTableBtn.x = -93
            var p = this.inputBtn.parent.convertToWorldSpaceAR(cc.v2(this.inputBtn.x, this.inputBtn.y))
            var p2 = this.inputTableBtn.parent.convertToNodeSpaceAR(cc.v2(p.x, p.y))
            this.inputTableBtn.x = p2.x
            this.inputTableBtn.y = this.node.height * -0.5 + this.inputTableBtn.height + ((this.node.height * 0.5 + this.inputBtn.parent.y) - (this.inputBtn.parent.height * 0.5 + (this.inputBtn.parent.height - this.inputBtn.height) * 0.5)) + 20
        } else {
            text1.string = replayId[0]["WECHAT_CONTENT"]
            text2.string = replayId[1]["WECHAT_CONTENT"]
            text3.string = replayId[2]["WECHAT_CONTENT"]
            text1.node.y = -6
            text2.node.y = -6
            text3.node.y = -6
            btn1.height = text1.node.height + 12
            btn2.height = text2.node.height + 12
            btn3.height = text3.node.height + 12
            btn1.y = 0
            btn2.y = -btn1.height
            btn3.y = -btn1.height - btn2.height
            zs1.active = true
            zs1.y = -btn1.height
            zs2.active = true
            zs2.y = -btn2.height
            zs3.active = false
            btn1.WECHAT_ID = replayId[0]["WECHAT_ID"]
            btn2.WECHAT_ID = replayId[1]["WECHAT_ID"]
            btn3.WECHAT_ID = replayId[2]["WECHAT_ID"]

            btn1.on("click", (event) => {
                self.inputTableBtn.active = false
                self.sendBtn.getComponent(cc.Button).interactable = true
                var wechatData = cc.cs.gameData.getwechatData(event.target.WECHAT_ID)
                self.msgText.node.active = true
                self.msgText.string = wechatData["WECHAT_CONTENT"]
                self.inputTableBtn.WECHAT_ID = event.target.WECHAT_ID
            }, btn1)
            btn2.on("click", (event) => {
                self.inputTableBtn.active = false
                self.sendBtn.getComponent(cc.Button).interactable = true
                var wechatData = cc.cs.gameData.getwechatData(event.target.WECHAT_ID)
                self.msgText.node.active = true
                self.msgText.string = wechatData["WECHAT_CONTENT"]
                self.inputTableBtn.WECHAT_ID = event.target.WECHAT_ID
            }, btn2)
            btn3.on("click", (event) => {
                self.inputTableBtn.active = false
                self.sendBtn.getComponent(cc.Button).interactable = true
                var wechatData = cc.cs.gameData.getwechatData(event.target.WECHAT_ID)
                self.msgText.node.active = true
                self.msgText.string = wechatData["WECHAT_CONTENT"]
                self.inputTableBtn.WECHAT_ID = event.target.WECHAT_ID

            }, btn3)
            this.inputTableBtn.height = btn1.height + btn2.height + btn3.height
                //this.inputTableBtn.x = -93
            var p = this.inputBtn.parent.convertToWorldSpaceAR(cc.v2(this.inputBtn.x, this.inputBtn.y))
            var p2 = this.inputTableBtn.parent.convertToNodeSpaceAR(cc.v2(p.x, p.y))
            this.inputTableBtn.x = p2.x
            this.inputTableBtn.y = this.node.height * -0.5 + this.inputTableBtn.height + ((this.node.height * 0.5 + this.inputBtn.parent.y) - (this.inputBtn.parent.height * 0.5 + (this.inputBtn.parent.height - this.inputBtn.height) * 0.5)) + 20
        }
    },

    refresh:function(){
        
                var leveldata2 = cc.cs.gameData.level["LEV_LEV_" + (parseInt(cc.cs.PlayerInfo.level))]
                this.setExp(cc.cs.PlayerInfo.exp, leveldata2["LEV_EXP"])
        
    }
    ,

    updateui:function(){
        this.setGold(cc.cs.PlayerInfo.money)
    }
    ,

    onEnable: function() {

        this.updateui()
        this.refresh()
        if (!this.isAction) {
            this.inputTableBtn.active = false;
            this.quikeTip.active = false
            this.msgText.node.active = false
            this.castText.string = cc.cs.PlayerInfo.diamond
            cc.log("wechat onEnable = " + cc.cs.PlayerInfo.canWechat())
            if (cc.cs.PlayerInfo.canWechat()) {
                this.sendBtn.getComponent(cc.Button).interactable = true
                this.inputBtn.getComponent(cc.Button).interactable = true
            } else {
                this.sendBtn.getComponent(cc.Button).interactable = false
                this.inputBtn.getComponent(cc.Button).interactable = false
            }
            this.NPCID = cc.cs.PlayerInfo.wechat_id
            if (this.NPCID == 0) {
                this.NPCID = 1
            }
            cc.log("      " + cc.cs.PlayerInfo.wechat_id)
            var wechatData = cc.cs.gameData.getwechatData(this.NPCID)
            if (wechatData["WECHAT_NEXT"] == "dummy") {
                this.NPCID++
                    if (this.NPCID >= cc.cs.gameData["LAST"]) {
                        this.sendBtn.getComponent(cc.Button).interactable = false
                        this.inputBtn.getComponent(cc.Button).interactable = false
                        return
                    }
                wechatData = cc.cs.gameData.getwechatData(this.NPCID)
                if (wechatData["WECHAT_OPTION"] == "dummy") {
                    this.setInputMsg(this.NPCID)
                }
            }
        }

        cc.log("wechat   =  " + this.NPCID + "             " + cc.cs.PlayerInfo.wechat_id)
            //this.schedule(this.step,1.0)


    },

    onDisable: function() {
        //this.unschedule(this.step)
    },

    step: function() {
        this.isAction = false
        this.sendEnable()
        this.setInputMsg(this.NPCID)
    },

    onLoad: function() {
        var self = this
        this.inputTablePrefab = cc.loader.getRes("prefab/inputTable", cc.Prefab)

        this.nvzhuTalkPrefab = cc.loader.getRes("prefab/nvTalkItem", cc.Prefab)

        this.nanzhuTalkPrefab = cc.loader.getRes("prefab/nanTalkItem", cc.Prefab)

        this.tianshuPrefab = cc.loader.getRes("prefab/tianshu", cc.Prefab)

        this.loadFormerInfo()

        this.inputTableBtn = cc.instantiate(this.inputTablePrefab)

        this.inputTableBtn.y = -120

        this.inputTableBtn.active = false;
        this.node.addChild(this.inputTableBtn)

        this.NPCID = cc.cs.PlayerInfo.wechat_id
        this.inputTableBtn.WECHAT_ID = 0
            //self.sendWechat(self.inputTableBtn.WECHAT_ID)



        this.backBtn.on("click", (event) => {
            cc.cs.UIMgr.closeView()
        })

        this.sendBtn.on("click", (event) => {
            if (self.inputTableBtn.WECHAT_ID == 0) {
                cc.cs.UIMgr.showTip("点击左侧输入框，选择回复内容", 1.0)
            } else {
                self.sendWechat(self.inputTableBtn.WECHAT_ID)
            }
        })


        var isRightnow = cc.cs.PlayerInfo.wechat_fn
        if (isRightnow == true) {
            this.castText.node.active = false
        }

        this.inputBtn.on("click", (event) => {
            if (self.quikeTip.active) {

                var isRightnow = cc.cs.PlayerInfo.wechat_fn
                if (isRightnow == true) {

                    //cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)
                    cc.cs.UIMgr.gameScene.node.stopAction(this.talkAction)
                    this.castText.node.active = false
                    this.step()

                } else {

                    if (cc.cs.PlayerInfo.money < cc.cs.PlayerInfo.diamond) {

                        cc.cs.UIMgr.showPopBuy(1, this.buyLIJI, this)


                    } else {
                        cc.cs.gameMgr.sendBuyFastTalk(self.sendBuyFastTalkHandle, self)
                    }
                }
            } else {
                self.showInputTable(self.NPCID)
            }
        })


        if (parseInt(cc.cs.PlayerInfo.guide_id) == 8) // 
        {
            cc.log("微信界面 输入按钮")
            cc.cs.UIMgr.showGuide(parseInt(cc.cs.PlayerInfo.guide_id) + 1, this.inputBtn, this)
        }


        this.sendBtn.on("click", (event) => {


        })
    },

    buyLIJI: function() {
        cc.cs.gameMgr.buyRightNow(1, this.onRightNowHandle, this)
    },

    onRightNowHandle: function(ret) {
        var JasonObject = JSON.parse(ret);
		cc.cs.UIMgr.closeNetView()
        if (JasonObject.success == true) {
            //cc.cs.UIMgr.showTip("", 1.0)
            //cc.cs.UIMgr.closeNetView()
            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)
            cc.cs.UIMgr.gameScene.node.stopAction(this.talkAction)
            this.castText.node.active = false
            this.step()




        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }


    },

    sendBuyFastTalkHandle: function(ret) {
        var JasonObject = JSON.parse(ret);
		cc.cs.UIMgr.closeNetView()
        if (JasonObject.success == true) {
           // cc.cs.UIMgr.closeNetView()
            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)
            cc.cs.UIMgr.gameScene.node.stopAction(this.talkAction)
            this.castText.string = cc.cs.PlayerInfo.diamond
            this.step()
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },

    setInputMsg: function(id) {
        if (this.isShowDay(id)) {
            this.loadCruuentTalk(this.talkScroll, true, this.getDay(id), "", true)
        }
        if (cc.cs.gameData.wechat["WECHAT_ID_" + id]["WECHAT_OPTION"] == "dummy" || cc.cs.gameData.wechat["WECHAT_ID_" + id]["WECHAT_OPTION"] == -1) {
            this.loadCruuentTalk(this.talkScroll, false, cc.cs.gameData.wechat["WECHAT_ID_" + id]["WECHAT_CONTENT"], cc.cs.PlayerInfo.NPCName, false);
            this.inputBtn.getComponent(cc.Button).interactable = true
            this.quikeTip.active = false
            if (cc.cs.gameData.wechat["WECHAT_ID_" + id]["WECHAT_NEXT"] != "dummy") {
                this.sendEnable()
            }
        } else {
            this.loadCruuentTalk(this.talkScroll, true, cc.cs.gameData.wechat["WECHAT_ID_" + id]["WECHAT_CONTENT"], cc.cs.PlayerInfo.PlayerNmae, false);
            this.sendDisable()
        }
        if (cc.cs.gameData.wechat["WECHAT_ID_" + id]["WECHAT_NEXT"] == "dummy") {
            this.inputBtn.getComponent(cc.Button).interactable = false
            this.sendBtn.getComponent(cc.Button).interactable = false
        }
    },

   /* refresh: function() {
        cc.log(cc.cs.gameData.wechat["WECHAT_ID_" + cc.cs.PlayerInfo.wechat_id]["WECHAT_LEVEL"] + "    g       " + cc.cs.PlayerInfo.wechat_id + "       f     " + parseInt(cc.cs.PlayerInfo.level) + "    j ")
        if (cc.cs.PlayerInfo.canWechat()) {
            cc.log("this.NPCID  = " + this.NPCID + "    " + cc.cs.gameData.wechat["WECHAT_ID_" + (parseInt(this.NPCID))]["WECHAT_LEVEL"] + "     " + parseInt(cc.cs.PlayerInfo.level))
            if (cc.cs.gameData.wechat["WECHAT_ID_" + (parseInt(this.NPCID))]["WECHAT_NEXT"] == "dummy" &&
                cc.cs.gameData.wechat["WECHAT_ID_" + (parseInt(this.NPCID))]["WECHAT_LEVEL"] < parseInt(cc.cs.PlayerInfo.level)) {
                this.NPCID = (parseInt(this.NPCID) + 1)
                cc.log("this.NPCID  = " + this.NPCID + "    " + cc.cs.gameData.wechat["WECHAT_ID_" + (parseInt(this.NPCID))]["WECHAT_LEVEL"] + "     " + parseInt(cc.cs.PlayerInfo.level) +
                    "                " + cc.cs.gameData.wechat["WECHAT_ID_" + (parseInt(this.NPCID))]["WECHAT_CONTENT"])
                if (cc.cs.gameData.wechat["WECHAT_ID_" + (parseInt(this.NPCID))]["WECHAT_OPTION"] == "dummy") {
                    this.setInputMsg(this.NPCID)
                    this.NPCID = this.NPCID + 1
                    cc.cs.PlayerInfo.wechat_id = this.NPCID
                }
            }
            this.sendEnable()
            return true
        } else {
            this.sendDisable()
            return false
        }
    },*/


    loadCruuentTalk: function(scroll, isPlayer, msg, name, isday) {
        var height = 0;
        var children = scroll.content.getChildren();
        var newNode = null;
        var addHeight = 0
        if (isday) {
            newNode = cc.instantiate(this.tianshuPrefab)
            newNode.cyH = newNode.height
            addHeight = newNode.height
            newNode.getChildByName("dayText").getComponent(cc.Label).string = msg
        } else if (isPlayer) {
            newNode = cc.instantiate(this.nanzhuTalkPrefab)
            cc.cs.UIMgr.setNanTalk(newNode, msg, name + " ·")
            newNode.cyH = cc.cs.UIMgr.getTalkHeight(newNode)
            addHeight = newNode.cyH
        } else {
            newNode = cc.instantiate(this.nvzhuTalkPrefab)
            cc.cs.UIMgr.setNvTalk(newNode, msg, "· " + name, false)
            addHeight = cc.cs.UIMgr.getTalkHeight(newNode)
            newNode.cyH = addHeight
        }
        cc.log("loadInfoTalk   " + addHeight)
        for (var i = 0; i < children.length; ++i) {
            height += children[i].cyH
            children[i].y += addHeight;
        }
        height += addHeight;
        if (scroll.content.height < height)
            scroll.content.height = height;
        scroll.content.addChild(newNode)
        newNode.y = newNode.height * 0.5
    },
    // called every frame, uncomment this function to activate update callback
    update: function(dt) {

    },
});