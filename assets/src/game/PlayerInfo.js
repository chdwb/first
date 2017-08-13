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
        PlayerNmae: "宅男",

        api_token: "",

        welcome: "",

        level: 1,

        sign: false,

        exp: 0,

        Power: 0,

        Money: 0,

        Diamond: 0,

        FreeWork: 2,

        Phone_ID: 0,

        wechat_id: 0,

        zoneThumbsUp_id: 0,

        zoneReplay_id: 0,

        work_id: 0,

        worklogid: 0,

        WorkLeftTimes :[],
        loveLeftTimes :[],
        LovePrice : [],

        /*Work1LeftTImes: 0,

        Work2LeftTImes: 0,

        Work3LeftTImes: 0,

        Work4LeftTImes: 0,

        Work5LeftTImes: 0,

        Work6LeftTImes: 0,

        Work7LeftTImes: 0,

        Work8LeftTImes: 0,

        Work9LeftTImes: 0,

        Work10LeftTImes: 0,

        Love1LeftTImes: 0,

        Love2LeftTImes: 0,

        Love3LeftTImes: 0,

        Love4LeftTImes: 0,
        Love5LeftTImes: 0,
        Love6LeftTImes: 0,
        Love7LeftTImes: 0,


        Love1Price: 0,
        Love2Price: 0,
        Love3Price: 0,
        Love4Price: 0,
        Love5Price: 0,
        Love6Price: 0,
        Love7Price: 0,*/



        date_id: 0,

        datelogid: 0,

        NPCName: "许梦田",

        signday: 0,

        day: 0,
        playvideo: 0,


        Phone_player_ID: [],
        wechat_player_ID: [],
        weibo_thumbs: [],
        replies: [],

        playvideo :0,   

        Bag: [],


        wechat_fn: false,
        zone_fn: false,
        date_fn: false,
        work_fn: false,

        executetime:0,

    },

    updateLovePrice : function(id, value){
        this.LovePrice[id -1] = parseInt(value)
    },

    addZoneReplies : function(value){
        this.replies.push(parseInt(value))
    },

    addZoneThumbs : function(value){
        this.weibo_thumbs.push(parseInt(value))
    },

    addWechatPlayerID : function(value){
        this.wechat_player_ID.push(parseInt(value))
    },

    addPhonePlayerID : function(value){
        this.Phone_player_ID.push(parseInt(value))
    },

    getWorkFreeTimes : function(id){
        return this.WorkLeftTimes[id - 1]
    },

    getLoveFreeTimes : function(id){
        return this.loveLeftTimes[id - 1]
    },

    updateLoveFreeTimes : function(id, value){
        this.loveLeftTimes[id - 1] =  parseInt(value)
    },

    updateWorkFreeTimes : function(id, value){
        this.WorkLeftTimes[id - 1] = parseInt(value)
    },

    updateExp : function(exp) {
        this.exp = parseInt(exp)
    },

    updateLevel : function(lev){
        this.level = parseInt(lev)
    },

    updatePhoenID : function(phoneID){
        this.Phone_ID = parseInt(phoneID)
    },

    updateWechatID : function(phoneID){
        this.wechat_id = parseInt(phoneID)
    },

    updateWorkID : function(workID){
        this.work_id = parseInt(workID) 
    },

    updateLoveID : function(LoveID){
        this.date_id = parseInt(LoveID)
    },

    updateMoney : function (money){
        this.money = parseInt(money)
    },

    updateFreeWorkTimes : function(freeWork){
        this.FreeWork = parseInt(freeWork)
    },

    refreshInfoData : function (info){
        for(var item in info){
            if(this.hasOwnProperty(item)){
                this[item] = info[item]
            }
        }
    },

    canWechat : function(){
        var pWechatData = cc.cs.gameData.getwechatData(this.wechat_id)
        if(pWechatData != null){
                if(pWechatData["WECHAT_LEVEL"] <= this.level){
                    if(pWechatData["WECHAT_NEXT"] != "dummy")
                    {
                        return true
                    }else{
                        return false
                    }
                }else{
                    return false
                }
            }
        return false
    },

    canPhone : function(){
        var pPhoneData = cc.cs.gameData.getphoneData(this.Phone_ID)
        if(pPhoneData != null){
            if(pPhoneData["PHONE_LEV"] <= this.level){
                if(pPhoneData["PHONE_AUDIO"] != "dummy")
                {
                    return true
                }else{
                    return false
                }
            }else{
                return false
            }
        }

        return false
    },

    /*getZoneReplyID: function(id) {
        var pReplyData = null
        for (var i = 0; i < this.replies.length; i++) {
            //pReplyData = getreplyData(this.replies[i])
            if (id ==
                cc.cs.gameData.reply["ID_" + ]["ZONE_ID"])
                return this.replies[i]
        }
        return 0
    },*/

    visibleZoneCount:function(){
        var count = 0;
        var pZoneData = null
        for(var i = 1; i <= cc.cs.gameData.zone["TOTAL_COUNT"]; ++i){
            pZoneData = cc.cs.gameData.getzoneData(i);
            if(pZoneData != null){
             if(this.level >= pZoneData["ZONE_LEVEL"]){
                    count++
                }else{
                    return count
                }
            }
        }
        return count
    },

    addNewZone : function(lastID){
        var pZoneData = cc.cs.gameData.getzoneData(lastID);
        if(pZoneData != null){
            if(this.level > pZoneData["ZONE_LEVEL"]){
                return lastID +1
            }
        }
        return lastID
    },

    getDay: function(d) {
        if (d == 0)
            return "今天"
        if (d == 1)
            return "昨天"
        if (d == 2)
            return "前天"

        return d + "天前"
    },

    getZoneDay : function(id){
        var pZoneData = cc.cs.gameData.getzoneData(id);
        var pLevel = cc.cs.gameData.getlevelData(this.level);
        var pLevelZone = cc.cs.gameData.getlevelData(pZoneData["ZONE_LEVEL"]);
        return this.getDay(pLevel["LEV_DAY"] - pLevelZone["LEV_DAY"])
    },

    canZone : function(){
        var count  = this.visibleZoneCount() +cc.cs.gameData.zone["FIRST"]
        for(var i = cc.cs.gameData.zone["FIRST"]; i < count; ++i){
            if(this.canPLZone(i) || this.canZanZone(i))
                return true
        }
        return false;
    },

    canZanZone: function(id) {
        for (var i = 0; i < this.weibo_thumbs.length; i++) {
            if (id == this.weibo_thumbs[i]) return false;
        }
        return true;
    },

    canPLZone: function(id) {
        var pZoneData = cc.cs.gameData.getzoneData(id);
        var PZoneReply = null
        for (var i = 0; i < this.replies.length; i++) {
            PZoneReply = cc.cs.gameData.getreplyData(this.replies[i]);
            if (pZoneData["ZONE_LEVEL"] ==
                PZoneReply["REPLY_LEVEL"])
                return false;
        }
        return true;
    },

    // use this for initialization
    onLoad: function() {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});