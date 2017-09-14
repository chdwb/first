cc.Class({
    extends: cc.Component,

    properties: {

        expText: {
            type: cc.Label,
            default: null
        },
        dayText1: {
            type: cc.Label,
            default: null
        },
        dayText2: {
            type: cc.Label,
            default: null
        },
        dayText3: {
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
        giftBtn1: {
            type: cc.Node,
            default: null,
            sindex: 6,
            lev: 1,
        },
        bagBtn1: {
            type: cc.Node,
            default: null,
            sindex: 7,
            lev: 1,
        },
        phoneBtn1: {
            type: cc.Node,
            default: null,
            sindex: 1,
            lev: 2,
        },
        wechatBtn1: {
            type: cc.Node,
            default: null,
            sindex: 2,
            lev: 3,
        },
        zoneBtn1: {
            type: cc.Node,
            default: null,
            sindex: 3,
            lev: 6,
        },
        workBtn1: {
            type: cc.Node,
            default: null,
            sindex: 5,
            lev: 4,
        },
        loveBtn1: {
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
        bgNode: {
            type: cc.Node,
            default: null
        },
        videoNode: {
            type: cc.Node,
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
        now: 0,
        SoundOff: false,
        currentUnlockIcon: null,
    },

    setDisableIcon: function(obj) {
        if (obj == this.loveBtn) {
            this.loveBtn1.active = false
        } else if (obj == this.giftBtn) {
            this.giftBtn1.active = false
        } else if (obj == this.zoneBtn) {
            this.zoneBtn1.active = false
        } else if (obj == this.wechatBtn) {
            this.wechatBtn1.active = false
        } else if (obj == this.phoneBtn) {
            this.phoneBtn1.active = false
        } else if (obj == this.workBtn) {
            this.workBtn1.active = false
        } else if (obj == this.bagBtn) {
            this.bagBtn1.active = false
        }
    },

    getDisableIcon: function(obj) {
        if (obj == this.loveBtn) {
            return this.loveBtn1
        } else if (obj == this.giftBtn) {
            return this.giftBtn1
        } else if (obj == this.zoneBtn) {
            return this.zoneBtn1
        } else if (obj == this.wechatBtn) {
            return this.wechatBtn1
        } else if (obj == this.phoneBtn) {
            return this.phoneBtn1
        } else if (obj == this.workBtn) {
            return this.workBtn1
        } else if (obj == this.bagBtn) {
            return this.bagBtn1
        }
        return null
    },


    computerDibian: function() {

        for (var i = 0; i < this.iconArray.length; ++i) {

            if (cc.cs.PlayerInfo.level >= this.iconArray[i].lev) {
                if (cc.cs.PlayerInfo.level == this.wechatBtn.lev && this.iconArray[i] == this.wechatBtn) {
                    if (cc.cs.PlayerInfo.canWechat()) {
                        this.addIconArry.push(this.iconArray[i])

                        this.iconArray[i].active = true
                        this.setDisableIcon(this.iconArray[i])
                        cc.log(this.iconArray[i].name)
                    }
                } else if (cc.cs.PlayerInfo.level > this.wechatBtn.lev && this.iconArray[i] == this.wechatBtn) {
                    this.addIconArry.push(this.iconArray[i])

                    this.iconArray[i].active = true
                    this.setDisableIcon(this.iconArray[i])
                    cc.log(this.iconArray[i].name)
                } else {
                    this.addIconArry.push(this.iconArray[i])

                    this.iconArray[i].active = true

                    this.setDisableIcon(this.iconArray[i])

                    cc.log(this.iconArray[i].name)
                }

            } else {

                this.iconArray[i].active = false
            }
        }

        //this.iconWidth = this.caidanBG.width / this.iconArray.length
        //this.caidanBG.width  =  this.iconWidth * this.addIconArry.length

        // var interval =  this.iconWidth - this.phoneBtn.width

        //for(var i = 0; i < this.addIconArry.length; ++i){
        //    this.addIconArry[i].x = (i*2 + 1) * (interval *0.5 + this.phoneBtn.width *0.5)

        // }
    },

    addDiBianBtn: function(icon) {
        if (cc.cs.utils.contains(this.addIconArry, icon)) return
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
        /* this.isAddIcon = true
         this.currentTime = 0
         this.addIcon.x = this.addIconArry[addIndex].x
         this.addIcon.active = false
         
         this.caiDanWidth = this.caidanBG.width
         for(var i = addIndex; i < this.addIconArry.length; ++i){
             var action = cc.moveBy(this.addIconTime, this.iconWidth, 0.0)
             this.addIconArry[i].runAction(action)
         }

         this.addIconArry.splice(addIndex, 0 , this.addIcon)
         for(var i = 0; i< this.addIconArry.length; ++i){
             cc.log("canAddIcon   addIconArry " +this.addIconArry[i].name)
             
         }*/

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
        var heartTarget = this.node.getChildByName("expBG").getChildByName("qinmitaoxindi")
        cc.cs.UIMgr.setHeart(heartTarget, currentExp, levlExp)
    },

    setDay: function(day) {
        var str1 = ""
        var str2 = ""
        var str3 = ""
        if (day < 10) {
            str1 = "0"
            str2 = "0"
            str3 = "" + day
        } else if (day >= 10 && day < 100) {
            str1 = "0"
            str2 = "" + parseInt(day / 10)
            str3 = "" + parseInt(day % 10)
        } else if (day > 100) {
            str1 = "" + parseInt(day / 100)
            str2 = "" + parseInt((day - parseInt(day / 100) * 100) / 10)
            str3 = "" + parseInt(day % 10)
        }

        this.dayText1.string = str1
        this.dayText2.string = str2
        this.dayText3.string = str3
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
            //var parent = this.node.parent
            //parent.getComponent("GameScene").SetView(cc.cs.UIMgr.SIGNREWARDVIEW)
        cc.cs.UIMgr.openView(cc.cs.UIMgr.SIGNREWARDVIEW)
    },
    goWork: function() {
        //var parent = this.node.parent
        //parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MISSONVIEW)
        cc.cs.UIMgr.openView(cc.cs.UIMgr.MISSONVIEW)
    },

    goLove: function() {
        // this.addDiBianBtn(this.wechatBtn)
        cc.cs.UIMgr.openView(cc.cs.UIMgr.LOVEVIEW)
    },

    goZone: function() {
        //var parent = this.node.parent
        //parent.getComponent("GameScene").SetView(cc.cs.UIMgr.ZONEVIEW)
        cc.cs.UIMgr.openView(cc.cs.UIMgr.ZONEVIEW)
    },

    goPhone: function() {
        cc.cs.UIMgr.openView(cc.cs.UIMgr.PHONEVIEW)
    },


    goWechat: function() {
        cc.cs.UIMgr.openView(cc.cs.UIMgr.WECHATVIEW)
    },

    goWeibo: function() {
        //var parent = this.node.parent
        //parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
        //cc.cs.UIMgr.openView(cc.cs.UIMgr.WECHATVIEW)
    },

    goBag: function() {
        //var parent = this.node.parent
        //parent.getComponent("GameScene").SetView(cc.cs.UIMgr.BAGVIEW)
        cc.cs.UIMgr.openView(cc.cs.UIMgr.BAGVIEW)
    },

    goGift: function() {
        //var parent = this.node.parent
        //parent.getComponent("GameScene").SetView(cc.cs.UIMgr.GIFTVIEW)
        //cc.cs.UIMgr.openView(cc.cs.UIMgr.GIFTVIEW)
        cc.cs.UIMgr.openView(cc.cs.UIMgr.COLLECTVIEW)

    },

    goShop: function() {
        //var parent = this.node.parent
        //parent.getComponent("GameScene").SetView(cc.cs.UIMgr.SHOPVIEW)
        // cc.cs.UIMgr.currentShopType = 3
        //cc.cs.UIMgr.openView(cc.cs.UIMgr.SHOPVIEW)


        cc.log("goShop LoveView")
        cc.cs.UIMgr.setShopType(3)
        cc.log("cc.cs.UIMgr = " + cc.cs.UIMgr.currentShopType)
        cc.cs.UIMgr.openView(cc.cs.UIMgr.SHOPVIEW)
    },

    goShop2: function() {
        //var parent = this.node.parent
        //parent.getComponent("GameScene").SetView(cc.cs.UIMgr.SHOPVIEW)
        // cc.cs.UIMgr.currentShopType = 3
        //cc.cs.UIMgr.openView(cc.cs.UIMgr.SHOPVIEW)


        cc.log("goShop LoveView")
        cc.cs.UIMgr.setShopType(2)
        cc.log("cc.cs.UIMgr = " + cc.cs.UIMgr.currentShopType)
        cc.cs.UIMgr.openView(cc.cs.UIMgr.SHOPVIEW)
    },

    goSetting: function() {
        //var parent = this.node.parent
        //parent.getComponent("GameScene").SetView(cc.cs.UIMgr.SETTINGVIEW)
        //cc.cs.UIMgr.openView(cc.cs.UIMgr.SETTINGVIEW)



        {
            cc.log("声音关闭 =  " + this.SoundOff)
            if (this.SoundOff == false) {
                this.SoundOff = true;
                cc.cs.AudioMgr.stopBGM(true);
                //this.SettingButton.interactable = false
                cc.cs.UIMgr.changeSprite(this.settingBtn, "mainMenu/unvoice")

            } else {
                this.SoundOff = false;
                cc.cs.AudioMgr.startBGM(true);
                //this.SettingButton.interactable = true
                cc.cs.UIMgr.changeSprite(this.settingBtn, "mainMenu/voice")

            }



        }


    },

    canAddIcon: function() {
        for (var i = 0; i < this.iconArray.length; ++i) {
            cc.log(this.iconArray[i].name + "       " + i)
            if (cc.cs.PlayerInfo.level >= this.iconArray[i].lev) {


                if (cc.cs.utils.contains(this.addIconArry, this.iconArray[i]))
                    continue
                else {
                    if (this.iconArray[i] == this.wechatBtn) {
                        cc.log("canAddIcon   contains " + cc.cs.utils.contains(this.addIconArry, this.iconArray[i] + "      " + cc.cs.PlayerInfo.canWechat()))
                        if (cc.cs.PlayerInfo.canWechat()) {
                            return this.iconArray[i]
                        } else {
                            continue
                        }
                    } else {
                        return this.iconArray[i]
                    }

                }

            }
        }
        return null
    },

    onVideoClick: function() {
        this.videoNode.active = true

        this.videoNode.getComponent("jsVideo").setPlayVideoID(cc.cs.PlayerInfo.playvideo)


    },

    onAnimationFinished: function() {
        //cc.cs.UIMgr.openView(cc.cs.UIMgr.VIDEOVIEW)
        this.bgNode.active = false

        var animation = this.node.getChildByName("shengjidonghua").getComponent("cc.Animation")
        animation.stop()
        animation.node.active = false
        this.node.getChildByName("shengjidonghua").active = false
        cc.cs.AudioMgr.StopAudio(this.AudioID)
        cc.cs.UIMgr.showPopupO2("心动时刻", "快去看看许梦甜在干什么吧！", this.onVideoClick.bind(this))
            //cc.cs.AudioMgr.startBGM()

    },

    onLockFinished: function() {
        cc.log("canAddIcon   " + this.currentUnlockIcon.name)
        this.computerDibian()
            //this.addDiBianBtn(icon)
        this.currentUnlockIcon.active = true
        this.setDisableIcon(this.currentUnlockIcon)
        if (this.currentUnlockIcon.name == "phoneBtn") {
            if (parseInt(cc.cs.PlayerInfo.guide_id) == 5) // 弹出电话按钮引导
            {
                cc.log("电话第一次激活")
                cc.cs.UIMgr.showGuide(parseInt(cc.cs.PlayerInfo.guide_id) + 1, this.phoneBtn, this)
            }
        }
        this.updateui()
    },

    getVideoType: function(videoName) {
        if (videoName.match(/12\d\d\d/)) {
            return 3
        } else if (videoName.match(/15\d\d/)) { //
            return 4
        } else if (videoName.match(/11\d\d/)) {
            return 1
        } else if (videoName.match(/14\d\d/)) { //facetime
            return 2
        }
        return 0
    },

    updateui: function() {
        //cc.cs.gameData.date[target.csDataID]["DATE_EXP"]

        cc.log("mainview updateui  " + cc.sys.os)


        if (this.SoundOff == true) {
            cc.cs.UIMgr.changeSprite(this.settingBtn, "mainMenu/unvoice")
        } else {
            cc.cs.UIMgr.changeSprite(this.settingBtn, "mainMenu/voice")
        }

        var leveldata = cc.cs.gameData.level["LEV_LEV_" + cc.cs.PlayerInfo.level]

        this.setExp(cc.cs.PlayerInfo.exp, leveldata["LEV_EXP"])
            //this.setDiamond(cc.cs.PlayerInfo.Diamond)
        this.setGold(cc.cs.PlayerInfo.money)
        this.setDay(leveldata["LEV_DAY"])

        /*this.phoneBtn.active = parseInt(cc.cs.PlayerInfo.level) >= cc.cs.gameData.function_conditions["FUNCTION_ID_2"]["FUNCTION_LEVEL"]
        this.wechatBtn.active = parseInt(cc.cs.PlayerInfo.level) >= cc.cs.gameData.function_conditions["FUNCTION_ID_3"]["FUNCTION_LEVEL"]
        this.workBtn.active = parseInt(cc.cs.PlayerInfo.level) >= cc.cs.gameData.function_conditions["FUNCTION_ID_4"]["FUNCTION_LEVEL"]
        this.SignRewardBtn.active = parseInt(cc.cs.PlayerInfo.level) >= cc.cs.gameData.function_conditions["FUNCTION_ID_5"]["FUNCTION_LEVEL"]
        this.zoneBtn.active = parseInt(cc.cs.PlayerInfo.level) >= cc.cs.gameData.function_conditions["FUNCTION_ID_8"]["FUNCTION_LEVEL"]*/
        var animation = this.node.getChildByName("shengjidonghua").getComponent("cc.Animation")

        // animation.on('finished',  this.onAnimationFinished,    this);

        cc.log("主菜单检测VIDEO ID = " + cc.cs.PlayerInfo.playvideo)
        if (cc.cs.PlayerInfo.playvideo != 0) {

            var type = this.getVideoType(cc.cs.PlayerInfo.playvideo + "")
            if (type == 2) {
                if (!cc.cs.PlayerInfo.canPhone() && !cc.cs.PlayerInfo.canWechat()) {
                    this.videoNode.active = true
                    this.bgNode.active = false


                    this.videoNode.getComponent("jsVideo").setPlayVideoID(cc.cs.PlayerInfo.playvideo)
                    return;
                }

            } else {
                cc.cs.UIMgr.showTouchDisableLayer()
                this.schedule(function() {
                    cc.cs.UIMgr.removeTouchDisableLayer()
                    animation.node.active = true
                    animation.play()
                    this.AudioID = cc.cs.AudioMgr.playAudio("shengji", true)
                    cc.cs.AudioMgr.stopBGM()
                }, 1, 0);
                return;
            }
        }



        cc.log("guidepos = " + cc.cs.PlayerInfo.guide_id)
        if (cc.cs.PlayerInfo.guide_id == 0) {
            cc.cs.UIMgr.showGuide(1, null, this)
        } else if (parseInt(cc.cs.PlayerInfo.guide_id) < 3) {
            cc.cs.UIMgr.showGuide(parseInt(cc.cs.PlayerInfo.guide_id) + 1, null, this)
        } else if (parseInt(cc.cs.PlayerInfo.guide_id) == 3) // 弹出恋爱按钮引导
        {
            cc.cs.UIMgr.showGuide(parseInt(cc.cs.PlayerInfo.guide_id) + 1, this.loveBtn, this)
        } else if (parseInt(cc.cs.PlayerInfo.guide_id) == 11) // 弹出电话按钮引导
        {
            cc.cs.UIMgr.showGuide(parseInt(cc.cs.PlayerInfo.guide_id) + 1, this.SignRewardBtn, this)
        } else if (parseInt(cc.cs.PlayerInfo.guide_id) == 13) // 背包
        {
            cc.cs.UIMgr.showGuide(parseInt(cc.cs.PlayerInfo.guide_id) + 1, this.bagBtn, this)
        }



        var icon = this.canAddIcon()

        if (icon != null) {
            var disableIcon = this.getDisableIcon(icon)
            this.currentUnlockIcon = icon
            if (disableIcon != null) {
                var lockAni = disableIcon.getChildByName("lockanim").getComponent("cc.Animation")
                lockAni.on('finished', this.onLockFinished, this);
                lockAni.play()
            }

            return
        }
        this.tipBG.active = false


        this.SignRewardBtn.action = cc.cs.PlayerInfo.level >= cc.cs.gameData.getfunction_conditionsData(6)["FUNCTION_LEVEL"]



        if (this.wechatBtn.active) {
            if (parseInt(cc.cs.PlayerInfo.guide_id) == 7) // 弹出电话按钮引导
            {
                cc.log("微信第一次激活")
                cc.cs.UIMgr.showGuide(parseInt(cc.cs.PlayerInfo.guide_id) + 1, this.wechatBtn, this)
            }
            if (cc.cs.PlayerInfo.canWechat()) {

                this.tipBG.active = true
                this.tipText.string = "快给" + cc.cs.PlayerInfo.NPCName + "发微信吧"
                if (cc.cs.PlayerInfo.exp >= leveldata["LEV_EXP"]) {

                    var psprite = this.wechatBtn.getChildByName("stars")
                    cc.cs.UIMgr.changeSprite(psprite, "common/notice_2")
                    this.tipBG.active = true
                } else {
                    var psprite = this.wechatBtn.getChildByName("stars")
                    cc.cs.UIMgr.changeSprite(psprite, "common/notice_1")
                    this.tipBG.active = false
                }


                this.wechatBtn.getChildByName("stars").active = true;
            } else {
                this.wechatBtn.getChildByName("stars").active = false;
            }
        }

        if (this.phoneBtn.active) {

            if (cc.cs.PlayerInfo.canPhone()) {

                this.tipBG.active = true

                this.tipText.string = "快给" + cc.cs.PlayerInfo.NPCName + "打电话吧"
                if (cc.cs.PlayerInfo.exp >= leveldata["LEV_EXP"]) {
                    this.tipBG.action = true

                    var psprite = this.phoneBtn.getChildByName("stars")
                    cc.cs.UIMgr.changeSprite(psprite, "common/notice_2")
                } else {
                    var psprite = this.phoneBtn.getChildByName("stars")
                    cc.cs.UIMgr.changeSprite(psprite, "common/notice_1")
                    this.tipBG.active = false
                }

                this.phoneBtn.getChildByName("stars").active = true;
            } else {
                this.phoneBtn.getChildByName("stars").active = false;

            }
        }

        if (this.zoneBtn.active) {
            if (parseInt(cc.cs.PlayerInfo.guide_id) == 15) // 弹出电话按钮引导
            {
                cc.log("微博第一次激活")
                cc.cs.UIMgr.showGuide(parseInt(cc.cs.PlayerInfo.guide_id) + 1, this.zoneBtn, this)
            }
            if (cc.cs.PlayerInfo.canZone()) {
                this.zoneBtn.getChildByName("stars").active = true;
            } else {
                this.zoneBtn.getChildByName("stars").active = false;
            }
        }

        if (this.loveBtn.active) {
            if (cc.cs.PlayerInfo.canAllLove()) {
                this.loveBtn.getChildByName("stars").active = true;
            } else {
                this.loveBtn.getChildByName("stars").active = false;
            }
        }

        if (this.workBtn.active) {
            if (parseInt(cc.cs.PlayerInfo.guide_id) == 9) // 弹出电话按钮引导
            {
                cc.log("工作第一次激活")
                cc.cs.UIMgr.showGuide(parseInt(cc.cs.PlayerInfo.guide_id) + 1, this.workBtn, this)
            }
            if (cc.cs.PlayerInfo.canAllWork()) {
                this.workBtn.getChildByName("stars").active = true;
            } else {
                this.workBtn.getChildByName("stars").active = false;
            }
        }

    },
    // use this for initialization

    sendReplyHandle(ret) {
        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        cc.cs.UIMgr.closeNetView()
        if (JasonObject.success === true) {
            //cc.cs.UIMgr.closeNetView()
            //cc.cs.UIMgr.showTip("工作完成", 1.0)


        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
        //弹窗

    },

    sendReplyHandle(ret) {
        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        cc.cs.UIMgr.closeNetView()
        if (JasonObject.success === true) {
            //cc.cs.UIMgr.closeNetView()
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
        this.phoneBtn.active = false
        this.phoneBtn1.sindex = 1
        this.phoneBtn1.lev = 2
        this.phoneBtn1.active = true
        this.iconArray.push(this.wechatBtn)
        this.wechatBtn.sindex = 2
        this.wechatBtn.lev = 3
        this.wechatBtn.active = false
        this.wechatBtn1.sindex = 2
        this.wechatBtn1.lev = 3
        this.wechatBtn1.active = true
        this.iconArray.push(this.zoneBtn)
        this.zoneBtn.sindex = 3
        this.zoneBtn.lev = 6
        this.zoneBtn.active = false
        this.zoneBtn1.sindex = 3
        this.zoneBtn1.lev = 6
        this.zoneBtn1.active = true
        this.iconArray.push(this.loveBtn)
        this.loveBtn.sindex = 4
        this.loveBtn.lev = 1
        this.loveBtn.active = false
        this.loveBtn1.sindex = 4
        this.loveBtn1.lev = 1
        this.loveBtn1.active = true
        this.iconArray.push(this.workBtn)
        this.workBtn.sindex = 5
        this.workBtn.lev = 4
        this.workBtn.active = false
        this.workBtn1.sindex = 5
        this.workBtn1.lev = 4
        this.workBtn1.active = true
        this.iconArray.push(this.giftBtn)
        this.giftBtn.sindex = 6
        this.giftBtn.lev = 7
        this.giftBtn.active = false
        this.giftBtn1.sindex = 6
        this.giftBtn1.lev = 7
        this.giftBtn1.active = true
        this.iconArray.push(this.bagBtn)
        this.bagBtn.sindex = 7
        this.bagBtn.lev = 1
        this.bagBtn.active = false
        this.bagBtn1.sindex = 7
        this.bagBtn1.lev = 1
        this.bagBtn1.active = true
        this.iconArray.push(this.shopBtn)
        this.shopBtn.sindex = 8
        this.shopBtn.lev = 1
        this.shopBtn.active = false

        /*this.phoneBtn1.on("click", (event) => {
            cc.cs.UIMgr.showTip("第" + cc.cs.gameData.getlevelData(event.target.lev)["LEV_DAY"] + "天解锁")
        }, this.phoneBtn1)
        this.wechatBtn1.on("click", (event) => {
            cc.cs.UIMgr.showTip("第" + cc.cs.gameData.getlevelData(event.target.lev)["LEV_DAY"] + "天解锁")
        }, this.wechatBtn1)
        this.workBtn1.on("click", (event) => {
            cc.cs.UIMgr.showTip("第" + cc.cs.gameData.getlevelData(event.target.lev)["LEV_DAY"] + "天解锁")
        }, this.workBtn1)
        this.zoneBtn1.on("click", (event) => {
            cc.cs.UIMgr.showTip("第" + cc.cs.gameData.getlevelData(event.target.lev)["LEV_DAY"] + "天解锁")
        }, this.zoneBtn1)
        this.giftBtn1.on("click", (event) => {
            cc.cs.UIMgr.showTip("第" + cc.cs.gameData.getlevelData(event.target.lev)["LEV_DAY"] + "天解锁")
        }, this.giftBtn1)*/


        var leveldata = cc.cs.gameData.level["LEV_LEV_" + cc.cs.PlayerInfo.level]

        var animation = this.node.getChildByName("shengjidonghua").getComponent("cc.Animation")

        animation.on('finished', this.onAnimationFinished, this);

        this.computerDibian()
            //this.updateui()

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
            self.goSetting()

        }, this.settingBtn)

        this.buyGoldBtn.on("click", (event) => {

        }, this.buyGoldBtn)

        this.workBtn.on("click", (event) => {
            self.goWork()

        }, this.workBtn)

        this.loveBtn.on("click", (event) => {
            self.goLove()

        }, this.loveBtn)


        if (this.wechatBtn.active) {
            if (parseInt(cc.cs.PlayerInfo.guide_id) == 7) // 弹出电话按钮引导
            {
                cc.log("微信第一次激活")
                cc.cs.UIMgr.showGuide(parseInt(cc.cs.PlayerInfo.guide_id) + 1, this.wechatBtn, this)
            }
            if (cc.cs.PlayerInfo.canWechat()) {

                this.tipBG.active = true
                this.tipText.string = "快给" + cc.cs.PlayerInfo.NPCName + "发微信吧"
                if (cc.cs.PlayerInfo.exp >= leveldata["LEV_EXP"]) {

                    var psprite = this.wechatBtn.getChildByName("stars")
                    cc.cs.UIMgr.changeSprite(psprite, "common/notice_2")
                    this.tipBG.active = true
                } else {
                    var psprite = this.wechatBtn.getChildByName("stars")
                    cc.cs.UIMgr.changeSprite(psprite, "common/notice_1")
                    this.tipBG.active = false
                }


                this.wechatBtn.getChildByName("stars").active = true;
            } else {
                this.wechatBtn.getChildByName("stars").active = false;
            }
        }

        if (this.phoneBtn.active) {

            if (cc.cs.PlayerInfo.canPhone()) {

                this.tipBG.active = true

                this.tipText.string = "快给" + cc.cs.PlayerInfo.NPCName + "打电话吧"
                if (cc.cs.PlayerInfo.exp >= leveldata["LEV_EXP"]) {
                    this.tipBG.action = true

                    var psprite = this.phoneBtn.getChildByName("stars")
                    cc.cs.UIMgr.changeSprite(psprite, "common/notice_2")
                } else {
                    var psprite = this.phoneBtn.getChildByName("stars")
                    cc.cs.UIMgr.changeSprite(psprite, "common/notice_1")
                    this.tipBG.active = false
                }

                this.phoneBtn.getChildByName("stars").active = true;
            } else {
                this.phoneBtn.getChildByName("stars").active = false;

            }
        }
        this.setExp(cc.cs.PlayerInfo.exp, leveldata["LEV_EXP"])
            //this.setDiamond(cc.cs.PlayerInfo.Diamond)
        this.setGold(cc.cs.PlayerInfo.money)
        this.setDay(leveldata["LEV_DAY"])
            // var hehe = cc.sys.localStorage.getItem('ISSOUNDOFF')
            // cc.log("声音开关"+hehe)
        if (cc.cs.AudioMgr.GetSoundOff()) {
            this.SoundOff = true;
        }

        for (var j = 3; j <= 6; j++) {
            var isbuy = false;
            for (var i = 0; i < cc.cs.PlayerInfo.playerhotpacks.length; i++) {

                if (cc.cs.PlayerInfo.playerhotpacks[i].hot_id == j) // 已经买过
                {
                    isbuy = true;
                    break;
                }
            }

            if (isbuy == false) {
                this.now = j
                break;
            }
        }

        if (cc.cs.PlayerInfo.level >= 6) {
            if (this.now != 0)
                cc.cs.UIMgr.showPopBuy(this.now, this.buyLIJI, this)

        }


    },

    buyLIJI: function() {
        cc.cs.gameMgr.sendGoodBuy(3, this.now, 1, this.onLibaohandle, this)
    },

    onLibaohandle: function(ret) {

        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        cc.cs.UIMgr.closeNetView()
        if (JasonObject.success == true) {
            // cc.cs.UIMgr.closeNetView()
            cc.cs.UIMgr.showTip("购买成功", 1.0)
            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)



        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }

    },

    // called every frame, uncomment this function to activate update callback
    update: function(dt) {
        //this.actionDibianBtn(dt)
    },
});