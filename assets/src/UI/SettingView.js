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
            type: cc.Node,
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
        if(this.SoundOff == false)
        {
            this.SoundOff = true;
        cc.audioEngine.setMusicVolume(0);
        cc.audioEngine.setEffectsVolume(0);
    }
    else
    {
        this.SoundOff = false;
        cc.audioEngine.setMusicVolume(1);
        cc.audioEngine.setEffectsVolume(1);
    }

    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
