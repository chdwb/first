cc.Class({
    extends: cc.Component,

    properties: {
        list: {
            type: cc.ScrollView,
            default: null
        },
        missionBg: {
            type: cc.Sprite,
            default: null
        },
        currentMissionBtn: {
            type: cc.Node,
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
        diamondText: {
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

        missionBtnList: [],

        missionItemPrefab: null,

        currentWorkID:"",

    },

    startWork: function()
    {
        cc.log("token="+cc.cs.PlayerInfo.ApiToken)
        cc.log("workid="+this.currentWorkID)
        cc.cs.gameMgr.sendLove(cc.cs.PlayerInfo.ApiToken, this.currentWorkID, this.startWorkHandle, this)
    },

    startWorkHandle(ret)
    {
       
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.cs.UIMgr.showTip("开始约会", 1.0)
            var parent = this.node.parent
            
            parent.getComponent("GameScene").SetView(cc.cs.UIMgr.ACTIONVIEW)
            parent.getChildByName("actioningView").getComponent("actioningView").setActionInfo(JasonObject.content.info.executetime, this.currentWorkID, "image", this.DoneWork,this)
            cc.cs.PlayerInfo.Love_LogID = JasonObject.content.info.lovelog_id
            cc.log("work_logID"+JasonObject.content.info.lovelog_id)
           
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },

    DoneWork:function(ret)
    {
        cc.log("done work"+cc.cs.PlayerInfo.ApiToken)
        cc.log("done work"+cc.cs.PlayerInfo.Love_LogID)
        cc.cs.gameMgr.sendLoveDone(cc.cs.PlayerInfo.ApiToken, cc.cs.PlayerInfo.Love_LogID , this.DoneWorkHandle, this)
    },

    DoneWorkHandle:function(ret)
    {
        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            //cc.cs.UIMgr.showTip("工作完成", 1.0)
            cc.cs.UIMgr.showPopupO("hehe","约会完成了",()=>{

                var parent = this.node.parent
                parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)

            })
           
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
        //弹窗
    },

    

    chooseWork: function(target) {
        for (var j = 0; j < this.list.content.children.length; ++j) {
            if (this.list.content.children[j] != target) {
                this.list.content.children[j].getComponent("missionItemComponent").isChoose(false)
            }
        }

        this.rewardText.string = cc.cs.gameData.date[target.csDataID]["DATE_EXP"]
        this.needTimeText.string = cc.cs.gameData.date[target.csDataID]["DATE_EXECUTE_TIME"]
        this.currentWorkID = target.workID
        target.getComponent("missionItemComponent").isChoose(true)
    },

    loadWorkItem: function(id) {
        var self = this
        this.missionItemPrefab = cc.loader.getRes("prefab/missionItem", cc.Prefab)
        var workCount = cc.cs.gameData.date["TOTAL_COUNT"]
        var index = 1;
        for (var i = 0; i < workCount; ++i) {
            var itemNode = cc.instantiate(this.missionItemPrefab)
            var itemCom = itemNode.addComponent("missionItemComponent")

            itemNode.on("click", (event) => {
                self.chooseWork(event.target)
            }, itemNode)

            itemNode.active = true
            if (index == id) {
                itemCom.isChoose(true)
                this.rewardText.string = cc.cs.gameData.date["DATE_ID_" + index]["DATE_EXP"]
                this.needTimeText.string = cc.cs.gameData.date["DATE_ID_" + index]["DATE_EXECUTE_TIME"]
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

        this.loadWorkItem(1)
        this.currentWorkID = "1"
        this.startBtn.on("click", (event) => {
            //添加开始工作代码
            this.startWork()
        }, this.startBtn)
        this.backBtn.on("click", (event) => {
            //添加回退代码
            var parent = this.node.parent
            parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
   
        }, this.backBtn)
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});