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
    },

    sendDisable : function(){
        this.sendBtn.getComponent(cc.Button).interactable = false
        tipText.active = false
    },
    sendEnable : function(){
        this.sendBtn.getComponent(cc.Button).interactable = true
        tipText.active = true
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
        if(cc.cs.gameData.wechat["WECHAT_ID_1"]["WECHAT_OPTION"] != "dummy"){
           startIndex =  cc.cs.PlayerInfo.wechat_player_ID[index]
           index++
        }
        var id = startIndex

        var showDay = false

        

        this.loadCruuentTalk(this.talkScroll, true,  this.getDay(cc.cs.gameData.level["LEV_LEV_" + cc.cs.PlayerInfo.Level]["LEV_DAY"] -
        cc.cs.gameData.level["LEV_LEV_" + cc.cs.gameData.wechat["WECHAT_ID_"+ id]["WECHAT_LEVEL"]]["LEV_DAY"]),
        "", true)
        while(id < cc.cs.PlayerInfo.wWechat_ID){
            if(showDay)
            {
                this.loadCruuentTalk(this.talkScroll, true,  this.getDay(cc.cs.gameData.level["LEV_LEV_" + cc.cs.PlayerInfo.Level]["LEV_DAY"] -
                cc.cs.gameData.level["LEV_LEV_" + cc.cs.gameData.wechat["WECHAT_ID_"+ id]["WECHAT_LEVEL"]]["LEV_DAY"]),
                "", true)
            }

            this.setViewInputMsg(id)
            if(cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_NEXT"] == "dummy")
            {
        
                showDay = true
            }
            if(id < cc.cs.PlayerInfo.wWechat_ID)
                break;
            if(cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_OPTION"] == "dummy" || cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_OPTION"] == -1){
                id = cc.cs.PlayerInfo.wechat_player_ID[0]
                index++
            }else
            {
                id = cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_NEXT"]
            }
        }
    },

    sendWechat : function(id){

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
                self.tonghuakuang.active = true
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
                self.tonghuakuang.active = true
            },btn1)
            btn2.on("click",(event)=>{
                cc.log("WECHAT_ID = "+ event.target.WECHAT_ID)
                event.target.parent.active = false
                self.sendWechat(event.target.WECHAT_ID)
                self.tonghuakuang.active = true
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
                self.tonghuakuang.active = true
            },btn1)
            btn2.on("click",(event)=>{
                cc.log("WECHAT_ID = "+ event.target.WECHAT_ID)
                event.target.parent.active = false
                self.sendWechat(event.target.WECHAT_ID)
                self.tonghuakuang.active = true
            },btn2)
            btn3.on("click",(event)=>{
                cc.log("WECHAT_ID = "+ event.target.WECHAT_ID)
                event.target.parent.active = false
                self.sendWechat(event.target.WECHAT_ID)
                self.tonghuakuang.active = true
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

        this.sendBtn.on("click",(event)=>{


        })
    },

    setViewInputMsg:function(id){
        if(cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_OPTION"] == "dummy" || cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_OPTION"] == -1){
            this.loadCruuentTalk(this.infoviewScroll,false, cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_CONTENT"],  cc.cs.PlayerInfo.NPCName); 
        }else{
            this.loadCruuentTalk(this.infoviewScroll,true, cc.cs.gameData.wechat["WECHAT_ID_"+id]["WECHAT_CONTENT"],  cc.cs.PlayerInfo.PlayerNmae);
        }
    },

    canWeChat : function(){
        if(cc.cs.gameData.wechat["WECHAT_ID_" + cc.cs.PlayerInfo.Wechat_ID]["WECHAT_LEVEL"] <= cc.cs.PlayerInfo.Level)
            if(cc.cs.gameData.wechat["WECHAT_ID_" + cc.cs.PlayerInfo.Wechat_ID]["WECHAT_NEXT"] ==  "dummy") return false
                else return true
        return false
    },

    refresh : function(){
        if(this.canWeChat()){
            this.sendEnable()
        }else{
            this.sendDisable()
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
            addHeight = this.nanzhuSize.height
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
                newNode.cyH = this.nanzhuSize.height
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
            scroll.content.height = height + 100; 
        scroll.content.addChild(newNode)
        newNode.y = newNode.height * 0.5
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
