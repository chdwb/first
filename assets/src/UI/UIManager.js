cc.Class({
    extends: cc.Component,

    properties: {
        tipPrefab: null,
        popupPrefab: null,
        nodePopBuyPrefab: null,
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
        SETTINGVIEW:12,
        viewStack : [],
        gameScene : null,
        currentShopType:3 ,
    },

    getView : function(id){
        if(this.MAINVIEW == id){
            return this.gameScene.MAINVIEW
        }else if(this.MISSONVIEW ==id){
            return this.gameScene.MissonView
        }else if(this.LOVEVIEW == id){
            return this.gameScene.LoveView
        }else if(this.ACTIONVIEW == id){
            return this.gameScene.ActionView
        }else if(this.PHONEVIEW == id){
            return this.gameScene.PhoneView
        }else if(this.ZONEVIEW == id){
            return this.gameScene.ZoneView
        }else if(this.BAGVIEW == id){
            return this.gameScene.BagView
        }else if(this.SHOPVIEW == id){
            return this.gameScene.ShopView
        }else if(this.SIGNREWARDVIEW == id){
            return this.gameScene.SignRewardView
        }else if(this.GIFTVIEW == id){
            return this.gameScene.GiftView
        }else if(this.WECHATVIEW == id){
            return this.gameScene.WechatView
        }else if(this.VIDEOVIEW == id){
            return this.gameScene.VideoView
        }else if(this.SETTINGVIEW == id){
            return this.gameScene.SettingView
        }
        return null
    },

    closeView : function(){
        if(this.viewStack.length > 0){
            var view = this.viewStack.pop()
            view.active = false
            cc.log("closeView name = " + view.name)
            if(this.viewStack.length > 0){
                this.viewStack[this.viewStack.length - 1].active = true
            }else{
                this.gameScene.MainView.active = true;
            }
        }else{
            this.gameScene.MainView.active = true;
        }
    },

    closeAllView:function(){
        for(var i =0 ; i < this.viewStack.length; ++i){
            this.closeView()
        }
    },

    setShopType:function(type)
    {
        this.currentShopType = type
        cc.log("setShopType "+ this.currentShopType)
    },

    openView : function(id){
        if(this.gameScene == null){
            cc.log("error gameScene is null")
        }else{
            if(this.MAINVIEW == id){
                this.gameScene.MainView.active = true;
            }else if(this.MISSONVIEW ==id){
                this.viewStack.push(this.gameScene.MissonView)
                this.gameScene.MainView.active =false
            }else if(this.LOVEVIEW == id){
                this.viewStack.push(this.gameScene.LoveView)
                this.gameScene.MainView.active =false
            }else if(this.ACTIONVIEW == id){
                this.viewStack.push(this.gameScene.ActionView)
                this.gameScene.MainView.active =false
            }else if(this.PHONEVIEW == id){
                this.viewStack.push(this.gameScene.PhoneView)
                this.gameScene.MainView.active =false
            }else if(this.ZONEVIEW == id){
                this.viewStack.push(this.gameScene.ZoneView)
                this.gameScene.MainView.active =false
            }else if(this.BAGVIEW == id){
                this.viewStack.push(this.gameScene.BagView)
                this.gameScene.MainView.active =false
            }else if(this.SHOPVIEW == id){
                cc.log("uimgr currentShopType = "+ this.currentShopType)
                this.viewStack.push(this.gameScene.ShopView)
                this.gameScene.MainView.active =false
            }else if(this.SIGNREWARDVIEW == id){
                this.viewStack.push(this.gameScene.SignRewardView)
                this.gameScene.MainView.active =false
            }else if(this.GIFTVIEW == id){
                this.viewStack.push(this.gameScene.GiftView)
                this.gameScene.MainView.active =false
            }else if(this.WECHATVIEW == id){
                this.viewStack.push(this.gameScene.WechatView)
                this.gameScene.MainView.active =false
            }else if(this.VIDEOVIEW == id){
                this.viewStack.push(this.gameScene.VideoView)
                this.gameScene.MainView.active =false
            }
            else if(this.SETTINGVIEW == id){
                this.viewStack.push(this.gameScene.SettingView)
                this.gameScene.MainView.active =false
            }

            for(var i = 0 ; i < this.viewStack.length -1 ; ++i){
                this.viewStack[i].active = false
            }
            this.viewStack[this.viewStack.length -1].active = true

            cc.log("openvIew ------------------------------------------------------------------------start")
            for(var i = 0 ; i < this.viewStack.length ; ++i){
                cc.log(this.viewStack[i].name + "      =      " +  this.viewStack[i].active)
            }
            cc.log("openvIew ------------------------------------------------------------------------end")
        }
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



changeSpriteFrame: function(spriteframeOrigin, res) {
        if (!cc.cs.loadMgr.isLoadComplete) {
            cc.log("error the res is not load complete")
        }
        var spriteFrame = cc.loader.getRes("picture/newRes/" + res, cc.SpriteFrame)
        if (spriteFrame == null || spriteFrame == 'undefinde') {
            cc.log("the res is mission = " + "picture/newRes/" + res)
        }
        
        spriteframeOrigin._textureFilenameSetter.set (spriteFrame._textureFilename)
    },


    init: function() {
        this.tipPrefab = cc.loader.getRes("prefab/tip", cc.Prefab)
        this.popupPrefab = cc.loader.getRes("prefab/popup", cc.Prefab)
        this.nodeUsePrefab = cc.loader.getRes("prefab/NodeUse", cc.Prefab)
        this.nodePopBuyPrefab = cc.loader.getRes("prefab/PopBuy", cc.Prefab)
        this.nodeGuidePrefab = cc.loader.getRes("prefab/PopGuide5", cc.Prefab)
    },
    showPopBuy: function(okHandle,obj) {

        var scene = cc.director.getScene();
        var popupNode = cc.instantiate(this.nodePopBuyPrefab)
        scene.getChildByName("Canvas").addChild(popupNode, 999)
        popupNode.setPosition(0, 0);
        popupNode.getComponent("PopBuy").setCallBack(okHandle,obj)
    },
    
    
    showGuide: function(guideID,Target,obj) {

        cc.log("showGuide"+guideID)
        if(guideID <= parseInt(cc.cs.PlayerInfo.guide_id) )
        {
            return
        }
        else
        {
 
            var scene = cc.director.getScene();
            cc.log("scene   = "+ scene + "    " + this.nodeGuidePrefab)
            var popupNode = cc.instantiate(this.nodeGuidePrefab)
            cc.log("popupNode   = "+ popupNode + "    " )
            scene.getChildByName("Canvas").addChild(popupNode, 999)
            popupNode.setPosition(0, 0);
            popupNode.getComponent("PopGuide").setGuide(guideID,Target,obj)
        }   
    },
    
    addItem_horizontalScrollView: function(scrollView, node, horizontalSpace) {
        if (typeof horizontalSpace == 'undefined')
            horizontalSpace = 0;
        var pos = cc.v2(0.0, 0.0)
        if (scrollView.content.childrenCount == 0) {
            scrollView.content.width = node.width
            pos.x = (1.0 - scrollView.content.anchorX) * scrollView.content.width - (1.0 - node.anchorX) * node.width
        } else {
            scrollView.content.width += horizontalSpace + node.width
            pos.x = ((1.0 - scrollView.content.anchorX) * scrollView.content.width - (1.0 - node.anchorX) * node.width) +
                ((0 - scrollView.content.anchorX) * (scrollView.content.width + horizontalSpace))  
        }
        var diffHeight = scrollView.content.height - node.height
        pos.y = (1.0 - scrollView.content.anchorY) * scrollView.content.height - (1.0 - node.anchorY) * node.height - diffHeight * 0.5
        node.active = true
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

    refresh_verticalScrollViewUp: function(scrollView, verticalSpace) {
        if (typeof verticalSpace == 'undefined')
            verticalSpace = 0;
        var pos = cc.v2(0.0, 0.0)
        var children = scrollView.content.getChildren();
        var height = 0;
        
        for(var i = 0 ; i < children.length; ++i){
            
            if(i == 0){
                scrollView.content.height = children[i].height+ verticalSpace
                children[i].y = 0
            }else{
                
                children[i].y =  -  scrollView.content.height
                scrollView.content.height +=  + children[i].height +  verticalSpace
            }
            cc.log("refresh_verticalScrollViewUp   " + children[i].height + "     " +scrollView.content.height + "      " + children[i].y+ "    "+
            ((1.0 - scrollView.content.anchorY) * scrollView.content.height - (1.0 - children[i].anchorY) * children[i].height) + "    " + 
            ((1.0 - children[i].anchorY) * children[i].height))
        }
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

    getTalkHeight : function(n){
        var nameText = n.getChildByName("name")
        return nameText.height + n.height
    },

    setNanTalk : function(nanNode,text,name){
        var nameText = nanNode.getChildByName("name").getComponent(cc.Label)
        var talkText = nanNode.getChildByName("talk").getComponent(cc.Label)
        talkText.string = text
        nameText.string = name
        if(talkText.node.height < 85){
            nanNode.height = 85
        }else{
            nanNode.height = talkText.node.height + 20
        }
        nameText.node.y = nanNode.height * 0.5
    },

    setNvTalk : function(nvNode,text,name, issound){
        var nameText = nvNode.getChildByName("name").getComponent(cc.Label)
        var talkText = nvNode.getChildByName("talk").getComponent(cc.Label)
        var soundTalk = nvNode.getChildByName("soundBtn")
        if(issound){
            soundTalk.active = true
            nvNode.width = 586
            talkText.node.width = 536
            talkText.node.x = 25
            soundTalk.x = nvNode.width -50 
        }else{
            soundTalk.active = false
            nvNode.width = 740
            talkText.node.width = 690
            talkText.node.x = 25
            soundTalk.x = nvNode.width -50 
        }
        talkText.string = text
        nameText.string = name

        var lineCount = Math.ceil(text.length * talkText.fontSize / talkText.node.width)
        if(lineCount * talkText.lineHeight + 20 < 85){
            nvNode.height = 85
        }else{
            nvNode.height = lineCount * talkText.lineHeight + 20
        }
        nameText.node.y = nvNode.height * 0.5
        soundTalk.y = nvNode.height * 0.5 + soundTalk.height * 0.5 + 5
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});