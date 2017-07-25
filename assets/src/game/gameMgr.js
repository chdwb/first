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

    sendHttp:function(id, data, handle){
        var url = cc.cs.gameData.http[id]["Host"]
        var externUrl = cc.cs.gameData.http[id]["Route"]
        var isPost = cc.cs.gameData.http[id]["Method"] == "POST"

        cc.cs.http.sendRequest(url, externUrl, data, handle, isPost)
    },

    sendRegister : function(ID, password){
        var data = {}
        data["username"] = ID
        data["password"] = password
        this.sendHttp("ID_1",data, this.registerHandle)
    },

    sendLogin : function(ID, password){
        var data = {}
        data["username"] = ID
        data["password"] = password
        this.sendHttp("ID_2",data, this.loginHandle)
    },

    registerHandle : function (ret)
    {
        cc.log(ret)
    },

    loginHandle : function (ret)
    {
        cc.log(ret)
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



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
