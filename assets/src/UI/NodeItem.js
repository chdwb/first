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
        icon :{
            default: null,
            type: cc.Sprite,
        },
        
        ItmeNum :{
            default: null,
            type: cc.Label,
        },
        
        ItmeName :{
            default: null,
            type: cc.Label,
        }
    },

    // use this for initialization

    setItmeNmae(name)
    {
        this.ItmeName.string = name;
    },

    setItmeNum(num)
    {
        this.ItmeNum.string = num;
    },

     setItmeIcon(name)
    {
        //this.ItmeName.string = name;
    },

    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
