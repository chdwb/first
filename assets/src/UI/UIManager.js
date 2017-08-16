cc.Class({
    extends: cc.Component,

    properties: {
        tipPrefab: null,
        popupPrefab: null,
        removeList: [],
        MAINVIEW: 0,
        MISSONVIEW: 1,
        LOVEVIEW: 2,
        ACTIONVIEW: 3,
        PHONEVIEW: 4,
        ZONEVIEW: 5,
        BAGVIEW: 6,
        SHOPVIEW: 7,
        SIGNREWARDVIEW: 8,
        GIFTVIEW: 9,
        WECHATVIEW: 10,
        VIDEOVIEW: 11,
    },

    // use this for initialization
    onLoad: function() {

    },

    changeSprite: function(node, res) {
        if (!cc.cs.loadMgr.isLoadComplete) {
            cc.log("error the res is not load complete")
        }
        var spriteFrame = cc.loader.getRes("picture/newRes/" + res, cc.SpriteFrame)
        if (spriteFrame == null || spriteFrame == 'undefinde') {
            cc.log("the res is mission = " + "picture/newRes/" + res)
        }
        var sprite = node.getComponent(cc.Sprite)
        if (sprite == null || sprite == 'undefinde') {
            cc.log("the sprite is mission = " + node.name)
        }
        sprite.spriteFrame = spriteFrame
    },

    init: function() {
        this.tipPrefab = cc.loader.getRes("prefab/tip", cc.Prefab)
        this.popupPrefab = cc.loader.getRes("prefab/popup", cc.Prefab)
        this.nodeUsePrefab = cc.loader.getRes("prefab/NodeUse", cc.Prefab)
    },
    addItem_horizontalScrollView: function(scrollView, node, horizontalSpace) {
        if (typeof horizontalSpace == 'undefined')
            horizontalSpace = 0;
        var pos = cc.v2(0.0, 0.0)
        if (scrollView.content.childrenCount == 0) {
            scrollView.content.width = node.width
            pos.x = (1.0 - scrollView.content.anchorX) * scrollView.content.width - (1.0 - node.anchorX) * node.width
        } else {

            pos.x = ((1.0 - scrollView.content.anchorX) * scrollView.content.width - (1.0 - node.anchorX) * node.width) +
                ((0 - scrollView.content.anchorX) * (scrollView.content.width + horizontalSpace))

            scrollView.content.width += horizontalSpace + node.width
        }
        var diffHeight = scrollView.content.height - node.height

        pos.y = (1.0 - scrollView.content.anchorY) * scrollView.content.height - (1.0 - node.anchorY) * node.height - diffHeight * 0.5

        scrollView.content.addChild(node)
        node.setPosition(pos)
    },

    addItem_verticalScrollView: function(scrollView, node, verticalSpace) {
        if (typeof verticalSpace == 'undefined')
            verticalSpace = 0;
        var pos = cc.v2(0.0, 0.0)
        if (scrollView.content.childrenCount == 0) {
            scrollView.content.height = node.height
            pos.y = (1.0 - scrollView.content.anchorY) * scrollView.content.height - (1.0 - node.anchorY) * node.height
        } else {

            pos.y = ((1.0 - scrollView.content.anchorY) * scrollView.content.height - (1.0 - node.anchorY) * node.height) +
                ((0 - scrollView.content.anchorY) * (scrollView.content.height + verticalSpace))

            scrollView.content.height += verticalSpace + node.height
        }
        var diffWidth = scrollView.content.width - node.width

        pos.x = (1.0 - scrollView.content.anchorX) * scrollView.content.width - (1.0 - node.anchorX) * node.width - diffWidth * 0.5

        scrollView.content.addChild(node)
        node.setPosition(pos)
    },

    addItem_verticalScrollViewUp: function(scrollView, node, verticalSpace) {
        if (typeof verticalSpace == 'undefined')
            verticalSpace = 0;
        var pos = cc.v2(0.0, 0.0)
        if (scrollView.content.childrenCount == 0) {
            scrollView.content.height = node.height
            pos.y = (1.0 - scrollView.content.anchorY) * scrollView.content.height - (1.0 - node.anchorY) * node.height
        } else {
            scrollView.content.height += verticalSpace + node.height
            var children = scrollView.content.getChildren()
            for (var i = 0; i < scrollView.content.childrenCount; ++i) {
                cc.log("children[i].y += (scrollView.content.height + verticalSpace)   =" + i + "   " + children[i].y + "    " + (node.height + verticalSpace))
                children[i].y += (1.0 - scrollView.content.anchorY) * scrollView.content.height - (node.height + verticalSpace)
            }
            pos.y = ((1.0 - scrollView.content.anchorY) * scrollView.content.height - (1.0 - node.anchorY) * node.height)
        }
        var diffWidth = scrollView.content.width - node.width

        pos.x = (1.0 - scrollView.content.anchorX) * scrollView.content.width - (1.0 - node.anchorX) * node.width - diffWidth * 0.5

        scrollView.content.addChild(node)
        node.setPosition(pos)
    },


    showTip: function(text, time) {
        var scene = cc.director.getScene();
        var tipNode = cc.instantiate(this.tipPrefab)
        scene.getChildByName("Canvas").addChild(tipNode, 1000)
        tipNode.setPosition(0, 0);
        tipNode.getChildByName("tipText").getComponent(cc.Label).string = text
        var action = cc.sequence(cc.moveTo(time, 0.0, 350.0), cc.callFunc(function(target) {
            cc.director.getScene().getChildByName("Canvas").removeChild(target)
        }, tipNode))

        tipNode.runAction(action);
    },



    showPopupO: function(title, msg, okHandle) {

        var scene = cc.director.getScene();
        var popupNode = cc.instantiate(this.popupPrefab)
        scene.getChildByName("Canvas").addChild(popupNode, 999)
        popupNode.setPosition(0, 0);
        popupNode.getChildByName("title").getComponent(cc.Label).string = title
        popupNode.getChildByName("msg").getComponent(cc.Label).string = msg
        popupNode.getChildByName("okBtn").x = 0
        popupNode.getChildByName("cancelBtn").active = false;
        popupNode.getChildByName("okBtn").on("click", (event) => {
            if (okHandle != null)
                okHandle();
            cc.director.getScene().getChildByName("Canvas").removeChild(event.target.parent)
        }, popupNode.getChildByName("okBtn"))

    },


    showPopupOC: function(title, msg, okHandle, cancelHandle) {

        var scene = cc.director.getScene();
        var popupNode = cc.instantiate(this.popupPrefab)
        scene.getChildByName("Canvas").addChild(popupNode, 999)
        popupNode.setPosition(0, 0);
        popupNode.getChildByName("title").getComponent(cc.Label).string = title
        popupNode.getChildByName("msg").getComponent(cc.Label).string = msg
        popupNode.getChildByName("okBtn").on("click", (event) => {
            if (okHandle != null)
                okHandle();
            cc.director.getScene().getChildByName("Canvas").removeChild(event.target.parent)
        }, popupNode.getChildByName("okBtn"))

        popupNode.getChildByName("cancelBtn").on("click", (event) => {
            if (cancelHandle != null)
                cancelHandle();
            cc.director.getScene().getChildByName("Canvas").removeChild(event.target.parent)
        }, popupNode.getChildByName("cancelBtn"))
    },

    showNodeUse: function(goodsid, okHandle, max, obj, type) {

        var scene = cc.director.getScene();
        var popupNode = cc.instantiate(this.nodeUsePrefab)
        scene.getChildByName("Canvas").addChild(popupNode, 999)
        popupNode.setPosition(0, 0);
        popupNode.getComponent("NodeUse").setCallBack(goodsid, okHandle, max, obj, type)
    },



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});