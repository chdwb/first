cc.Class({
    extends: cc.Component,

    properties: {
        scrollView : {
            type:cc.ScrollView,
            default:null
        },
        backBtn : {
            type:cc.Node,
            default:null
        },
        infoText : {
            type:cc.Label,
            default :null
        },
        nameText : {
            type:cc.Label,
            default:null
        },
        ZoneIDList:[],

        ZoneItemPrefab : null,

        inputTablePrefab : null,

        inputTableBtn : null,  

        currentPLID:0,
        currentItem : null
    },

    SendDJ:function(phoneid)
    {
        cc.log("SendPhone = "+phoneid  + "         " + cc.cs.PlayerInfo.ApiToken  )

        cc.cs.gameMgr.sendReply(cc.cs.PlayerInfo.ApiToken, phoneid, this.sendReplyHandle, this)

        this.currentPLID = phoneid
    },

    sendReplyHandle:function(ret)
     {

        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            //cc.cs.UIMgr.showTip("工作完成", 1.0)
            this.currentItem.addPlayerText(parseInt(this.currentPLID))
            cc.cs.PlayerInfo.replies.push(this.currentPLID)
            
            if(parseInt(JasonObject.content.info.level) >parseInt(cc.cs.PlayerInfo.Level) ){
                cc.cs.UIMgr.showTip("等级提升！！！！", 1.0)
            }else{
                cc.cs.UIMgr.showTip("评论完成", 1.0)
            }
            cc.cs.PlayerInfo.Exp = parseInt(JasonObject.content.info.exp)
            cc.cs.PlayerInfo.Level = parseInt(JasonObject.content.info.level)
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
        //弹窗

     },

    showInputTable : function(id, n){
        var self = this
        this.currentItem = n
        this.inputTableBtn.active = true
        var replayId = []
        for(var i = 1; i <= cc.cs.gameData.reply["TOTAL_COUNT"]; ++i){
            cc.log(cc.cs.gameData.reply["ID_"+i]["REPLY_GROUP_ID"])
            cc.log(id)
            cc.log(cc.cs.gameData.reply["ID_"+i]["REPLY_GROUP_ID"] == id)
            if(cc.cs.gameData.reply["ID_"+i]["REPLY_GROUP_ID"] == id)
            {
                replayId.push(cc.cs.gameData.reply["ID_"+i])
            }
        }
        var btn1 = this.inputTableBtn.getChildByName("btn1")
        var btn2 = this.inputTableBtn.getChildByName("btn2")
        var btn3 = this.inputTableBtn.getChildByName("btn3")
        btn1.targetOff(btn1)
        btn2.targetOff(btn2)
        btn3.targetOff(btn3)
        btn1.active =true;
        btn2.active =true;
        btn3.active =true;

        if(replayId.length == 1){
            btn1.getChildByName("Label").getComponent(cc.Label).string = replayId[0]["REPLY_TEXT"]
            btn1.REPLY_ID = replayId[0]["ID"]
            btn1.on("click",(event)=>{
                event.target.parent.active = false
                self.SendDJ(event.target.REPLY_ID)
            },btn1)
            btn2.active = false;
            btn3.active = false;
        }else
        if(replayId.length == 2){
            btn1.getChildByName("Label").getComponent(cc.Label).string = replayId[0]["REPLY_TEXT"]
            btn2.getChildByName("Label").getComponent(cc.Label).string = replayId[1]["REPLY_TEXT"]
            btn1.REPLY_ID = replayId[0]["ID"]
            btn2.REPLY_ID = replayId[1]["ID"]
            btn1.on("click",(event)=>{
                event.target.parent.active = false
                self.SendDJ(event.target.REPLY_ID)
            },btn1)
            btn2.on("click",(event)=>{
                event.target.parent.active = false
                self.SendDJ(event.target.REPLY_ID)
            },btn2)
            
            btn3.active = false;
        }else
        {
            btn1.getChildByName("Label").getComponent(cc.Label).string = replayId[0]["REPLY_TEXT"]
            btn2.getChildByName("Label").getComponent(cc.Label).string = replayId[1]["REPLY_TEXT"]
            btn3.getChildByName("Label").getComponent(cc.Label).string = replayId[2]["REPLY_TEXT"]
            btn1.REPLY_ID = replayId[0]["ID"]
            btn2.REPLY_ID = replayId[1]["ID"]
            btn3.REPLY_ID = replayId[2]["ID"]

            btn1.on("click",(event)=>{
               self.SendDJ(event.target.REPLY_ID)
                event.target.parent.active = false


            },btn1)
            btn2.on("click",(event)=>{
              self.SendDJ(event.target.REPLY_ID)
                event.target.parent.active = false

            },btn2)
            btn3.on("click",(event)=>{
               self.SendDJ(event.target.REPLY_ID)
                event.target.parent.active = false

            },btn3)
        }
    },

    addZoneId : function(id){
        for(var i = 0 ; i < this.ZoneIDList.length; i++)
        {
            if(this.ZoneIDList[i].zoneID == id)return
        }

        if(cc.cs.gameData.zone["ID_"+id] == null || cc.cs.gameData.zone["ID_"+id] == undefined)return
        
        var zoneItem =  cc.instantiate(this.ZoneItemPrefab)
        zoneItem.id = id
        this.ZoneIDList.push(zoneItem)

        var jsZoneItem = zoneItem.getComponent("zoneItem")
        jsZoneItem.setZoneID(id)
        for(var i = 1; i <= cc.cs.gameData.zone["TOTAL_COUNT"]; ++i){
            if(cc.cs.gameData.zone["ID_"+id]["ZONE_LEVEL"] == cc.cs.gameData.zonefeefback["ID_"+i]["ZONE_FB_LEVEL"]){
                jsZoneItem.addText(i)
            }    
        }
        jsZoneItem.setMsg(cc.cs.gameData.zone["ID_"+id]["ZONE_TITLE"])

        if(!cc.cs.PlayerInfo.canPLZone(id))
        {
            jsZoneItem.addPlayerText(cc.cs.PlayerInfo.getZoneReplyID(id))
        }

        cc.cs.UIMgr.addItem_verticalScrollView(this.scrollView, zoneItem, 0)
    },

    // use this for initialization
    onLoad: function () {
        var self = this
        this.inputTablePrefab = cc.loader.getRes("prefab/inputTable", cc.Prefab)
        this.ZoneItemPrefab = cc.loader.getRes("prefab/zoneItem", cc.Prefab)
        
        this.inputTableBtn =  cc.instantiate(this.inputTablePrefab)

        this.node.addChild(this.inputTableBtn, 88)

        this.inputTableBtn.x = 0;
        this.inputTableBtn.y = 0

        this.inputTableBtn.active = false

        this.nameText.string = cc.cs.PlayerInfo.NPCName

        var currentID = parseInt(cc.cs.PlayerInfo.Level) - 2
        if(currentID >= 1){
            for(var i = currentID; i >= 1; --i ){
                this.addZoneId(i)
            }
            this.infoText.node.active = true
            this.infoText.string = "关注"+cc.cs.gameData.zone["ID_"+ currentID]["ZONE_FOLLOW_NUM"]+"|"+"粉丝"+cc.cs.gameData.zone["ID_"+ currentID]["ZONE_FANS_COUNT"]
        }else{
            this.infoText.node.active = false
        }
        

        this.backBtn.on("click", (event)=>{
            var parent = self.node.parent
            parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)

        },this.backBtn)
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
