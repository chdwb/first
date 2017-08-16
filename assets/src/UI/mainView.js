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
        shopBtn: {
            type: cc.Node,
            default: null,
            sindex: 8,
            lev: 1
        },
        giftBtn: {
            type: cc.Node,
            default: null,
            sindex: 6,
            lev: 1,
        },
        bagBtn: {
            type: cc.Node,
            default: null,
            sindex: 7,
            lev: 1,
        },
        phoneBtn: {
            type: cc.Node,
            default: null,
            sindex: 1,
            lev: 2,
        },
        wechatBtn: {
            type: cc.Node,
            default: null,
            sindex: 2,
            lev: 3,
        },
        zoneBtn: {
            type: cc.Node,
            default: null,
            sindex: 3,
            lev: 6,
        },
        workBtn: {
            type: cc.Node,
            default: null,
            sindex: 5,
            lev: 4,
        },
        loveBtn: {
            type: cc.Node,
            default: null,
            sindex: 4,
            lev: 1,
        },
        settingBtn: {
            type: cc.Node,
            default: null
        },
        buyGoldBtn: {
            type: cc.Node,
            default: null
        },
        SignRewardBtn: {
            type: cc.Node,
            default: null
        },
        caidanBG: {
            type: cc.Node,
            default: null
        },
        tipBG: {
            type: cc.Node,
            default: null
        },

        tipText: {
            type: cc.Label,
            default: null
        },

        iconArray: [],
        addIconArry: [],
        addIconTime: 0.2,
        currentTime: 0,
        iconWidth: 0,
        isAddIcon: false,
        addIcon: null,
        caiDanWidth: 0,
    },

    computerDibian: function() {

        for (var i = 0; i < this.iconArray.length; ++i) {

            if (cc.cs.PlayerInfo.level >= this.iconArray[i].lev) {
                this.addIconArry.push(this.iconArray[i])

                this.iconArray[i].active = true
            } else {
                this.iconArray[i].active = false
            }
        }

        this.iconWidth = this.caidanBG.width / this.iconArray.length
        this.caidanBG.width = this.iconWidth * this.addIconArry.length

        var interval = this.iconWidth - this.phoneBtn.width

        for (var i = 0; i < this.addIconArry.length; ++i) {
            this.addIconArry[i].x = (i * 2 + 1) * (interval * 0.5 + this.phoneBtn.width * 0.5)

        }
    },

    addDiBianBtn: function(icon) {
        this.addIcon = icon
        var addIndex = 0
        for (var i = 0; i < this.addIconArry.length; ++i) {
            if (i < this.addIconArry.length - 1) {
                if (this.addIconArry[i].sindex < icon.sindex &&
                    this.addIconArry[i + 1].sindex > icon.sindex) {
                    addIndex = i + 1
                    break;
                }
                if (this.addIconArry[i].sindex > icon.sindex) {
                    break;
                }
            } else {
                addIndex = this.addIconArry.length - 1
                break
            }
        }
        this.isAddIcon = true
        this.currentTime = 0
        this.addIcon.x = this.addIconArry[addIndex].x
        this.addIcon.active = false

        this.caiDanWidth = this.caidanBG.width
        for (var i = addIndex; i < this.addIconArry.length; ++i) {
            var action = cc.moveBy(this.addIconTime, this.iconWidth, 0.0)
            this.addIconArry[i].runAction(action)
        }

        this.addIconArry.splice(addIndex, 0, this.addIcon)


    },

    actionDibianBtn: function(dt) {
        if (this.isAddIcon) {
            this.currentTime += dt
            var itemSeize = this.iconWidth
            if (this.currentTime < this.addIconTime) {
                itemSeize *= this.currentTime / this.addIconTime
                this.caidanBG.width = this.caiDanWidth + itemSeize
            } else {
                this.caidanBG.width = this.caiDanWidth + itemSeize
                this.isAddIcon = false
                this.addIcon.active = true
            }
        }
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
        this.goldText.string = gold + ""
    },

    setDiamond: function(diamond) {
        //cc.log("set diamond"+diamond)
        this.diamondText.string = diamond + ""
    },
    goSignReward: function() {
        cc.log("heheh" + cc.cs.UIMgr.SIGNREWARDVIEW)
        var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.SIGNREWARDVIEW)
    },
    goWork: function() {
        var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MISSONVIEW)
    },

    goLove: function() {
        this.addDiBianBtn(this.workBtn)
            //var parent = this.node.parent
            // parent.getComponent("GameScene").SetView(cc.cs.UIMgr.LOVEVIEW)
    },

    goZone: function() {
        var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.ZONEVIEW)
    },

    goPhone: function() {
        this.addDiBianBtn(this.workBtn)
            //var parent = this.node.parent
            // parent.getComponent("GameScene").SetView(cc.cs.UIMgr.PHONEVIEW)
    },


    goWechat: function() {
        var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.WECHATVIEW)
    },

    goWeibo: function() {
        var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
    },

    goBag: function() {
        var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.BAGVIEW)
    },

    goGift: function() {
        var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.GIFTVIEW)
    },

    goShop: function() {
        var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.SHOPVIEW)
    },

    goSetting: function() {
        var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
    },


    updateui: function() {
        //cc.cs.gameData.date[target.csDataID]["DATE_EXP"]

        var leveldata = cc.cs.gameData.getlevelData(cc.cs.PlayerInfo.level)
        this.setExp(cc.cs.PlayerInfo.exp, leveldata["LEV_EXP"])
            //this.setDiamond(cc.cs.PlayerInfo.Diamond)
        this.setGold(cc.cs.PlayerInfo.money)
        this.setDay(leveldata["LEV_DAY"])

        /*this.phoneBtn.active = parseInt(cc.cs.PlayerInfo.level) >= cc.cs.gameData.function_conditions["FUNCTION_ID_2"]["FUNCTION_LEVEL"]
        this.wechatBtn.active = parseInt(cc.cs.PlayerInfo.level) >= cc.cs.gameData.function_conditions["FUNCTION_ID_3"]["FUNCTION_LEVEL"]
        this.workBtn.active = parseInt(cc.cs.PlayerInfo.level) >= cc.cs.gameData.function_conditions["FUNCTION_ID_4"]["FUNCTION_LEVEL"]
        this.SignRewardBtn.active = parseInt(cc.cs.PlayerInfo.level) >= cc.cs.gameData.function_conditions["FUNCTION_ID_5"]["FUNCTION_LEVEL"]
        this.zoneBtn.active = parseInt(cc.cs.PlayerInfo.level) >= cc.cs.gameData.function_conditions["FUNCTION_ID_8"]["FUNCTION_LEVEL"]*/

        if (cc.cs.PlayerInfo.exp >= leveldata["LEV_EXP"]) {
            this.tipBG.active = true
        } else {
            this.tipBG.active = false
        }

        if (cc.cs.PlayerInfo.playvideo != 0) {
            var parent = this.node.parent
            parent.getComponent("GameScene").SetView(cc.cs.UIMgr.VIDEOVIEW)
        }
        if (this.phoneBtn.active)
            if (this.node.parent.getChildByName("phoneView").getComponent("phoneView").canPhone()) {
                this.phoneBtn.getChildByName("stars").active = true;
                if (cc.cs.PlayerInfo.exp >= leveldata["LEV_EXP"]) {
                    cc.cs.UIMgr.changeSprite(this.phoneBtn.getChildByName("stars"), "common/prompt_red")
                    this.tipText.string = "快给" + cc.cs.PlayerInfo.NPCName + "打电话吧"
                } else {
                    cc.cs.UIMgr.changeSprite(this.phoneBtn.getChildByName("stars"), "common/prompt_green")
                }
                this.wechatBtn.getChildByName("stars").active = false;
            } else {
                if (cc.cs.PlayerInfo.level >= this.wechatBtn.lev) {
                    this.addDiBianBtn(this.wechatBtn)
                }

                if (this.wechatBtn.active)
                    if (this.node.parent.getChildByName("WechatView").getComponent("wechatView").canWeChat()) {
                        this.wechatBtn.getChildByName("stars").active = true;
                        if (cc.cs.PlayerInfo.exp >= leveldata["LEV_EXP"]) {
                            cc.cs.UIMgr.changeSprite(this.wechatBtn.getChildByName("stars"), "common/prompt_red")
                            this.tipText.string = "快给" + cc.cs.PlayerInfo.NPCName + "发微信吧"
                        } else {
                            cc.cs.UIMgr.changeSprite(this.wechatBtn.getChildByName("stars"), "common/prompt_green")
                        }
                    } else {
                        this.wechatBtn.getChildByName("stars").active = false;
                    }
                this.phoneBtn.getChildByName("stars").active = false;
            }


        if (this.zoneBtn.active)
            if (cc.cs.PlayerInfo.canZone()) {
                this.zoneBtn.getChildByName("stars").active = true;
            } else {
                this.zoneBtn.getChildByName("stars").active = false;
            }

    },
    // use this for initialization

    sendReplyHandle(ret) {
        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            //cc.cs.UIMgr.showTip("工作完成", 1.0)


        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
        //弹窗

    },

    sendReplyHandle(ret) {
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

    onEnable: function() {
        this.updateui();
    },

    onLoad: function() {

        var self = this

        this.iconArray.push(this.phoneBtn)
        this.phoneBtn.sindex = 1
        this.phoneBtn.lev = 2
        this.iconArray.push(this.wechatBtn)
        this.wechatBtn.sindex = 2
        this.wechatBtn.lev = 3
        this.iconArray.push(this.zoneBtn)
        this.zoneBtn.sindex = 3
        this.zoneBtn.lev = 6
        this.iconArray.push(this.loveBtn)
        this.loveBtn.sindex = 4
        this.loveBtn.lev = 1
        this.iconArray.push(this.workBtn)
        this.workBtn.sindex = 5
        this.workBtn.lev = 4
        this.iconArray.push(this.giftBtn)
        this.giftBtn.sindex = 6
        this.giftBtn.lev = 1
        this.iconArray.push(this.bagBtn)
        this.bagBtn.sindex = 7
        this.bagBtn.lev = 1
        this.iconArray.push(this.shopBtn)
        this.shopBtn.sindex = 8
        this.shopBtn.lev = 1

        this.computerDibian()
        this.updateui()

        this.shopBtn.on("click", (event) => {
            //cc.log("token = "+ cc.cs.PlayerInfo.api_token)
            this.goShop()

        }, this.shopBtn)

        this.giftBtn.on("click", (event) => {
            this.goGift()

        }, this.giftBtn)

        this.bagBtn.on("click", (event) => {
            self.goBag()
        }, this.bagBtn)

        this.phoneBtn.on("click", (event) => {
            self.goPhone()
        }, this.phoneBtn)

        this.wechatBtn.on("click", (event) => {

            self.goWechat()

        }, this.wechatBtn)

        this.zoneBtn.on("click", (event) => {

            this.goZone()

        }, this.zoneBtn)

        this.settingBtn.on("click", (event) => {
            cc.log("token = " + cc.cs.PlayerInfo.api_token)

        }, this.settingBtn)

        this.buyGoldBtn.on("click", (event) => {

        }, this.buyGoldBtn)

        this.workBtn.on("click", (event) => {
            self.goWork()

        }, this.workBtn)

        this.loveBtn.on("click", (event) => {
            self.goLove()

        }, this.loveBtn)


    },

    // called every frame, uncomment this function to activate update callback
    update: function(dt) {
        this.actionDibianBtn(dt)
    },
});