cc.Class({
    extends: cc.Component,

    properties: {
        list : {
            type:cc.ScrollView,
            default:null
        },
        missionBg:{
            type:cc.Sprite,
            default:null
        },
        currentMissionBtn :{
            type:cc.Node,
            default:null
        },
        rewardText:{
            type:cc.Label,
            default:null
        },
        needTimeText:{
            type:cc.Label,
            default:null
        },
        goldText:{
            type:cc.Label,
            default:null
        },
        diamondText:{
            type:cc.Label,
            default:null
        },
        startBtn:{
            type:cc.Node,
            default:null
        },
        backBtn:{
            type:cc.Node,
            default:null
        },
        missionBtnList :[],

        missionItemPrefab :null,

    },

    chooseWork : function(target)
    {
        for (var j = 0; j <this.list.content.children.length; ++j)
        {
            if(this.list.content.children[j] != target)
            {
                this.list.content.children[j].getComponent ("missionItemComponent").isChoose(false)
            }
        }

        this.rewardText.string = cc.cs.gameData.work[target.csDataID]["REWARD"]
        this.needTimeText.string = cc.cs.gameData.work[target.csDataID]["EXECUTE_TIME"]
        target.getComponent ("missionItemComponent").isChoose(true)
    },

    loadWorkItem : function(id)
    {
        var self = this
        this.missionItemPrefab = cc.loader.getRes("prefab/missionItem", cc.Prefab)
        var workCount = 0
        for(var key in cc.cs.gameData.work)
            workCount++;
        var index = 1;
        for(var i = 0 ; i < workCount; ++i)
        {
            var itemNode = cc.instantiate(this.missionItemPrefab)
            var itemCom = itemNode.addComponent("missionItemComponent")

            itemNode.on("click", (event)=>{
                self.chooseWork(event.target)
            },itemNode)

            itemNode.active = true
            if(index == id)
            {
                itemCom.isChoose(true)
                this.rewardText.string = cc.cs.gameData.work["ID_"+index]["REWARD"]
                this.needTimeText.string = cc.cs.gameData.work["ID_"+index]["EXECUTE_TIME"]
            }else
            {
                itemCom.isChoose(false)
            }
            itemCom.setNameText(cc.cs.gameData.work["ID_"+index]["NAME"])
            itemNode.csDataID = "ID_"+index
            index++;
            cc.cs.UIMgr.addItem_verticalScrollView(this.list,itemNode,0)
        }
    },
    // use this for initialization
    onLoad: function () {
        
        this.loadWorkItem(1)
        this.startBtn.on("click", (event)=>{
                //添加开始工作代码
        },this.startBtn)
        this.backBtn.on("click", (event)=>{
                //添加回退代码
        },this.backBtn)
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
