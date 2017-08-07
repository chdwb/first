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

        inputDialog : null,
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
        if(cc.cs.gameDate.wechat["WECHAT_ID_1"]["WECHAT_OPTION"] != "dummy"){
           startIndex =  cc.cs.PlayerInfo.wechat_player_ID[index]
           index++
        }
        var id = startIndex

        var showDay = false

        

        this.loadCruuentTalk(this.talkScroll, true,  this.getDay(cc.cs.gameDate.level["LEV_LEV_" + cc.cs.PlayerInfo.Level]["LEV_DAY"] -
        cc.cs.gameDate.level["LEV_LEV_" + cc.cs.gameDate.wechat["WECHAT_ID_"+ id]["WECHAT_LEVEL"]]["LEV_DAY"]),
        "", true)
        while(id < cc.cs.PlayerInfo.wWechat_ID){
            if(showDay)
            {
                this.loadCruuentTalk(this.talkScroll, true,  this.getDay(cc.cs.gameDate.level["LEV_LEV_" + cc.cs.PlayerInfo.Level]["LEV_DAY"] -
                cc.cs.gameDate.level["LEV_LEV_" + cc.cs.gameDate.wechat["WECHAT_ID_"+ id]["WECHAT_LEVEL"]]["LEV_DAY"]),
                "", true)
            }

            this.setViewInputMsg(id)
            if(cc.cs.gameData.phone["WECHAT_ID_"+id]["WECHAT_NEXT"] == "dummy")
            {
        
                showDay = true
            }
            if(id < cc.cs.PlayerInfo.wWechat_ID)
                break;
            if(cc.cs.gameData.phone["WECHAT_ID_"+id]["WECHAT_OPTION"] == "dummy" || cc.cs.gameData.phone["WECHAT_ID_"+id]["WECHAT_OPTION"] == -1){
                id = cc.cs.PlayerInfo.wechat_player_ID[0]
                index++
            }else
            {
                id = cc.cs.gameData.phone["WECHAT_ID_"+id]["WECHAT_NEXT"]
            }
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

        this.inputDialog = cc.instantiate(this.inputTablePrefab)

        this.inputDialog.y = -120

        this.sendBtn.on("click",(event)=>{
            

        })
    },

    setViewInputMsg:function(id){
        if(cc.cs.gameData.phone["WECHAT_ID_"+id]["WECHAT_OPTION"] == "dummy" || cc.cs.gameData.phone["WECHAT_ID_"+id]["WECHAT_OPTION"] == -1){
            this.loadCruuentTalk(this.infoviewScroll,false, cc.cs.gameData.phone["WECHAT_ID_"+id]["WECHAT_CONTENT"],  cc.cs.PlayerInfo.NPCName); 
        }else{
            this.loadCruuentTalk(this.infoviewScroll,true, cc.cs.gameData.phone["WECHAT_ID_"+id]["WECHAT_CONTENT"],  cc.cs.PlayerInfo.PlayerNmae);
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
