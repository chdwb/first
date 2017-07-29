cc.Class({
    extends: cc.Component,

    properties: {

        expText: {
            type: cc.Label,
            default: null
        },
        dayText: {
            type: cc.Label,
            default: null
        },
        goldText: {
            type: cc.Label,
            default: null
        },
        diamondText: {
            type: cc.Label,
            default: null
        },
        shopBtn: {
            type: cc.Node,
            default: null
        },
        giftBtn: {
            type: cc.Node,
            default: null
        },
        bagBtn: {
            type: cc.Node,
            default: null
        },
        phoneBtn: {
            type: cc.Node,
            default: null
        },
        wechatBtn: {
            type: cc.Node,
            default: null
        },
        zoneBtn: {
            type: cc.Node,
            default: null
        },
        workBtn: {
            type: cc.Node,
            default: null
        },
        loveBtn: {
            type: cc.Node,
            default: null
        },
        settingBtn: {
            type: cc.Node,
            default: null
        },
        buyGoldBtn: {
            type: cc.Node,
            default: null
        },
        buydiamondBtn: {
            type: cc.Node,
            default: null
        },
    },

    setExp: function(currentExp, levlExp) {
        this.expText.string = currentExp + "/" + levlExp;
    },

    setDay: function(day) {
        this.dayText.string = "第  " + day + "  天"
    },

    setLev: function(lev) {
        this.levText = lev
    },

    setGold: function(gold) {
        //cc.log("set gold"+gold)
        this.goldText.string = gold+""
    },

    setDiamond: function(diamond) {
        //cc.log("set diamond"+diamond)
        this.diamondText.string = diamond+""
    },

    goWork: function()
    {
       var parent = this.node.parent
       parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MISSONVIEW)
    },

     goLove: function()
    {
       var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.LOVEVIEW)
    },

     goPhone: function()
    {
       var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.PHONEVIEW)
    },


     goWechat: function()
    {
       var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
    },

     goWeibo: function()
    {
       var parent = this.node.parent
       parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
    },

     goBag: function()
    {
       var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
    },

     goGift: function()
    {
       var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
    },

     goShop: function()
    {
       var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
    },

     goSetting: function()
    {
       var parent = this.node.parent
       parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
    },


    updateui:function()
    {
        //cc.cs.gameData.date[target.csDataID]["DATE_EXP"]

        this.setExp(cc.cs.PlayerInfo.Exp,99999)
        this.setDiamond(cc.cs.PlayerInfo.Diamond)
        this.setGold(cc.cs.PlayerInfo.Money)

    },
    // use this for initialization

     sendReplyHandle(ret)
     {
         cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            //cc.cs.UIMgr.showTip("工作完成", 1.0)
           
           
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
        //弹窗

     },

      sendReplyHandle(ret)
     {
         cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            //cc.cs.UIMgr.showTip("工作完成", 1.0)
            //cc.cs.UIMgr.showPopupO("hehe","工作完成了",()=>{

               
           
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
        //弹窗

     },

    onLoad: function() {

        var self = this

        this.updateui()

        this.shopBtn.on("click", (event) => {
            cc.log("token = "+ cc.cs.PlayerInfo.ApiToken)
            cc.cs.gameMgr.sendReply(cc.cs.PlayerInfo.ApiToken, "1", this.sendReplyHandle, this)
        }, this.shopBtn)

        this.giftBtn.on("click", (event) => {

        }, this.giftBtn)

        this.bagBtn.on("click", (event) => {

        }, this.bagBtn)

        this.phoneBtn.on("click", (event) => {
            self.goPhone()
        }, this.phoneBtn)

        this.wechatBtn.on("click", (event) => {


            
        }, this.wechatBtn)

        this.zoneBtn.on("click", (event) => {

            

        }, this.zoneBtn)

        this.settingBtn.on("click", (event) => {
             cc.log("token = "+ cc.cs.PlayerInfo.ApiToken)
             cc.cs.gameMgr.sendThumb(cc.cs.PlayerInfo.ApiToken,"1", this.sendReplyHandle, this)



        }, this.settingBtn)

        this.buydiamondBtn.on("click", (event) => {

        }, this.buydiamondBtn)

        this.buyGoldBtn.on("click", (event) => {

        }, this.buyGoldBtn)

        this.workBtn.on("click", (event) => {
            self.goLove()
        }, this.workBtn)

        this.loveBtn.on("click", (event) => {
            self.goWork()

        }, this.loveBtn)
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {

     },
});