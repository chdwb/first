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
        MainView:{
            default:null,
            type:cc.Node,
        },
        MissonView:{
            default:null,
            type:cc.Node,
        },
        ActionView:{
            default:null,
            type:cc.Node,
        },

    },

    ToMissonView:function()
    {
        this.MainView.active = false;
        this.MissonView.active = true;
        this.ActionView.active = false;
        
    },
     ToMainView:function()
    {
        this.MainView.active = true;
        this.MissonView.active = false;
        this.ActionView.active = false;
    },

     ToActionView:function()
    {
        this.MainView.active = false;
        this.MissonView.active = false;
        this.ActionView.active = true;
    },

    // use this for initialization
    onLoad: function () {
        

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});