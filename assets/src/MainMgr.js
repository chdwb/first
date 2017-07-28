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
    loadComplete : function(){
        cc.find("Canvas/Bg").active = true
        cc.cs.UIMgr.init()
    },

    // use this for initialization
    onLoad: function () {
        this.initMgr()
        cc.cs.loadMgr.loadRes(this.loadComplete)
        cc.game.addPersistRootNode(this.node);
    },

    initMgr:function(){
        cc.cs = {}
        cc.cs.http = require("HTTPMgr")
        cc.cs.gameData = require("JSDATA")
        
        var gameMgr = require("gameMgr")
        cc.cs.gameMgr =new gameMgr()

        var load = require("loadMgr")
        cc.cs.loadMgr = new load()

        var UIMgr = require("UIManager")
        cc.cs.UIMgr = new UIMgr()

        var registerMgr = require("registerMgr")
        cc.cs.registerMgr = new registerMgr()

        var SceneMgr = require("SceneMgr")
        cc.cs.SceneMgr = new SceneMgr()
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
