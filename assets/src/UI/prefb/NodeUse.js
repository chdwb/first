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
      
    
        itemDec666:{
            default: null,
            type: cc.Label
        },

        itemUseCount:1,
        itemUseCountLabel:{
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

        Icon:{
            default:null,
            type: cc.Sprite,
        },

        TotalPrice:{
            default: null,
            type: cc.Label

        },

        buttonJia:{
            default: null,
            type: cc.Button

        },

        buttonJian:{
            default: null,
            type: cc.Button

        },
        
        



        itmeCount:0,
        doJob:null,
        obj:null,
        goodsid:0,

        BUYITEM:0,  //
        USEITEM:1,
        BUYLIBAO:2,


        type:0,
        price:0,

        jiasudu:0.2,
        currentSpeed :0.2,
        currentJishu : 0,
        addItemCount : 0


    },

    // use this for initialization
    onLoad: function () {
        

    },
    
    onEnable:function(){
      //this.updateButton()  
    },

    setCallBack:function(goodsid, OKhandle,Max,obj,type)
    {
        var self =  this
        this.goodsid = goodsid
        this.doJob = OKhandle
        this.itmeCount = Max
        
        this.obj = obj
        this.type = type;

        var gooddata = cc.cs.gameData.goods["GOODS_ID_" +goodsid]
            if(gooddata != undefined)
            {
                this.price = parseInt(gooddata["GOODS_PRICE"])
                this.TotalPrice.string = ""+(this.price * 1)
                this.ItemNmae.string = gooddata["GOODS_NAME"]
                this.itemDec666.string = gooddata["GOODS_DESC"]


                cc.cs.UIMgr.changeSprite(this.Icon.node, "shop/goods/" + this.goodsid)
                
            }
            else
            {
                this.ItemNmae.string = goodsid
            }




             var array = cc.cs.PlayerInfo.Bag
            var isFind = false
            for(var i = 0;i < array.length;i++)
            {
               if( array[i].goods_id == goodsid)
               {
                   isFind = true;

                   cc.log(66666)
                   this.ItemCount2.string = array[i].num 
                   break;
               }
            }
            if(isFind == false)
            {
                cc.log(99999)
                this.ItemCount2.string ="0"
            }


            this.updateButton()



        
            
        var listener = { 
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan: function (touch, event) { 
            cc.log('Touch Began: ' + event); 
            //这里必须要写 return true, 
            //onTouchBegan 回调事件里要 return true，  
            //这样后续的 onTouchEnded 和 onTouchMoved 才会触发事件 
            
            // 获取当前触摸点相对于按钮所在的坐标
            self.currentSpeed = self.jiasudu
            self.currentJishu = 0.0
             {
                    var locationInNode = self.buttonJia.node.convertToNodeSpace(touch.getLocation());    
                    var s = self.buttonJia.node.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);
        
                    if (cc.rectContainsPoint(rect, locationInNode)) {        // 判断触摸点是否在按钮范围内
                        cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                        self.schedule(self.step,0.0)
                        
                       
                        return true;
                    }
                    return false;
             }
            
            
            
            }, 
            onTouchMoved: function (touch, event) { 
            cc.log('Touch Moved: ' + event); 
            var locationInNode = self.buttonJia.node.convertToNodeSpace(touch.getLocation());    
            var s = self.buttonJia.node.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (!cc.rectContainsPoint(rect, locationInNode)) {        // 判断触摸点是否在按钮范围内
                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                self.unschedule(self.step)
                
               
                
            }
            }, 
            onTouchEnded: function (touch, event) { 
            cc.log('Touch Ended: ' + event); 
            self.unschedule(self.step)
            var locationInNode = self.buttonJia.node.convertToNodeSpace(touch.getLocation());    
            var s = self.buttonJia.node.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {        // 判断触摸点是否在按钮范围内
                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                self.onPlus()
            }
            }, 
            onTouchCancelled: function (touches, event) { 
            cc.log('Touch Cancelled: ' + event); 
            } 
         } 
         // 绑定单点触摸事件 
            cc.eventManager.addListener(listener, self.buttonJia.node)  




            var listener2 = { 
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches:true,
                onTouchBegan: function (touch, event) { 
                cc.log('Touch Began: ' + event); 
                //这里必须要写 return true, 
                //onTouchBegan 回调事件里要 return true，  
                //这样后续的 onTouchEnded 和 onTouchMoved 才会触发事件 
                
                // 获取当前触摸点相对于按钮所在的坐标
                self.currentSpeed = self.jiasudu
                self.currentJishu = 0.0
                 {
                        var locationInNode = self.buttonJian.node.convertToNodeSpace(touch.getLocation());    
                        var s = self.buttonJian.node.getContentSize();
                        var rect = cc.rect(0, 0, s.width, s.height);
            
                        if (cc.rectContainsPoint(rect, locationInNode)) {        // 判断触摸点是否在按钮范围内
                            cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                            self.schedule(self.step2,0.0)
                            
                           
                            return true;
                        }
                        return false;
                 }
                
                
                
                }, 
                onTouchMoved: function (touch, event) { 
                cc.log('Touch Moved: ' + event); 
                var locationInNode = self.buttonJian.node.convertToNodeSpace(touch.getLocation());    
                var s = self.buttonJia.node.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
    
                if (!cc.rectContainsPoint(rect, locationInNode)) {        // 判断触摸点是否在按钮范围内
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    self.unschedule(self.step2)
                    
                   
                    
                }
                }, 
                onTouchEnded: function (touch, event) { 
                cc.log('Touch Ended: ' + event); 
                self.unschedule(self.step2)
                var locationInNode = self.buttonJian.node.convertToNodeSpace(touch.getLocation());    
                var s = self.buttonJia.node.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
    
                if (cc.rectContainsPoint(rect, locationInNode)) {        // 判断触摸点是否在按钮范围内
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    self.onMinus()
                }
                }, 
                onTouchCancelled: function (touches, event) { 
                cc.log('Touch Cancelled: ' + event); 
                } 
             } 
             // 绑定单点触摸事件 
                cc.eventManager.addListener(listener2, self.buttonJian.node)  
    
        

    },

    step : function(dt)
    {

        //cc.log(dt)
        this.currentJishu += dt
        if(this.currentJishu >= this.currentSpeed){
            this.onPlus()
            this.currentSpeed -= 0.01
            if(this.currentSpeed < 0.01)
                this.currentSpeed = 0.01
            this.currentJishu = 0.0
        }
    },


    


    step2 : function(dt)
    {

        //cc.log(dt)
        this.currentJishu += dt
        if(this.currentJishu >= this.currentSpeed){
            this.onMinus()
            this.currentSpeed -= 0.01
            if(this.currentSpeed < 0.01)
                this.currentSpeed = 0.01
            this.currentJishu = 0.0
        }
    },

    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    
    updateButton:function()
    {
        this.buttonJian.interactable = true
        this.buttonJia.interactable = true
        if(this.itmeCount == 0)
            {

                this.buttonJian.interactable = false
                this.buttonJia.interactable = false
                this.itemUseCount = 0
                this.itemUseCountLabel.string = ""+this.itemUseCount
                return

            }
        if(this.itemUseCount == 1)
        {
            this.buttonJian.interactable = false
        }
        else
        {
            this.buttonJian.interactable = true
        }
        
        if(this.itemUseCount == this.itmeCount)
        {
            this.buttonJia.interactable = false
        }
        else
        {
            this.buttonJia.interactable = true
        }
        
        
    },


    onCancel:function()
    {
        //this.nodeItemUse.active = false;
        this.node.removeFromParent(true);

    },

    onOK:function()
    {
       //this.startGoodsUse();
       this.doJob.apply(this.obj, [this.itemUseCount]);
       cc.log("OKOKOKOKOK"+this.itemUseCount)
       this.node.removeFromParent(true);

    },

    onPlus:function()
    {
        this.itemUseCount ++;
        if(this.itemUseCount > this.itmeCount)
        {
            this.itemUseCount = this.itmeCount
            //this.buttonJia.interactable = false
        }
        //this.buttonJian.interactable = true

        this.itemUseCountLabel.string = ""+this.itemUseCount
        this.TotalPrice.string = ""+(this.price * this.itemUseCount)
        this.updateButton()
        
    },

    onMinus:function()
    {
        this.itemUseCount --;
        if(this.itemUseCount == 0)
        {
            this.itemUseCount = 1
            //this.buttonJian.interactable = false
        }
        //this.buttonJia.interactable = true
        this.itemUseCountLabel.string = ""+this.itemUseCount
        this.TotalPrice.string = ""+(this.price * this.itemUseCount)
        this.updateButton()
    },
});
