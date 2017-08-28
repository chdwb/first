cc.Class({
    extends: cc.Component,

    properties: {
        list: {
            type: cc.ScrollView,
            default: null
        },
        expText: {
            type: cc.Label,
            default: null
        },
        heartShow: {
            type: cc.Node,
            default: null
        },
        maxShow: {
            type: cc.Node,
            default: null
        },
        goldText: {
            type: cc.Label,
            default: null
        },
        backBtn: {
            type: cc.Node,
            default: null
        },
        shopBtn:{
            type: cc.Button,
            default: null

        },
        missionBtnList: [],

        missionItemPrefab: null,

        currentWorkID: "1",

        dateLogID: "",
        isLoad : false
    },

    goShop: function() {
        cc.log("goShop LoveView")
        cc.cs.UIMgr.setShopType(2)
        cc.log("cc.cs.UIMgr = " + cc.cs.UIMgr.currentShopType)
        cc.cs.UIMgr.openView(cc.cs.UIMgr.SHOPVIEW)
        
    },
    setExp: function(currentExp, levlExp) {
        this.expText.string = currentExp + "/" + levlExp;
		 var heartTarget = this.node.getChildByName("expBG").getChildByName("qinmitaoxindi")
        cc.cs.UIMgr.setHeart(heartTarget, currentExp,levlExp)
    },

    refresh: function() {
        this.goldText.string = cc.cs.PlayerInfo.money
        var leveldata2 = cc.cs.gameData.level["LEV_LEV_" + (parseInt(cc.cs.PlayerInfo.level))]
        this.setExp(cc.cs.PlayerInfo.exp, leveldata2["LEV_EXP"])
        /*cc.log("loveview refresh")
        this.goldText.string = cc.cs.PlayerInfo.money
        if (cc.cs.PlayerInfo.getLoveFreeTimes(this.currentWorkID) <= 0) {
            this.startImage.active = false
            this.upImage.active = true
        } else {
            this.startImage.active = true
            this.upImage.active = false
        }
        this.needTimeText.string = "剩余次数:" + cc.cs.PlayerInfo.getLoveFreeTimes(this.currentWorkID)*/
    },

    startWork: function(id) {
        cc.log("token= " + cc.cs.PlayerInfo.api_token)
        cc.log("workid= " + this.currentWorkID)
        this.node.getTag();
        cc.cs.gameMgr.sendLove(cc.cs.PlayerInfo.api_token, this.currentWorkID, this.startWorkHandle, this)

    },
    upgradeWork: function() {
        cc.log("token=" + cc.cs.PlayerInfo.api_token)
        cc.log("workid=" + this.currentWorkID)
        cc.cs.gameMgr.sendUpgrade(cc.cs.PlayerInfo.api_token, this.currentWorkID, this.upgradeWorkHandle, this)
    },

    upgradeWorkHandle(ret) {
        cc.log(ret)
		cc.cs.UIMgr.closeNetView()
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success == true) {
            
            cc.cs.PlayerInfo.money = JasonObject.content.info.money
            cc.cs.PlayerInfo.work_id = JasonObject.content.info.work_id
            this.loadWorkItem(cc.cs.PlayerInfo.work_id)
            this.refresh()
            cc.cs.UIMgr.showTip("升级成功", 1.0)
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },

    startWorkHandle(ret) {

        var JasonObject = JSON.parse(ret);
		cc.cs.UIMgr.closeNetView()
        if (JasonObject.success === true) {
            
            cc.cs.UIMgr.showTip("开始恋爱", 1.0)
            var parent = this.node.parent

            parent.getComponent("GameScene").SetView(cc.cs.UIMgr.ACTIONVIEW)
            this.dateLogID = JasonObject.content.info.datelog_id
            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)
            parent.getChildByName("actioningView").getComponent("actioningView").setActionInfo(
                JasonObject.content.info.executetime,
                this.currentWorkID,
                false,
                this.DoneWork,
                this)

        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },

    DoneWork: function(ret) {
        cc.log(ret.dateLogID)
        cc.log("done work" + cc.cs.PlayerInfo.api_token)
        cc.log("done work  " + ret.DoneDateHandle)
        cc.cs.gameMgr.sendLoveDone(cc.cs.PlayerInfo.api_token, ret.dateLogID, ret.DoneDateHandle, ret)
    },

    DoneDateHandle: function(ret) {
        cc.log(ret)
        var JasonObject = JSON.parse(ret);
		cc.cs.UIMgr.closeNetView()
        if (JasonObject.success === true) {
           
            //cc.cs.UIMgr.showTip("工作完成", 1.0)
            /*cc.cs.PlayerInfo.level = JasonObject.content.info.level
            cc.cs.PlayerInfo.exp = JasonObject.content.info.exp
            cc.cs.PlayerInfo.playvideo = JasonObject.content.info.playvideo*/

            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)

            cc.log("video id 1= " + cc.cs.PlayerInfo.playvideo)
            cc.log("currentWorkID = " + this.currentWorkID)

            cc.cs.PlayerInfo["Love" + this.currentWorkID + "LeftTImes"] = JasonObject.content.info["date_id" + this.currentWorkID]

            this.needTimeText.string = "剩余次数:" + cc.cs.PlayerInfo.getLoveFreeTimes(this.currentWorkID)


            var array = cc.cs.PlayerInfo.Bag
            for (var i = 0; i < array.length; i++) {
                if (array[i].goods_id == JasonObject.content.info.goods_id) {
                    array[i].num = JasonObject.content.info.num
                    if (JasonObject.content.info.num == 0) {
                        array.splice(i, 1);
                    }
                    break;
                }
            }


            cc.cs.UIMgr.showPopupO("约会完成了", "约会完成了", () => {

                var parent = this.node.parent
                parent.getComponent("GameScene").SetView(cc.cs.UIMgr.LOVEVIEW)
            })
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
        //弹窗
    },


    buyLoveTime: function() {
        cc.cs.gameMgr.buyLoveTime(cc.cs.PlayerInfo.api_token, this.currentWorkID, this.buyLoveTimehandle, this)
    },

    buyLoveTimehandle: function(ret) {
        var JasonObject = JSON.parse(ret);
		cc.cs.UIMgr.closeNetView()
        if (JasonObject.success === true) {
            
            cc.cs.UIMgr.showTip("购买成功", 1.0)
            cc.log("loveid = " + this.currentWorkID)
            cc.cs.PlayerInfo.money = JasonObject.content.info.money
            cc.cs.PlayerInfo.updateLovePrice(this.currentWorkID, JasonObject.content.info["Love" + this.currentWorkID + "Price"])
            cc.cs.PlayerInfo.updateLoveFreeTimes(this.currentWorkID, JasonObject.content.info["date_id" + this.currentWorkID])
            cc.log("lefttime = " + cc.cs.PlayerInfo["Love" + this.currentWorkID + "LeftTImes"])

            this.needTimeText.string = "剩余次数:" + cc.cs.PlayerInfo["Love" + this.currentWorkID + "LeftTImes"]
            this.refresh()




        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },


    isLock: function(is) {
        if (is == false) {
            this.LockImage.active = false
            this.mask.active = false
                //this.rewardText.node.active = true
                //this.needTimeText.node.active = true
            this.startBtn.active = true
            this.startImage.active = true
            this.upImage.active = false
            this.goodsText.node.active = false;
        } else {
            this.LockImage.active = true
            this.mask.active = true
                //this.rewardText.node.active = false
                //this.needTimeText.node.active = false
            this.startBtn.active = false
            this.startImage.active = !false
            this.upImage.active = !true
            this.goodsText.node.active = false;
        }
    },

    chooseWork: function(target) {
        for (var j = 0; j < this.list.content.children.length; ++j) {
            if (this.list.content.children[j] != target) {
                this.list.content.children[j].getComponent("missionItemComponent").isChoose(false)
            }
        }
        this.currentWorkID = target.workID
        cc.log(cc.cs.gameData.date[target.csDataID]["DATE_NEED_LEVEL"] + " date " + cc.cs.PlayerInfo.level)
        if (cc.cs.gameData.date[target.csDataID]["DATE_NEED_LEVEL"] <= cc.cs.PlayerInfo.level) {
            this.isLock(false)
        } else {
            this.isLock(true)
            this.LockText.string = "等级" + cc.cs.gameData.date[target.csDataID]["DATE_NEED_LEVEL"] + "解锁"
        }
        this.rewardText.string = "每次获得：" + cc.cs.gameData.date[target.csDataID]["DATE_EXP"]
        this.needTimeText.string = "剩余次数:" + cc.cs.PlayerInfo.getLoveFreeTimes(this.currentWorkID)
        var goodsID = cc.cs.gameData.date[target.csDataID]["DATE_NEED_GOODS_ID"]
        if (goodsID != "dummy") {
            this.goodsText.node.active = true;
            this.goodsText.string = "需要道具：" + cc.cs.gameData.goods["GOODS_ID_" + goodsID]["GOODS_NAME"] + "x" + cc.cs.gameData.date[target.csDataID]["DATE_NEED_GOODS_COUNT"]
        }

        if (parseInt(cc.cs.PlayerInfo.getLoveFreeTimes(this.currentWorkID)) <= 0) {
            this.startImage.active = false
            this.upImage.active = true
        }

        target.getComponent("missionItemComponent").isChoose(true)
    },

    loadWorkItem: function() {
        var id = 1
        this.list.content.removeAllChildren(true)
        var self = this
        this.missionItemPrefab = cc.loader.getRes("prefab/missionItem", cc.Prefab)
        var workCount = cc.cs.gameData.date["TOTAL_COUNT"]
        var index = id;
        for (var i = id; i <= workCount; ++i) {
            var itemNode = cc.instantiate(this.missionItemPrefab)
            var itemCom = itemNode.addComponent("missionItemComponent")

            itemNode.on("click", (event) => {
                self.chooseWork(event.target)
            }, itemNode)

            itemNode.active = true
            if (index == id) {
                itemCom.isChoose(true)
                this.rewardText.string = "每次获得：" + cc.cs.gameData.date["DATE_ID_" + index]["DATE_EXP"]
                cc.log("-------------c--------- " + id)
                this.needTimeText.string = "剩余次数:" + cc.cs.PlayerInfo.getLoveFreeTimes(id)
                this.isLock(false)
                var goodsID = cc.cs.gameData.date["DATE_ID_" + index]["DATE_NEED_GOODS_ID"]
                if (goodsID != "dummy") {
                    this.goodsText.node.active = true;
                    this.goodsText.string = "需要道具：" + cc.cs.gameData.goods["GOODS_ID_" + goodsID]["GOODS_NAME"] + "x" + cc.cs.gameData.date[target.csDataID]["DATE_NEED_GOODS_COUNT"]
                }
                if (parseInt(cc.cs.PlayerInfo.getLoveFreeTimes(this.currentWorkID)) <= 0) {
                    self.startImage.active = false
                    self.upImage.active = true
                }
            } else {
                itemCom.isChoose(false)
            }
            itemCom.setNameText(cc.cs.gameData.date["DATE_ID_" + index]["DATE_NAME"])
            itemNode.csDataID = "DATE_ID_" + index
            itemNode.workID = "" + index
            index++;
            cc.cs.UIMgr.addItem_verticalScrollView(this.list, itemNode, 0)
        }
    },
    start:function(){
    },
    // use this for initialization
    onLoad: function() {
        cc.log("love view  onload")
        var self = this
        this.missionItemPrefab = cc.loader.getRes("prefab/missionItem", cc.Prefab)
        for(var i = cc.cs.gameData.date["FIRST"]; i <= cc.cs.gameData.date["LAST"]; ++i){
            var itemNode = cc.instantiate(this.missionItemPrefab)
            var itemCom = itemNode.getComponent("missionItemComponent")
            itemCom.setItem( i, false)
            cc.cs.UIMgr.addItem_horizontalScrollView(this.list, itemNode, 20)
        }

        cc.log("LoveView guidepos = "+cc.cs.PlayerInfo.guide_id)
        if(parseInt(cc.cs.PlayerInfo.guide_id) == 4) // 恋爱开始按钮
        {
            var children = this.list.content.getChildren();
            var itemCom = children[0].getComponent("missionItemComponent") // 第一个档位
            cc.cs.UIMgr.showGuide(parseInt(cc.cs.PlayerInfo.guide_id)+1,itemCom.getstartBtn(),this)
        }



        this.backBtn.on("click", (event) => {
            //添加回退代码
            var parent = self.node.parent
            cc.cs.UIMgr.closeView()

        }, this.backBtn)
       // this.refresh()
    },

    onEnable: function() {
        this.list.content.x = -this.list.node.width * 0.5
        var children = this.list.content.getChildren();
        var index = cc.cs.gameData.date["FIRST"]
        for(var i = 0; i < children.length; ++i){
            var itemCom = children[i].getComponent("missionItemComponent")
            itemCom.refresh()
            index++
        }
        this.refresh()

          var hehe2  = cc.random0To1() * 10
            
            if(hehe2 < 4  && cc.cs.PlayerInfo.date_fn == false )
            {
               
                 cc.cs.UIMgr.showPopBuy(2,this.buyLIJI,this)
            }
    },

     buyLIJI:function()
    {
        cc.cs.gameMgr.buyRightNow(3,this.onBuyRightNowhandle,this)
    },

     onBuyRightNowhandle:function(ret)
     {

         cc.log(ret)
        var JasonObject = JSON.parse(ret);
		cc.cs.UIMgr.closeNetView()
        if (JasonObject.success == true) 
        {
            
            cc.cs.UIMgr.showTip("购买成功", 1.0)
           if(this.isWork)
           {
            cc.cs.PlayerInfo.work_fn = JasonObject.content.info.work_fn
            cc.cs.PlayerInfo.date_fn = JasonObject.content.info.work_fn
           }
           else
           {
            cc.cs.PlayerInfo.date_fn = JasonObject.content.info.date_fn
             cc.cs.PlayerInfo.work_fn = JasonObject.content.info.date_fn
           }
           


        }else{
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }

     },


    /*goShop: function() {
        //var parent = this.node.parent
        //parent.getComponent("GameScene").SetView(cc.cs.UIMgr.SHOPVIEW)
        cc.cs.UIMgr.openView(cc.cs.UIMgr.SHOPVIEW)
    },*/

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});