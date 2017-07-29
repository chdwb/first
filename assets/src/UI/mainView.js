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
        this.levText.string = currentExp + "/" + levlExp;
    },

    setDay: function(day) {
        this.levText.string = "第  " + day + "  天"
    },

    setLev: function(lev) {
        this.levText = lev
    },

    setGold: function(gold) {
        this.goldText = gold
    },

    setDiamond: function(diamond) {
        this.diamondText = diamond
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
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
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



    // use this for initialization
    onLoad: function() {

        var self = this

        this.shopBtn.on("click", (event) => {

        }, this.shopBtn)

        this.giftBtn.on("click", (event) => {

        }, this.shopBtn)

        this.bagBtn.on("click", (event) => {

        }, this.shopBtn)

        this.phoneBtn.on("click", (event) => {

        }, this.shopBtn)

        this.wechatBtn.on("click", (event) => {

        }, this.shopBtn)

        this.zoneBtn.on("click", (event) => {

        }, this.shopBtn)

        this.settingBtn.on("click", (event) => {

        }, this.shopBtn)

        this.buydiamondBtn.on("click", (event) => {

        }, this.shopBtn)

        this.buyGoldBtn.on("click", (event) => {

        }, this.shopBtn)

        this.workBtn.on("click", (event) => {
            self.goLove()
        }, this.shopBtn)

        this.loveBtn.on("click", (event) => {
            self.goWork()

        }, this.shopBtn)
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {

     },
});