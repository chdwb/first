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
        itemName:{
            default:null,
            type: cc.Label,
        },
         itemDec:{
            type: cc.RichText,
            default: null
        },
         itemPrice:{
            default:null,
            type: cc.Label,
        },
          Icon:{
            default:null,
            type: cc.Sprite,
        },
        
        
        
        GoodID:0,
        
       
    },
    
  sendbuy:function(buynum)
  {
      cc.log("buynum = "+ buynum)
      cc.cs.gameMgr.sendGoodBuy(1,this.GoodID, buynum, this.GoodBuyHandle, this)
  },

    onBuy:function()
        {
        cc.log("token="+cc.cs.PlayerInfo.api_token)
        cc.log("goodid="+this.GoodID)
       // cc.log("itemUseCount="+this.itemUseCount)
        //cc.cs.gameMgr.sendGoodBuy(cc.cs.PlayerInfo.api_token, 1,this.GoodID, 1, this.GoodBuyHandle, this)


       var price = cc.cs.gameData.goods["GOODS_ID_"+this.GoodID]["GOODS_PRICE"]
        var count =  Math.floor(cc.cs.PlayerInfo.money / parseInt(price))

        cc.log("buy count = "+ count)
        if(count != 0)
        {
            cc.cs.UIMgr.showNodeUse(this.GoodID,this.sendbuy,count,this,0)
        }
        else
            {
                cc.cs.UIMgr.showTip("金币数量不够",1.0)
            }
        },

    // use this for initialization
    onLoad: function () {

    },
    
    
    setGood:function(good)
    {
        //this.GoodID = name
        this.GoodID = good["GOODS_ID"];
        this.itemName.string = good["GOODS_NAME"]
        this.itemPrice.string = good["GOODS_PRICE"]
        //this.itemDec.string = good["GOODS_DESC"]
        var text = good["GOODS_DESC"]

        if(good["GOODS_EFFECT_VALUE"] != "dummy")
        {
            this.itemDec.string = text.replace(/0/g, "<color=#D16363>" + good["GOODS_EFFECT_VALUE"]+"</c>" )
        }
        else
        {
            this.itemDec.string = text
        }

        
        cc.cs.UIMgr.changeSprite(this.Icon.node, "shop/shop_item/" + this.GoodID)
    },
    
    

    GoodBuyHandle(ret)
    {
       cc.log(ret)
        var JasonObject = JSON.parse(ret);
        cc.cs.UIMgr.closeNetView()
        if (JasonObject.success === true) {
            
            cc.cs.UIMgr.showTip("购买成功", 1.0)
            var parent = this.node.parent
            
            cc.cs.PlayerInfo.money = JasonObject.content.info.money
            
            var array = cc.cs.PlayerInfo.Bag
            var isFind = false
            for(var i = 0;i < array.length;i++)
            {
               
               if( array[i].goods_id == JasonObject.content.info.goods_id)
               {
                    cc.log("已经有这个道具")
                   isFind = true;
                   array[i].num = JasonObject.content.info.num
                   break;
               }
            }
            if(isFind == false)
            {
                cc.log("还没有这个道具")
                var newgoods = {}
                    newgoods.goods_id = JasonObject.content.info.goods_id
                    newgoods.num = JasonObject.content.info.num
                cc.log["push Bag"]
                cc.cs.PlayerInfo.Bag.push(newgoods)
            }

            
            
            this.node.parent.parent.parent.parent.parent.getComponent("Shop").updateUi()
            
            
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },
    
    
    
    
    

    

     
    
    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
