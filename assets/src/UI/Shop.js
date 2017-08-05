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
        scrollView: {
        	default: null,
        	type: cc.ScrollView
        },
        prefab: {
            default: null,
            type: cc.Prefab
        },
        
        Coin:{
            default:null,
            type: cc.Label,
        },
        
        spawnCount: 0, // 总个数
        totalRow: 0, // 行数
        spacing: 0, // space between each item
    },
    
    onLiBao:function()
    {
        
    },
    
    onSuperLiBao:function()
    {
        
    },
    
    onJinBi:function()
    {
        
    },
    
    onItem:function()
    {
        //var goodsCount = cc.cs.gameData.goods["TOTAL_COUNT"]
        this.initialize(cc.cs.gameData.goods)
        //cc.log("goods ="+cc.cs.gameData.goods)
    },
    

    // use this for initialization
    onLoad: function () {
        this.content = this.scrollView.content;

    },
    
    
    updateUi:function()
    {
        this.Coin.string = ""+cc.cs.PlayerInfo.Money
    },
    
    onBack:function()
    {
        cc.log("onback")
        var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
    },
    
    
    initialize: function (itemArray) {
        this.updateUi()
        this.content.removeAllChildren(true);
        this.prefab = cc.loader.getRes("prefab/ShopItem", cc.Prefab)
        var length = itemArray["TOTAL_COUNT"]
        cc.log( "arraylength"+length)
        if(length % 2 == 0)
        {
            this.totalCount = Math.floor(length / 2);
        }
        else
        {
            this.totalCount = Math.floor(length / 2) + 1;
        }

        this.spawnCount = length;
        cc.log("total count "+this.totalCount)
        this.content.height = this.totalCount * (this.prefab.data.height + this.spacing)
        cc.log("prefab height " + this.prefab.data.height)
        var littlewidth = this.scrollView.content.width / 2
        var halfwidth = this.scrollView.content.width / 2
        var count = 0;
        for(var i in itemArray) { // spawn items, we only need to do this once
    		cc.log("i = ",i);
    		
            var item = cc.instantiate(this.prefab)
            
            cc.log("item height " + item.height)
            var itemCom = item.getComponent("ShopItem")
            var gooddata = cc.cs.gameData.goods[i]
           //cc.log("gooddata = "+gooddata)
            if(gooddata != undefined)
            {
                //itemCom.setItmeNmae(gooddata["GOODS_NAME"] )
                cc.log("goodsname = "+gooddata["GOODS_NAME"])
                itemCom.setGood(gooddata)
            }
            this.content.addChild(item);
    		//item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
            let PosY = 0;
              if((count+1) % 2 == 0)
        {
            PosY =  Math.floor((count+1) / 2);
        }
        else
        {
            PosY =Math.floor((count+1) /2) +1;
        }   
        
            // this.scrollView.content.width / 4
             
             var pos = count % 2
        
           item.setPosition(- halfwidth + littlewidth*pos +item.width/2 ,-item.height/2 - PosY * (item.height + this.spacing))
           count ++;
    	}
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
