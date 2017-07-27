cc.Class({
    extends: cc.Component,

    properties: {
        tipPrefab : null
    },

    // use this for initialization
    onLoad: function () {
        
    },

    init : function()
    {
        this.tipPrefab = cc.loader.getRes("prefab/tip", cc.Prefab)
    },
    addItem_verticalScrollView : function(scrollView, node, verticalSpace)
    {
        if(typeof verticalSpace == 'undefined') 
            verticalSpace = 0;
        var pos = cc.v2(0.0,0.0)
        if(scrollView.content.childrenCount == 0)
        {
            scrollView.content.height = node.height
            pos.y = (1.0 - scrollView.content.anchorY) * scrollView.content.height - (1.0 - node.anchorY) * node.height
        }else
        {
            
            pos.y = ((1.0 - scrollView.content.anchorY) * scrollView.content.height - (1.0 - node.anchorY) * node.height) +
             ((0 - scrollView.content.anchorY)*(scrollView.content.height + verticalSpace))

            scrollView.content.height += verticalSpace + node.height
        }
        var diffWidth = scrollView.content.width - node.width
        
        pos.x = (1.0 - scrollView.content.anchorX) * scrollView.content.width - (1.0 - node.anchorX) * node.width - diffWidth * 0.5
        
        scrollView.content.addChild(node)
        node.setPosition(pos)

        cc.log("x == " + pos.x + "     " + "y== " + pos.y + "    " +  " "+scrollView.content.childrenCount+" " + scrollView.content.height);
    },

    showTip : function(text, time){
        var scene = cc.director.getScene();
        var tipNode =cc.instantiate(this.tipPrefab)
        scene.getChildByName("Canvas").addChild(tipNode,1000)
        tipNode.setPosition(0,0);
        tipNode.getChildByName("tipText").getComponent(cc.Label).string = text
        var action = cc.sequence(cc.moveTo(time, 0.0, 350.0), cc.callFunc(function(target)
        {
            cc.director.getScene().getChildByName("Canvas").removeChild (target)
        }, tipNode))

        tipNode.runAction(action);
    },



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
