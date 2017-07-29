cc.Class({
    extends: cc.Component,

    properties: {
        everInfoScroll : {
            type:cc.ScrollView,
            default:null
        },
        backBtn : {
            type:cc.Node,
            default : null
        },

        phoneBtn:{
            type:cc.Node,
            default : null
        },

        inputBtn : {
            type:cc.Node,
            default :null
        },

        cancelBtn : {
            type:cc.Node,
            default :null
        },

        npcName : {
            type:cc.Label,
            default : null
        },

        msgText : {
            type:cc.Label,
            default : null
        },

        infoText : {
            type:cc.Label,
            default : null
        },

        playerName : {
            type:cc.Label,
            default : null
        },

        playerInfoView : {
            type:cc.Node,
            default : null
        },

        playerInfoBackBtn : {
            type:cc.Node,
            default : null
        },

        everyInfoScroll : {
            type:cc.ScrollView,
            default:null
        },

        talkSummaryInfoPrefab : null,

        inputTablePrefab : null,

        totalTime: 0,

        currentTime: 0,

        isAction: false,

        inputTableBtn : null,  

        NPCID : 1,
        
    },


    phoneWait:function(){
        this.node.active =true;
        this.playerInfoView.active =false
        this.cancelBtn.active = false
        this.infoText.node.active = true
        this.inputBtn.active = false
        this.phoneBtn.active = false
        this.everInfoScroll.node.active = false
        this.infoText.string = "正在呼叫中。。。"

    },

    showNormal:function(){
        this.node.active =true;
        this.playerInfoView.active =false
        this.cancelBtn.active = false
        this.infoText.node.active = false
        this.inputBtn.active = false
        this.phoneBtn.active = true
        this.everInfoScroll.node.active = true
    },

    showPhone:function(){
        this.node.active  =true;
        this.playerInfoView.active =false
        this.cancelBtn.active = true
        this.infoText.node.active = true
        this.inputBtn.active = true
        this.phoneBtn.active = false
        this.everInfoScroll.node.active = false

        this.infoText.string = "通话中。。。"
    },

    showPhoneInfoView:function(){
        this.node.active =false;
        this.playerInfoView.active =true
    },
    
    showPhoneView:function(){
        this.node.active =true;
        this.playerInfoView.active =true
    },

    hideInputMsg : function(){
        this.npcName.node.active = false
        this.playerName.node.active = false
        this.msgText.node.active = false
    },

    setInputMsg:function(id){
        if(cc.cs.gameData.phone["PHONE_ID_"+id]["PHONE_OPTION"] == "dummy" || cc.cs.gameData.phone["PHONE_ID_"+id]["PHONE_OPTION"] == -1){
            this.npcName.node.active = true
            this.playerName.node.active = false
            this.npcName.string = cc.cs.PlayerInfo.NPCName
        }else{
            this.npcName.node.active = false
            this.playerName.node.active = true
            this.playerName.string = cc.cs.PlayerInfo.PlayerNmae
        }
        this.msgText.string =cc.cs.gameData.phone["PHONE_ID_"+id]["PHONE_MSG"] 
    },

    showInputTable : function(id){
        var self = this
        if(cc.cs.gameData.phone["PHONE_ID_"+id]["PHONE_OPTION"] == "dummy" || cc.cs.gameData.phone["PHONE_ID_"+id]["PHONE_OPTION"] == -1){
            this.inputTableBtn.active = true
            var replayId = []
            var btn1 = this.inputTableBtn.getChildByName("btn1")
            var btn2 = this.inputTableBtn.getChildByName("btn2")
            var btn3 = this.inputTableBtn.getChildByName("btn3")
            btn1.active =true;
            btn2.active =true;
            btn3.active =true;
            for(var i = 1; i <= cc.cs.gameData.phone["TOTAL_COUNT"]; ++i){
                if(cc.cs.gameData.phone["PHONE_ID_"+i]["PHONE_OPTION"] ==  cc.cs.gameData.phone["PHONE_ID_"+id]["PHONE_AUDIO"])
                {
                    replayId.push(cc.cs.gameData.phone["PHONE_ID_"+i])
                }
            }

            if(replayId.length == 1){
                btn1.getChildByName("Label").getComponent(cc.Label).string = replayId[0]["PHONE_MSG"]
                btn1.PHONE_ID = replayId[0]["PHONE_ID"]
                btn1.on("click",(event)=>{
                    cc.log("PHONE_ID = "+ event.target.PHONE_ID)
                    event.target.parent.active = false
                },btn1)
                btn2.active = false;
                btn3.active = false;
            }else
            if(replayId.length == 2){
                btn1.getChildByName("Label").getComponent(cc.Label).string = replayId[0]["PHONE_MSG"]
                btn2.getChildByName("Label").getComponent(cc.Label).string = replayId[1]["PHONE_MSG"]
                btn1.PHONE_ID = replayId[0]["PHONE_ID"]
                btn2.PHONE_ID = replayId[1]["PHONE_ID"]
                btn1.on("click",(event)=>{
                    cc.log("PHONE_ID = "+ event.target.PHONE_ID)
                    event.target.parent.active = false
                },btn1)
                btn2.on("click",(event)=>{
                    cc.log("PHONE_ID = "+ event.target.PHONE_ID)
                    event.target.parent.active = false
                },btn2)
                
                btn3.active = false;
            }else
            {
                btn1.getChildByName("Label").getComponent(cc.Label).string = replayId[0]["PHONE_MSG"]
                btn2.getChildByName("Label").getComponent(cc.Label).string = replayId[1]["PHONE_MSG"]
                btn3.getChildByName("Label").getComponent(cc.Label).string = replayId[2]["PHONE_MSG"]
                btn1.PHONE_ID = replayId[0]["PHONE_ID"]
                btn2.PHONE_ID = replayId[1]["PHONE_ID"]
                btn3.PHONE_ID = replayId[2]["PHONE_ID"]

                btn1.on("click",(event)=>{
                    cc.log("PHONE_ID = "+ event.target.PHONE_ID)
                    event.target.parent.active = false
                },btn1)
                btn2.on("click",(event)=>{
                    cc.log("PHONE_ID = "+ event.target.PHONE_ID)
                    event.target.parent.active = false
                },btn2)
                btn3.on("click",(event)=>{
                    cc.log("PHONE_ID = "+ event.target.PHONE_ID)
                    event.target.parent.active = false
                },btn3)
            }



        }else
        {
            return
        }
    },



    addSummaryItem:function(){


    },

    onbackBtn:function()
    {
        var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)


    },

    // use this for initialization
    onLoad: function () {
        
        var self = this

        this.talkSummaryInfoPrefab = cc.loader.getRes("prefab/talkSummaryInfo", cc.Prefab)
        this.inputTablePrefab = cc.loader.getRes("prefab/inputTable", cc.Prefab)

        this.inputTableBtn =  cc.instantiate(this.inputTablePrefab)

        this.node.addChild(this.inputTableBtn, 88)

        this.inputTableBtn.x = 0;
        this.inputTableBtn.y = 0

        this.inputTableBtn.active = false

        this.showNormal()
        this.playerInfoBackBtn.on("click", (event)=>{
            self.showPhoneView()
        })

        this.phoneBtn.on("click", (event)=>{

            self.phoneWait()
            self.isAction = true;
            self.currentTime = 0
            self.totalTime = 5
            
        })

        this.backBtn.on("click", (event)=>{
            //back
            var parent = self.node.parent
            parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
        })

        this.inputBtn.on("click", (event)=>{
            self.showInputTable(self.NPCID)
            
        })


    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
          if (this.isAction) {
            this.currentTime += dt;
            if (this.currentTime >= this.totalTime) {
               
                this.showPhone()
                this.setInputMsg(this.NPCID)
                this.isAction = false;
                this.currentTime = 0
                this.totalTime = 0
            } else {
                
            }
        }


     },
});
