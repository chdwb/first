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

        button1:{
            default:null,
            type: cc.Button,
        },
        button2:{
            default:null,
            type: cc.Button,
        },
        button3:{
            default:null,
            type: cc.Button,
        },
        button4:{
            default:null,
            type: cc.Button,
        },
        
        spawnCount: 0, // 总个数
        totalRow: 0, // 行数
        spacing: 0, // space between each item
        currentShopType:1,
    },

     goShop2: function() {
        //var parent = this.node.parent
        //parent.getComponent("GameScene").SetView(cc.cs.UIMgr.SHOPVIEW)
       // cc.cs.UIMgr.currentShopType = 3
        //cc.cs.UIMgr.openView(cc.cs.UIMgr.SHOPVIEW)


        this.currentShopType = 2
        this.updateUi()
    },
    
    onLiBao:function()
    {
        cc.log( "shopCLick"+this.currentShopType)
        this.currentShopType = 3;
        this.updateUi()
        //this.initialize2(cc.cs.gameData.hot_package)
    },
    
    onSuperLiBao:function()
    {
        cc.log( "shopCLick"+this.currentShopType)
        this.currentShopType = 4;
        this.updateUi()
        //this.initialize2(cc.cs.gameData.work_package)
    },
    
    onJinBi:function()
    {
        cc.log( "shopCLick"+this.currentShopType)
        this.currentShopType = 2;
        this.updateUi()
        //this.initialize2(cc.cs.gameData.buy_gold)
    },
    
    onItem:function()
    {
        cc.log("shopCLick"+ this.currentShopType)
        this.currentShopType = 1;
        this.updateUi()
        //this.initialize(cc.cs.gameData.goods)
        //cc.log("goods ="+cc.cs.gameData.goods)
    },
    

    // use this for initialization
    onLoad: function () {
        this.content = this.scrollView.content;

        //this.onLiBao()

    },
    onEnable:function(){
        cc.log("ShopView UpdateUi")
        //this.currentShopType = 3
        this.currentShopType = cc.cs.UIMgr.currentShopType
        cc.log("currentShopType = "+this.currentShopType)
        this.updateUi()
    }
    ,
    
    updateUi:function()
    {
        this.Coin.string = ""+cc.cs.PlayerInfo.money
        this.scrollView.scrollToTop(0,true)
        cc.log("updateui"+this.currentShopType)

        if(this.currentShopType ==1)
        {
            this.button1.interactable = false 
            this.button2.interactable = true 
            this.button3.interactable = true 
            this.button4.interactable = true
            this.initialize(cc.cs.gameData.goods) 
        }
        if(this.currentShopType ==2)
        {
            this.button1.interactable = true 
            this.button2.interactable = false 
            this.button3.interactable = true 
            this.button4.interactable = true
            this.initialize2(cc.cs.gameData.buy_gold)
        }
        if(this.currentShopType ==3)
        {
            this.button1.interactable = true 
            this.button2.interactable = true 
            this.button3.interactable = false 
            this.button4.interactable = true 
            this.initialize2(cc.cs.gameData.hot_package)
        }
        if(this.currentShopType ==4)
        {
           this.button1.interactable = true 
            this.button2.interactable = true 
            this.button3.interactable = true 
            this.button4.interactable = false
            this.initialize2(cc.cs.gameData.work_package)
        }
        
    },
    
    onBack:function()
    {
        cc.log("onback")
        //var parent = this.node.parent
        //parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
        cc.cs.UIMgr.closeView()
    },
    
    initialize2: function(itemArray)
    {
        //this.updateUi()
        cc.log("initialize2")
        this.content.removeAllChildren(true);
        this.prefab = cc.loader.getRes("prefab/ItemLibao", cc.Prefab)
        var temparray = [];
        
        for(var i in itemArray) { 
            if(i != "TOTAL_COUNT" && i != "LAST" && i != "FIRST" )
            {
                var item = cc.instantiate(this.prefab)
                var itemCom = item.getComponent("ShopItem2")
                itemCom.setShopType(this.currentShopType)
                itemCom.setGood(itemArray[i])
                if(itemCom.IsHave)
                {
                    temparray.push(itemArray[i])
                    continue;
                }
                
                cc.cs.UIMgr.addItem_verticalScrollView(this.scrollView, item, 0)
            }
            
        }

        for(var i in temparray) { 
            //cc.cs.UIMgr.addItem_verticalScrollView(this.scrollView, i, 0)
            var item = cc.instantiate(this.prefab)
            var itemCom = item.getComponent("ShopItem2")
            itemCom.setShopType(this.currentShopType)
            itemCom.setGood(temparray[i])
            cc.cs.UIMgr.addItem_verticalScrollView(this.scrollView, item, 0)
        }
        
        
    },

     initialize: function (itemArray) {
        cc.log("initialize")


        

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
    		if(i != "TOTAL_COUNT" && i != "LAST" && i != "FIRST" )
            {
                var item = cc.instantiate(this.prefab)



                var offset =  (this.scrollView.content.width - item.width*2)/4
                
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
                PosY -- ;
                 
                 var pos = count % 2
            
               item.setPosition(- halfwidth + littlewidth*pos +item.width/2 + offset,-item.height/2 - PosY * (item.height + this.spacing))
               count ++;
            }
    	}
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
