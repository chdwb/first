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
         SettingButton: {
            type: cc.Sprite,
            default: null
        },

        NAME: {
            type: cc.Label,
            default: null
        },

        ID: {
            type: cc.Label,
            default: null
        },

        SoundOff:false
    },

    onback:function()
    {

        cc.cs.UIMgr.closeView()

    },

    switchSound:function()
    {
        cc.log("声音关闭 =  "+ this.SoundOff)
        if(this.SoundOff == false)
        {
            this.SoundOff = true;
            cc.cs.AudioMgr.stopBGM();
            //this.SettingButton.interactable = false
            cc.cs.UIMgr.changeSprite(this.SettingButton.node, "set/yinyue1")
        
        }
        else
        {
            this.SoundOff = false;
            cc.cs.AudioMgr.startBGM();
            //this.SettingButton.interactable = true
            cc.cs.UIMgr.changeSprite(this.SettingButton.node, "set/yinyue")
            
        }

     

    },

    // use this for initialization
    onLoad: function () {

        

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
