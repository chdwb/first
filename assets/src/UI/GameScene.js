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
        MainView:{
            default:null,
            type:cc.Node,
        },
        MissonView:{
            default:null,
            type:cc.Node,
        },
        LoveView:{
            default:null,
            type:cc.Node,
        },
        ActionView:{
            default:null,
            type:cc.Node,
        },
        PhoneView:{
            default:null,
            type:cc.Node,
        },
        ZoneView:{
            default:null,
            type:cc.Node,
        },
        BagView:{
            default:null,
            type:cc.Node,
        },
        ShopView:{
            default:null,
            type:cc.Node,
        },
        
         SignRewardView:{
            default:null,
            type:cc.Node,
        },



        currentLayer:0,

    },

    SetView:function(type)
    {
        this.currentLayer = type
        this.MainView.active = ( cc.cs.UIMgr.MAINVIEW == type)
        this.MissonView.active = (cc.cs.UIMgr.MISSONVIEW == type);
        this.ActionView.active = (cc.cs.UIMgr.ACTIONVIEW == type);
        this.LoveView.active = (cc.cs.UIMgr.LOVEVIEW == type);
        this.PhoneView.active = (cc.cs.UIMgr.PHONEVIEW == type);
        this.ZoneView.active = (cc.cs.UIMgr.ZONEVIEW == type);
        this.BagView.active = (cc.cs.UIMgr.BAGVIEW == type); 
        this.ShopView.active = (cc.cs.UIMgr.SHOPVIEW == type); 
        this.SignRewardView.active = (cc.cs.UIMgr.SIGNREWARDVIEW == type); 

        if(cc.cs.UIMgr.PHONEVIEW == type || cc.cs.UIMgr.PHONEVIEW == type)
        {
            this.node.getChildByName("mainView").getComponent("mainView").updateui()
        }
    },

    /*ToLoveView:function()
    {
        this.MainView.active = false;
        this.MissonView.active = false;
        this.ActionView.active = false;
        this.LoveView.active = true;
        
    },
    ToMissonView:function()
    {
        this.MainView.active = false;
        this.MissonView.active = true;
        this.ActionView.active = false;
        
    },
     ToMainView:function()
    {
        this.MainView.active = true;
        this.MissonView.active = false;
        this.ActionView.active = false;
    },

     ToActionView:function()
    {
        this.MainView.active = false;
        this.MissonView.active = false;
        this.ActionView.active = true;
    },*/

    // use this for initialization
    onLoad: function () {
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
