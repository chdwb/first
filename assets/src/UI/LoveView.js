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
        goodsText:{
            type: cc.Label,
            default: null
        },

        missionBtnList: [],

        missionItemPrefab: null,

        currentWorkID:"",

        dateLogID : "",

    },

    refresh : function()
    {
        this.goldText.string = cc.cs.PlayerInfo.Money
    },

    startWork: function(id)
    {
        cc.log("token= "+cc.cs.PlayerInfo.ApiToken)
        cc.log("workid= "+this.currentWorkID)
        this.node.getTag();
        cc.cs.gameMgr.sendLove(cc.cs.PlayerInfo.ApiToken, this.currentWorkID, this.startWorkHandle, this)
        
    },
    upgradeWork : function()
    {
        cc.log("token="+cc.cs.PlayerInfo.ApiToken)
        cc.log("workid="+this.currentWorkID)
        cc.cs.gameMgr.sendUpgrade(cc.cs.PlayerInfo.ApiToken, this.currentWorkID, this.upgradeWorkHandle, this)
    },

    upgradeWorkHandle(ret)
    {
        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success == true) 
        {
            cc.cs.PlayerInfo.Money = JasonObject.content.info.money
            cc.cs.PlayerInfo.Work_ID = JasonObject.content.info.work_id
            this.loadWorkItem(cc.cs.PlayerInfo.Work_ID)
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
            cc.cs.UIMgr.showTip("开始恋爱", 1.0)
            var parent = this.node.parent
            
            parent.getComponent("GameScene").SetView(cc.cs.UIMgr.ACTIONVIEW)
            this.dateLogID = JasonObject.content.info.datelog_id
            cc.log("lovesetActionInfosetActionInfosetActionInfosetActionInfo")
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

    DoneWork:function(ret)
    {
        cc.log(ret.dateLogID)
        cc.log("done work"+cc.cs.PlayerInfo.ApiToken)
        cc.log("done work  "+ret.DoneDateHandle)
        cc.cs.gameMgr.sendLoveDone(cc.cs.PlayerInfo.ApiToken, ret.dateLogID  , ret.DoneDateHandle, ret)
    },

    DoneDateHandle:function(ret)
    {
        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            //cc.cs.UIMgr.showTip("工作完成", 1.0)
            cc.cs.PlayerInfo.Level = JasonObject.content.info.level
            cc.cs.PlayerInfo.Exp = JasonObject.content.info.exp
            cc.cs.PlayerInfo.videoID = JasonObject.content.info.playvideo
            cc.cs.PlayerInfo["Love"+this.currentWorkID+"LeftTImes"] = JasonObject.content.info["date_id" + this.currentWorkID]
            this.needTimeText.string = "剩余次数:" + cc.cs.PlayerInfo["Love"+this.currentWorkID+"LeftTImes"]

            
            var array = cc.cs.PlayerInfo.Bag
            for(var i = 0;i < array.length;i++)
            {
               if( array[i].goods_id == JasonObject.content.info.goods_id)
               {
                   array[i].num = JasonObject.content.info.num
                   if(JasonObject.content.info.num == 0 )
                   {
                       array.splice(i,1);
                   }
                   break;
               }
            }


            cc.cs.UIMgr.showPopupO("约会完成了","约会完成了",()=>{

                var parent = this.node.parent
                parent.getComponent("GameScene").SetView(cc.cs.UIMgr.LOVEVIEW)
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
            //this.rewardText.node.active = true
            //this.needTimeText.node.active = true
             this.startBtn.active = true
            this.startImage.active = true
            this.upImage.active = false
            this.goodsText.node.active =false;
        }else
        {
            this.LockImage.active  = true
            this.mask.active  = true
            //this.rewardText.node.active = false
            //this.needTimeText.node.active = false
            this.startBtn.active = false
            this.startImage.active = !false
            this.upImage.active = !true
            this.goodsText.node.active =false;
        }
    },

    chooseWork: function(target) {
        for (var j = 0; j < this.list.content.children.length; ++j) {
            if (this.list.content.children[j] != target) {
                this.list.content.children[j].getComponent("missionItemComponent").isChoose(false)
            }
        }
        this.currentWorkID = target.workID
        cc.log(cc.cs.gameData.date[target.csDataID]["DATE_NEED_LEVEL"] + " date "  + cc.cs.PlayerInfo.Level)
        if(cc.cs.gameData.date[target.csDataID]["DATE_NEED_LEVEL"] <= cc.cs.PlayerInfo.Level)
        {
            this.isLock(false) 
        }else
        {
            this.isLock(true)
            this.LockText.string = "等级" + cc.cs.gameData.date[target.csDataID]["DATE_NEED_LEVEL"] + "解锁" 
        }
        this.rewardText.string = "每次获得："+ cc.cs.gameData.date[target.csDataID]["DATE_EXP"]
            this.needTimeText.string = "剩余次数:" + cc.cs.PlayerInfo["Love"+this.currentWorkID+"LeftTImes"]
        var goodsID = cc.cs.gameData.date[target.csDataID]["DATE_NEED_GOODS_ID"]
        if(goodsID != "dummy")
        {
            this.goodsText.node.active =true;
            this.goodsText.string = "需要道具：" +cc.cs.gameData.goods["GOODS_ID_"+goodsID]["GOODS_NAME"]+"x"+cc.cs.gameData.date[target.csDataID]["DATE_NEED_GOODS_COUNT"]  
        }

        if(parseInt(cc.cs.PlayerInfo["Love"+this.currentWorkID+"LeftTImes"]) <= 0){
            this.startImage.active = false
            this.upImage.active = true
        }
    
        target.getComponent("missionItemComponent").isChoose(true)
    },

    loadWorkItem: function() {
        var id= 1
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
                this.rewardText.string = "每次获得："+ cc.cs.gameData.date["DATE_ID_" + index]["DATE_EXP"]
                cc.log("-------------c--------- " + id)
                this.needTimeText.string = "剩余次数:" + cc.cs.PlayerInfo["Love"+id+"LeftTImes"]
                this.isLock(false)
                var goodsID = cc.cs.gameData.date["DATE_ID_" + index]["DATE_NEED_GOODS_ID"]
                if(goodsID != "dummy")
                {
                    this.goodsText.node.active =true;
                    this.goodsText.string = "需要道具：" +cc.cs.gameData.goods["GOODS_ID_"+goodsID]["GOODS_NAME"]+"x"+cc.cs.gameData.date[target.csDataID]["DATE_NEED_GOODS_COUNT"]  
                }
                if(parseInt(cc.cs.PlayerInfo["Love"+this.currentWorkID+"LeftTImes"]) <= 0){
                    this.startImage.active = false
                    this.upImage.active = true
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
    // use this for initialization
    onLoad: function() {
        var self = this
        cc.log("............keng .... " +cc.cs.PlayerInfo.Work_ID)
        this.loadWorkItem(cc.cs.PlayerInfo.Work_ID)
        this.currentWorkID = "1"
        this.startBtn.on("click", (event) => {
            //添加开始工作代码
              cc.log("startbtn")
             if(parseInt(cc.cs.PlayerInfo["Love"+self.currentWorkID+"LeftTImes"]) <= 0)
                cc.cs.UIMgr.showTip("约会机会不够",1.0)
                
            else 
                {
                    self.startWork()
                }
            
        }, this.startBtn)
        this.backBtn.on("click", (event) => {
            //添加回退代码
            var parent = self.node.parent
            parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
   
        }, this.backBtn)
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});