cc.Class({
    extends: cc.Component,

    properties: {
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

        inputTableBtn: null,

        currentPLID: 0,
        currentItem: null,

        lastZoneID: 0,
    },

    SendDJ: function(phoneid) {
        cc.log("SendPhone = " + phoneid + "         " + cc.cs.PlayerInfo.api_token)

        cc.cs.gameMgr.sendReply(phoneid, this.sendReplyHandle, this)

        this.currentPLID = phoneid
    },

    sendReplyHandle: function(ret) {

        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            //cc.cs.UIMgr.showTip("工作完成", 1.0)
            this.currentItem.addPlayerText(parseInt(this.currentPLID))
            cc.cs.PlayerInfo.replies_.push(this.currentPLID)
            cc.cs.PlayerInfo.playvideo = JasonObject.content.info.playvideo
            cc.log("video id 7= " + cc.cs.PlayerInfo.playvideo)
                //if(parseInt(JasonObject.content.info.level) >parseInt(cc.cs.PlayerInfo.level) ){
                //    cc.cs.UIMgr.showTip("等级提升！！！！", 1.0)
                // }else{
            this.currentItem.plCallBack()
            cc.cs.UIMgr.showTip("评论完成", 1.0)
                // }
            cc.cs.PlayerInfo.exp = parseInt(JasonObject.content.info.exp)
            cc.cs.PlayerInfo.level = parseInt(JasonObject.content.info.level)
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
        //弹窗

    },

    showInputTable: function(id, n) {
        var self = this
        this.currentItem = n
        this.inputTableBtn.active = true
        var replayId = []
        for (var i = 1; i <= cc.cs.gameData.reply["TOTAL_COUNT"]; ++i) {
            cc.log(cc.cs.gameData.reply["ID_" + i]["REPLY_GROUP_ID"])
            cc.log(id)
            cc.log(cc.cs.gameData.reply["ID_" + i]["REPLY_GROUP_ID"] == id)
            if (cc.cs.gameData.reply["ID_" + i]["REPLY_GROUP_ID"] == id) {
                replayId.push(cc.cs.gameData.reply["ID_" + i])
            }
        }
        var btn1 = this.inputTableBtn.getChildByName("btn1")
        var btn2 = this.inputTableBtn.getChildByName("btn2")
        var btn3 = this.inputTableBtn.getChildByName("btn3")
        btn1.targetOff(btn1)
        btn2.targetOff(btn2)
        btn3.targetOff(btn3)
        btn1.active = true;
        btn2.active = true;
        btn3.active = true;

        if (replayId.length == 1) {
            btn1.getChildByName("Label").getComponent(cc.Label).string = replayId[0]["REPLY_TEXT"]
            btn1.REPLY_ID = replayId[0]["ID"]
            btn1.on("click", (event) => {
                event.target.parent.active = false
                self.SendDJ(event.target.REPLY_ID)
            }, btn1)
            btn2.active = false;
            btn3.active = false;
        } else
        if (replayId.length == 2) {
            btn1.getChildByName("Label").getComponent(cc.Label).string = replayId[0]["REPLY_TEXT"]
            btn2.getChildByName("Label").getComponent(cc.Label).string = replayId[1]["REPLY_TEXT"]
            btn1.REPLY_ID = replayId[0]["ID"]
            btn2.REPLY_ID = replayId[1]["ID"]
            btn1.on("click", (event) => {
                event.target.parent.active = false
                self.SendDJ(event.target.REPLY_ID)
            }, btn1)
            btn2.on("click", (event) => {
                event.target.parent.active = false
                self.SendDJ(event.target.REPLY_ID)
            }, btn2)

            btn3.active = false;
        } else {
            btn1.getChildByName("Label").getComponent(cc.Label).string = replayId[0]["REPLY_TEXT"]
            btn2.getChildByName("Label").getComponent(cc.Label).string = replayId[1]["REPLY_TEXT"]
            btn3.getChildByName("Label").getComponent(cc.Label).string = replayId[2]["REPLY_TEXT"]
            btn1.REPLY_ID = replayId[0]["ID"]
            btn2.REPLY_ID = replayId[1]["ID"]
            btn3.REPLY_ID = replayId[2]["ID"]

            btn1.on("click", (event) => {
                self.SendDJ(event.target.REPLY_ID)
                event.target.parent.active = false


            }, btn1)
            btn2.on("click", (event) => {
                self.SendDJ(event.target.REPLY_ID)
                event.target.parent.active = false

            }, btn2)
            btn3.on("click", (event) => {
                self.SendDJ(event.target.REPLY_ID)
                event.target.parent.active = false

            }, btn3)
        }
    },

    addZoneId: function(id) {
        for (var i = 0; i < this.ZoneIDList.length; i++) {
            if (this.ZoneIDList[i].zoneID == id) return
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
                cc.log("jsZoneItem.addText    =  " + i)
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
        cc.log("addZoneId    " + zoneItem.height + "      " + id)
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
        var newID = cc.cs.PlayerInfo.addNewZone(this.lastZoneID)
        cc.log(newID + "  onEnable zoon   " + this.lastZoneID)
        if (newID != this.lastZoneID) {
            this.addZoneId(ndeID)
        }
        var children = this.scrollView.content.getChildren();
        for (var i = 0; i < children.length; ++i) {
            var jsZoneItem = children[i].getComponent("zoneItem")
            jsZoneItem.addOtherText()
        }


        cc.log("WorkView guidepos = " + cc.cs.PlayerInfo.guide_id)
        if (parseInt(cc.cs.PlayerInfo.guide_id) == 16) // 工作开始按钮
        {
            var children = this.scrollView.content.getChildren();
            var jsZoneItem = children[0].getComponent("zoneItem") // 第一个档位
            cc.cs.UIMgr.showGuide(parseInt(cc.cs.PlayerInfo.guide_id) + 1, itemCom.getplBtn(), this)
        }


        cc.cs.UIMgr.refresh_verticalScrollViewUp(this.scrollView, 0)

    },

    onLoad: function() {
        var self = this
        this.inputTablePrefab = cc.loader.getRes("prefab/inputTable", cc.Prefab)
        this.ZoneItemPrefab = cc.loader.getRes("prefab/zoneItem", cc.Prefab)

        this.inputTableBtn = cc.instantiate(this.inputTablePrefab)

        this.node.addChild(this.inputTableBtn, 88)

        this.inputTableBtn.x = 0;
        this.inputTableBtn.y = 0

        this.inputTableBtn.active = false

        this.nameText.string = cc.cs.PlayerInfo.NPCName

        var count = cc.cs.PlayerInfo.visibleZoneCount() + cc.cs.gameData.zone["FIRST"]
        this.lastZoneID = count
        if (count > 0) {
            for (var i = count - 1; i >= cc.cs.gameData.zone["FIRST"]; --i) {
                this.addZoneId(i)
            }
            var zoneData = cc.cs.gameData.getzoneData(this.lastZoneID)
            this.infoText.node.active = true
            this.infoText.string = "关注" + zoneData["ZONE_FOLLOW_NUM"] + "|" + "粉丝" + zoneData["ZONE_FANS_COUNT"]
        } else {
            this.infoText.node.active = false
        }


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