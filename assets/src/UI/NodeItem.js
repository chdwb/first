cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        icon :{
            default: null,
            type: cc.Sprite,
        },
        
        ItmeNum :{
            default: null,
            type: cc.Label,
        },
        
        ItmeName :{
            default: null,
            type: cc.Label,
        },
        
         Icon:{
            default:null,
            type: cc.Sprite,
        },

         GoodID:0,

        Num:0,

    },

    // use this for initialization

    setGoodId:function(goodId)
    {
        //this.GoodID = name
        this.GoodID = goodId;
        
        var gooddata = cc.cs.gameData.goods["GOODS_ID_" +goodId]
            if(gooddata != undefined || goodId == 100)
            {
                cc.cs.UIMgr.changeSprite(this.Icon.node, "shop/goods/" + this.GoodID)
            }
    },

    setItmeNmae:function(name)
    {
        //this.GoodID = name
        this.ItmeName.string = name;
    },

    setItmeNum:function(num)
    {
        this.Num = num,
        this.ItmeNum.string = ""+num;
    },

     setItmeIcon:function(name)
    {
        //this.ItmeName.string = name;
    },

       onClick:function()
    {
        //this.ItmeName.string = name;
        var parent  = this.node.parent.parent.parent.parent.getComponent("bag").onItmeChoose(this.GoodID,this.Num)
    },

    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
