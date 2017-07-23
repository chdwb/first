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
        var IDFA = ""
        return IDFA
    },

    sendHttp:function(id, data, handle){
        var url = cc.vv.gameData[id]["Host"]
        var externUrl = cc.vv.gameData[id]["Route"]
        var isPost = cc.vv.gameData[id]["Method"] == "Post"

        cc.vv.http.sendRequest(url, externUrl, data, handle, isPost)
    },

    sendRegister : function(ID, password,handle){
        data["username"] = ID
        data["password"] = password
        this.sendHttp("ID_1",data, handle)
    },

    registerHandle : function (ret)
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
