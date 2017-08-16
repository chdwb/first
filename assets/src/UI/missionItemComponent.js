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
        titleText: {
            default: null,
            type: cc.Label
        },

        doSprite: {
            default: null,
            type: cc.Sprite
        },

        getSprite: {
            default: null,
            type: cc.Sprite
        },

        getLabel: {
            default: null,
            type: cc.Label
        },

        doName: {
            default: null,
            type: cc.Label
        },

        timesLabel: {
            default: null,
            type: cc.Label
        },

        goodsLabel: {
            default: null,
            type: cc.Label
        },

        startTips: {
            default: null,
            type: cc.Label
        },

        startBtn: {
            default: null,
            type: cc.Node
        },
        btnLock: {
            default: null,
            type: cc.Node
        },
        btnText: {
            default: null,
            type: cc.Label
        },
    },

    setItem: function(id, isWork) {
        if (isWork) {
            var workResoult = cc.cs.PlayerInfo.canWork(id)

        }
    },

    // use this for initialization
    onLoad: function() {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});