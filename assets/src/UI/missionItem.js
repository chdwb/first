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
        chooseBG : {
            default : null,
            type : cc.Node
        },
        itemText : {
            default : null,
            type : cc.Label
        }
    },

    setItem : function (item ){
        itemText.string = item
    },

    isChoose : function (is){
        if(is)
        {
            chooseBG.active = true
            itemText.color = cc.Color.WHITE
        }else
        {
            chooseBG.active = false
            itemText.color = cc.Color.BLACK
        }
    },

    // use this for initialization
    onLoad: function () {
        this.chooseBG = this.node.getChildByName("chooseBg")
        this.itemText = this.node.getChildByName("ItemText")
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
