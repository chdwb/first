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

        label_lovepoint: {
            default: null,
            type: cc.Label
        },
         label_day: {
            default: null,
            type: cc.Label
        },
         label_diamond: {
            default: null,
            type: cc.Label
        },
         label_coin: {
            default: null,
            type: cc.Label
        },
        

    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    onShop: function () {

    },

     onGift: function () {

    },

     onPackage: function () {

    },

     onPhone: function () {

    },

     onWechat: function () {

    },

     onWeibo: function () {

    },

     onSetting: function () {

    },



});
