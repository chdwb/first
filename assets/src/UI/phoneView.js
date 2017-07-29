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
            cc.log(self.node + "     " + self.node.parent)
            var parent = self.node.parent
            parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
        })


    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
          if (this.isAction) {
            this.currentTime += dt;
            if (this.currentTime >= this.totalTime) {
               
                this.showPhone()
                this.setInputMsg(1)
                this.isAction = false;
                this.currentTime = 0
                this.totalTime = 0
            } else {
                
            }
        }


     },
});
