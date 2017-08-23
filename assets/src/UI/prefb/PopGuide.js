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
        button : {
            default: null,
            type: cc.Node
        },
        
        positonNode : {
            
            default: null,
            type: cc.Node
            
        },

        Des:{
            default: null,
            type: cc.Label

        },

        guide_id:0,

        isArrow: true, // 是否是有箭头的新手引导

         obj:null, // 调用新手引导的界面
        
        
    },

    // use this for initialization
    onLoad: function () {

        cc.log("新手引导创建")

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },


    sendGuideHandle:function(ret)
    {
        var self = this
         var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)
            cc.log("存储新手id成功"+this.guide_id)
            cc.cs.PlayerInfo.guide_id = this.guide_id 
            if(this.isArrow === false)
            {
                if(cc.cs.gameData.guide["GUIDE_ID_"+this.guide_id ]["NEXT"] != "dummy")   // 没有箭头的新手引导 后面有连续的
                {
                    this.guide_id++
                    cc.log("有下一个"+this.guide_id)
                    self.Des.string = cc.cs.gameData.guide["GUIDE_ID_"+this.guide_id ]["GUIDE_TEXT"]
                }
                else
                {
                    self.node.removeFromParent(true);
                    this.obj.updateui()

                }
            }
            else
            {
                self.node.removeFromParent(true);
                this.obj.updateui()
            }


        }else{
            cc.log("error " + JasonObject.error)
        }

    },
    
    setGuide: function(guideID, target,obj){
        
        this.guide_id = guideID
        this.obj = obj
        var self = this
        if(target != null)
        {
            this.isArrow = true
            var p = target.parent.convertToWorldSpace(cc.v2(target.x,target.y))
            var p2 = this.positonNode.parent.convertToNodeSpace(cc.v2(p.x,p.y))
            
            this.positonNode.x = p2.x
            this.positonNode.y = p2.y 
            
            var B1 = target.parent.convertToWorldSpace(cc.v2(target.x,target.y))
            var B2 = this.positonNode.parent.convertToWorldSpace(cc.v2(this.positonNode.x,this.positonNode.y))
            
            cc.log("btn pos "+ B1.x+" "+B1.y)
            cc.log("arrow pos "+ B2.x+" "+B2.y)
        }
        else
        {
            this.isArrow = false
        }

        cc.log("guideID = "+this.guide_id)
        cc.log("target"+target)
        self.Des.string = cc.cs.gameData.guide["GUIDE_ID_"+self.guide_id]["GUIDE_TEXT"]
        
      

        
        
        
        
        

        var listener = { 
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches:true,
    onTouchBegan: function (touch, event) { 
    cc.log('Touch Began: ' + event); 
    //这里必须要写 return true, 
    //onTouchBegan 回调事件里要 return true，  
    //这样后续的 onTouchEnded 和 onTouchMoved 才会触发事件 
    
    // 获取当前触摸点相对于按钮所在的坐标
     if(target != null)
     {
            var locationInNode = target.convertToNodeSpace(touch.getLocation());    
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {        // 判断触摸点是否在按钮范围内
                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                
                cc.cs.gameMgr.sendGuide(self.guide_id,  self.sendGuideHandle, self)
                cc.cs.PlayerInfo.guide_id = this.guide_id  //提前保存 不然点击进入下一个页面 网速慢 还没更新guide_id 下一个页面就无法弹出新手引导
                
                return false;
            }
            return true;
     }
     else
     {

       cc.cs.gameMgr.sendGuide(self.guide_id,  self.sendGuideHandle, self) //提前保存 不然点击进入下一个页面 网速慢 还没更新guide_id 下一个页面就无法弹出新手引导
       cc.cs.PlayerInfo.guide_id = this.guide_id
       return true
     }
    
    
    }, 
    onTouchMoved: function (touches, event) { 
    cc.log('Touch Moved: ' + event); 
    }, 
    onTouchEnded: function (touches, event) { 
    cc.log('Touch Ended: ' + event); 
    }, 
    onTouchCancelled: function (touches, event) { 
    cc.log('Touch Cancelled: ' + event); 
    } 
 } 
 // 绑定单点触摸事件 
    cc.eventManager.addListener(listener, this.button)  
},
})
    
    // 添加单点触摸事件监听器 

