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
        lock:{
            default:null,
            type : cc.Node
        }
        
        ,
        
        Icon:{
            default:null,
            type : cc.Sprite
        },
        
        Play:{
            default:null,
            type : cc.Node
        },

        JinBi:{

            default:null,
            type : cc.Node

        },
        
        Name:{
            
            default:null,
            type : cc.Label
        },
        Price:{
            
            default:null,
            type : cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        this.Play.active = false
        this.JinBi.active = true

    },

    setVideo: function( videodata ){

        this.videoID = videodata["VIDEO_ID"];
        this.Name.string = videodata["VIDEO_NAME"]
        this.Price.string = videodata["VIDEO_NEED_MONEY"]
        //this.itemDec.string = good["GOODS_DESC"]
        cc.log(this.videoID)
        cc.cs.UIMgr.changeSprite(this.Icon.node, "video_icon/" + this.videoID)

    }
    
    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
