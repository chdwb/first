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
    onLoad: function () {

    },

    generateGustInfo:function(){
        var IDFA = "游客"+"DAH278JK"
        return IDFA
    },

    sendHttp:function(id, data, handle, obj ){
        var url = cc.cs.gameData.http[id]["Host"]
        var externUrl = cc.cs.gameData.http[id]["Route"]
        var isPost = cc.cs.gameData.http[id]["Method"] == "POST"

        cc.cs.http.sendRequest(url, externUrl, data, handle, isPost, obj)
    },

    sendRegister : function(ID, password, handle, obj){
        var data = {}
        data["username"] = ID
        data["password"] = password
        this.sendHttp("ID_1",data, handle, obj)
    },

    sendLogin : function(ID, password, handle, obj){
        var data = {}
        data["username"] = ID
        data["password"] = password
        this.sendHttp("ID_2",data, handle, obj)
    },

    registerHandle : function (ret)
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
    },

    sendGetPack : function(token,handle){
        data["api_token"] = token
        this.sendHttp("ID_6",data, handle)
    },

    getPackHandle : function(ret)
    {
        cc.log(ret)
        //道具ID + 数量
    },
    
    sendName : function(token, name, handle, obj)
    {
        data["api_token"] = token
        data["name"] = name
        this.sendHttp("ID_6", data, handle, obj)
    },
    
    



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
