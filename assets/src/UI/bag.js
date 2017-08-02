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
        spacing: 5, // space between each item
        nodeItemUse:{
            default: null,
            type: cc.Node
        },
        itemUseCount:1,
        itemUseCountLabel:{
            default: null,
            type: cc.Label
        },
        itmeCount:0,
   
        
    },

    // use this for initialization 666

    onBack:function(){
        var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)

    },

    onItmeChoose:function(goods_id,num)
    {
        cc.log("goods_id = "+goods_id)
        this.nodeItemUse.active = true;
        this.itmeCount = num

    },

    onCancel:function()
    {
        this.nodeItemUse.active = false;

    },

    onOK:function()
    {
       
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

    onLoad: function () {
       
        this.content = this.scrollView.content;
        this.items = []; // array to store spawned items
    	this.initialize(cc.cs.PlayerInfo.Bag);
    },
     initialize: function (itemArray) {
        this.prefab = cc.loader.getRes("prefab/NodeItem", cc.Prefab)
        cc.log( "hehe"+itemArray.length)
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
            itemCom.setItmeNmae(itemArray[i].goods_id)
            itemCom.setItmeNum(itemArray[i].num)
            this.content.addChild(item);
    		//item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
            let PosY = 0;
              if((i+1) % 4 == 0)
        {
            PosY =  Math.floor((i+1) / 4);
        }
        else
        {
            PosY =Math.floor((i+1) /4) +1;
        }   
        
            // this.scrollView.content.width / 4
             
             var pos = i % 4
        
            item.setPosition(- halfwidth + littlewidth*pos +item.width/2 ,-item.height/2 - PosY * item.height - 100)
            this.items.push(item);
    	}
    },
    
    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
