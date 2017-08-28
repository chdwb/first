cc.Class({
    extends: cc.Component,

    properties: {
        list: {
            type: cc.ScrollView,
            default: null
        },
        rewardText: {
            type: cc.Label,
            default: null
        },
        needTimeText: {
            type: cc.Label,
            default: null
        },
        goldText: {
            type: cc.Label,
            default: null
        },
        startBtn: {
            type: cc.Node,
            default: null
        },
        backBtn: {
            type: cc.Node,
            default: null
        },
        LockImage: {
            type: cc.Node,
            default: null
        },
        LockText: {
            type: cc.Label,
            default: null
        },
        mask: {
            type: cc.Node,
            default: null
        },
        startImage:{
            type: cc.Node,
            default: null
        },
        upImage:{
            type: cc.Node,
            default: null
        },

        shopBtn:{
            type: cc.Button,
            default: null
        },

        missionBtnList: [],

        missionItemPrefab: null,

        currentWorkID:"",

        workLogID : "",

        n:0,

    },

    refresh : function()
    {
        cc.log("WORKVIEW UPDATE MONMEY")
        this.goldText.string = cc.cs.PlayerInfo.money
         //this.needTimeText.string = "剩余次数:" + cc.cs.PlayerInfo.getWorkFreeTimes(this.currentWorkID)
        
    },

    refreshItem:function()
    {
        this.refresh()
        this.list.content.removeAllChildren(true)

          this.missionItemPrefab = cc.loader.getRes("prefab/missionItem", cc.Prefab)
        for(var i = parseInt(cc.cs.PlayerInfo.work_id); i <= cc.cs.gameData.work["LAST"]; ++i){
            var itemNode = cc.instantiate(this.missionItemPrefab)
            var itemCom = itemNode.getComponent("missionItemComponent")
            itemCom.setItem( i, true)
            cc.cs.UIMgr.addItem_horizontalScrollView(this.list, itemNode, 20)
        }

        this.list.content.x = -this.list.node.width * 0.5
        var children = this.list.content.getChildren();
        var index =parseInt(cc.cs.PlayerInfo.work_id)
        for(var i = 0; i < children.length; ++i){
            var itemCom = children[i].getComponent("missionItemComponent")
            itemCom.refresh()
            index++
        }

    },

    goShop: function() {
        //var parent = this.node.parent
        //parent.getComponent("GameScene").SetView(cc.cs.UIMgr.SHOPVIEW)
        cc.log("goShop LoveView")
        cc.log("cc.cs. = " + cc.cs.UIMgr.currentShopType)
        cc.cs.UIMgr.openView(cc.cs.UIMgr.SHOPVIEW)

    },

    startWork: function(id)
    {
        cc.log("token="+cc.cs.PlayerInfo.api_token)
        cc.log("workid="+this.currentWorkID)
        this.node.getTag();
        cc.cs.gameMgr.sendWork(cc.cs.PlayerInfo.api_token, this.currentWorkID, this.startWorkHandle, this)
    },
    upgradeWork : function()
    {
        cc.log("token="+cc.cs.PlayerInfo.api_token)
        cc.log("workid="+this.currentWorkID)
        cc.cs.gameMgr.sendUpgrade(cc.cs.PlayerInfo.api_token, this.currentWorkID, this.upgradeWorkHandle, this)
    },

    upgradeWorkHandle(ret)
    {
        cc.log(ret)
        var JasonObject = JSON.parse(ret);
		cc.cs.UIMgr.closeNetView()
        if (JasonObject.success == true) 
        {

            //cc.cs.UIMgr.closeNetView()
            cc.cs.PlayerInfo.money = JasonObject.content.info.money
            cc.cs.PlayerInfo.work_id = JasonObject.content.info.work_id
            this.loadWorkItem(cc.cs.PlayerInfo.work_id)
            this.refresh()
            cc.cs.UIMgr.showTip("升级成功", 1.0)
        }else{
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },

    startWorkHandle(ret)
    {
       
        var JasonObject = JSON.parse(ret);
		cc.cs.UIMgr.closeNetView()
        if (JasonObject.success === true) {
            //cc.cs.UIMgr.closeNetView()
            cc.cs.UIMgr.showTip("开始工作", 1.0)
            var parent = this.node.parent
            
            parent.getComponent("GameScene").SetView(cc.cs.UIMgr.ACTIONVIEW)
            this.workLogID = JasonObject.content.info.worklog_id

            parent.getChildByName("actioningView").getComponent("actioningView").setActionInfo(
                JasonObject.content.info.executetime,
                 this.currentWorkID, 
                 true,
                 this.DoneWork,
                 this)
            cc.cs.PlayerInfo.worklogid = JasonObject.content.info.worklog_id
            cc.log("work_logID"+this.workLogID)
           
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },

    DoneWork:function(ret)
    {
        cc.log("done work"+cc.cs.PlayerInfo.api_token)
        cc.log("done work"+ret.workLogID)
        cc.cs.gameMgr.sendWorkDone(cc.cs.PlayerInfo.api_token, ret.workLogID  , ret.DoneWorkHandle, ret)
    },

    DoneWorkHandle:function(ret)
    {
        cc.log(ret)
        var JasonObject = JSON.parse(ret);
		cc.cs.UIMgr.closeNetView()
        if (JasonObject.success === true) {
            //cc.cs.UIMgr.closeNetView()
            //cc.cs.UIMgr.showTip("工作完成", 1.0)
            cc.cs.PlayerInfo.money = JasonObject.content.info.money
            cc.cs.PlayerInfo.updateWorkFreeTimes(this.currentWorkID, JasonObject.content.info["work_id" + this.currentWorkID])
            this.needTimeText.string = "剩余次数:" + cc.cs.PlayerInfo.getWorkFreeTimes(this.currentWorkID)
            cc.cs.UIMgr.showPopupO("工作完成了","工作完成了",()=>{

                var parent = this.node.parent
                parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MISSONVIEW)
            })
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
        //弹窗
    },

    isLock : function(is){
        if(is == false)
        {
            this.LockImage.active  = false
            this.mask.active  = false
            this.rewardText.node.active = true
            this.needTimeText.node.active = true
            this.startImage.active = true
            this.upImage.active = false
        }else
        {
            this.LockImage.active  = true
            this.mask.active  = true
            this.rewardText.node.active = false
            this.needTimeText.node.active = false
            this.startImage.active = false
            this.upImage.active = true
        }
    },

    chooseWork: function(target) {
        for (var j = 0; j < this.list.content.children.length; ++j) {
            if (this.list.content.children[j] != target) {
                this.list.content.children[j].getComponent("missionItemComponent").isChoose(false)
            }
        }
        this.currentWorkID = target.workID
        if(target.csDataID == "ID_"+cc.cs.PlayerInfo.work_id)
        {
            this.isLock(false)
            this.rewardText.string = "每次获得："+ cc.cs.gameData.work[target.csDataID]["REWARD"]
            this.needTimeText.string = "剩余次数:" + cc.cs.PlayerInfo.getWorkFreeTimes(this.currentWorkID)
        }else
        {
            this.isLock(true)
            this.LockText.string = "升级需要 "+ cc.cs.gameData.work[target.csDataID]["NEED_GOLD"] + " 金币" 
        }
       
        
        target.getComponent("missionItemComponent").isChoose(true)
    },

    loadWorkItem: function(id) {
        this.list.content.removeAllChildren(true)
        var self = this
        this.missionItemPrefab = cc.loader.getRes("prefab/missionItem", cc.Prefab)
        var workCount = cc.cs.gameData.work["TOTAL_COUNT"]
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
                this.rewardText.string = "每次获得："+ cc.cs.gameData.work["ID_" + index]["REWARD"]
                cc.log("-------------c--------- " + id)
                this.needTimeText.string = "剩余次数:" + cc.cs.PlayerInfo.getWorkFreeTimes(id)
                this.isLock(false)
            } else {
                itemCom.isChoose(false)
            }
            itemCom.setNameText(cc.cs.gameData.work["ID_" + index]["NAME"])
            itemNode.csDataID = "ID_" + index
            itemNode.workID = "" + index
            index++;
            cc.cs.UIMgr.addItem_verticalScrollView(this.list, itemNode, 0)
        }
    },
    // use this for initialization
    onLoad: function() {
       cc.log("work view  onload")
        var self = this
        this.backBtn.on("click", (event) => {
            //添加回退代码
            var parent = self.node.parent
            cc.cs.UIMgr.closeView()

        }, this.backBtn)
    },

     buyPop:function() // 职位礼包
    {

        cc.cs.gameMgr.sendGoodBuy( 4,this.n - 10, 1, this.onLibaohandle, this)

    },

    buyLIJI:function()
    {
        cc.cs.gameMgr.buyRightNow(3,this.onBuyRightNowhandle,this)
    },

     onBuyRightNowhandle:function(ret)
     {

         cc.log(ret)
		 cc.cs.UIMgr.closeNetView()
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success == true) 
        {
            //cc.cs.UIMgr.closeNetView()
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

      onLibaohandle:function(ret)
    {
        cc.log("libao update")
		cc.cs.UIMgr.closeNetView()
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
           // cc.cs.UIMgr.closeNetView()
            cc.cs.UIMgr.showTip("购买成功", 1.0)
            var parent = this.node.parent
            
            cc.cs.PlayerInfo.money = JasonObject.content.info.money
            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)
            this.refreshItem()
            this.refresh()
           
            
            
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },

    onEnable:function()
    {
        this.refreshItem()
        this.refresh()
        cc.log("WorkView guidepos = "+cc.cs.PlayerInfo.guide_id)
        if(parseInt(cc.cs.PlayerInfo.guide_id) == 10) // 工作开始按钮
        {
            var children = this.list.content.getChildren();
            var itemCom = children[0].getComponent("missionItemComponent") // 第一个档位
            cc.cs.UIMgr.showGuide(parseInt(cc.cs.PlayerInfo.guide_id)+1,itemCom.getstartBtn(),this)
        }
        else
        {

            var hehe  = cc.random0To1() * 10
            cc.log("hehe =" + hehe)
            if(hehe < 4)
            {
                //var n = 0;
                if(cc.cs.PlayerInfo.work_id < 3)
                {
                   this.n = 11

                }
                else if(cc.cs.PlayerInfo.work_id < 5)
                {
                    this.n = 12
                }
                else if(cc.cs.PlayerInfo.work_id < 7)
                {
                    this.n = 13
                }
                else if(cc.cs.PlayerInfo.work_id < 10)
                {
                    this.n = 14
                }
                 if(this.n!=0)
                cc.cs.UIMgr.showPopBuy(this.n, this.buyPop, this)
            }


             var hehe2  = cc.random0To1() * 10
            
            if(hehe2 < 4 && hehe > 4 && cc.cs.PlayerInfo.work_fn == false)
            {
               
                 cc.cs.UIMgr.showPopBuy(2,this.buyLIJI,this)
            }

        }


    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

});