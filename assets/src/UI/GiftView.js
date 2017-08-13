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
        
    },

    // use this for initialization
    onBack:function()
    {
        var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
    },
    updateUI:function()
    {
        this.Coin.string =  cc.cs.PlayerInfo.money
        var itemArray = cc.cs.gameData.goods;
        var count = 0;
        for(var i in itemArray) { // spawn items, we only need to do this once
    		cc.log("i = ",i);
             
    		if(i != "TOTAL_COUNT")
            {
               
                var item = cc.instantiate(this.prefab)
                
                cc.log("item height " + item.height)
                var itemCom = item.getComponent("NodeItem")
                var gooddata = cc.cs.gameData.goods[i]
               //cc.log("gooddata = "+gooddata)
                if(gooddata != undefined)
                {
                    //itemCom.setItmeNmae(gooddata["GOODS_NAME"] )
                    cc.log("goodsname = "+gooddata["GOODS_NAME"])

                    itemCom.setItmeNmae(gooddata["GOODS_NAME"])
                    itemCom.setGoodId(gooddata["GOODS_ID"])

                    itemCom.setItmeNum(gooddata["GOODS_PRICE"])
                  
                }
                this.content.addChild(item);
        		item.setPosition(  item.width/2+ count * (item.width+30), 0);
                /*let PosY = 0;
                if((count+1) % 2 == 0)
                {
                    PosY =  Math.floor((count+1) / 2);
                }
                else
                {
                    PosY =Math.floor((count+1) /2) +1;
                }   
            
                // this.scrollView.content.width / 4
                PosY -- ;
                 
                 var pos = count % 2
            
               item.setPosition(- halfwidth + littlewidth*pos +item.width/2 ,-item.height/2 - PosY * (item.height + this.spacing))
               count ++;*/
                count++
            }
    	}
        var node = cc.instantiate(this.prefab)
        cc.log("count = "+count)

        cc.log("node.width = "+node.width)
        this.content.width = (node.width + 30) * count;

    },

    onLoad: function () {
        this.prefab = cc.loader.getRes("prefab/NodeItem", cc.Prefab)
        this.content = this.scrollView.content
        this.updateUI();

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
