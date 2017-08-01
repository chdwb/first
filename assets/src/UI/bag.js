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
            this.totalCount = itemArray.length / 5;
        }
        else
        {
            this.totalCount = itemArray.length / 5 + 1;
        }

         this.spawnCount = itemArray.length;
         
        this.content.height = this.totalCount * (this.prefab.data.height /*+ this.spacing*/)/* + this.spacing;*/  + 4000     // get total content height 
    	for (let i = 0; i < this.spawnCount; ++i) { // spawn items, we only need to do this once
    		
            var item = cc.instantiate(this.prefab)
            var itemCom = item.getComponent("NodeItem")
            itemCom.setItmeNmae(itemArray[i].goods_id)
            itemCom.setItmeNum(itemArray[i].num)
            this.content.addChild(item);
    		//item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
            let PosY = 0;
              if(i % 5 == 0)
        {
            PosY = i / 5;
        }
        else
        {
            PosY =i / 5 +1;
        }

            item.setPosition( (i%5) * item.width,  (this.totalCount - PosY) * item.height     );
    		//item.getComponent('Item').updateItem(i, i);
            this.items.push(item);
    	}
    },
    
    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
