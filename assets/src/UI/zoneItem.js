cc.Class({
    extends: cc.Component,

    properties: {
        plBtn: {
            type: cc.Node,
            default: null
        },
        dzBtn: {
            type: cc.Node,
            default: null
        },
        replyMsg: {
            type: cc.RichText,
            default: null
        },
        msg: {
            type: cc.Label,
            default: null
        },
        bg: {
            type: cc.Node,
            default: null
        },
        bghf: {
            type: cc.Node,
            default: null
        },
        optionBtn: {
            type: cc.Node,
            default: null
        },
        popup: {
            type: cc.Node,
            default: null
        },
        dateText: {
            type: cc.Label,
            default: null
        },
        recordName: {
            type: cc.Node,
            default: null
        },
        nameText: {
            type: cc.Label,
            default: null
        },
        image1: {
            type: cc.Node,
            default: null
        },
        image2: {
            type: cc.Node,
            default: null
        },
        image3: {
            type: cc.Node,
            default: null
        },
        image4: {
            type: cc.Node,
            default: null
        },

        replyList: [],
        zoneID: 0,
        zanNum: 6,
        plNum: 0,
        plID: 0,
        isShowPopup: false,
        isAddOther: false,
        popupWidth: 0,
    },

    getplBtn: function() {
        return this.plBtn
    },

    setLength: function() {

        var height = 0
        for (var i = 0; i < this.replyList.length; ++i) {
            height += this.replyList[i].height
        }
        height = Math.abs(this.bghf.y) + height + 60
        this.node.height = height
    },
    setZoneID: function(id) {
        var self = this
        this.zoneID = id

        this.optionBtn.on("click", (event) => {
            cc.log(self + "         abc         ")
            cc.log(self.isShowPopup + "         cde         " + self.zoneID)
            cc.log(self.isShowPopup + " c " + cc.cs.PlayerInfo.canPLZone(self.zoneID) && cc.cs.PlayerInfo.canZanZone(self.zoneID) + "  d " +
                cc.cs.PlayerInfo.canPLZone(self.zoneID) + " e  " + cc.cs.PlayerInfo.canZanZone(self.zoneID))
            if (self.isShowPopup) {

                var action1 = cc.scaleTo(0.2, 0.0, 1.0)
                if (cc.cs.PlayerInfo.canPLZone(self.zoneID) && cc.cs.PlayerInfo.canZanZone(self.zoneID)) {
                    self.popup.runAction(action1)
                } else {
                    if (cc.cs.PlayerInfo.canPLZone(self.zoneID)) {
                        self.plBtn.runAction(action1)
                    } else if (cc.cs.PlayerInfo.canZanZone(self.zoneID)) {
                        self.dzBtn.runAction(action1)
                    }
                }
                self.isShowPopup = false
            } else {
                var action2 = cc.scaleTo(0.2, 1.0, 1.0)
                if (cc.cs.PlayerInfo.canZanZone(self.zoneID) && cc.cs.PlayerInfo.canZanZone(self.zoneID)) {
                    self.popup.runAction(action2)
                } else {
                    if (cc.cs.PlayerInfo.canPLZone(self.zoneID)) {
                        self.plBtn.runAction(action2)
                    } else if (cc.cs.PlayerInfo.canZanZone(self.zoneID)) {
                        self.dzBtn.runAction(action2)
                    }
                }
                self.isShowPopup = true
            }

        }, this.optionBtn)
        this.nameText.string = cc.cs.PlayerInfo.NPCName
        this.dateText.string = cc.cs.PlayerInfo.getZoneDay(id)


        var fbData = cc.cs.gameData.getzonefeefbackData(id);
        if (fbData["ZONE_IMG_1"] != "dummy") {

            var spr = this.getImage("moments/pic/" + fbData["ZONE_IMG_1"]);
            if (spr == null) {
                this.image1.active = (false)
            } else {
                this.image1.getComponent(cc.Sprite).spriteFrame = spr
                this.image1.on("click", (event) => {

                }, this.image1)
            }
        } else {
            this.image1.active = (false)
        }
        this.isShowPopup = false;
        this.popup.scaleX = 0.0
        if (cc.cs.PlayerInfo.canPLZone(self.zoneID) && cc.cs.PlayerInfo.canZanZone(self.zoneID)) {
            this.popup.scaleX = 0.0
        } else {
            if (cc.cs.PlayerInfo.canPLZone(self.zoneID)) {
                this.popup.x = this.popup.x + this.plBtn.width
                this.plBtn.active = (false)
                this.popup.scaleX = 1.0
                this.popup.active = (true)
                this.dzBtn.scaleX = 0.0
                this.isShowPopup = false;
            } else if (cc.cs.PlayerInfo.canZanZone(self.zoneID)) {
                this.dzBtn.active = (false)
                this.popup.scaleX = 1.0
                this.popup.active = (true)
                this.plBtn.scaleX = 0.0
                this.isShowPopup = false
            }
        }

        if (!cc.cs.PlayerInfo.canPLZone(self.zoneID) && !cc.cs.PlayerInfo.canZanZone(self.zoneID)) {
            this.optionBtn.active = false
        }

        this.popupWidth = this.popup.width;

    },
    scaleIcon: function(target) {
        var tex = target.getComponent(cc.Sprite).spriteFrame.getTexture()
        var sx = 0.0
        var sy = 0.0
        var sb = 0.0
        var w = tex.pixelWidth
        var h = tex.pixelHeight
        if (w > h) {
            sb = cc.visibleRect.width / w
        }
    },

    getImage: function(res) {
        return cc.loader.getRes("picture/newRes/" + res, cc.SpriteFrame);
    },

    setMsg: function(text) {
        this.msg.string = text
    },

    addText: function(id) {
        var height = Math.abs(this.replyMsg.node.y * 2)
        var fbData = cc.cs.gameData.getzonefeefbackData(id);


        if (this.replyList.length == 0) {
            this.replyList.push(this.replyMsg.node)
            this.replyMsg.string = "<color=#ffffff>" + fbData["ZONE_FB_FNAME"] + "</c><color=#1f6289>:" + fbData["ZONE_FB_TEXT"] + "</color>"
            if (cc.cs.gameData.zonefeefback["ID_" + id]["ZONE_FB_REPLY"] != "dummy") {

                this.addTextItem("<color=#ffffff>" +
                    cc.cs.PlayerInfo.NPCName +
                    "</c><color=#1f6289>回复" +
                    "</c><color=#ffffff>" +
                    fbData["ZONE_FB_FNAME"] +
                    "</c><color=#1f6289>:" +
                    fbData["ZONE_FB_REPLY"] +
                    "</color>")
            }
        } else {
            // this.replyList.push(this.replyMsg.node)
            this.addTextItem("<color=#ffffff>" +
                fbData["ZONE_FB_FNAME"] +
                "</c><color=#1f6289>:" +
                fbData["ZONE_FB_TEXT"] +
                "</color>")
            if (fbData["ZONE_FB_REPLY"] != "dummy") {

                this.addTextItem("<color=#ffffff>" +
                    cc.cs.PlayerInfo.NPCName +
                    "</c><color=#1f6289>回复" +
                    "</c><color=#ffffff>" +
                    fbData["ZONE_FB_FNAME"] +
                    "</c><color=#1f6289>:" +
                    fbData["ZONE_FB_REPLY"] +
                    "</color>")
            }
        }

        var si = this.bghf.getContentSize()
        si.height = height;
        for (var i = 0; i < this.replyList.length; ++i) {
            si.height += this.replyList.length * this.replyList[i].getContentSize().height
        }

        this.bghf.setContentSize(si)
        this.setLength()
        this.plNum++;
        this.setPL(this.plNum)
    },

    addOtherText: function() {
        if (this.isAddOther) return
        var id = this.zoneID
        if (cc.cs.PlayerInfo.canPLZone(id)) return
        var height = Math.abs(this.replyMsg.node.y * 2)
        var fbData = cc.cs.gameData.getreplyData(id);
        if (this.replyList.length == 0) {
            this.replyList.push(this.replyMsg.node)
            if (fbData["REPLY_REPLY"] != "dummy") {

                this.addTextItem("<color=#ffffff>" +
                    cc.cs.PlayerInfo.NPCName +
                    "</c><color=#1f6289>回复" +
                    "</c><color=#ffffff>" +
                    cc.cs.PlayerInfo.PlayerNmae +
                    "</c><color=#1f6289>:" +
                    fbData["REPLY_REPLY"] +
                    "</color>")
            }
        } else {
            //this.replyList.push(this.replyMsg.node)
            if (fbData["REPLY_REPLY"] != "dummy") {

                this.addTextItem("<color=#ffffff>" +
                    cc.cs.PlayerInfo.NPCName +
                    "</c><color=#1f6289>回复" +
                    "</c><color=#ffffff>" +
                    cc.cs.PlayerInfo.PlayerNmae +
                    "</c><color=#1f6289>:" +
                    fbData["REPLY_REPLY"] +
                    "</color>")
            }
        }
        var zoneData = cc.cs.gameData.getzoneData(id)
        var fdbackData = null
        for (var i = 1; i <= cc.cs.gameData.zone["TOTAL_COUNT"]; ++i) {
            fdbackData = cc.cs.gameData.getzonefeefbackData(i)
            if (zoneData["ZONE_LEVEL"] == fdbackData["ZONE_FB_LEVEL"] &&
                fdbackData["ZONE_FB_HAVE_FB"] != "dummy") {
                this.addText(i)
            }
            if (zoneData["ZONE_LEVEL"] < fdbackData["ZONE_FB_LEVEL"]) {
                break;
            }
        }
        this.isAddOther = true
        var si = this.bghf.getContentSize()

        this.bghf.height = height
        this.setLength()
    },

    addPlayerText: function(id) {
        var height = Math.abs(this.replyMsg.node.y * 2)
        var fbData = cc.cs.gameData.getreplyData(id);
        if (this.replyList.length == 0) {
            this.replyList.push(this.replyMsg.node)
            this.replyMsg.string = "<color=#ffffff>" + cc.cs.PlayerInfo.PlayerNmae + "</c><color=#1f6289>:" + fbData["REPLY_TEXT"] + "</color>"

        } else {
            //this.replyList.push(this.replyMsg.node)
            cc.log("zone item id = " +
                id)
            this.addTextItem("<color=#ffffff>" +
                cc.cs.PlayerInfo.PlayerNmae +
                "</c><color=#1f6289>:" +
                fbData["REPLY_TEXT"] +
                "</color>")

        }

        var si = this.bghf.getContentSize()
        si.height = height + this.replyList.length * this.replyList[0].getContentSize().height

        this.bghf.setContentSize(si)
        this.setLength()
        this.plNum++;
        this.plID = id
        this.setPL(this.plNum)
    },

    addTextItem: function(text) {
        var newItem = new cc.Node(this.replyMsg.node.name + this.replyList.length)
        var r = newItem.addComponent(cc.RichText)
        this.replyMsg.node.parent.addChild(newItem)
        newItem.anchorX = this.replyMsg.node.anchorX
        newItem.anchorY = this.replyMsg.node.anchorY
        newItem.x = this.replyMsg.node.x
        newItem.y = this.replyList[0].y - this.replyList.length * this.replyMsg.node.getContentSize().height
        newItem.height = this.replyMsg.node.height
        newItem.width = this.replyMsg.node.width
        r.string = text
        r.fontSize = this.replyMsg.fontSize
        r.lineHeight = this.replyMsg.lineHeight
        r.horizontalAlign = this.replyMsg.horizontalAlign
        r.font = this.replyMsg.font
        r.maxWidth = this.replyMsg.maxWidth
        this.replyList.push(newItem)
        cc.log("addTextItem   " + this.replyList.length + "       " + this.zoneID)
    },

    plCallBack: function() {
        this.popup.x = this.popup.x + this.plBtn.width
        this.plBtn.active = (false)
        this.popup.scaleX = 1.0
        this.popup.active = (true)
        this.dzBtn.scaleX = 0.0
        this.isShowPopup = false;
        if (!cc.cs.PlayerInfo.canZanZone(this.zoneID)) {
            this.optionBtn.active = false
        }
    },

    dzCallBack: function() {
        this.dzBtn.active = (false)
        this.popup.scaleX = 1.0
        this.popup.active = (true)
        this.plBtn.scaleX = 0.0
        this.isShowPopup = false;
        if (!cc.cs.PlayerInfo.canPLZone(this.zoneID)) {
            this.optionBtn.active = false
        }
    },

    onLoad: function() {
        var self = this
        this.plBtn.on("click", (event) => {
            if (cc.cs.PlayerInfo.canPLZone(self.zoneID)) {
                cc.cs.UIMgr.gameScene.ZoneView.getComponent("zoneView").showInputTable(self.zoneID, self)
            } else {
                cc.cs.UIMgr.showTip("已经评论过", 1.0)
            }

        }, this.plBtn)

        this.dzBtn.on("click", (event) => {
            if (cc.cs.PlayerInfo.canZanZone(self.zoneID)) {
                cc.cs.gameMgr.sendThumb(self.zoneID, this.sendReplyHandle, this)
            } else {
                cc.cs.UIMgr.showTip("已经攒过", 1.0)
            }

        }, this.dzBtn)
    },

    setZan: function(count) {
        //this.dzBtn.getChildByName("Label").getComponent(cc.Label).string = "点赞("+count+")"
    },

    setPL: function(count) {
        //this.plBtn.getChildByName("Label").getComponent(cc.Label).string = "评论("+count+")"
    },

    sendReplyHandle: function(ret) {

        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            //cc.cs.UIMgr.showTip("工作完成", 1.0)
            cc.cs.PlayerInfo.weibo_thumbs.push(parseInt(this.zoneID))
            cc.cs.PlayerInfo.exp = parseInt(JasonObject.content.info.exp)
            cc.cs.PlayerInfo.playvideo = JasonObject.content.info.playvideo
            cc.log("video id 6= " + cc.cs.PlayerInfo.playvideo)
                // if(parseInt(JasonObject.content.info.level) >parseInt(cc.cs.PlayerInfo.level) ){
                //cc.cs.UIMgr.showTip("等级提升！！！！", 1.0)
                // }else{
            cc.cs.UIMgr.showTip("点赞完成", 1.0)
            this.dzCallBack()
                // }
            cc.cs.PlayerInfo.level = parseInt(JasonObject.content.info.level)

            this.setZan(this.zanNum + 1)
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
        //弹窗

    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});