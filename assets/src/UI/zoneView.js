cc.Class({
    extends: cc.Component,

    properties: {


        expText: {
            type: cc.Label,
            default: null
        },
        scrollView: {
            type: cc.ScrollView,
            default: null
        },
        backBtn: {
            type: cc.Node,
            default: null
        },
        inputNode: {
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
        showBg: {
            type: cc.Node,
            default: null
        },
        showIcon: {
            type: cc.Node,
            default: null
        },
        infoText: {
            type: cc.Label,
            default: null
        },
        nameText: {
            type: cc.Label,
            default: null
        },
        ZoneIDList: [],

        ZoneItemPrefab: null,

        inputTablePrefab: null,

        linePrefab:null,

        inputTableBtn: null,
        plIndex: 0,
        currentPLID: 0,
        currentItem: null,

        lastZoneID: 0,
        currentExp:0,
    },

    SendDJ: function(phoneid, target) {
        this.inputTableBtn.active = false
        this.inputNode.active = true
        this.inputBtn.getComponent(cc.Button).interactable = true
        this.sendBtn.getComponent(cc.Button).interactable = true
        this.inputTableBtn.ZONE_ID = phoneid
        this.currentPLID = phoneid
        var replyData = cc.cs.gameData.getreplyData(phoneid)

        this.msgText.string = replyData["REPLY_TEXT"]


    },

    setExp: function(currentExp, levlExp) {
        this.expText.string = currentExp + "/" + levlExp;
		 var heartTarget = this.node.getChildByName("expBG").getChildByName("qinmitaoxindi")
        cc.cs.UIMgr.setHeart(heartTarget, currentExp,levlExp)
    },
    refresh:function(){
        
                var leveldata2 = cc.cs.gameData.level["LEV_LEV_" + (parseInt(cc.cs.PlayerInfo.level))]
                this.setExp(cc.cs.PlayerInfo.exp, leveldata2["LEV_EXP"])
                    //this.setDiamond(cc.cs.PlayerInfo.Diamond)
            },

    updateui:function(){
        
                var leveldata2 = cc.cs.gameData.level["LEV_LEV_" + (parseInt(cc.cs.PlayerInfo.level))]
                this.setExp(cc.cs.PlayerInfo.exp, leveldata2["LEV_EXP"])
                    //this.setDiamond(cc.cs.PlayerInfo.Diamond)
               
            }
            ,

    sendReplyHandle: function(ret) {

        cc.log(ret)
        var JasonObject = JSON.parse(ret);
		cc.cs.UIMgr.closeNetView()
        if (JasonObject.success === true) {
            //cc.cs.UIMgr.closeNetView()
            //cc.cs.UIMgr.showTip("工作完成", 1.0)
            var heartTarget = this.node.getChildByName("expBG")
            this.currentExp = parseInt(JasonObject.content.info.exp) - parseInt(cc.cs.PlayerInfo.exp)
            cc.cs.UIMgr.showExpTip(this.currentExp, heartTarget, this)

            this.currentItem.addPlayerText(parseInt(this.currentPLID))
            cc.cs.PlayerInfo.replies_.push(this.currentPLID)
            cc.cs.PlayerInfo.playvideo = JasonObject.content.info.playvideo
                //if(parseInt(JasonObject.content.info.level) >parseInt(cc.cs.PlayerInfo.level) ){
                //    cc.cs.UIMgr.showTip("等级提升！！！！", 1.0)
                // }else{
            this.currentItem.plCallBack()
            //cc.cs.UIMgr.showTip("评论完成", 1.0)
          //  this.updateui()
                // }
            cc.cs.PlayerInfo.exp = parseInt(JasonObject.content.info.exp)
            cc.cs.PlayerInfo.level = parseInt(JasonObject.content.info.level)
            if(this.currentPLID == cc.cs.gameData.zone["FIRST"])
                this.scrollView.content.height += 40
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
        //弹窗

    },

    scaleIcon: function(target) {
        var self = this
        var tex = target.getComponent(cc.Sprite).spriteFrame.getTexture()
        var sx = 0.0
        var sy = 0.0
        var sb = 0.0
        var w = tex.pixelWidth
        var h = tex.pixelHeight
        var sw = 0.0
        var sh = 0.0
        if (w > h) {
            sh = 100
            sw = sh/h * w;
            sb = cc.visibleRect.width /sw
        }else{
            sw = 100
            sh = sw/w * h;
            sb = cc.visibleRect.height /sh
        }
        this.showIcon.scaleX = 1.0
        this.showIcon.scaleY = 1.0
    
        target.width = sw
        target.height = sh
        var action = cc.sequence(cc.spawn(cc.moveTo(0.8, 0.0,0.0),cc.scaleTo(0.8,sb,sb)), cc.callFunc(function(target) {
            self.addShowHandle()
        }, target))
        target.runAction(action)
    },
     
    addShowHandle : function(){
        var self = this
        this.showBg.on("click",(event) => {
            self.showBg.active = false
        },this.showBg)
        this.showIcon.on("click",(event) => {
            self.showBg.active = false
        },this.showIcon)
    },


    getImage: function(res) {
        return cc.loader.getRes("picture/newRes/" + res, cc.SpriteFrame);
    },

    showIconFunc : function(target){
        var sp = this.getImage("moments/pic/" + target.IMAGE_ID)
        if(sp == null) return
        this.showBg.active = true
        var p = target.parent.convertToWorldSpaceAR(cc.v2(target.x, target.y))
        var p2 = this.showIcon.parent.convertToNodeSpaceAR(cc.v2(p.x, p.y))
        this.showIcon.x = p2.x
        this.showIcon.y = p2.y
        this.showBg.targetOff(this.showBg)
        this.showIcon.targetOff(this.showIcon)

        this.showIcon.getComponent(cc.Sprite).spriteFrame = sp
        

        this.scaleIcon(this.showIcon)

    },

    plClickHandle: function(id, n) {
        this.plIndex = id
        this.currentItem = n
        this.inputNode.active = true;
        this.inputBtn.getComponent(cc.Button).interactable = true
        this.sendBtn.getComponent(cc.Button).interactable = true
        this.msgText.string = ""
    },


    showInputTable: function(id) {
        var self = this

        this.inputTableBtn.active = true
        var replayId = []
        for (var i = 1; i <= cc.cs.gameData.reply["TOTAL_COUNT"]; ++i) {
            if (cc.cs.gameData.reply["ID_" + i]["REPLY_GROUP_ID"] == id) {
                replayId.push(cc.cs.gameData.reply["ID_" + i])
            }
        }
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

        if (replayId.length == 1) {
            text1.string = replayId[0]["REPLY_TEXT"]
            text1.node.y = -6
            btn1.height = text1.node.height + 12
            btn1.y = 0
            zs1.active = false
            btn1.REPLY_ID = replayId[0]["ID"]
            btn1.on("click", (event) => {
                event.target.parent.active = false
                self.SendDJ(event.target.REPLY_ID, event.target)
            }, btn1)
            btn2.active = false;
            btn3.active = false;
            this.inputTableBtn.height = btn1.height
            var p = this.inputBtn.parent.convertToWorldSpaceAR(cc.v2(this.inputBtn.x, this.inputBtn.y))
            var p2 = this.inputTableBtn.parent.convertToNodeSpaceAR(cc.v2(p.x, p.y))
            this.inputTableBtn.x = p2.x
            this.inputTableBtn.y = this.node.height * -0.5 + this.inputTableBtn.height + ((this.node.height * 0.5 + this.inputBtn.parent.y) - (this.inputBtn.parent.height * 0.5 + (this.inputBtn.parent.height - this.inputBtn.height) * 0.5)) + 20
        } else
        if (replayId.length == 2) {
            text1.string = replayId[0]["REPLY_TEXT"]
            text2.string = replayId[1]["REPLY_TEXT"]
            text1.node.y = -6
            text2.node.y = -6
            btn1.height = text1.node.height + 12
            btn2.height = text2.node.height + 12
            btn1.y = 0
            btn2.y = -btn1.height
            zs1.active = true
            zs1.y = -btn1.height
            zs2.active = false

            btn1.REPLY_ID = replayId[0]["ID"]
            btn2.REPLY_ID = replayId[1]["ID"]
            btn1.on("click", (event) => {
                event.target.parent.active = false
                self.SendDJ(event.target.REPLY_ID, event.target)
            }, btn1)
            btn2.on("click", (event) => {
                event.target.parent.active = false
                self.SendDJ(event.target.REPLY_ID, event.target)
            }, btn2)

            btn3.active = false;
            this.inputTableBtn.height = btn1.height + btn2.height
                //this.inputTableBtn.x = -93
            var p = this.inputBtn.parent.convertToWorldSpaceAR(cc.v2(this.inputBtn.x, this.inputBtn.y))
            var p2 = this.inputTableBtn.parent.convertToNodeSpaceAR(cc.v2(p.x, p.y))
            this.inputTableBtn.x = p2.x
            this.inputTableBtn.y = this.node.height * -0.5 + this.inputTableBtn.height + ((this.node.height * 0.5 + this.inputBtn.parent.y) - (this.inputBtn.parent.height * 0.5 + (this.inputBtn.parent.height - this.inputBtn.height) * 0.5)) + 20
        } else {
            text1.string = replayId[0]["REPLY_TEXT"]
            text2.string = replayId[1]["REPLY_TEXT"]
            text3.string = replayId[2]["REPLY_TEXT"]
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
            btn1.REPLY_ID = replayId[0]["ID"]
            btn2.REPLY_ID = replayId[1]["ID"]
            btn3.REPLY_ID = replayId[2]["ID"]

            btn1.on("click", (event) => {
                self.SendDJ(event.target.REPLY_ID, event.target)
                event.target.parent.active = false


            }, btn1)
            btn2.on("click", (event) => {
                self.SendDJ(event.target.REPLY_ID, event.target)
                event.target.parent.active = false

            }, btn2)
            btn3.on("click", (event) => {
                self.SendDJ(event.target.REPLY_ID, event.target)
                event.target.parent.active = false

            }, btn3)

            this.inputTableBtn.height = btn1.height + btn2.height + btn3.height
                //this.inputTableBtn.x = -93
            var p = this.inputBtn.parent.convertToWorldSpaceAR(cc.v2(this.inputBtn.x, this.inputBtn.y))
            var p2 = this.inputTableBtn.parent.convertToNodeSpaceAR(cc.v2(p.x, p.y))
            this.inputTableBtn.x = p2.x
            this.inputTableBtn.y = this.node.height * -0.5 + this.inputTableBtn.height + ((this.node.height * 0.5 + this.inputBtn.parent.y) - (this.inputBtn.parent.height * 0.5 + (this.inputBtn.parent.height - this.inputBtn.height) * 0.5)) + 20
        }
        cc.log(" this.inputTableBtn.x =  " + this.inputTableBtn.x + "    this.inputTableBtn.y   =  " + this.inputTableBtn.y + " this.inputTableBtn.active   " + this.inputTableBtn.active)
    },

    addZoneId: function(id) {
        for (var i = 0; i < this.ZoneIDList.length; i++) {
            if (this.ZoneIDList[i].zoneID == id) return
        }

        if(id != cc.cs.gameData.zone["FIRST"]){
            var line = cc.instantiate(this.linePrefab)
            cc.cs.UIMgr.addItem_verticalScrollViewUp(this.scrollView, line, 0)
        }

        var zoneData = cc.cs.gameData.getzoneData(id)

        if (zoneData == null) return

        var zoneItem = cc.instantiate(this.ZoneItemPrefab)
        zoneItem.id = id
        this.ZoneIDList.push(zoneItem)

        var jsZoneItem = zoneItem.getComponent("zoneItem")
        jsZoneItem.setZoneID(id)
        var fdbackData = null
        for (var i = 1; i <= cc.cs.gameData.zonefeefback["TOTAL_COUNT"]; ++i) {
            fdbackData = cc.cs.gameData.getzonefeefbackData(i)
            if (zoneData["ZONE_LEVEL"] == fdbackData["ZONE_FB_LEVEL"] &&
                fdbackData["ZONE_FB_HAVE_FB"] == "dummy") {
                jsZoneItem.addText(i)
            }
            if (zoneData["ZONE_LEVEL"] < fdbackData["ZONE_FB_LEVEL"]) {
                break;
            }
        }
        jsZoneItem.setMsg(zoneData["ZONE_TITLE"])

        if (!cc.cs.PlayerInfo.canPLZone(id)) {
            jsZoneItem.addPlayerText(id)
            jsZoneItem.addOtherText()
        }
        cc.cs.UIMgr.addItem_verticalScrollViewUp(this.scrollView, zoneItem, 0)
        
    },

    /*canZone: function() {
        var currentID = parseInt(cc.cs.PlayerInfo.level) - 2
        if (currentID >= 1) {
            for (var i = currentID; i >= 1; --i) {
                if (cc.cs.PlayerInfo.canPLZone(i) || cc.cs.PlayerInfo.canZanZone(i))
                    return true
            }
        }
        return false;
    },*/
    // use this for initialization

    onEnable: function() {
        
        this.updateui()
        this.inputNode.active = false;
        this.showBg.active = false
        var newID = cc.cs.PlayerInfo.addNewZone(this.lastZoneID)

        var zoneData = cc.cs.gameData.getzoneData(this.lastZoneID)
        this.infoText.node.active = true
        this.infoText.string = "关注" + zoneData["ZONE_FOLLOW_NUM"] + "|" + "粉丝" + zoneData["ZONE_FANS_COUNT"]
        
        while(newID != this.lastZoneID){
      
            this.addZoneId(newID)
            this.lastZoneID = newID
            newID = cc.cs.PlayerInfo.addNewZone(this.lastZoneID)
        }
    
        var children = this.scrollView.content.getChildren();
        if(children.length == 0) return
        for (var i = 0; i < children.length; ++i) {
            
            var jsZoneItem = children[i].getComponent("zoneItem")
            if(jsZoneItem == null)continue
            jsZoneItem.addOtherText()
            cc.log("children.lengthchildren.lengthchildren.length    " + children[i])
        }

        if (parseInt(cc.cs.PlayerInfo.guide_id) == 16) // 工作开始按钮
        {
            var children = this.scrollView.content.getChildren();
            var jsZoneItem = children[ children.length -1].getComponent("zoneItem") // 第一个档位
             cc.cs.UIMgr.showGuide(parseInt(cc.cs.PlayerInfo.guide_id)+1,/*jsZoneItem.getOptiontBtn()*/null,this)
        }
        cc.cs.UIMgr.refresh_verticalScrollViewUp(this.scrollView)
    },

    onLoad: function() {

        var self = this
        this.inputTablePrefab = cc.loader.getRes("prefab/inputTable", cc.Prefab)
        this.ZoneItemPrefab = cc.loader.getRes("prefab/zoneItem", cc.Prefab)
        this.linePrefab = cc.loader.getRes("prefab/lineprefab", cc.Prefab)
        this.inputTableBtn = cc.instantiate(this.inputTablePrefab)
        this.inputTableBtn.ZONE_ID = 0
        this.node.addChild(this.inputTableBtn, 88)

        this.inputTableBtn.x = 0;
        this.inputTableBtn.y = 0

        this.inputTableBtn.active = false

        this.nameText.string = cc.cs.PlayerInfo.NPCName

        var count = cc.cs.PlayerInfo.visibleZoneCount() + cc.cs.gameData.zone["FIRST"]
        cc.log("azone count = " + count)
        this.lastZoneID = count - 1
        if (count > 0) {
            for (var i = cc.cs.gameData.zone["FIRST"]; i < count ; ++i) {
                this.addZoneId(i)
            }
            var zoneData = cc.cs.gameData.getzoneData(this.lastZoneID)
            this.infoText.node.active = true
            this.infoText.string = "关注" + zoneData["ZONE_FOLLOW_NUM"] + "|" + "粉丝" + zoneData["ZONE_FANS_COUNT"]
        } else {
            this.infoText.node.active = false
        }

        this.inputBtn.on("click", (event) => {
            self.showInputTable(self.plIndex)
        }, this.inputBtn)

        this.sendBtn.on("click", (event) => {
            if (self.inputTableBtn.ZONE_ID == 0) {
                cc.cs.UIMgr.showTip("点击左侧输入框，选择回复内容", 1.0)
            } else {
                cc.cs.gameMgr.sendReply(self.inputTableBtn.ZONE_ID, self.sendReplyHandle, self)
                self.inputTableBtn.ZONE_ID = 0
                this.inputNode.active = false;
            }

        }, this.sendBtn)


        this.backBtn.on("click", (event) => {
            // var parent = self.node.parent
            // parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
            cc.cs.UIMgr.closeView()

        }, this.backBtn)
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});