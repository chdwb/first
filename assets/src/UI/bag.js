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
        bufferZone: 0, // when item is away from bufferZone, we relocate it
   
        
    },

    // use this for initialization 666

    onBack:function(){
        var parent = this.node.parent
        parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)

    },
    onLoad: function () {
       
        this.content = this.scrollView.content;
        this.items = []; // array to store spawned items
    	this.initialize(cc.cs.PlayerInfo.Bag);
        this.updateTimer = 0;
        this.updateInterval = 0.2;
        this.lastContentPosY = 0; // use this variable to detect if we are scrolling up or down

    },
     initialize: function (itemArray) {
        this.prefab = cc.loader.getRes("prefab/NodeItem", cc.Prefab)
        cc.log( "hehe"+itemArray.length)
        if(itemArray.length % 5 == 0)
        {
            this.totalCount = Math.floor(itemArray.length / 5);
        }
        else
        {
            this.totalCount = Math.floor(itemArray.length / 5) + 1;
        }

         this.spawnCount = itemArray.length;
        cc.log("total count "+this.totalCount)
        this.content.height = this.totalCount * (this.prefab.data.height /*+ this.spacing*/)/* + this.spacing;*/  + 4000     // get total content height 
        cc.log("prefab height " + this.prefab.data.height)
        var littlewidth = this.scrollView.content.width / 5
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
              if((i+1) % 5 == 0)
        {
            PosY =  Math.floor((i+1) / 5);
        }
        else
        {
            PosY =Math.floor((i+1) / 5) +1;
        }   
        
             this.scrollView.content.width / 5
             
             var pos = i % 5
        
        item.setPosition(- halfwidth + littlewidth*pos +item.width/2 ,-item.height/2 - PosY * item.height)

            //item.setPositionX ( (i%5) * item.width, PosY * item.height);  
    		//item.getComponent('Item').updateItem(i, i);
            this.items.push(item);
    	}
    },
    
    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
