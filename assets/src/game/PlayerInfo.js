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

        diamond: 0,

        FreeWork: 2,

        Phone_ID: 0,

        wechat_id: 0,

        zoneThumbsUp_id: 0,

        zoneReplay_id: 0,

        work_id: 0,

        worklog_id: 0,

        guide_id: 0,

        WorkLeftTimes: [],
        loveLeftTimes: [],
        goodsLeftTimes:[],
        LovePrice: [],

        date_id: 0,

        datelog_id: 0,

        NPCName: "许梦甜",

        signday: 0,

        day: 0,
        playvideo: 0,


        Phone_player_ID: [],
        wechat_player_ID: [],
        weibo_thumbs: [],
        replies_: [],

        playvideo: 0,

        Bag: [],

        playerbuyvideos:[],
        playerhotpacks:[],



        wechat_fn: false,
        zone_fn: false,
        date_fn: false,
        work_fn: false,

        executetime: 0,
    },

    updateLovePrice: function(id, value) {
        id = parseInt(id)
        this.LovePrice[id - 1] = parseInt(value)
    },

    getLovePrice: function(id) {
        id = parseInt(id)
        return this.LovePrice[id - 1]
    },

    addZoneReplies: function(value) {
       
        this.replies_.push(parseInt(value))
    },

    addZoneThumbs: function(value) {
        this.weibo_thumbs.push(parseInt(value))
    },

    addWechatPlayerID: function(value) {
        this.wechat_player_ID.push(parseInt(value))
    },

    addPhonePlayerID: function(value) {
        this.Phone_player_ID.push(parseInt(value))
    },

    getWorkFreeTimes: function(id) {
        id = parseInt(id)
        return this.WorkLeftTimes[id - 1]
    },

    getLoveFreeTimes: function(id) {
        id = parseInt(id)
        return this.loveLeftTimes[id - 1]
    },

    updateLoveFreeTimes: function(id, value) {
        id = parseInt(id)
        this.loveLeftTimes[id - 1] = parseInt(value)
    },

    updateGoodsTimes: function(id, value) {
        id = parseInt(id)
        this.goodsLeftTimes[id - 1] = parseInt(value)
    },

    getGoodsTimes: function(id) {
        id = parseInt(id)
        return this.goodsLeftTimes[id - 1]
    },

    updateWorkFreeTimes: function(id, value) {
        id = parseInt(id)
        this.WorkLeftTimes[id - 1] = parseInt(value)
    },

    updateExp: function(exp) {
        this.exp = parseInt(exp)
    },

    updateLevel: function(lev) {
        this.level = parseInt(lev)
    },

    updatePhoenID: function(phoneID) {
        this.Phone_ID = parseInt(phoneID)
    },

    updateWechatID: function(phoneID) {
        this.wechat_id = parseInt(phoneID)
    },

    updateWorkID: function(workID) {
        this.work_id = parseInt(workID)
    },

    updateLoveID: function(LoveID) {
        this.date_id = parseInt(LoveID)
    },

    updateMoney: function(money) {
        this.money = parseInt(money)
    },

    updateFreeWorkTimes: function(freeWork) {
        this.FreeWork = parseInt(freeWork)
    },

    modfiyBag: function(id, n) {
        id = parseInt(id)
        for (var i = 0; i < this.Bag.length; i++) {
            if (this.Bag[i].goods_id == id) {

            if(n>0)
            {
                this.Bag[i].num = n
            }
            else
            {

                this.Bag.splice(i,1);

            }
            
                
                return
            }
        }
        var newGood = []
        newGood.goods_id = id
        newGood.num = n
        this.Bag.push(newGood)
    },

        modfiyVideo: function(data) {
        var id = parseInt(data.video_id)
        for (var i = 0; i < this.playerbuyvideos.length; i++) {
            if (this.playerbuyvideos[i].video_id == id) {
                
                return
            }
        }
        this.playerbuyvideos.push(data)
    },

        modfiyHotPack: function(data) {
        var id = parseInt(data.hot_id)
        for (var i = 0; i < this.playerhotpacks.length; i++) {
            if (this.playerhotpacks[i].hot_id == id) {
                //this.Bag[i].num = n
                return
            }
        }
        
        this.playerhotpacks.push(data)
    },

    refreshInfoData: function(info) {
        for (var item in info) {
            if (this.hasOwnProperty(item)) {
                this[item] = info[item]
                cc.log("item ==" + item + "  this[item]  == "+  this[item] + "  info[item] == " +info[item] )
            } else {
                 if(item.match(/hotpacks/)){
                    for(var viewoItem in info[item]){
                        this.modfiyHotPack(  info[item][viewoItem])
                    }
                } else if(item.match(/buyvideos/)){
                    for(var viewoItem2 in info[item]){
                        this.modfiyVideo(info[item][viewoItem2])
                    }
                }else  if (item.match(/goods\d+_id/)) {
                    var n = parseInt(item.replace(/[^0-9]+/g, ''))
                    cc.log("item ==" + item + "  n  == "+  n + "  info[item] == " +info[item] )
                    this.modfiyBag(info[item], info["goods" + n + "_num"])
                } else if (item.match(/work_id\d/)) {
                    var n = parseInt(item.replace(/[^0-9]+/g, ''))
                    cc.log("item ==" + item + "  n  == "+  n + "  info[item] == " +info[item] )
                    this.updateWorkFreeTimes(n, info[item])
                } else if (item.match(/date_id\d/)) {
                    var n = parseInt(item.replace(/[^0-9]+/g, ''))
                    cc.log("item ==" + item + "  n  == "+  n + "  info[item] == " +info[item] )
                    this.updateLoveFreeTimes(n, info[item])
                }else if (item.match(/Love\dPrice/)) {
                    var n = parseInt(item.replace(/[^0-9]+/g, ''))
                    this.updateLovePrice(n, info[item])
                }else if (item.match(/leftbuygoods\dtimes/)) {
                    var n = parseInt(item.replace(/[^0-9]+/g, ''))
                    this.updateGoodsTimes(n, info[item])
                }else if (item == "goods_id") {
                    this.modfiyBag(info[item], info["num"])
                } else if (item == "phone_audio") {
                    this.Phone_ID = info[item]
                } else if (item == "zone_id") {
                    this.zoneThumbsUp_id = info[item]
                } else if (item == "reply_id") {
                    cc.log("    this.zoneReplay_id = info[item]        " + info[item])
                    this.zoneReplay_id = info[item]
                } else if (item == "wechat_next") {
                    this.wechat_id = info[item]
                }
            }
        }
    },

    canWechat: function() {
        if (this.canPhone()) return false
        if (this.wechat_id == 0)
            this.wechat_id = 1
        if(this.wechat_id == cc.cs.gameData.wechat.LAST)
            return false
        var pWechatData = cc.cs.gameData.getwechatData(this.wechat_id)
        var pNextWechatData = cc.cs.gameData.getwechatData(  parseInt(this.wechat_id) + 1)
        if (pWechatData != null) {
            cc.log("canwechat2 = " + pWechatData["WECHAT_LEVEL"] + "   " + this.level + "    " +pWechatData["WECHAT_NEXT"]  +"    " + this.wechat_id )
            if (pWechatData["WECHAT_LEVEL"] <= this.level) {
                cc.log("canwechat3 = " + pWechatData["WECHAT_LEVEL"] + "   " + this.level + "    " +pWechatData["WECHAT_NEXT"]  +"    " + this.wechat_id )
                if (pWechatData["WECHAT_LEVEL"] ==this.level && pWechatData["WECHAT_NEXT"] == "dummy") {
                    return false
                } else if( pWechatData["WECHAT_NEXT"] == "dummy" && pWechatData["WECHAT_LEVEL"] < this.level && pNextWechatData != null&&  pNextWechatData["WECHAT_LEVEL"] > this.level) {
                    return false
                }else{
                    return true
                }
            } else {
                return false
            }
        }
        return false
    },

    canPhone: function() {
        if(this.Phone_ID == cc.cs.gameData.phone.LAST)
            return false
        var pPhoneData = cc.cs.gameData.getphoneData(this.Phone_ID)
        var pPhoneNextData = cc.cs.gameData.getphoneData(this.Phone_ID + 1)
        cc.log(" canPhone: function()  " + pPhoneData + "    " + this.Phone_ID)
        if (pPhoneData != null) {
            cc.log(" canPhone: function()  " + pPhoneData["PHONE_LEV"] + "    " + this.level)
            if (pPhoneData["PHONE_LEV"] <= this.level) {

                if (pPhoneData["PHONE_LEV"] == this.level &&pPhoneData["PHONE_AUDIO"] == "dummy") {   
                    return false
                } else if (pPhoneData["PHONE_AUDIO"] == "dummy" && pPhoneData["PHONE_LEV"] < this.level && pPhoneNextData != null && pPhoneNextData["PHONE_LEV"] > this.level) {
                    return false    
                } else {
                    return true
                }
            } else {
                return false
            }
        }

        return false
    },


        canPhone2: function() {   //通话中专用
        var pPhoneData = cc.cs.gameData.getphoneData(this.Phone_ID)
	 var pPhoneNextData = cc.cs.gameData.getphoneData(this.Phone_ID + 1)
        cc.log(" canPhone: function()  " + pPhoneData + "    " + this.Phone_ID)
        if (pPhoneData != null) {
            cc.log(" canPhone: function()  " + pPhoneData["PHONE_LEV"] + "    " + this.level)
            if (pPhoneData["PHONE_LEV"] <= this.level) {

                if (pPhoneData["PHONE_LEV"] == this.level &&pPhoneData["PHONE_AUDIO"] == "dummy") {   
                    return true       // 通话中 最后一句话也为TRUE 不然就被直接跳过了
                }else if (pPhoneData["PHONE_AUDIO"] == "dummy" && pPhoneData["PHONE_LEV"] < this.level && pPhoneNextData != null && pPhoneNextData["PHONE_LEV"] > this.level) {
                    return false 
		}
		else {
                    return true
                }
            } else {
                return false
            }
        }

        return false
    },

    visibleZoneCount: function() {
        var count = 0;
        var pZoneData = null
        for (var i = 1; i <= cc.cs.gameData.zone["TOTAL_COUNT"]; ++i) {
            pZoneData = cc.cs.gameData.getzoneData(i);
            if (pZoneData != null) {
                if (this.level >= pZoneData["ZONE_LEVEL"]) {
                    count++
                } else {
                    return count
                }
            }
        }
        return count
    },

    addNewZone: function(lastID) {
        var pZoneData = cc.cs.gameData.getzoneData(lastID);
        if (pZoneData != null) {
            if (this.level > pZoneData["ZONE_LEVEL"]) {
                return lastID + 1
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

    /*
        return 0 is ok
        return 1 the times is not enough
        return 2 is level up 
        return 3 is locked
    */

    canWork: function(id) {
        if (this.work_id == id) {
            if (this.getWorkFreeTimes(id) > 0) {
                return 0;
            } else {
                return 1
            }
        } else if (this.work_id == id - 1) {
            return 2
        } else {
            return 3
        }
    },

    canAllWork: function() {
        for (var i = cc.cs.gameData.work["FIRST"]; i <= cc.cs.gameData.work["LAST"]; ++i) {
            if (this.canWork(i) == 0) {
                return true
            }
        }
        return false
    },

    /*
        return -1 the times is not enough 
        return 0 is ok
        return other is lock day
    */

    canLove: function(id) {
        var dateData = cc.cs.gameData.getdateData(id)
        if (this.level >= dateData["DATE_NEED_LEVEL"]) {
            if (this.getLoveFreeTimes(id) > 0) {
					return 0
				
            } else {
                return -1 // 剩余次数不足
            }
        } else {
            var levelData = cc.cs.gameData.getlevelData(dateData["DATE_NEED_LEVEL"])
            return levelData["LEV_DAY"]
        }
    },

    canAllLove: function() {
        for (var i = cc.cs.gameData.date["FIRST"]; i <= cc.cs.gameData.date["LAST"]; ++i) {
            if (this.canLove(i) == 0) {
                return true
            }
        }
        return false
    },

    getZoneDay: function(id) {
        var pZoneData = cc.cs.gameData.getzoneData(id);
        var pLevel = cc.cs.gameData.getlevelData(this.level);
        var pLevelZone = cc.cs.gameData.getlevelData(pZoneData["ZONE_LEVEL"]);
        //cc.log("getZoneDay   " +pLevel["LEV_DAY"] + "    " + pLevelZone["LEV_DAY"] + "    " + id  + "    " + this.level)
        return this.getDay(pLevel["LEV_DAY"] - pLevelZone["LEV_DAY"])
    },

    canZone: function() {
        var count = this.visibleZoneCount() + cc.cs.gameData.zone["FIRST"]
        if(count == 3){
            if (this.canWechat() || this.canPhone())
                count = 2
        }
        for (var i = cc.cs.gameData.zone["FIRST"]; i < count; ++i) {
            if (this.getZoneReplyID(i) == 0 || this.canZanZone(i))
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

    getZoneReplyID : function(id){
        var pZoneData = cc.cs.gameData.getzoneData(id);
        if(pZoneData == null){
            return -1
        }
        var PZoneReply = null
        for (var i = 0; i < this.replies_.length; i++) {
            PZoneReply = cc.cs.gameData.getreplyData(this.replies_[i]);
            if(PZoneReply == null) {
                cc.log("this.replies_ error " + this.replies_[i])
                continue
            }
            if (pZoneData["ZONE_LEVEL"] ==
                PZoneReply["REPLY_LEVEL"])
                return this.replies_[i];
        }
        return 0
    },

    canPLZone: function(id) {
        var pZoneData = cc.cs.gameData.getzoneData(id);
        if(pZoneData == null) return false
        var PZoneReply = null
        for (var i = 0; i < this.replies_.length; i++) {
            PZoneReply = cc.cs.gameData.getreplyData(this.replies_[i]);
            if(PZoneReply == null) return false
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