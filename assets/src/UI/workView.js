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

        missionBtnList: [],

        missionItemPrefab: null,

        currentWorkID:"",

        workLogID : "",

    },

    refresh : function()
    {
        this.goldText.string = cc.cs.PlayerInfo.money
         this.needTimeText.string = "剩余次数:" + cc.cs.PlayerInfo.getWorkFreeTimes(this.currentWorkID)
    },

    goShop: function() {
        var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.SHOPVIEW)
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
        if (JasonObject.success == true) 
        {
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
        if (JasonObject.success === true) {
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
        if (JasonObject.success === true) {
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
        var self = this
        cc.log("............keng .... " +cc.cs.PlayerInfo.work_id)
        this.loadWorkItem(cc.cs.PlayerInfo.work_id)
        this.currentWorkID = "1"
        this.startBtn.on("click", (event) => {
            //添加开始工作代码

            if(self.currentWorkID == cc.cs.PlayerInfo.work_id)
                self.startWork()
            else 
                {
                    self.upgradeWork()
                }
            
        }, this.startBtn)
        this.backBtn.on("click", (event) => {
            //添加回退代码
            var parent = self.node.parent
            parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
   
        }, this.backBtn)
    },

    onEnable:function()
    {
        cc.log("refresh")
        this.refresh()
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});