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

         GiftView:{
            default:null,
            type:cc.Node,
        },

          WechatView:{
            default:null,
            type:cc.Node,
        },

        

         VideoView:{
            default:null,
            type:cc.Node,
        },

        CollectView:{
            default:null,
            type:cc.Node,
        },

        

           SettingView:{
            default:null,
            type:cc.Node,
        },

        audioBGM: {
            url: cc.AudioClip,
            default: null
        },

        audioCalling: {
            url: cc.AudioClip,
            default: null
        },

        audioClick: {
            url: cc.AudioClip,
            default: null
        },

        audioFacetime: {
            url: cc.AudioClip,
            default: null
        },

        audioNewMsg: {
            url: cc.AudioClip,
            default: null
        },

        audioReturn: {
            url: cc.AudioClip,
            default: null
        },
        



        currentLayer:0,

    },



     BackAudio:function(){

         cc.cs.AudioMgr.playAudio("return")

    },

    ClickAudio:function(){


         cc.cs.AudioMgr.playAudio("click")

    },

    SetView:function(type)
    {
        cc.log("now layer "+ type)
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
        this.GiftView.active = (cc.cs.UIMgr.GIFTVIEW == type); 
        this.WechatView.active = (cc.cs.UIMgr.WECHATVIEW == type); 
        this.VideoView.active = (cc.cs.UIMgr.VIDEOVIEW == type); 
        if(cc.cs.UIMgr.PHONEVIEW == type)
        {
            this.node.getChildByName("phoneView").getComponent("phoneView").showNormal()
        }

        if(cc.cs.UIMgr.MAINVIEW == type)
        {
            //cc.cs.AudioMgr.playAudio(this.audioReturn,false)
            this.node.getChildByName("mainView").getComponent("mainView").updateui()
        }

        if(cc.cs.UIMgr.MISSONVIEW == type)
        {
            this.node.getChildByName("missionView").getComponent("workView").refresh()
        }

        if(cc.cs.UIMgr.WECHATVIEW == type){
            cc.log("into wechatView")
            this.node.getChildByName("WechatView").getComponent("wechatView").refresh()
        }

        if(cc.cs.UIMgr.BAGVIEW == type)
        {
            cc.log("refresh bag")
            this.BagView.getComponent("bag").updateUI()
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
       
        cc.cs.UIMgr.gameScene = this

        

        var leveldata2 = cc.cs.gameData.level["LEV_LEV_" + (parseInt(cc.cs.PlayerInfo.level))]
        var music = leveldata2["MUSIC_ID"]
        cc.cs.AudioMgr.playBGM(music,true)

      // cc.cs.AudioMgr.playAudio("calling")
    },


    update:function(dt){
        
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
