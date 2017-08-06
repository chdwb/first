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
            default:null,
            type: cc.Label,
        },
         itemPrice:{
            default:null,
            type: cc.Label,
        },
        GoodID:0,
        
       
    },
    
    onBuy:function()
        {
        cc.log("token="+cc.cs.PlayerInfo.ApiToken)
        cc.log("goodid="+this.GoodID)
       // cc.log("itemUseCount="+this.itemUseCount)
        cc.cs.gameMgr.sendGoodBuy(cc.cs.PlayerInfo.ApiToken, 1,this.GoodID, 1, this.GoodBuyHandle, this)
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
        this.itemDec.string = good["GOODS_DESC"]
    },
    
    

    GoodBuyHandle(ret)
    {
       cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.cs.UIMgr.showTip("购买成功", 1.0)
            var parent = this.node.parent
            
            cc.cs.PlayerInfo.Money = JasonObject.content.info.money
            
            var array = cc.cs.PlayerInfo.Bag
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
                cc.log["push Bag"]
                cc.cs.PlayerInfo.Bag.push(newgoods)
            }
            
            
            
            
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },
    
    
    
    
    

    

     
    
    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
