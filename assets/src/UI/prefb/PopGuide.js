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
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    
    setGuide: function(target){

        var listener = { 
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches:true,
    onTouchBegan: function (touch, event) { 
    cc.log('Touch Began: ' + event); 
    //这里必须要写 return true, 
    //onTouchBegan 回调事件里要 return true，  
    //这样后续的 onTouchEnded 和 onTouchMoved 才会触发事件 
    
    // 获取当前触摸点相对于按钮所在的坐标
            var locationInNode = target.convertToNodeSpace(touch.getLocation());    
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {        // 判断触摸点是否在按钮范围内
                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                //target.opacity = 180;
                return false;
            }
            return true;
    
    
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

