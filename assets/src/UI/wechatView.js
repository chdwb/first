cc.Class({
    extends: cc.Component,

    properties: {
        talkScroll : {
            type:cc.ScrollView,
            default:null
        },
        backBtn : {
            type:cc.Node,
            default : null
        },
        sendBtn :{
            type:cc.Node,
            default : null
        },
        tipText :{
            type:cc.Node,
            default : null
        },

        nvzhuSize : 0,

        nanzhuSize : 0,

        nvzhuTalkPrefab : null,

        nanzhuTalkPrefab : null,

        inputTablePrefab : null,

        tianshuPrefab : null,

        inputTableBtn : null,

        currentPlayerWechatID : 0,

        currentTime :0,
        totalTime : 0,
        NPCID : 0,
        isAction : false,
    },

    sendDisable : function(){
        this.sendBtn.getComponent(cc.Button).interactable = false
        this.tipText.active = false
    },
    sendEnable : function(){
        this.sendBtn.getComponent(cc.Button).interactable = true
        this.tipText.active = true
    },

    getDay:function(d)
    {
        if(d == 0)
            return "今天"
        if(d == 1)
            return "昨天"
        if(d == 2)
            return "前天"
      
         return d+"天前"
    },
    computerTalkZSize : function()
    {
        var y = this.nvzhuTalkPrefab.data.height + this.nvzhuTalkPrefab.data.getChildByName("name").height + (this.nvzhuTalkPrefab.data.getChildByName("name").y - this.nvzhuTalkPrefab.data.height * 0.5 - this.nvzhuTalkPrefab.data.getChildByName("name").height * 0.5)
        this.nvzhuSize  = cc.size(this.nvzhuTalkPrefab.data.width, y)
        y = this.nanzhuTalkPrefab.data.height + this.nanzhuTalkPrefab.data.getChildByName("name").height + (this.nanzhuTalkPrefab.data.getChildByName("name").y - this.nanzhuTalkPrefab.data.height * 0.5 - this.nanzhuTalkPrefab.data.getChildByName("name").height * 0.5)
        this.nanzhuSize = cc.size(this.nanzhuTalkPrefab.data.width, y)
    },
    loadFormerInfo : function()
    {
        var startIndex = 1
        var index = 0
        if(cc.cs.PlayerInfo.wechat_player_ID.length == 0) return
        if(cc.cs.gameData.wechat["WECHAT_ID_1"]["WECHAT_OPTION"] != "dummy"){
           startIndex =  cc.cs.PlayerInfo.wechat_player_ID[index]

           index++
        }

        cc.log("startIndex="+startIndex)
        var id = startIndex
        cc.log("id="+id)
        var showDay = false

        this.loadCruuentTalk(this.talkScroll, true,  this.getDay(cc.cs.gameData.level["LEV_LEV_" + cc.cs.PlayerInfo.Level]["LEV_DAY"] -
        cc.cs.gameData.level["LEV_LEV_" + cc.cs.gameData.wechat["WECHAT_ID_"+ id]["WECHAT_LEVEL"]]["LEV_DAY"]),
        "", true)
        while(id <= cc.cs.PlayerInfo.Wechat_ID){
            if(showDay)
            {
                this.loadCruuentTalk(this.talkScroll, true,  this.getDay(cc.cs.gameData.level["LEV_LEV_" + cc.cs.PlayerInfo.Level]["LEV_DAY"] -
                cc.cs.gameData.level["LEV_LEV_" + cc.cs.gameData.wechat["WECHAT_ID_"+ id]["WECHAT_LEVEL"]]["LEV_DAY"]),
                "", true)
                showDay = false
            }

            this.setInputMsg(id)
            if(cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_NEXT"] == "dummy")
            {
        
                showDay = true
            }
            if(id >= cc.cs.PlayerInfo.Wechat_ID){
                 break;
            }
            if(cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_OPTION"] == "dummy" || cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_OPTION"] == -1){

                id = cc.cs.PlayerInfo.wechat_player_ID[index]
                index++
                if(index >= cc.cs.PlayerInfo.wechat_player_ID.length )
                    break;
                cc.log("id555"+id+"dd"+index)
            }else
            {
                cc.log("id666"+id)
                id = cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_NEXT"]
            }
        }

        cc.log("id"+id)
        if(cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_OPTION"] != "dummy"){
            this.setInputMsg(cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_NEXT"])
        }
    },

    sendWechat : function(id){
        this.currentPlayerWechatID = id
        cc.cs.gameMgr.sendWechat(cc.cs.PlayerInfo.ApiToken, id , this.SendWechatHandle, this)
    },

    SendWechatHandle:function(ret)
    {
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success == true) {
            //cc.cs.UIMgr.showTip("工作完成", 1.0)
            //cc.cs.UIMgr.showPopupO("hehe","工作完成了",()=>{
            this.NPCID = JasonObject.content.info.wechat_next
            cc.cs.PlayerInfo.wechat_player_ID.push(parseInt(this.currentPlayerWechatID))
            
            this.setInputMsg(this.currentPlayerWechatID)
            
            cc.cs.PlayerInfo.Wechat_ID = this.NPCID

            /*if(parseInt(JasonObject.content.level) >parseInt(cc.cs.PlayerInfo.Level) ){
                cc.cs.UIMgr.showTip("等级提升！！！！", 1.0)
            }*/
            cc.log("playvideo = "+JasonObject.content.info.playvideo)
            cc.cs.PlayerInfo.videoID = JasonObject.content.info.playvideo
             cc.log("videoID 5= "+cc.cs.PlayerInfo.videoID)
            cc.cs.PlayerInfo.Exp = parseInt(JasonObject.content.info.exp)
            cc.cs.PlayerInfo.Level = parseInt(JasonObject.content.info.level)

            if(this.canWeChat()){
                this.isAction = true;
                this.currentTime = 0
                this.totalTime = (cc.random0To1() + 0.4) * 8 
                if(this.totalTime > 8)   this.totalTime = 8
            }else
            {
                this.sendDisable()
                this.setInputMsg(this.NPCID)
            }
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
        //弹窗
    },

    showInputTable : function(id){
        var wechatOption = 0
        id = parseInt(id)
        if(cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_OPTION"] != "dummy"){
            wechatOption = cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_OPTION"]
        }else{
            wechatOption = cc.cs.gameData.wechat["WECHAT_ID_"+(id+1)]["WECHAT_OPTION"]
        }

        var self = this
        this.inputTableBtn.active = true
        var replayId = []
        var btn1 = this.inputTableBtn.getChildByName("btn1")
        var btn2 = this.inputTableBtn.getChildByName("btn2")
        var btn3 = this.inputTableBtn.getChildByName("btn3")
        btn1.targetOff(btn1)
        btn2.targetOff(btn2)
        btn3.targetOff(btn3)
        btn1.active =true;
        btn2.active =true;
        btn3.active =true;
        for(var i = 1; i <= cc.cs.gameData.wechat["TOTAL_COUNT"]; ++i){
            if(cc.cs.gameData.wechat["WECHAT_ID_"+i]["WECHAT_OPTION"] ==  wechatOption)
            {
                replayId.push(cc.cs.gameData.wechat["WECHAT_ID_"+i])
            }
            if(cc.cs.gameData.wechat["WECHAT_ID_" + i]["WECHAT_OPTION"] != "dummy" && cc.cs.gameData.wechat["WECHAT_ID_" + i]["WECHAT_OPTION"] > cc.cs.gameData.wechat["WECHAT_ID_" + id]["WECHAT_OPTION"])
                break;
        }

        if(replayId.length == 1){
            btn1.getChildByName("Label").getComponent(cc.Label).string = replayId[0]["WECHAT_CONTENT"]
            btn1.WECHAT_ID = replayId[0]["WECHAT_ID"]
            btn1.on("click",(event)=>{
                cc.log("WECHAT_ID = "+ event.target.WECHAT_ID)
                event.target.parent.active = false
                self.sendWechat(event.target.WECHAT_ID)
            },btn1)
            btn2.active = false;
            btn3.active = false;
        }else
        if(replayId.length == 2){
            btn1.getChildByName("Label").getComponent(cc.Label).string = replayId[0]["WECHAT_CONTENT"]
            btn2.getChildByName("Label").getComponent(cc.Label).string = replayId[1]["WECHAT_CONTENT"]
            btn1.WECHAT_ID = replayId[0]["WECHAT_ID"]
            btn2.WECHAT_ID = replayId[1]["WECHAT_ID"]
            btn1.on("click",(event)=>{
                cc.log("WECHAT_ID = "+ event.target.WECHAT_ID)
                event.target.parent.active = false
                self.sendWechat(event.target.WECHAT_ID)
            },btn1)
            btn2.on("click",(event)=>{
                cc.log("WECHAT_ID = "+ event.target.WECHAT_ID)
                event.target.parent.active = false
                self.sendWechat(event.target.WECHAT_ID)
            },btn2)
            
            btn3.active = false;
        }else
        {
            btn1.getChildByName("Label").getComponent(cc.Label).string = replayId[0]["WECHAT_CONTENT"]
            btn2.getChildByName("Label").getComponent(cc.Label).string = replayId[1]["WECHAT_CONTENT"]
            btn3.getChildByName("Label").getComponent(cc.Label).string = replayId[2]["WECHAT_CONTENT"]
            btn1.WECHAT_ID = replayId[0]["WECHAT_ID"]
            btn2.WECHAT_ID = replayId[1]["WECHAT_ID"]
            btn3.WECHAT_ID = replayId[2]["WECHAT_ID"]

            btn1.on("click",(event)=>{
                cc.log("WECHAT_ID = "+ event.target.WECHAT_ID)
                event.target.parent.active = false
                self.sendWechat(event.target.WECHAT_ID)
            },btn1)
            btn2.on("click",(event)=>{
                cc.log("WECHAT_ID = "+ event.target.WECHAT_ID)
                event.target.parent.active = false
                self.sendWechat(event.target.WECHAT_ID)
            },btn2)
            btn3.on("click",(event)=>{
                cc.log("WECHAT_ID = "+ event.target.WECHAT_ID)
                event.target.parent.active = false
                self.sendWechat(event.target.WECHAT_ID)
            },btn3)
        }
    },
    // use this for initialization
    onLoad: function () {
        var self= this
        this.inputTablePrefab = cc.loader.getRes("prefab/inputTable", cc.Prefab)

        this.nvzhuTalkPrefab = cc.loader.getRes("prefab/nvTalkItem", cc.Prefab)

        this.nanzhuTalkPrefab = cc.loader.getRes("prefab/nanTalkItem", cc.Prefab)

        this.tianshuPrefab = cc.loader.getRes("prefab/tianshu", cc.Prefab)
        
        this.computerTalkZSize()

        this.loadFormerInfo()

        this.inputTableBtn = cc.instantiate(this.inputTablePrefab)

        this.inputTableBtn.y = -120

        this.inputTableBtn.active = false;
        this.node.addChild(this.inputTableBtn)

        this.NPCID = cc.cs.PlayerInfo.Wechat_ID
        
        this.backBtn.on("click", (event)=>{
            var parent = self.node.parent
              parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
        })

        this.sendBtn.on("click",(event)=>{
            self.showInputTable(self.NPCID)

        })
    },

    setInputMsg:function(id){
        if(cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_OPTION"] == "dummy" || cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_OPTION"] == -1){
            this.loadCruuentTalk(this.talkScroll,false, cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_CONTENT"],  cc.cs.PlayerInfo.NPCName, false); 
            if(cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_NEXT"] != "dummy"){
                this.sendEnable()
            }
        }else{
            this.loadCruuentTalk(this.talkScroll,true, cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_CONTENT"],  cc.cs.PlayerInfo.PlayerNmae, false);
            this.sendDisable()
        }
    },

    canWeChat : function(){
       
        
        if(cc.cs.gameData.wechat["WECHAT_ID_" + cc.cs.PlayerInfo.Wechat_ID]["WECHAT_LEVEL"] <= parseInt(cc.cs.PlayerInfo.Level))
             
            if(cc.cs.gameData.wechat["WECHAT_ID_" + cc.cs.PlayerInfo.Wechat_ID]["WECHAT_NEXT"] ==  "dummy"&&
               cc.cs.gameData.wechat["WECHAT_ID_" +( cc.cs.PlayerInfo.Wechat_ID + 1)]["WECHAT_LEVEL"]  > parseInt(cc.cs.PlayerInfo.Level)) return false
                else return true
        return false
    },

    refresh : function(){
         cc.log(cc.cs.gameData.wechat["WECHAT_ID_" + cc.cs.PlayerInfo.Wechat_ID]["WECHAT_LEVEL"] + "    g       "+cc.cs.PlayerInfo.Wechat_ID+"       f     " + parseInt(cc.cs.PlayerInfo.Level) + "    j ")
        if(this.canWeChat()){
            this.sendEnable()
            return true
        }else{
            this.sendDisable()
            return false
        }
    },


    loadCruuentTalk : function(scroll, isPlayer, msg, name, isday)
    {   
        var height = 0;
        var children = scroll.content.getChildren();
   
        var newNode = null;
        var addHeight = 0
        if(isday){
            newNode  = cc.instantiate(this.tianshuPrefab)
            newNode.cyH = newNode.height
            addHeight = newNode.height
            newNode.getChildByName("dayText").getComponent(cc.Label).string = msg
        }else{
            if(isPlayer)
            {
                newNode  = cc.instantiate(this.nanzhuTalkPrefab)
                newNode.cyH = this.nanzhuSize.height
                addHeight = this.nanzhuSize.height
                newNode.getChildByName("name").getComponent(cc.Label).string = name +" ·"
            }else
            {
                newNode  = cc.instantiate(this.nvzhuTalkPrefab)
                addHeight = this.nvzhuSize.height
                newNode.cyH = this.nvzhuSize.height
                newNode.getChildByName("name").getComponent(cc.Label).string = "· " + name
            }

            newNode.getChildByName("talk").getComponent(cc.Label).string = msg
        }
        

        for(var i= 0 ;i <  children.length; ++i)
        {
            height += children[i].cyH
            children[i].y += addHeight;
        }
        height += addHeight;
        if(scroll.content.height < height)
            scroll.content.height = height; 
        scroll.content.addChild(newNode)
        newNode.y = newNode.height * 0.5
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.isAction) {
            this.currentTime += dt;
            if (this.currentTime >= this.totalTime) {
                this.sendEnable()
                this.setInputMsg(this.NPCID)
                //this.isAction = false;
                this.isAction = false
                this.currentTime = 0
                this.totalTime = 0
            } 
        }
    },
});
