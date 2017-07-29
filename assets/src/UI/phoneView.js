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

        inputTablePrefab : null
    },

    showNormal:function(){
        this.node =true;
        this.playerInfoView.active =false
        this.cancelBtn.active = false
        this.infoText.node.active = false
        this.inputBtn.active = false
        this.phoneBtn.active = true
        this.everInfoScroll.node.active = true
    },

    showPhone:function(){
        this.node =true;
        this.playerInfoView.active =false
        this.cancelBtn.active = true
        this.infoText.node.active = true
        this.inputBtn.active = true
        this.phoneBtn.active = false
        this.everInfoScroll.node.active = false
    },

    showPhoneInfoView:function(){
        this.node =false;
        this.playerInfoView.active =true
    },
    
    showPhoneView:function(){
        this.node =true;
        this.playerInfoView.active =true
    },

    addSummaryItem:function(){
        

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
            self.showPhone()
        })

        this.backBtn.on("click", (event)=>{
            //back
        })


    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
