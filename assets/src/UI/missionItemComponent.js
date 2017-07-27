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

    setNameText : function (item){
        if(this.itemText == null)
            this.itemText = this.node.getChildByName("ItemText")
        
        this.itemText.getComponent(cc.Label).string = item
    },

    isChoose : function (is){
        if(this.itemText == null)
            this.itemText = this.node.getChildByName("ItemText")
        if(this.chooseBG == null)
            this.chooseBG = this.node.getChildByName("chooseBg")
        if(is)
        {
            this.chooseBG.active = true
            this.itemText.color = cc.Color.WHITE
        }else
        {
            this.chooseBG.active = false
            this.itemText.color = cc.Color.BLACK
        }
    },

    // use this for initialization
    onLoad: function () {
        cc.log("add onload for mission compinent")
        this.chooseBG = this.node.getChildByName("chooseBg")
        this.itemText = this.node.getChildByName("ItemText")
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
