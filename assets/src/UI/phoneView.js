cc.Class({
    extends: cc.Component,

    properties: {
        everInfoScroll: {
            type: cc.ScrollView,
            default: null
        },
        backBtn: {
            type: cc.Node,
            default: null
        },

        phoneBtn: {
            type: cc.Node,
            default: null
        },

        currentScroll: {
            type: cc.ScrollView,
            default: null
        },

        infoviewScroll: {
            type: cc.ScrollView,
            default: null
        },

        cancelBtn: {
            type: cc.Node,
            default: null
        },
        playerInfoView: {
            type: cc.Node,
            default: null
        },

        playerInfoBackBtn: {
            type: cc.Node,
            default: null
        },

        talkImage: {
            type: cc.Node,
            default: null
        },

        talktime: {
            type: cc.Label,
            default: null
        },

        linkImage: {
            type: cc.Node,
            default: null
        },

        tonghuakuang: {
            type: cc.Node,
            default: null
        },


        talkSummaryInfoPrefab: null,

        nvzhuTalkPrefab: null,

        nanzhuTalkPrefab: null,

        inputTablePrefab: null,

        totalTime: 0,

        currentTime: 0,

        isAction: false,

        inputTableBtn: null,

        NPCID: 1,

        nvzhuSize: 0,

        nanzhuSize: 0,

        currentPlayerPhoneID: 0,

        minute: 0,
        second: 0,
        timeIng: 0,
    },


    phoneWait: function() {
        this.node.active = true;
        this.playerInfoView.active = false
        this.phoneBtn.active = false
        this.everInfoScroll.node.active = false
        this.currentScroll.node.active = true;
    },

    showNormal: function() {
        this.node.active = true;
        this.playerInfoView.active = false
        this.phoneBtn.active = true
        this.everInfoScroll.node.active = true
        this.inputTableBtn.active = false
        this.tonghuakuang.active = false
        this.currentScroll.node.active = false;

        if (parseInt(cc.cs.gameData.phone["PHONE_ID_" + (parseInt(cc.cs.PlayerInfo.Phone_ID) + 1)]["PHONE_LEV"]) > parseInt(cc.cs.PlayerInfo.Level)) {
            this.phoneBtn.active = false
        }
        if (cc.cs.PlayerInfo.Phone_ID == 0 ||
            cc.cs.gameData.phone["PHONE_ID_" + cc.cs.PlayerInfo.Phone_ID]["PHONE_AUDIO"] == "dummy")
            this.NPCID = cc.cs.PlayerInfo.Phone_ID + 1
        else
            this.NPCID = cc.cs.PlayerInfo.Phone_ID
        this.showCompletePhone()
    },



    showCompletePhone: function() {

        var count = [];
        var index = 0
        for (var i = 2; i <= cc.cs.gameData.level_up["TOTAL_COUNT"]; ++i) {

            if (cc.cs.gameData.level_up["LEVEL_UP_LEV_" + i]["PHONE_END_ID"] != "dummy" && cc.cs.gameData.level_up["LEVEL_UP_LEV_" + i]["PHONE_END_ID"] > parseInt(cc.cs.PlayerInfo.Phone_ID))
                break;
            else if (cc.cs.gameData.level_up["LEVEL_UP_LEV_" + i]["PHONE_END_ID"] != "dummy" && cc.cs.gameData.level_up["LEVEL_UP_LEV_" + i]["PHONE_END_ID"] == parseInt(cc.cs.PlayerInfo.Phone_ID)) {
                count[index] = i
                index++
            } else if (cc.cs.gameData.level_up["LEVEL_UP_LEV_" + i]["PHONE_END_ID"] != "dummy") {
                count[index] = i
                index++
            }

        }
        var newNode = null
        var self = this
        this.everInfoScroll.content.removeAllChildren(true)
        for (var i = 0; i < count.length; ++i) {
            newNode = cc.instantiate(this.talkSummaryInfoPrefab)
            cc.cs.UIMgr.addItem_verticalScrollView(this.everInfoScroll, newNode, 0)
            newNode.cyEnd = count[i]
            newNode.getChildByName("infoBtn").getChildByName("time").getComponent(cc.Label).string = this.getDay(
                parseInt(cc.cs.gameData.level["LEV_LEV_" + cc.cs.PlayerInfo.Level]["LEV_DAY"]) -
                parseInt(cc.cs.gameData.level["LEV_LEV_" + cc.cs.gameData.phone["PHONE_ID_" + cc.cs.gameData.level_up["LEVEL_UP_LEV_" + count[i]]["PHONE_END_ID"]]["PHONE_LEV"]]["LEV_DAY"])
            )
            newNode.getChildByName("infoBtn").getChildByName("msg").getComponent(cc.Label).string = this.getLimitMsg(cc.cs.gameData.phone["PHONE_ID_" + cc.cs.gameData.level_up["LEVEL_UP_LEV_" + count[i]]["PHONE_END_ID"]]["PHONE_MSG"], 16)
            newNode.getChildByName("infoBtn").getChildByName("dian").getChildByName("index").getComponent(cc.Label).string = "" + (i + 1)
            newNode.on("click", (event) => {
                self.showPhoneInfoView();
                self.showInfoViewSV(event.target.cyEnd, count.length)
            }, newNode)
        }

    },

    setViewInputMsg: function(id) {
        if (cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_OPTION"] == "dummy" || cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_OPTION"] == -1) {
            this.loadCruuentTalk(this.infoviewScroll, false, cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_MSG"], cc.cs.PlayerInfo.NPCName);
        } else {
            this.loadCruuentTalk(this.infoviewScroll, true, cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_MSG"], cc.cs.PlayerInfo.PlayerNmae);
        }
    },

    showInfoViewSV: function(endID, count) {
        this.infoviewScroll.content.removeAllChildren(true)
        var startIndex = 1


        if (endID > 2) {
            for (var i = 2; i <= count; ++i) {

                if (i + 1 == endID) {
                    startIndex = cc.cs.gameData.level_up["LEVEL_UP_LEV_" + (i)]["PHONE_END_ID"] + 1
                    break
                }
            }
        }

        var id = startIndex
        var Index = 0

        for (var i = 0; i < cc.cs.PlayerInfo.Phone_player_ID.length; ++i) {
            if (cc.cs.PlayerInfo.Phone_player_ID[i] > id) {
                Index = i
                break;
            }
        }

        while (id != -1) {

            this.setViewInputMsg(id)
            if (cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_AUDIO"] == "dummy") {
                id = -1
                break;
            }

            if (cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_OPTION"] == "dummy" || cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_OPTION"] == -1) {
                id = cc.cs.PlayerInfo.Phone_player_ID[Index]
                Index++
            } else {
                id = cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_AUDIO"]
            }
            // id = 
        }

    },

    getLimitMsg: function(msg, id) {
        cc.log(msg.length)
        if (msg.length <= id) return msg
        return msg.substring(id)
    },

    getDay: function(d) {
        if (d == 0)
            return "今天"
        if (d == 1)
            return "昨天"
        if (d == 2)
            return "前天"

        return d + "天前"
    },

    showPhone: function() {
        this.node.active = true;
        this.playerInfoView.active = false
        this.cancelBtn.active = true
        this.phoneBtn.active = false
        this.everInfoScroll.node.active = false
        this.tonghuakuang.active = true
        this.currentScroll.node.active = true;

        var count = 0
        var startIndex = 0

        if (cc.cs.PlayerInfo.Phone_ID == 0 || cc.cs.PlayerInfo.Phone_ID == 1 ||
            (
                cc.cs.gameData.phone["PHONE_ID_" + (parseInt(cc.cs.PlayerInfo.Phone_ID) + 1)]["PHONE_LEV"] !=
                cc.cs.gameData.phone["PHONE_ID_" + (parseInt(cc.cs.PlayerInfo.Phone_ID))]["PHONE_LEV"]) ||
            (cc.cs.gameData.phone["PHONE_ID_" + (parseInt(cc.cs.PlayerInfo.Phone_ID) - 1)]["PHONE_LEV"] !=
                cc.cs.gameData.phone["PHONE_ID_" + (parseInt(cc.cs.PlayerInfo.Phone_ID))]["PHONE_LEV"])
        ) {
            this.clearCurrentTalk()
            return
        } else {
            var currentPhoneLevel = cc.cs.gameData.phone["PHONE_ID_" + cc.cs.PlayerInfo.Phone_ID]["PHONE_LEV"]
            if (currentPhoneLevel == 2) {
                startIndex = 1
            } else {

                for (var i = cc.cs.PlayerInfo.Phone_ID; i > 1; --i) {
                    if (cc.cs.gameData.phone["PHONE_ID_" + (i - 1)]["PHONE_LEV"] < currentPhoneLevel) {
                        startIndex = i
                        break
                    }
                }
            }
            var id = startIndex
            var index = 0

            for (var i = 0; i < cc.cs.PlayerInfo.Phone_player_ID.length; ++i) {
                if (cc.cs.PlayerInfo.Phone_player_ID[i] >= startIndex) {
                    index = i
                    break;
                }
            }

            while (id < cc.cs.PlayerInfo.Phone_ID) {
                this.setInputMsg1(id)
                cc.log(id)
                if (id >= cc.cs.PlayerInfo.Phone_ID) break;
                if (cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_OPTION"] == "dummy") {
                    id = cc.cs.PlayerInfo.Phone_player_ID[index]
                    index++
                } else {
                    id = cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_AUDIO"]
                }
            }
        }

    },

    showPhoneInfoView: function() {
        this.node.active = false;
        this.playerInfoView.active = true

    },

    showPhoneView: function() {
        this.node.active = true;
        this.playerInfoView.active = false
    },

    setInputMsg1: function(id) {

        if (cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_OPTION"] == "dummy" || cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_OPTION"] == -1) {
            this.loadCruuentTalk(this.currentScroll, false, cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_MSG"], cc.cs.PlayerInfo.NPCName);

        } else {
            this.loadCruuentTalk(this.currentScroll, true, cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_MSG"], cc.cs.PlayerInfo.PlayerNmae);
        }
    },



    setInputMsg: function(id) {

        if (cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_OPTION"] == "dummy" || cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_OPTION"] == -1) {
            this.loadCruuentTalk(this.currentScroll, false, cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_MSG"], cc.cs.PlayerInfo.NPCName);
            if (cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_AUDIO"] != "dummy") {
                this.showInputTable(id)
                this.tonghuakuang.active = false
                this.showCompletePhone()
            }
        } else {
            this.loadCruuentTalk(this.currentScroll, true, cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_MSG"], cc.cs.PlayerInfo.PlayerNmae);
        }
    },

    showInputTable: function(id) {
        var self = this
        if (cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_OPTION"] == "dummy" || cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_OPTION"] == -1) {
            this.inputTableBtn.active = true
            var replayId = []
            var btn1 = this.inputTableBtn.getChildByName("btn1")
            var btn2 = this.inputTableBtn.getChildByName("btn2")
            var btn3 = this.inputTableBtn.getChildByName("btn3")
            btn1.targetOff(btn1)
            btn2.targetOff(btn2)
            btn3.targetOff(btn3)
            btn1.active = true;
            btn2.active = true;
            btn3.active = true;
            for (var i = 1; i <= cc.cs.gameData.phone["TOTAL_COUNT"]; ++i) {
                if (cc.cs.gameData.phone["PHONE_ID_" + i]["PHONE_OPTION"] == cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_AUDIO"]) {
                    replayId.push(cc.cs.gameData.phone["PHONE_ID_" + i])
                }
                if (cc.cs.gameData.phone["PHONE_ID_" + i]["PHONE_OPTION"] != "dummy" && cc.cs.gameData.phone["PHONE_ID_" + i]["PHONE_OPTION"] > cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_AUDIO"])
                    break;
            }

            if (replayId.length == 1) {
                btn1.getChildByName("Label").getComponent(cc.Label).string = replayId[0]["PHONE_MSG"]
                btn1.PHONE_ID = replayId[0]["PHONE_ID"]
                btn1.on("click", (event) => {
                    cc.log("PHONE_ID = " + event.target.PHONE_ID)
                    event.target.parent.active = false
                    self.SendPhone(event.target.PHONE_ID)
                    self.tonghuakuang.active = true
                }, btn1)
                btn2.active = false;
                btn3.active = false;
            } else
            if (replayId.length == 2) {
                btn1.getChildByName("Label").getComponent(cc.Label).string = replayId[0]["PHONE_MSG"]
                btn2.getChildByName("Label").getComponent(cc.Label).string = replayId[1]["PHONE_MSG"]
                btn1.PHONE_ID = replayId[0]["PHONE_ID"]
                btn2.PHONE_ID = replayId[1]["PHONE_ID"]
                btn1.on("click", (event) => {
                    cc.log("PHONE_ID = " + event.target.PHONE_ID)
                    event.target.parent.active = false
                    self.SendPhone(event.target.PHONE_ID)
                    self.tonghuakuang.active = true
                }, btn1)
                btn2.on("click", (event) => {
                    cc.log("PHONE_ID = " + event.target.PHONE_ID)
                    event.target.parent.active = false
                    self.SendPhone(event.target.PHONE_ID)
                    self.tonghuakuang.active = true
                }, btn2)

                btn3.active = false;
            } else {
                btn1.getChildByName("Label").getComponent(cc.Label).string = replayId[0]["PHONE_MSG"]
                btn2.getChildByName("Label").getComponent(cc.Label).string = replayId[1]["PHONE_MSG"]
                btn3.getChildByName("Label").getComponent(cc.Label).string = replayId[2]["PHONE_MSG"]
                btn1.PHONE_ID = replayId[0]["PHONE_ID"]
                btn2.PHONE_ID = replayId[1]["PHONE_ID"]
                btn3.PHONE_ID = replayId[2]["PHONE_ID"]

                btn1.on("click", (event) => {
                    cc.log("PHONE_ID = " + event.target.PHONE_ID)
                    event.target.parent.active = false
                    self.SendPhone(event.target.PHONE_ID)
                    self.tonghuakuang.active = true
                }, btn1)
                btn2.on("click", (event) => {
                    cc.log("PHONE_ID = " + event.target.PHONE_ID)
                    event.target.parent.active = false
                    self.SendPhone(event.target.PHONE_ID)
                    self.tonghuakuang.active = true
                }, btn2)
                btn3.on("click", (event) => {
                    cc.log("PHONE_ID = " + event.target.PHONE_ID)
                    event.target.parent.active = false
                    self.SendPhone(event.target.PHONE_ID)
                    self.tonghuakuang.active = true
                }, btn3)
            }
        } else {
            return
        }
    },



    addSummaryItem: function() {


    },

    onbackBtn: function() {
        var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)


    },

    SendPhone: function(phoneid) {
        this.currentPlayerPhoneID = phoneid;
        cc.log("SendPhone = " + phoneid + "         " + cc.cs.PlayerInfo.ApiToken)
        this.setInputMsg(phoneid)
        cc.cs.gameMgr.sendPhone(cc.cs.PlayerInfo.ApiToken, phoneid, this.SendPhoneHandle, this)
    },

    canPhone: function() {
        if (cc.cs.gameData.phone["PHONE_ID_" + cc.cs.PlayerInfo.Phone_ID]["PHONE_LEV"] <= parseInt(cc.cs.PlayerInfo.Level))

            if (cc.cs.gameData.phone["PHONE_ID_" + cc.cs.PlayerInfo.Phone_ID]["PHONE_AUDIO"] == "dummy" &&
                cc.cs.gameData.phone["PHONE_ID_" + (cc.cs.PlayerInfo.Phone_ID + 1)]["PHONE_LEV"] > parseInt(cc.cs.PlayerInfo.Level)) return false
            else return true
        return false
    },

    SendPhoneHandle: function(ret) {
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            //cc.cs.UIMgr.showTip("工作完成", 1.0)
            //cc.cs.UIMgr.showPopupO("hehe","工作完成了",()=>{
            this.NPCID = JasonObject.content.info.phone_audio

            cc.cs.PlayerInfo.Phone_player_ID.push(parseInt(this.currentPlayerPhoneID))
            cc.cs.PlayerInfo.Phone_ID = parseInt(this.NPCID)

            /*if(parseInt(JasonObject.content.info.level) >parseInt(cc.cs.PlayerInfo.Level) ){
                cc.cs.UIMgr.showTip("等级提升！！！！", 1.0)
            }*/

            cc.cs.PlayerInfo.videoID = JasonObject.content.info.playvideo
            cc.log("video id 4= " + cc.cs.PlayerInfo.videoID)
            cc.cs.PlayerInfo.Exp = JasonObject.content.info.exp
            cc.cs.PlayerInfo.Level = JasonObject.content.info.level
            if (this.canPhone()) {
                this.currentTime = 0
                this.isAction = true;
                this.totalTime = (cc.random0To1() + 0.4) * 8
                if (this.totalTime > 8) this.totalTime = 8
            } else {
                this.setInputMsg(this.NPCID)
                this.timeIng = false
            }


        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
        //弹窗
    },
    clearCurrentTalk: function() {
        this.currentScroll.content.removeAllChildren(true)
    },
    loadCruuentTalk: function(scroll, isPlayer, msg, name) {
        var height = 0;
        var children = scroll.content.getChildren();

        var newNode = null;
        var addHeight = 0
        if (isPlayer) {
            newNode = cc.instantiate(this.nanzhuTalkPrefab)
            newNode.cyH = this.nanzhuSize.height
            addHeight = this.nanzhuSize.height
            newNode.getChildByName("name").getComponent(cc.Label).string = name + " ·"
        } else {
            newNode = cc.instantiate(this.nvzhuTalkPrefab)
            addHeight = this.nvzhuSize.height
            newNode.cyH = this.nvzhuSize.height
            newNode.getChildByName("name").getComponent(cc.Label).string = "· " + name
        }

        newNode.getChildByName("talk").getComponent(cc.Label).string = msg

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

    computerTalkZSize: function() {
        var y = this.nvzhuTalkPrefab.data.height + this.nvzhuTalkPrefab.data.getChildByName("name").height + (this.nvzhuTalkPrefab.data.getChildByName("name").y - this.nvzhuTalkPrefab.data.height * 0.5 - this.nvzhuTalkPrefab.data.getChildByName("name").height * 0.5)
        this.nvzhuSize = cc.size(this.nvzhuTalkPrefab.data.width, y)
        y = this.nanzhuTalkPrefab.data.height + this.nanzhuTalkPrefab.data.getChildByName("name").height + (this.nanzhuTalkPrefab.data.getChildByName("name").y - this.nanzhuTalkPrefab.data.height * 0.5 - this.nanzhuTalkPrefab.data.getChildByName("name").height * 0.5)
        this.nanzhuSize = cc.size(this.nanzhuTalkPrefab.data.width, y)


    },
    // use this for initialization
    onLoad: function() {

        var self = this

        this.talkSummaryInfoPrefab = cc.loader.getRes("prefab/talkSummaryInfo", cc.Prefab)
        this.inputTablePrefab = cc.loader.getRes("prefab/inputTable", cc.Prefab)

        this.nvzhuTalkPrefab = cc.loader.getRes("prefab/nvTalkItem", cc.Prefab)

        this.nanzhuTalkPrefab = cc.loader.getRes("prefab/nanTalkItem", cc.Prefab)

        this.computerTalkZSize();





        this.inputTableBtn = cc.instantiate(this.inputTablePrefab)

        this.node.addChild(this.inputTableBtn, 88)

        this.inputTableBtn.x = 0;
        this.inputTableBtn.y = 0

        this.inputTableBtn.active = false

        this.showNormal()
        this.playerInfoBackBtn.on("click", (event) => {
            self.showPhoneView()
        })




        this.cancelBtn.on("click", (event) => {
            self.showNormal()
            self.isAction = false
            self.currentTime = 0
            self.totalTime = 0
            self.clearCurrentTalk()
        })

        this.phoneBtn.on("click", (event) => {
            self.showPhone()
            self.isAction = true;
            self.currentTime = 0
            self.totalTime = 3
            self.second = 0;
            self.minute = 0;
            self.timeIng = false
            self.talkImage.active = false
            self.linkImage.active = true
        })

        this.backBtn.on("click", (event) => {
            //back
            var parent = self.node.parent
            parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
        })
        this.showCompletePhone()
    },

    // called every frame, uncomment this function to activate update callback
    update: function(dt) {
        if (this.isAction) {
            this.currentTime += dt;
            if (this.currentTime >= this.totalTime) {
                this.talkImage.active = true
                this.linkImage.active = false
                this.timeIng = true;
                this.setInputMsg(this.NPCID)
                    //this.isAction = false;
                this.isAction = false
                this.currentTime = 0
                this.totalTime = 0
            }
        }
        if (this.timeIng) {
            this.second += dt
            if (this.second >= 60) {
                this.minute++;
            }
            this.talktime.string = (this.minute >= 10 ? this.minute + "" : "0" + this.minute) + ":" + (this.second >= 10 ? parseInt(this.second) + "" : "0" + parseInt(this.second))

        }

    },
});