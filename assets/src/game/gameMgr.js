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

    },

    // use this for initialization
    onLoad: function() {

    },

    generateGustInfo: function() {
        var IDFA = "游客" + "DAH278JK"
        return IDFA
    },

    sendHttp: function(id, data, handle, obj) {

        cc.log("id" + id);

        var url = cc.cs.gameData.http[id]["Host"]
        var externUrl = cc.cs.gameData.http[id]["Route"]
        var isPost = cc.cs.gameData.http[id]["Method"] == "POST"

        cc.cs.http.sendRequest(url, externUrl, data, handle, isPost, obj)
    },

    sendRegister: function(ID, password, handle, obj) {
        var data = {}
        data["username"] = ID
        data["password"] = password
        var uuid = cc.sys.localStorage.getItem('UUID')
        cc.log("register with uuid = "+uuid)
        data["deviceid"] = uuid
        this.sendHttp("ID_1", data, handle, obj)
    },

    sendLogin: function(ID, password, handle, obj) {
        var data = {}
        data["username"] = ID
        data["password"] = password

        var uuid = cc.sys.localStorage.getItem('UUID')
        cc.log("login with uuid = "+uuid)
        data["deviceid"] = uuid
        this.sendHttp("ID_2", data, handle, obj)
    },

    /*registerHandle : function (ret)
    {
        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if( JasonObject.success === true)
        {
            cc.cs.UIMgr.showTip("注册成功", 1.0)
        }
        else
        {
            cc.cs.UIMgr.showTip( JasonObject.error , 1.0)
        }

    },

    loginHandle : function (ret)
    {
        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if( JasonObject.success === true)
        {
            cc.sys.localStorage.setItem('API_TOKEN', JasonObject.content.info.api_token);
            var api_token = cc.sys.localStorage.getItem('API_TOKEN')
            cc.cs.UIMgr.showTip("登陆成功 api_token ="+api_token, 1.0)
            
        }
        else
        {
            cc.cs.UIMgr.showTip( JasonObject.error , 1.0)
        }
    },*/

    sendGetBack: function(handle) {
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        this.sendHttp("ID_6", data, handle)
    },

    /*getPackHandle : function(ret)
    {
        cc.log(ret)
        //道具ID + 数量
    },*/

    sendName: function(handle, obj) {
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        data["name"] = cc.cs.PlayerInfo.PlayerNmae
        this.sendHttp("ID_3", data, handle, obj)
    },

    sendUpgrade: function(workid, handle, obj) {
        cc.cs.UIMgr.showNetView()
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        data["workid"] = workid
        this.sendHttp("ID_7", data, handle, obj)
    },

    sendWork: function(workid, handle, obj) {
        cc.cs.UIMgr.showNetView()
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        data["workid"] = workid
        this.sendHttp("ID_5", data, handle, obj)
    },

    sendWorkDone: function(handle, obj) {
        cc.cs.UIMgr.showNetView()
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token

        data["worklogid"] = cc.cs.PlayerInfo.worklog_id

        cc.log("workdone id = ",cc.cs.PlayerInfo.worklogid);
        this.sendHttp("ID_6", data, handle, obj)
    },

    sendLove: function(loveid, handle, obj) {
        cc.cs.UIMgr.showNetView()
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        data["dateid"] = loveid
        this.sendHttp("ID_9", data, handle, obj)
    },

    sendLoveDone: function(handle, obj) {
        cc.cs.UIMgr.showNetView()
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        data["datelogid"] = cc.cs.PlayerInfo.datelog_id
        cc.log("workdone id = ",cc.cs.PlayerInfo.datelog_id);
        this.sendHttp("ID_10", data, handle, obj)
    },

    sendPhone: function(phoneid, handle, obj) {
        cc.cs.UIMgr.showNetView()
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        data["phoneid"] = phoneid
        this.sendHttp("ID_13", data, handle, obj)
    },
    sendWechat: function(wechatID, handle, obj) {
        cc.cs.UIMgr.showNetView()
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        data["wechatid"] = wechatID
        this.sendHttp("ID_16", data, handle, obj)
    },

    sendThumb: function(zoneid, handle, obj) {
        cc.cs.UIMgr.showNetView()
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        data["zoneid"] = zoneid
        this.sendHttp("ID_14", data, handle, obj)
    },

    sendReply: function(replyid, handle, obj) {
        cc.cs.UIMgr.showNetView()
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        data["replyid"] = replyid
        this.sendHttp("ID_15", data, handle, obj)
    },

    sendGoodUse: function(goodsid, num, handle, obj) {
        cc.cs.UIMgr.showNetView()
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        data["goodsid"] = goodsid
        data["num"] = num
        this.sendHttp("ID_17", data, handle, obj)
    },

    sendGoodBuy: function(type, goodsid, num, handle, obj) {
        
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        data["type"] = type
        if (type == 1) {
            data["goodsid"] = goodsid
            data["num"] = num
        } else if (type == 2) {
            data["goldid"] = goodsid
            data["num"] = num
        } else if (type == 3) {
            data["hotid"] = goodsid
        } else if (type == 4) {
            data["workpkid"] = goodsid
        }
        else if (type == 5) {
            data["videoid"] = goodsid
        }
        cc.log("type = "+type)
        cc.log("goodis = "+goodsid)
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS && type >= 2 && type <=4) {
            this.miostype = type
            this.mgoodsid = goodsid
            this.mnum = num
            this.mhandle = handle
            this.obj = obj

            var iosid = ""
            if (type == 2)
            {
                iosid = cc.cs.gameData.buy_gold["ID_"+goodsid]["IOS_ID1"]

            }
            else if (type == 3)
            {
                iosid = cc.cs.gameData.hot_package["ID_"+goodsid]["IOS_ID1"]

            }
            else if(type == 4)
            {
                iosid = cc.cs.gameData.work_package["ID_"+goodsid]["IOS_ID1"]
            }
             
            //let ret = jsb.reflection.callStaticMethod("RootViewController", "pay",iosid);
            jsb.reflection.callStaticMethod("RootViewController", "pay:andContent:",
                                           iosid, 
                                           "Yes!");

            //return ret
        }
        else
        {
            cc.cs.UIMgr.showNetView()
            this.sendHttp("ID_12", data, handle, obj)
        }
    },

    IOSBuy: function(recipt)
    {
        this.sendGoodBuyIOS(this.miostype,this.mgoodsid,this.mnum,this.mhandle,this.obj,recipt)
    },

    sendGoodBuyIOS: function(type, goodsid, num, handle, obj,recipt) {
        //cc.cs.UIMgr.showNetView()
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        data["type"] = type
        if (type == 1) {
            data["goodsid"] = goodsid
            data["num"] = num
        } else if (type == 2) {
            data["goldid"] = goodsid
            data["num"] = num
        } else if (type == 3) {
            data["hotid"] = goodsid
        } else if (type == 4) {
            data["workpkid"] = goodsid
        }
        else if (type == 5) {
            data["videoid"] = goodsid
        }
        data["receipt"] = recipt
        this.sendHttp("ID_12", data, handle, obj)
    },



    sendSign: function(handle, obj) {
        cc.cs.UIMgr.showNetView()
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token

        this.sendHttp("ID_4", data, handle, obj)
    },

    sendWorkRightNode: function(workid, handle, obj) {
        cc.cs.UIMgr.showNetView()
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        data["worklogid"] = workid

        this.sendHttp("ID_19", data, handle, obj)
    },

    sendDateRightNode: function(dateid, handle, obj) {
        cc.cs.UIMgr.showNetView()
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        data["datelogid"] = dateid

        this.sendHttp("ID_20", data, handle, obj)
    },

    /*sendBuyLoveTimes:function(token,dateid,handle,obj)
    {
        var data = {}
        data["api_token"] = token
        data["datelogid"] = dateid
        this.sendHttp("ID_21", data, handle, obj)
    },*/

    sendVideoDone: function(videoid, handle, obj) {
        //cc.cs.UIMgr.showNetView()
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        data["videoid"] = videoid
        this.sendHttp("ID_23", data, handle, obj)
    },

    getVideoUrl: function(videoid, handle, obj) {

        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        data["videoid"] = videoid
        this.sendHttp("ID_24", data, handle, obj)
    },

    buyLoveTime: function(dateid, handle, obj) {
        cc.cs.UIMgr.showNetView()
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        data["dateid"] = dateid
        this.sendHttp("ID_22", data, handle, obj)
    },

    buyRightNow: function(type, handle, obj) {
        cc.cs.UIMgr.showNetView()

        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        data["type"] = type
        this.sendHttp("ID_18", data, handle, obj)


    },

    sendBuyFastTalk : function(handle, obj){
        cc.cs.UIMgr.showNetView()
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        this.sendHttp("ID_25", data, handle, obj)
    },
    
    
    sendGuide:function(guideid,handle,object)
    {
        var data = {}
        data["api_token"] = cc.cs.PlayerInfo.api_token
        data["guideid"] = guideid
        this.sendHttp("ID_26", data, handle,object)
    }







    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});