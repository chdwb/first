cc.Class({
    extends: cc.Component,

    properties: {
       
       prefab: {
            default: null,
            type: cc.Prefab
        },
       
        scrollView: {
        	default: null,
        	type: cc.ScrollView
        },
        spawnCount: 0, // 总个数
        totalRow: 0, // 行数
        spacing: 0, // space between each item
        nodeItemUse:{
            default: null,
            type: cc.Node
        },

        nodeNoItem:{
            default: null,
            type: cc.Node
        },
        itemUseCount:1,
        itemUseCountLabel:{
            default: null,
            type: cc.Label
        },
        
        Exp:{
            default: null,
            type: cc.Label
        },
        
        ItemNmae:{
            default: null,
            type: cc.Label
        },
        
        ItemCount2:{
            default: null,
            type: cc.Label
        },



        itmeCount:0,
        currentgoodsid:0,
   
        
    },

    // use this for initialization 666

    onBack:function(){
        var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)

    },

    onItmeChoose:function(goods_id,num)
    {
        cc.log("goods_id = "+goods_id)
        this.currentgoodsid = goods_id
        this.nodeItemUse.active = true
        this.itmeCount = num
        this.ItemCount2.string = num
        
        var gooddata = cc.cs.gameData.goods["GOODS_ID_" +goods_id]
            if(gooddata != undefined)
            {
                this.ItemNmae.string = cc.cs.gameData.goods["GOODS_ID_"+goods_id]["GOODS_NAME"]
            }
            else
            {
                this.ItemNmae.string = goods_id
            }
        

    },

    onCancel:function()
    {
        this.nodeItemUse.active = false;

    },

    onOK:function()
    {
       this.startGoodsUse();
    },

    onPlus:function()
    {
        this.itemUseCount ++;
        if(this.itemUseCount > this.itmeCount)
        {
            this.itemUseCount = this.itmeCount
        }
        this.itemUseCountLabel.string = ""+this.itemUseCount
    },

    onMinus:function()
    {
        this.itemUseCount --;
        if(this.itemUseCount == 0)
        {
            this.itemUseCount = 1
        }
        this.itemUseCountLabel.string = ""+this.itemUseCount
    },

     setExp: function(currentExp, levlExp) {
        this.Exp.string = currentExp + "/" + levlExp;
    },
    updateUI:function()
    {
       cc.log("背包")
        this.content = this.scrollView.content;
        this.prefab = cc.loader.getRes("prefab/NodeItem", cc.Prefab)
        var leveldata =  cc.cs.gameData.level["LEV_LEV_"+(parseInt(cc.cs.PlayerInfo.Level) + 1)]
        this.setExp(cc.cs.PlayerInfo.Exp,leveldata["LEV_EXP"])
        this.initialize(cc.cs.PlayerInfo.Bag);

        
    },
    onLoad: function () {
       //cc.log("背包")
        
        //this.items = []; // array to store spawned items
    	this.updateUI()
    },
     initialize: function (itemArray) {
        //this.Exp.string = ""+cc.cs.PlayerInfo.exp
        this.content.removeAllChildren(true);
        
        cc.log( "hehe"+itemArray.length)
        if(itemArray.length == 0)
        {
            this.nodeNoItem.active = true;
        }
        else
        {
            this.nodeNoItem.active = false;
        }

        
        if(itemArray.length % 4 == 0)
        {
            this.totalCount = Math.floor(itemArray.length / 4);
        }
        else
        {
            this.totalCount = Math.floor(itemArray.length / 4) + 1;
        }

         this.spawnCount = itemArray.length;
        cc.log("total count "+this.totalCount)
        this.content.height = this.totalCount * (this.prefab.data.height + this.spacing)
        cc.log("prefab height " + this.prefab.data.height)
        var littlewidth = this.scrollView.content.width / 4
        var halfwidth = this.scrollView.content.width / 2
    	for (let i = 0; i < this.spawnCount; ++i) { // spawn items, we only need to do this once
    		
            var item = cc.instantiate(this.prefab)
            
             //cc.log("item height " + item.height)
            var itemCom = item.getComponent("NodeItem")
            var gooddata = cc.cs.gameData.goods["GOODS_ID_" +itemArray[i].goods_id]
            if(gooddata != undefined)
            {
                itemCom.setItmeNmae(cc.cs.gameData.goods["GOODS_ID_"+itemArray[i].goods_id]["GOODS_NAME"] )
            }
            else
            {
                itemCom.setItmeNmae(itemArray[i].goods_id)
            }
            itemCom.setItmeNum(itemArray[i].num)
            itemCom.setGoodId(itemArray[i].goods_id)
            this.content.addChild(item);
    		//item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
            let PosY = 0;
              if((i+1) % 4 == 0 )
        {
            PosY =  Math.floor((i+1) / 4);
        }
        else
        {
            PosY =Math.floor((i+1) /4) +1;
        }   

        PosY -- ;
        
            // this.scrollView.content.width / 4
             
             var pos = i % 4
        
            item.setPosition(- halfwidth + littlewidth*pos +item.width/2 ,-item.height/2 - PosY * (item.height + this.spacing))
            //this.items.push(item);
    	}
    },
    
    startGoodsUse: function()
    {
        cc.log("token="+cc.cs.PlayerInfo.ApiToken)
        cc.log("goodid="+this.currentgoodsid)
        cc.log("itemUseCount="+this.itemUseCount)
        cc.cs.gameMgr.sendGoodUse(cc.cs.PlayerInfo.ApiToken, this.currentgoodsid, this.itemUseCount, this.GoodUseHandle, this)
    },

    GoodUseHandle(ret)
    {
       
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.cs.UIMgr.showTip("使用成功", 1.0)
            var parent = this.node.parent
            
            cc.cs.PlayerInfo.Exp = JasonObject.content.info.exp
            cc.cs.PlayerInfo.Level = JasonObject.content.info.level
            cc.cs.PlayerInfo.videoID = JasonObject.content.info.playvideo
            cc.log("video id3 = " + cc.cs.PlayerInfo.videoID)
            var array = cc.cs.PlayerInfo.Bag
            for(var i = 0;i < array.length;i++)
            {
               if( array[i].goods_id == this.currentgoodsid)
               {
                   array[i].num = JasonObject.content.info.num
                   if(JasonObject.content.info.num == 0 )
                   {
                       array.splice(i,1);
                   }
                   break;
               }
            }
            this.nodeItemUse.active = false
            this.initialize(cc.cs.PlayerInfo.Bag)
            this.updateUI()
            
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },
    
    
    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
