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
        PlayerNmae : "宅男",

        ApiToken : "",

        Welcome : "",

        Level:1,

        Sign:false,

        Exp:0,

        Power:0,

        Money:0,

        Diamond:0,

        FreeWork:2,

        Phone_ID:0,

        Wechat_ID:0,

        ZoneThumbsUp_ID:0,

        ZoneReplay_ID:0,

        Work_ID:0,

        Work_LogID:0,

        Work1LeftTImes:0,

        Work2LeftTImes:0,

        Work3LeftTImes:0,

        Work4LeftTImes:0,

        Work5LeftTImes:0,

        Work6LeftTImes:0,

        Work7LeftTImes:0,

        Work8LeftTImes:0,

        Work9LeftTImes:0,

        Work10LeftTImes:0,

        Love1LeftTImes:0,

        Love2LeftTImes:0,

        Love3LeftTImes:0,

        Love4LeftTImes:0,
        Love5LeftTImes:0,
        Love6LeftTImes:0,
        Love7LeftTImes:0,

        Love_ID:0,

        Love_LogID:0,

        NPCName:"许梦田",
        
        signday:0,

        day:0,
        videoID:0,


        Phone_player_ID:[],
        wechat_player_ID:[],
        weibo_thumbs:[],
        replies:[],



        Bag:[],

},

    getZoneReplyID : function(id){
        for(var i = 0 ;i < this.replies.length; i++)
        {
            if(id == 
            cc.cs.gameData.reply["ID_"+this.replies[i]]["ZONE_ID"])
            return this.replies[i]
        }
        return 0
    },

    canZanZone:function(id){
       
        for(var i = 0 ;i < this.weibo_thumbs.length; i++)
        {
            if(id == this.weibo_thumbs[i])return false;
        }
        return true;
    },

    canPLZone:function(id){
        for(var i = 0 ;i < this.replies.length; i++)
        {
            if(id == 
            cc.cs.gameData.reply["ID_"+this.replies[i]]["ZONE_ID"])
                return false;
        }
        return true;
    },

    // use this for initialization
    onLoad: function () {
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
