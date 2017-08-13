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
        dateText: {
            type: cc.Label,
            default: null
        },
        nameText: {
            type: cc.Label,
            default: null
        },

        replyList: [],
        zoneID: 0,
        zanNum: 6,
        plNum: 0,
        plID: 0,
    },

    setLength: function() {
        var height = Math.abs(this.bghf.y) + this.bghf.getContentSize().height + Math.abs(this.replyMsg.node.y * 2)
        var si = this.node.getContentSize()
        si.height = height + 30
        this.node.setContentSize(si)
    },
    setZoneID: function(id) {
        this.zoneID = id
        this.nameText.string = cc.cs.PlayerInfo.NPCName
        this.dateText.string = cc.cs.PlayerInfo.getZoneDay(id)

         if (cc.cs.PlayerInfo.canPLZone(id)) {
            this.plBtn.getChildByName("stars").active = true
         }else{
            this.plBtn.getChildByName("stars").active = false   
         }

         if (cc.cs.PlayerInfo.canZanZone(id)){
            this.dzBtn.getChildByName("stars").active = true
         }else{
            this.dzBtn.getChildByName("stars").active = false 
         }
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
        si.height = height + this.replyList.length * this.replyList[0].getContentSize().height

        this.bghf.setContentSize(si)
        this.setLength()
        this.plNum++;
        this.setPL(this.plNum)
    },

    addPlayerText: function(id) {
        var height = Math.abs(this.replyMsg.node.y * 2)

        var fbData = cc.cs.gameData.getreplyData(id);
        if (this.replyList.length == 0) {
            this.replyList.push(this.replyMsg.node)
            this.replyMsg.string = "<color=#ffffff>" + cc.cs.PlayerInfo.PlayerNmae + "</c><color=#1f6289>:" + fbData["REPLY_TEXT"] + "</color>"
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
            cc.log("zone item id = " +
                id)
            this.addTextItem("<color=#ffffff>" +
                cc.cs.PlayerInfo.PlayerNmae +
                "</c><color=#1f6289>:" +
                fbData["REPLY_TEXT"] +
                "</color>")
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
        r.string = text
        r.fontSize = this.replyMsg.fontSize
        r.lineHeight = this.replyMsg.lineHeight
        r.horizontalAlign = this.replyMsg.horizontalAlign
        r.font = this.replyMsg.font
        this.replyList.push(newItem)
    },

    onLoad: function() {
        var self = this;
        this.plBtn.on("click", (event) => {
            if (cc.cs.PlayerInfo.canPLZone(self.zoneID)) {
                event.target.parent.parent.parent.parent.parent.parent.getComponent("zoneView").showInputTable(self.zoneID, self)
                event.target.getChildByName("stars").active = true
            } else {
                event.target.getChildByName("stars").active = false
                cc.cs.UIMgr.showTip("已经评论过", 1.0)
            }

        }, this.plBtn)

        this.dzBtn.on("click", (event) => {
            if (cc.cs.PlayerInfo.canZanZone(self.zoneID)) {
                cc.cs.gameMgr.sendThumb(cc.cs.PlayerInfo.api_token, self.zoneID, this.sendReplyHandle, this)
                event.target.getChildByName("stars").active = true
            } else {
                cc.cs.UIMgr.showTip("已经攒过", 1.0)
                event.target.getChildByName("stars").active = false
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