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
        
        Icon:{
            type: cc.Sprite,
            default:null
        },
        doJob:null,
        obj:null,
		popnode:null
    },

    // use this for initialization
    onLoad: function () {

    },
	
	show()
	{
		var scene = cc.director.getScene();
        scene.getChildByName("Canvas").addChild(this.popnode, 999)
	},
    
    setCallBack:function(node,id,OKhandle,obj)
    {
		this.popnode = node
        if(id > 10)
        {

            cc.cs.UIMgr.changeSprite(this.Icon.node, "shop/pop2/" + (id - 10),this.show.bind(this))

        }
        else
        {

            cc.cs.UIMgr.changeSprite(this.Icon.node, "shop/pop/" + id,this.show.bind(this))

        }
        
        this.doJob = OKhandle
        this.obj = obj
		
    },
    
    onBuy:function ()
    {
        this.doJob.apply(this.obj, [0]);
       this.node.removeFromParent(true);
    },
    onBack:function()
    {
        this.node.removeFromParent(true);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
