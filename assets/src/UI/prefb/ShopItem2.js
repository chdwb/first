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

        remai:{
            default : null,
            type : cc.Node
        },

        have:{
            default : null,
            type : cc.Node
        },
        GoodID:0,
        ShopType:0,
        IsHave:false,
    },
    
    onClick : function()
    {
        if(this.IsHave)
        {
            return;
        }
        var type = this.ShopType
        if(this.ShopType == 2)
        {
            cc.cs.gameMgr.sendGoodBuy( type,this.GoodID, 1, this.onMoneyhandle, this)
        }
        else if(this.ShopType == 3)
        {
            cc.cs.gameMgr.sendGoodBuy( type,this.GoodID, 1, this.onLibaohandle, this)
        }
        else if(this.ShopType == 4)
        {
            cc.cs.gameMgr.sendGoodBuy( type,this.GoodID, 1, this.onLibao2handle, this)
        }
    },

    // use this for initialization
    onLoad: function () {

        

    },
    
    setGood:function(goodsdata){

        this.remai.active = false
        this.have.active = false
        this.GoodID = goodsdata["ID"]
        cc.log("shoptype = ",this.ShopType)
        cc.log("goodid = ",this.GoodID)

        if(this.ShopType == 3) // 热卖礼包
        {
            if(this.GoodID == 1)  //秒回礼包
            {
                if(cc.cs.PlayerInfo.wechat_fn)
                {
                    this.have.active = true
                    this.IsHave = true
                }
                else
                {
                    this.remai.active = true
                }
            } else if(this.GoodID == 2) //一键礼包
            {
                if(cc.cs.PlayerInfo.work_fn)
                {
                    this.have.active = true
                    this.IsHave = true
                }
                else
                {
                    this.remai.active = true
                }
            }else 
            {
                for (var i = 0; i < cc.cs.PlayerInfo.playerhotpacks.length; i++) 
                {
                cc.log("update HOT item "+ cc.cs.PlayerInfo.playerhotpacks[i].video_id)
                if (cc.cs.PlayerInfo.playerhotpacks[i].hot_id == this.GoodID)
                 {
                    this.have.active = true
                    this.IsHave = true
                
                break;
                }
            
            
                }
                if(this.IsHave == false)
                {
                        this.remai.active = true
                    
                }

            }
            
           
            
        }

        if(this.ShopType == 4)
        {
            if(this.GoodID == 1)  //3
            {
                if(cc.cs.PlayerInfo.work_id >= 3)
                {
                    this.IsHave = true
                    this.have.active = true
                }
                else
                    {
                        this.remai.active = true
                    }

            }
            else if(this.GoodID == 2) // 5
             {
                if(cc.cs.PlayerInfo.work_id >= 5)
                    {
                        this.IsHave = true
                        this.have.active = true
                    }
                    else
                        {
                            this.remai.active = true
                        }

             }
             else if(this.GoodID == 3) // 7
            {
                if(cc.cs.PlayerInfo.work_id >= 7)
                    {
                        this.IsHave = true
                        this.have.active = true
                    }
                    else
                        {
                            this.remai.active = true
                        }
                
            }
            else if(this.GoodID == 4) // 10
            {
                if(cc.cs.PlayerInfo.work_id >= 10)
                    {
                        this.IsHave = true
                        this.have.active = true
                    }else
                    {
                        this.remai.active = true
                    }
                
            }         
            
        }



        if(this.ShopType == 3 || this.ShopType == 4 )
        {
            this.Name.string = goodsdata["NAME"]
            var url = ""
            if(this.ShopType == 3)
            {
                url = "shop/libao/"

            }
            else if(this.ShopType == 4)
            {
                url = "shop/superlibao/"

            }
            cc.cs.UIMgr.changeSprite(this.Icon.node, url + this.GoodID)
        }
        else if(this.ShopType == 2)
        {
            this.Name.string = goodsdata["BUY_GOLD"]
            cc.cs.UIMgr.changeSprite(this.Icon.node, "shop/jinbi/" + this.GoodID)
        }
    },
    
    setShopType:function(type)
    {
        cc.log("setshoptype",type)
        this.ShopType = type
    },
    
    onLibaohandle(ret)
    {
        cc.log("libao update")
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.cs.UIMgr.closeNetView()
            cc.cs.UIMgr.showTip("购买成功", 1.0)
            var parent = this.node.parent
            
            cc.cs.PlayerInfo.money = JasonObject.content.info.money
            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)
            
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
            
            this.node.parent.parent.parent.parent.parent.getComponent("Shop").updateUi()
            
            
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },
    
    onLibao2handle(ret)
    {
        cc.log("libao2 update")
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.cs.UIMgr.closeNetView()
            cc.cs.UIMgr.showTip("购买成功", 1.0)
            var parent = this.node.parent
            
            cc.cs.PlayerInfo.money = JasonObject.content.info.money
            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)
            
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
            
            this.node.parent.parent.parent.parent.parent.getComponent("Shop").updateUi()
            
            
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },
    
     onMoneyhandle(ret)
    {
        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.cs.UIMgr.closeNetView()
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
