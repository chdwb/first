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
    loadComplete: function() {
        cc.find("Canvas/Bg").active = true
        cc.cs.UIMgr.init()
    },

    // use this for initialization
    onLoad: function() {
        cc.game.addPersistRootNode(this.node)
        this.initMgr()
        cc.cs.loadMgr.loadRes(this.loadComplete)

    },
    
    BackAudio:function(){

         cc.cs.AudioMgr.playAudio("return")

    },

    ClickAudio:function(){


         cc.cs.AudioMgr.playAudio("click")

    },

    initMgr: function() {
        cc.cs = {}
        cc.cs.http = require("HTTPMgr")
        cc.cs.gameData = require("JSDATA")

        cc.cs.utils = require("Utils")

        var gameMgr = require("gameMgr")
        cc.cs.gameMgr = new gameMgr()

        var load = require("loadMgr")
        cc.cs.loadMgr = new load()

        var UIMgr = require("UIManager")
        cc.cs.UIMgr = new UIMgr()

        var registerMgr = require("registerMgr")
        cc.cs.registerMgr = new registerMgr()

        var PlayerInfo = require("PlayerInfo")
        cc.cs.PlayerInfo = new PlayerInfo()
        if (CC_JSB) {
        var DownloadMgr = require("DownloadMgr")
        cc.cs.DownloadMgr = new DownloadMgr()
        cc.cs.DownloadMgr.init()
        }

        var AudioMgr = require("AudioMgr")
        cc.cs.AudioMgr = new AudioMgr()
        cc.cs.AudioMgr.init()

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
    },
});