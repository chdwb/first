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
        PlayerNmae : {
            default: null,
            type: cc.String,
        },

        ApiToken : {
            default: "",
            type: cc.String,
        },

        WelCome : {
            default: "",
            type: cc.String,
        },

        Level:1,

        Sign:false,

        Exp:0,

        Power:0,

        FreeWork:2,

        Phone_ID:0,

        Wechat_ID:0,

        ZoneThumbsUp_ID:0,

        ZoneReplay_ID:0,

        Work_ID:0,

    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
