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
