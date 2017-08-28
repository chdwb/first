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
            type: cc.Node,
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

        noText: {
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

        expText: {
            type: cc.Label,
            default: null
        },
        
        expNode: {
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
        callingauidoid:0,
        girlvoiceID:0,
        tempPhoneID:0,
        SoundOn:false,
        isShowPhoneView:false,
        currentExp:0,
    },


    phoneWait: function() {
        this.node.active = true;
        this.playerInfoView.active = false
        this.phoneBtn.active = false
        this.everInfoScroll.node.active = false
        this.currentScroll.active = true;
    },

    showNormal: function() {
        this.expNode.active = false
        this.node.active = true;
        this.playerInfoView.active = false
        this.phoneBtn.active = true
        this.everInfoScroll.node.active = true
        this.inputTableBtn.active = false
        this.tonghuakuang.active = false
        this.currentScroll.active = false;

        if(this.inputTableBtn != null)
            this.inputTableBtn.active = false

        if (cc.cs.PlayerInfo.canPhone()) {
            this.phoneBtn.active = true
        }else{
            this.phoneBtn.active = false
        }
        var phoneData = cc.cs.gameData.getphoneData(cc.cs.PlayerInfo.Phone_ID)
        if(cc.cs.PlayerInfo.Phone_ID < cc.cs.gameData.phone["LAST"]){
            var newxtPhoneData = cc.cs.gameData.getphoneData(cc.cs.PlayerInfo.Phone_ID + 1)
            if(newxtPhoneData["PHONE_LEV"] > phoneData["PHONE_LEV"]){
                this.NPCID = cc.cs.PlayerInfo.Phone_ID + 1
            }else
            {
                this.NPCID = cc.cs.PlayerInfo.Phone_ID
            }
        }
        
        cc.log("this.NPCID = cc.cs.PlayerInfo.Phone_ID    " + this.NPCID)
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
        cc.log("通话记录数量"+count.length)
        if(count.length  == 0) // 没有记录
        {

            this.noText.node.active = true

        }
        else
        {
             this.noText.node.active = false
        }
        for (var i = count.length -1; i >=0; --i) {
            newNode = cc.instantiate(this.talkSummaryInfoPrefab)
            cc.cs.UIMgr.addItem_verticalScrollView(this.everInfoScroll, newNode, 0)
            newNode.cyEnd = count[i]
            newNode.getChildByName("infoBtn").getChildByName("time").getComponent(cc.Label).string = this.getDay(
                parseInt(cc.cs.gameData.level["LEV_LEV_" + cc.cs.PlayerInfo.level]["LEV_DAY"]) -
                parseInt(cc.cs.gameData.level["LEV_LEV_" + cc.cs.gameData.phone["PHONE_ID_" + cc.cs.gameData.level_up["LEVEL_UP_LEV_" + count[i]]["PHONE_END_ID"]]["PHONE_LEV"]]["LEV_DAY"])
            )
            if(cc.cs.gameData.level_up["LEVEL_UP_LEV_" + count[i]]["LEVEL_UP_LEV"] == cc.cs.gameData.level_up["FIRST"] ){
                newNode.getChildByName("infoBtn").getChildByName("msg").getComponent(cc.Label).string = this.getLimitMsg(cc.cs.gameData.phone["PHONE_ID_" + cc.cs.gameData.phone["FIRST"]]["PHONE_MSG"], 16)
            }else{
                cc.log("cc.cs.gameData.level_up[LEVEL_UP_LEV_ + count[i-1]][PHONE_END_ID]+1     " + i)
                cc.log("cc.cs.gameData.level_up[LEVEL_UP_LEV_ + count[i-1]][PHONE_END_ID]+1     " + count[i-1])
                newNode.getChildByName("infoBtn").getChildByName("msg").getComponent(cc.Label).string = this.getLimitMsg(cc.cs.gameData.phone["PHONE_ID_" + (cc.cs.gameData.level_up["LEVEL_UP_LEV_" + count[i-1]]["PHONE_END_ID"]+1)]["PHONE_MSG"], 16)
            }
            
            newNode.getChildByName("infoBtn").getChildByName("dian").getChildByName("index").getComponent(cc.Label).string = "" + (count.length - i)
            newNode.on("click", (event) => {
                self.showPhoneInfoView();
                self.showInfoViewSV(event.target.cyEnd, count.length)
            }, newNode)
        }

    },

    setViewInputMsg: function(id) {
        cc.log("setViewInputMsg: function(id) {  " + id)
        if (cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_OPTION"] == "dummy" || cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_OPTION"] == -1) {
            this.loadInfoTalk(this.infoviewScroll, false, cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_MSG"], cc.cs.PlayerInfo.NPCName,id);
        } else {
            this.loadInfoTalk(this.infoviewScroll, true, cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_MSG"], cc.cs.PlayerInfo.PlayerNmae,id);
        }
    },

    showInfoViewSV: function(endID, count) {
        cc.log("showInfoViewSV   " + endID + "    " +count)
        this.infoviewScroll.content.removeAllChildren(true)
        var startIndex = 1


        if (endID > 2) {
            for (var i = endID - 1; i >= 2; --i) {
               if(cc.cs.gameData.level_up["LEVEL_UP_LEV_" + (i)]["PHONE_END_ID"] != "dummy"){
                    startIndex = cc.cs.gameData.level_up["LEVEL_UP_LEV_" + (i)]["PHONE_END_ID"] + 1
                    break
               }   
            }
        }

        cc.log("showInfoViewSV   " + startIndex + "    " +count)
        var id = startIndex

        cc.log("showInfoViewSV   " + startIndex + "    " +id)
        var iiIndex = 0
        cc.log("cc.cs.PlayerInfo.Phone_player_ID.length   " + cc.cs.PlayerInfo.Phone_player_ID.length)
        for (var i = 0; i < cc.cs.PlayerInfo.Phone_player_ID.length; ++i) {
            cc.log("cc.cs.PlayerInfo.Phone_player_ID[i]   " + i + "             "+cc.cs.PlayerInfo.Phone_player_ID[i])
        }

        for (var i = 0; i < cc.cs.PlayerInfo.Phone_player_ID.length; ++i) {
            if (cc.cs.PlayerInfo.Phone_player_ID[i] > id) {
                iiIndex = i
                break;
            }
        }


        while (id != -1) {
            cc.log("showInfoViewSV   " + startIndex + "    " +id + "         " + iiIndex)
            
            var phoneData = cc.cs.gameData.getphoneData(id)

            if (phoneData["PHONE_OPTION"] == "dummy") {
                this.setViewInputMsg(id)
                if(phoneData["PHONE_AUDIO"] != "dummy"){
                    id +=1
                }else{
                    id = -1
                }
                
    
            }else{
                id = cc.cs.PlayerInfo.Phone_player_ID[iiIndex]
                this.setViewInputMsg(id)
                iiIndex++
                id = phoneData["PHONE_AUDIO"]
                if(id == "dummy")
                    id = -1
            }
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
        this.expNode.active = true
        this.node.active = true;
        this.playerInfoView.active = false
        this.cancelBtn.active = true
        this.phoneBtn.active = false
        this.everInfoScroll.node.active = false
        this.tonghuakuang.active = true
        this.currentScroll.active = true;

        var count = 0
        var startIndex = 0

    },

    showPhoneInfoView: function() {
        this.isShowPhoneView = true;
        this.node.active = false;
        this.playerInfoView.active = true

    },

    showPhoneView: function() {
        this.isShowPhoneView = false;
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

    VoiceDone: function(ret)
    {
             cc.log("aaaabbbb"+ret)
          this.showInputTable( this.tempPhoneID)
          this.tonghuakuang.active = false

           this.currentTime = 0
                this.isAction = false;
                this.totalTime = 0
                this.timeIng = false;   
                //this.backBtn.active = true

    }
    ,

      VoiceDone2: function(ret)
    {

        if (cc.cs.gameData.phone["PHONE_ID_" + this.tempPhoneID]["PHONE_AUDIO"] != "dummy")   // 女主不是最后一句
        
         {

                this.showInputTable( this.tempPhoneID)
                this.tonghuakuang.active = false
                this.showCompletePhone()

                this.currentTime = 0
                this.isAction = false;
                this.totalTime = 0
                this.timeIng = false;   
         }



                else  //女主最后一句
                {

                    this.currentTime = 0
                this.isAction = false;
                this.totalTime = 0
                  
                    
                    this.timeIng = false
                    this.backBtn.active = true
                    this.showNormal()

                }
                //this.backBtn.active = true

    }
    ,

    setInputMsg: function(id) {

        this.tempPhoneID = id

        cc.log("setInputMsg  " + id)
        if (cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_OPTION"] == "dummy" || cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_OPTION"] == -1) { // 女主
            this.loadCruuentTalk(this.currentScroll, false, cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_MSG"], cc.cs.PlayerInfo.NPCName);
           //if (cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_AUDIO"] != "dummy")
             {
               // this.showInputTable(id)
               // this.tonghuakuang.active = false
               // this.showCompletePhone()

                this.currentTime = 0
                this.isAction = true;
                this.totalTime = 20
                this.timeIng = true;
                this.backBtn.active = false
               this.girlvoiceID =  cc.cs.AudioMgr.playVoice(cc.cs.gameData.phone["PHONE_ID_" + id]["SOUND_ID"],this.VoiceDone2.bind(this))
               cc.log("播放声音ID = "+this.girlvoiceID)
               this.cancelBtn.active = true

            }
        } else {
            if(id > cc.cs.gameData.phone["FIRST"]){
                if(cc.cs.gameData.phone["PHONE_ID_" + (id-1)]["PHONE_AUDIO"] == "dummy" ){
                    this.showInputTable(id)
                    this.tonghuakuang.active = false  
                

               /* this.currentTime = 0
                this.isAction = true;
                this.totalTime = 20
                this.timeIng = true;
                this.backBtn.active = false   
               this.girlvoiceID =  cc.cs.AudioMgr.playVoice(cc.cs.gameData.phone["PHONE_ID_" + id]["SOUND_ID"],this.VoiceDone.bind(this))
               this.cancelBtn.active = true*/

                }else{
                    this.loadCruuentTalk(this.currentScroll, true, cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_MSG"], cc.cs.PlayerInfo.PlayerNmae);
                }
            }else{
                this.loadCruuentTalk(this.currentScroll, true, cc.cs.gameData.phone["PHONE_ID_" + id]["PHONE_MSG"], cc.cs.PlayerInfo.PlayerNmae);
            }
        }
    },

    showInputTable: function(id) {
        var self = this
        cc.log("1   " + id)
        var phoneData = cc.cs.gameData.getphoneData(id)
        //if (phoneData["PHONE_OPTION"] == "dummy" && phoneData["PHONE_AUDIO"] != "dummy") {
            this.inputTableBtn.active = true
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
            for (var i = cc.cs.gameData.phone["FIRST"]; i <= cc.cs.gameData.phone["TOTAL_COUNT"]; ++i) {
                cc.log("2   " + i)
                var itemData = cc.cs.gameData.getphoneData(i)
                if(itemData == null) 
                    continue
                if(phoneData["PHONE_AUDIO"] != "dummy" && phoneData["PHONE_OPTION"] != "dummy"){
                    if (itemData["PHONE_OPTION"] == phoneData["PHONE_OPTION"]) {
                        replayId.push(itemData)
                    }
                    if (itemData["PHONE_OPTION"] != "dummy" && itemData["PHONE_OPTION"] > phoneData["PHONE_OPTION"])
                        break;
                }else{
                    if (itemData["PHONE_OPTION"] == phoneData["PHONE_AUDIO"]) {
                        replayId.push(itemData)
                    }
                    if (itemData["PHONE_OPTION"] != "dummy" && itemData["PHONE_OPTION"] > phoneData["PHONE_AUDIO"])
                        break;
                }
            }

            if (replayId.length == 1) {
                text1.string = replayId[0]["PHONE_MSG"]
                text1.node.y = -6
                btn1.height = text1.node.height + 12
                btn1.y = 0
                zs1.active = false
                btn1.PHONE_ID = replayId[0]["PHONE_ID"]
                btn1.on("click", (event) => {
                    cc.log("PHONE_ID = " + event.target.PHONE_ID)
                    event.target.parent.active = false
                    self.SendPhone(event.target.PHONE_ID)
                    self.tonghuakuang.active = true
                }, btn1)
                btn2.active = false;
                btn3.active = false;
                this.inputTableBtn.height = btn1.height
            } else
            if (replayId.length == 2) {
                text1.string = replayId[0]["PHONE_MSG"]
                text2.string = replayId[1]["PHONE_MSG"]
                text1.node.y = -6
                text2.node.y = -6
                btn1.height = text1.node.height + 12
                btn2.height = text2.node.height + 12
                btn1.y = 0
                btn2.y = -btn1.height
                zs1.active = true
                zs1.y = - btn1.height
                zs2.active = false
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
                this.inputTableBtn.height = btn1.height + btn2.height
            } else {
                text1.string = replayId[0]["PHONE_MSG"]
                text2.string = replayId[1]["PHONE_MSG"]
                text3.string = replayId[2]["PHONE_MSG"]
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
                zs1.y = - btn1.height
                zs2.active = true
                zs2.y = - btn2.height
                zs3.active = false
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
                this.inputTableBtn.height = btn1.height + btn2.height + btn3.height
            }
       // } else {
       //     return
        //}
    },



    addSummaryItem: function() {


    },

    onbackBtn: function() {
        cc.cs.UIMgr.closeView()
    },

    SendPhone: function(phoneid) {
        this.currentPlayerPhoneID = phoneid;
        this.setInputMsg(phoneid)
        cc.cs.gameMgr.sendPhone(phoneid, this.SendPhoneHandle, this)
        var phoneData = cc.cs.gameData.getphoneData(phoneid)
        var exp = phoneData["PHONE_EXP"]
        this.currentExp = exp
        /*if (parseInt(exp) < 0)
            {
                cc.cs.UIMgr.showTip("恋爱值减少"+exp,1.0)
            }
            else
            {
                cc.cs.UIMgr.showTip("恋爱值增加"+exp,1.0)
            }*/
    },


    SendPhoneHandle: function(ret) {
        var JasonObject = JSON.parse(ret);
		cc.cs.UIMgr.closeNetView()
        if (JasonObject.success === true) {
            //cc.cs.UIMgr.closeNetView()
            //cc.cs.UIMgr.showTip("工作完成", 1.0)
            //cc.cs.UIMgr.showPopupO("hehe","工作完成了",()=>{
            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)
            cc.cs.PlayerInfo.addPhonePlayerID(this.currentPlayerPhoneID)
            this.NPCID = JasonObject.content.info.phone_audio

            var heartTarget = this.node.getChildByName("expBG")

            cc.cs.UIMgr.showExpTip(this.currentExp, heartTarget, this)
            
            

            if (cc.cs.PlayerInfo.canPhone2()) {
                this.currentTime = 0
                this.isAction = true;
                this.totalTime = (cc.random0To1() + 0.4) * 2
                if (this.totalTime > 2) this.totalTime = 2
                this.timeIng = true;   
            } else {
                this.setInputMsg(this.NPCID)
                this.timeIng = false
                this.showNormal()
            }



        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
        //弹窗
    },

    loadCruuentTalk: function(scroll, isPlayer, msg, name) {
        var height = 0;
        var nanNode = scroll.getChildByName("nan")
        var nvNode = scroll.getChildByName("nv")
        var addHeight = 0
        if (isPlayer) {
            cc.cs.UIMgr.setNanTalk(nanNode, msg,  name + " ·")
            nvNode.active = false
            nanNode.y = 150 - scroll.height * 0.5
            nanNode.active = true;
        } else {
            nanNode.active = false
            cc.cs.UIMgr.setNvTalk(nvNode, msg,  "· " + name, false)
            nvNode.y = 150 - scroll.height * 0.5
            nvNode.active = true;
        }
    },


    loadInfoTalk: function(scroll, isPlayer, msg, name,id) {
        var height = 0;
        var children = scroll.content.getChildren();
        var newNode = null;
        var addHeight = 0
        if (isPlayer) {
            newNode = cc.instantiate(this.nanzhuTalkPrefab)
            cc.cs.UIMgr.setNanTalk(newNode, msg,  name + " ·")
            newNode.cyH = cc.cs.UIMgr.getTalkHeight(newNode)
            addHeight = newNode.cyH
        } else {
            newNode = cc.instantiate(this.nvzhuTalkPrefab)
            var soundid = cc.cs.gameData.phone["PHONE_ID_" + id]["SOUND_ID"]
            newNode.setTag(parseInt(soundid))
            cc.cs.UIMgr.setNvTalk(newNode, msg,  "· " + name, true)
            
            //cc.log("id = "+id+"    msg = "+msg)
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
    onEnable : function(){
        var self = this
        this.showNormal()
        this.schedule(this.step,1.0)
        if(this.SoundOn)
        cc.cs.AudioMgr.stopBGM()
        this.refresh()
       
    },

    onDisable : function(){
        this.unschedule(this.step)
        if(this.SoundOn && this.isShowPhoneView == false)
        cc.cs.AudioMgr.startBGM()
    },

    step : function(){
        if (this.isAction) {
            this.currentTime++;
            if (this.currentTime >= this.totalTime) {
                this.talkImage.active = true
                this.linkImage.active = false
                this.backBtn.active = true
                this.cancelBtn.active = true
                this.currentScroll.active = true
                this.timeIng = false;
                this.setInputMsg(this.NPCID)
                    //this.isAction = false;
                cc.cs.AudioMgr.StopAudio(this.callingauidoid)
                this.isAction = false
                this.currentTime = 0
                this.totalTime = 0
            }
        }
        if (this.timeIng) {
            this.second ++
            if (this.second >= 60) {
                this.minute++;
                this.second = 0
            }
            this.talktime.string = (this.minute >= 10 ? this.minute + "" : "0" + this.minute) + ":" + (this.second >= 10 ? parseInt(this.second) + "" : "0" + parseInt(this.second))

        }
    },
    // use this for initialization
    onLoad: function() {

        var self = this

        this.talkSummaryInfoPrefab = cc.loader.getRes("prefab/talkSummaryInfo", cc.Prefab)
        this.inputTablePrefab = cc.loader.getRes("prefab/inputTable", cc.Prefab)

        this.nvzhuTalkPrefab = cc.loader.getRes("prefab/nvTalkItem", cc.Prefab)

        this.nanzhuTalkPrefab = cc.loader.getRes("prefab/nanTalkItem", cc.Prefab)

        var nv = cc.instantiate(this.nvzhuTalkPrefab)
        nv.active = false
        nv.name = "nv"
        this.currentScroll.addChild(nv)

        var nan = cc.instantiate(this.nanzhuTalkPrefab)
        nan.active = false
        nan.name = "nan"
        this.currentScroll.addChild(nan)

        this.inputTableBtn = cc.instantiate(this.inputTablePrefab)

        this.node.addChild(this.inputTableBtn, 88)

        this.inputTableBtn.x = 0;
        this.inputTableBtn.y = 0

        this.inputTableBtn.active = false

        this.playerInfoBackBtn.on("click", (event) => {
            cc.cs.AudioMgr.StopVoice()
            self.showPhoneView()
        })




        this.cancelBtn.on("click", (event) => {
            self.showNormal()
            self.isAction = false
            self.currentTime = 0
            self.totalTime = 0
            cc.cs.AudioMgr.StopVoice()
            self.backBtn.active = true
        })

        this.phoneBtn.on("click", (event) => {
            self.showPhone()
            self.isAction = true;
            self.currentTime = 0
            self.totalTime = 5.34
           this.callingauidoid = cc.cs.AudioMgr.playAudio("calling",true)
            self.second = 0;
            self.minute = 0;
            self.timeIng = false
            self.talkImage.active = false
            self.linkImage.active = true
            self.currentScroll.active = false

            self.backBtn.active = false
            self.cancelBtn.active = false
        })

        cc.log("phoneview guide id = "+ cc.cs.PlayerInfo.guide_id ) 
        if(parseInt(cc.cs.PlayerInfo.guide_id) == 6) // 弹出电话按钮引导
                {
                    cc.log("电话界面 拨号按钮")
                    cc.cs.UIMgr.showGuide(parseInt(cc.cs.PlayerInfo.guide_id)+1,this.phoneBtn,this)
                }

        this.backBtn.on("click", (event) => {
            //back
            //var parent = self.node.parent
            //parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
            cc.cs.AudioMgr.StopVoice()
			cc.cs.UIMgr.closeView()
        })
        this.showCompletePhone()

        
        var hehe = cc.sys.localStorage.getItem('ISSOUNDOFF')
        if(hehe == 1)
        {
            this.SoundOn = false
        }
        else
        {
            this.SoundOn = true
        }
    },

    setExp: function(currentExp, levlExp) {
        this.expText.string = currentExp + "/" + levlExp;
		 var heartTarget = this.node.getChildByName("expBG").getChildByName("qinmitaoxindi")
        cc.cs.UIMgr.setHeart(heartTarget, currentExp,levlExp)
    },

    refresh:function()
    {

        var leveldata2 = cc.cs.gameData.level["LEV_LEV_" + (parseInt(cc.cs.PlayerInfo.level))]
        this.setExp(cc.cs.PlayerInfo.exp, leveldata2["LEV_EXP"])

    },

    // called every frame, uncomment this function to activate update callback
    update: function(dt) {
        

    },
});