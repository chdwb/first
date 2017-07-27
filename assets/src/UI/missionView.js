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
        changeMissionBtn :{
            type:cc.Node,
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
        missionBtnList :[],

        missionItemPrefab :null,

    },

    // use this for initialization
    onLoad: function () {
        this.missionItemPrefab = cc.loader.getRes("prefab/missionItem", cc.Prefab)
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
