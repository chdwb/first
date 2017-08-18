cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        titleText: {
            default: null,
            type: cc.Label
        },

        doSprite: {
            default: null,
            type: cc.Sprite
        },

        getSprite: {
            default: null,
            type: cc.Sprite
        },

        getLabel: {
            default: null,
            type: cc.Label
        },

        doName: {
            default: null,
            type: cc.Label
        },

        timesLabel: {
            default: null,
            type: cc.Label
        },

        goodsLabel: {
            default: null,
            type: cc.Label
        },

        startTips: {
            default: null,
            type: cc.Label
        },

        startBtn: {
            default: null,
            type: cc.Node
        },
        btnLock: {
            default: null,
            type: cc.Node
        },
        btnText: {
            default: null,
            type: cc.Label
        },
        goldText: {
            default: null,
            type: cc.Label
        },
        itemID: 0,
        isWokr: false,
        isLoad : false,
    },

    loadElement : function(){
        this.titleText = this.node.getChildByName("titleText").getComponent(cc.Label);
        this.doSprite = this.node.getChildByName("1").getComponent(cc.Sprite);
        this.getSprite = this.node.getChildByName("bantoumingbeijing").getChildByName("xin").getComponent(cc.Sprite);
        this.getLabel = this.node.getChildByName("bantoumingbeijing").getChildByName("getText").getComponent(cc.Label);
        this.doName = this.node.getChildByName("nameText").getComponent(cc.Label);
        this.timesLabel = this.node.getChildByName("timesText").getComponent(cc.Label);
        this.goodsLabel = this.node.getChildByName("goodsText").getComponent(cc.Label);
        this.goldText = this.node.getChildByName("goldText").getComponent(cc.Label);
        this.startTips = this.node.getChildByName("starTips").getComponent(cc.Label);
        this.startBtn = this.node.getChildByName("starBtn")
        this.btnLock = this.startBtn.getChildByName("suo")
        this.btnText = this.startBtn.getChildByName("btnText").getComponent(cc.Label)
    },

    setItem: function(id, isWork) {
        cc.log("missionitemComponent    setItem")
        this.isWokr = isWork
        this.itemID = id
        this.loadElement()
        if (isWork) {
            var workResult = cc.cs.PlayerInfo.canWork(id)
            this.loadWork(workResult);
        } else {
            var dateResult = cc.cs.PlayerInfo.canLove(id)
            this.loadDate(dateResult)
        }
        this.isLoad = true
    },

    refresh :function(){
        
        if(!this.isLoad) return
        if (this.isWork) {
            this.goldText.node.active = false
            var workData = cc.cs.gameData.getworkData(this.itemID)
            if (workData["TIME"] == cc.cs.PlayerInfo.getWorkFreeTimes(this.itemID)) {
                this.timesLabel.string = "工作次数:   " + cc.cs.PlayerInfo.getWorkFreeTimes(this.itemID)
            } else {
                this.timesLabel.string = "剩余次数:   " + cc.cs.PlayerInfo.getWorkFreeTimes(this.itemID)
            }
            var workResult = cc.cs.PlayerInfo.canWork(this.itemID)
            this.goodsLabel.node.active = false
            this.startTips.node.active = false
            this.startBtn.getComponent(cc.Button).interactable = true
            if (workResult == 0 || workResult == 1) {
                this.btnLock.active = false
                this.btnText.node.active = true
                this.btnTex.string = "开始"
            } else if (workResult == 2) {
                this.btnLock.active = false
                this.btnText.node.active = true
                this.btnText.string = "升职"
            } else {
                this.btnLock.active = true
                this.btnText.node.active = false
                this.startBtn.getComponent(cc.Button).interactable = false
            }

        }else{
            this.goldText.node.active = false
            var dateData = cc.cs.gameData.getdateData(this.itemID)
            if (dateData["DATE_FREE_TIMES"] == cc.cs.PlayerInfo.getLoveFreeTimes(this.itemID)) {
                this.timesLabel.string = "恋爱次数:   " + cc.cs.PlayerInfo.getLoveFreeTimes(this.itemID)
            } else {
                this.timesLabel.string = "剩余次数:   " + cc.cs.PlayerInfo.getLoveFreeTimes(this.itemID)
            }
            var dateResult = cc.cs.PlayerInfo.canLove(this.itemID)
            cc.log("dateResult    " + dateResult)
            this.startTips.node.active = false
            if (dateResult == -1) {
                this.startBtn.active = true
                this.btnText.string = "购买次数"
                this.goldText.node.active = true
                this.goldText.string = "所需金币： " + cc.cs.PlayerInfo.getLovePrice(this.itemID)
            } else if (dateResult == 0) {
                this.startBtn.active = true
                this.btnText.string = "开始"
            } else {
                this.startBtn.active = false
                this.startTips.node.active = true
                this.startTips.string = "游戏内时间第" + dateResult + "天开放"
            }
        }
    },

     loadDate: function(result) {
        var self = this
        var dateData = cc.cs.gameData.getdateData(this.itemID)
        this.titleText.string = "恋爱"
        cc.cs.UIMgr.changeSprite(this.doSprite.node, "work_quest/quest/" + this.itemID)
        this.getLabel.string = dateData["DATE_EXP"]
        this.doName.string = dateData["DATE_NAME"]
        if (dateData["DATE_FREE_TIMES"] == cc.cs.PlayerInfo.getLoveFreeTimes(this.itemID)) {
            this.timesLabel.string = "恋爱次数:   " + cc.cs.PlayerInfo.getLoveFreeTimes(this.itemID)
        } else {
            this.timesLabel.string = "剩余次数:   " + cc.cs.PlayerInfo.getLoveFreeTimes(this.itemID)
        }

        if (dateData["DATE_NEED_GOODS_ID"] == "dummy") {
            this.goodsLabel.node.active = false
        } else {
            this.goodsLabel.node.active = true
            this.goodsLabel.string = "所需道具：  " + dateData["DATE_NEED_GOODS_ID"] + "x" + dateData["DATE_NEED_GOODS_COUNT"]
        }

        this.startTips.node.active = false
        if (result == -1) {
            this.startBtn.active = true
            this.btnText.string = "购买次数"
        } else if (result == 0) {
            this.startBtn.active = true
            this.btnText.string = "开始"
        } else {
            this.startBtn.active = false
            this.startTips.node.active = true
            this.startTips.string = "游戏内时间第" + result + "天开放"
        }
        this.startBtn.on("click", (event)=>{
            var dateResult = cc.cs.PlayerInfo.canLove(self.itemID)
            if(dateResult == 0){
                cc.cs.gameMgr.sendLove(self.itemID, self.startDateHandle, self)
            }else if(dateResult == -1){
                cc.cs.gameMgr.buyLoveTime(self.itemID, self.buyLoveHandle, self)
            }
            
        })
    },

    buyLoveHandle:function(ret){
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)
            this.refresh()
        }else{
            cc.log("error " + JasonObject.error)
        }
    },
    startDateHandle : function(ret){
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)
            var actionView = cc.cs.UIMgr.getView(cc.cs.UIMgr.ACTIONVIEW)
            actionView.getComponent("actioningView").setItem(this.itemID, false)
            cc.cs.UIMgr.openView(cc.cs.UIMgr.ACTIONVIEW)
        }else{
            cc.log("error " + JasonObject.error)
        }
    },

    loadWork: function(result) {
        var workData = cc.cs.gameData.getworkData(this.itemID)
        this.titleText.string = "工作"
        cc.cs.UIMgr.changeSprite(this.doSprite.node, "work_quest/work/" + this.itemID)
        cc.cs.UIMgr.changeSprite(this.getSprite.node, "common/jinbi")
        this.getLabel.string = workData["REWARD"]
        this.doName.string = workData["NAME"]
        if (workData["TIME"] == cc.cs.PlayerInfo.getWorkFreeTimes(this.itemID)) {
            this.timesLabel.string = "工作次数:   " + cc.cs.PlayerInfo.getWorkFreeTimes(this.itemID)
        } else {
            this.timesLabel.string = "剩余次数:   " + cc.cs.PlayerInfo.getWorkFreeTimes(this.itemID)
        }
        this.goodsLabel.node.active = false
        this.startTips.node.active = false
        this.startBtn.getComponent(cc.Button).interactable = true
        if (result == 0 || result == 1) {
            this.btnLock.active = false
            this.btnText.node.active = true
            this.btnText.string = "开始"
        } else if (result == 2) {
            this.btnLock.active = false
            this.btnText.node.active = true
            this.btnText.string = "升职"
        } else {
            this.btnLock.active = true
            this.btnText.node.active = false
            this.startBtn.getComponent(cc.Button).interactable = false
        }
    },

    start:function(){
        cc.log("missionitemComponent    start   " + this.itemID)
    },

    // use this for initialization
    onLoad: function() {
        cc.log("missionitemComponent    onload   " + this.itemID)
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});