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
            default : null,
            type : cc.Sprite
        },
        
        Name:{
            default : null,
            type : cc.Label
        },
        GoodID:0,
        ShopType:0,
    },
    
    onClick : function()
    {
        var type = this.ShopType
        if(this.ShopType == 2)
        {
            cc.cs.gameMgr.sendGoodBuy(cc.cs.PlayerInfo.api_token, type,this.GoodID, 1, this.onMoneyhandle, this)
        }
        else if(this.ShopType == 3)
        {
            cc.cs.gameMgr.sendGoodBuy(cc.cs.PlayerInfo.api_token, type,this.GoodID, 1, this.onLibaohandle, this)
        }
        else if(this.ShopType == 4)
        {
            cc.cs.gameMgr.sendGoodBuy(cc.cs.PlayerInfo.api_token, type,this.GoodID, 1, this.onLibao2handle, this)
        }
    },

    // use this for initialization
    onLoad: function () {

    },
    
    setGood:function(goodsdata){
        this.GoodID = goodsdata["ID"]
        cc.log("shoptype = ",this.ShopType)
        cc.log("goodid = ",this.GoodID)
        if(this.ShopType == 3 || this.ShopType == 4 )
        {
            this.Name.string = goodsdata["NAME"]
        }
        else if(this.ShopType == 2)
        {
            this.Name.string = goodsdata["BUY_GOLD"]
        }
    },
    
    setShopType:function(type)
    {
        cc.log("setshoptype",type)
        this.ShopType = type
    },
    
    onLibaohandle(ret)
    {
        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.cs.UIMgr.showTip("购买成功", 1.0)
            var parent = this.node.parent
            
            cc.cs.PlayerInfo.money = JasonObject.content.info.money
            
           /* var array = cc.cs.PlayerInfo.Bag
            var isFind = false
            for(var i = 0;i < array.length;i++)
            {
               if( array[i].goods_id == JasonObject.content.info.goods_id)
               {
                   isFind = true;
                   array[i].num = JasonObject.content.info.num
                   break;
               }
            }
            if(isFind == false)
            {
                var newgoods;
                    newgoods.goods_id = JasonObject.content.info.goods_id
                    newgoods.num = JasonObject.content.info.num
                
                cc.cs.PlayerInfo.Bag.push(newgoods)
            }*/
            
            
            
            
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },
    
    onLibao2handle(ret)
    {
        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.cs.UIMgr.showTip("购买成功", 1.0)
            var parent = this.node.parent
            
            cc.cs.PlayerInfo.money = JasonObject.content.info.money
            
            /*var array = cc.cs.PlayerInfo.Bag
            var isFind = false
            for(var i = 0;i < array.length;i++)
            {
               if( array[i].goods_id == JasonObject.content.info.goods_id)
               {
                   isFind = true;
                   array[i].num = JasonObject.content.info.num
                   break;
               }
            }
            if(isFind == false)
            {
                var newgoods;
                    newgoods.goods_id = JasonObject.content.info.goods_id
                    newgoods.num = JasonObject.content.info.num
                
                cc.cs.PlayerInfo.Bag.push(newgoods)
            }*/
            
            
            
            
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },
    
     onMoneyhandle(ret)
    {
        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.cs.UIMgr.showTip("购买成功", 1.0)
            var parent = this.node.parent
            
            cc.cs.PlayerInfo.money = JasonObject.content.info.money
            this.node.parent.parent.parent.parent.parent.getComponent("Shop").updateUi()
            
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },
    
    
    
    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
