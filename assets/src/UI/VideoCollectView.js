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
        goldText: {
            type: cc.Label,
            default: null
        },

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
        spacing: 60, // space between each item
        
    },

    // use this for initialization

    setGold: function(gold) {
        cc.log("set gold"+gold)
        this.goldText.string = gold + ""
    },
    updateui:function(){

        this.setGold(cc.cs.PlayerInfo.money)
    },

    onBack:function()
    {
        cc.cs.UIMgr.closeView()
    },
    onLoad: function () {

        this.content = this.scrollView.content;
        this.prefab = cc.loader.getRes("prefab/VideoItem", cc.Prefab)
        cc.cs.game
        this.initialize(cc.cs.gameData.video);

    },
    goshop:function(){
        cc.log("goShop LoveView")
        cc.cs.UIMgr.setShopType(2)
        cc.log("cc.cs.UIMgr = " + cc.cs.UIMgr.currentShopType)
        cc.cs.UIMgr.openView(cc.cs.UIMgr.SHOPVIEW)
    }
    ,

    onEnable:function()
    {
        this.updateui()

        var isshowpop = true
         for (var i = 0; i < cc.cs.PlayerInfo.playerhotpacks.length; i++) 
                {
                cc.log("update HOT item "+ cc.cs.PlayerInfo.playerhotpacks[i].video_id)
                if (cc.cs.PlayerInfo.playerhotpacks[i].hot_id == 7)
                 {
                    isshowpop = false
                    break;
                 }
                }
                if(isshowpop)
                {
                    cc.cs.UIMgr.showPopBuy(7, this.buyPop, this)
                }
    }
    ,

    

    initialize: function (itemArray) {
        cc.log("alkdjflkajdflkajf")
        
        //this.Exp.string = ""+cc.cs.PlayerInfo.exp
        this.content.removeAllChildren(true);
        this.prefab = cc.loader.getRes("prefab/VideoItem", cc.Prefab)
        var length = itemArray["TOTAL_COUNT"]
        cc.log( "arraylength"+length)
        if(length % 4 == 0)
        {
            this.totalCount = Math.floor(length / 4);
        }
        else
        {
            this.totalCount = Math.floor(length / 4) + 1;
        }

        this.spawnCount = length;
        cc.log("total count "+this.totalCount)
        this.content.height = this.totalCount * (this.prefab.data.height + this.spacing)
        cc.log("prefab height " + this.prefab.data.height)
        var littlewidth = this.scrollView.content.width / 4
        var halfwidth = this.scrollView.content.width / 2
        var count = 0;
        for(var i in itemArray) { // spawn items, we only need to do this once
    		cc.log("i = ",i);
    		if(i != "TOTAL_COUNT" && i != "LAST" && i != "FIRST" )
            {
                var item = cc.instantiate(this.prefab)



                var offset =  (this.scrollView.content.width - item.width*4)/8
                
                cc.log("item height " + item.height)
                var itemCom = item.getComponent("VideoItem")
                var videodata = cc.cs.gameData.video[i]
               //cc.log("gooddata = "+gooddata)
                if(videodata != undefined)
                {
                    //itemCom.setItmeNmae(gooddata["GOODS_NAME"] )
                    //cc.log("goodsname = "+videodata["GOODS_NAME"])
                    itemCom.setVideo(videodata)
                }
                this.content.addChild(item);
        		//item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
                let PosY = 0;
                if((count+1) % 4 == 0)
                {
                    PosY =  Math.floor((count+1) / 4);
                }
                else
                {
                    PosY =Math.floor((count+1) /4) +1;
                }   
            
                // this.scrollView.content.width / 4
                PosY -- ;
                 
                 var pos = count % 4
            
               item.setPosition(- halfwidth + littlewidth*pos +item.width/2 + offset,-item.height/2 - PosY * (item.height + this.spacing))
               count ++;
            }
    	}
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
