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
        cc.cs.gameMgr.sendWork(cc.cs.PlayerInfo.ApiToken, this.currentWorkID, this.startWorkHandle, this)
    },

    startWorkHandle(ret)
    {
       
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.cs.UIMgr.showTip("开始工作", 1.0)
            var parent = this.node.parent
            parent.getComponent("GameScene").ToActionView()
            parent.getChildByName("actioningView").getComponent("actioningView").setActionInfo(JasonObject.content.info.executetime, this.currentWorkID, JasonObject.content.info.worklog_id, this.DoneWork,this)
            cc.cs.PlayerInfo.Work_LogID = JasonObject.content.info.worklog_id
            cc.log("work_logID"+JasonObject.content.info.worklog_id)
           
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },

    DoneWork:function(ret)
    {
        cc.log("done work"+cc.cs.PlayerInfo.ApiToken)
        cc.log("done work"+cc.cs.PlayerInfo.Work_LogID)
        cc.cs.gameMgr.sendWorkDone(cc.cs.PlayerInfo.ApiToken, cc.cs.PlayerInfo.Work_LogID , this.DoneWorkHandle, this)
    },

    DoneWorkHandle:function(ret)
    {
        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.cs.UIMgr.showTip("工作完成", 1.0)
           
           
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

        this.rewardText.string = cc.cs.gameData.work[target.csDataID]["REWARD"]
        this.needTimeText.string = cc.cs.gameData.work[target.csDataID]["EXECUTE_TIME"]
        this.currentWorkID = target.workID
        target.getComponent("missionItemComponent").isChoose(true)
    },

    loadWorkItem: function(id) {
        var self = this
        this.missionItemPrefab = cc.loader.getRes("prefab/missionItem", cc.Prefab)
        var workCount = cc.cs.gameData.work["TOTAL_COUNT"]
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
                this.rewardText.string = cc.cs.gameData.work["ID_" + index]["REWARD"]
                this.needTimeText.string = cc.cs.gameData.work["ID_" + index]["EXECUTE_TIME"]
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

        this.loadWorkItem(1)
        this.currentWorkID = "1"
        this.startBtn.on("click", (event) => {
            //添加开始工作代码
            this.startWork()
        }, this.startBtn)
        this.backBtn.on("click", (event) => {
            //添加回退代码
            var parent = this.node.parent
            parent.getComponent("GameScene").ToMainView()
        }, this.backBtn)
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});