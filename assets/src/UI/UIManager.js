cc.Class({
    extends: cc.Component,

    properties: {
        tipPrefab: null,
        popupPrefab: null,
        nodePopBuyPrefab: null,
        expTip: null,
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
        SETTINGVIEW: 12,
        COLLECTVIEW: 13,
        viewStack: [],
        gameScene: null,
        currentShopType: 3,
    },

    getView: function(id) {
        if (this.MAINVIEW == id) {
            return this.gameScene.MAINVIEW
        } else if (this.MISSONVIEW == id) {
            return this.gameScene.MissonView
        } else if (this.LOVEVIEW == id) {
            return this.gameScene.LoveView
        } else if (this.ACTIONVIEW == id) {
            return this.gameScene.ActionView
        } else if (this.PHONEVIEW == id) {
            return this.gameScene.PhoneView
        } else if (this.ZONEVIEW == id) {
            return this.gameScene.ZoneView
        } else if (this.BAGVIEW == id) {
            return this.gameScene.BagView
        } else if (this.SHOPVIEW == id) {
            return this.gameScene.ShopView
        } else if (this.SIGNREWARDVIEW == id) {
            return this.gameScene.SignRewardView
        } else if (this.GIFTVIEW == id) {
            return this.gameScene.GiftView
        } else if (this.WECHATVIEW == id) {
            return this.gameScene.WechatView
        } else if (this.VIDEOVIEW == id) {
            return this.gameScene.VideoView
        } else if (this.SETTINGVIEW == id) {
            return this.gameScene.SettingView
        } else if (this.COLLECTVIEW == id) {
            return this.gameScene.CollectView
        }
        return null
    },

    showNetView: function() {
        if(CC_JSB){
            this.gameScene.loadingView.getComponent("LoadingView").openLoading()
        }
        //this.gameScene.loadingView.getComponent("LoadingView").openLoading()
    },

    closeNetView: function() {
        if(CC_JSB){
            this.gameScene.loadingView.getComponent("LoadingView").closeLoading()
        }
        //this.gameScene.loadingView.getComponent("LoadingView").closeLoading()
    },

    closeView: function() {
         this.isOpen = false
        if (this.viewStack.length > 0) {
            var view = this.viewStack.pop()
            view.active = false
            cc.log("closeView name = " + view.name)
            if (this.viewStack.length > 0) {
                this.viewStack[this.viewStack.length - 1].active = true
            } else {
                this.gameScene.MainView.active = true;
            }
        } else {
            this.gameScene.MainView.active = true;
        }
    },

    closeAllView: function() {
        this.isOpen = false
        for (var i = 0; i < this.viewStack.length; ++i) {
            this.closeView()
        }
    },

    setShopType: function(type) {
        this.currentShopType = type
        cc.log("setShopType " + this.currentShopType)
    },

    openView: function(id) {
        this.isOpen = true
        if (this.gameScene == null) {
            cc.log("error gameScene is null")
        } else {
            if (this.MAINVIEW == id) {
                this.gameScene.MainView.active = true;
            } else if (this.MISSONVIEW == id) {
                this.viewStack.push(this.gameScene.MissonView)
                this.gameScene.MainView.active = false
            } else if (this.LOVEVIEW == id) {
                this.viewStack.push(this.gameScene.LoveView)
                this.gameScene.MainView.active = false
            } else if (this.ACTIONVIEW == id) {
                this.viewStack.push(this.gameScene.ActionView)
                this.gameScene.MainView.active = false
            } else if (this.PHONEVIEW == id) {
                this.viewStack.push(this.gameScene.PhoneView)
                this.gameScene.MainView.active = false
            } else if (this.ZONEVIEW == id) {
                this.viewStack.push(this.gameScene.ZoneView)
                this.gameScene.MainView.active = false
            } else if (this.BAGVIEW == id) {
                this.viewStack.push(this.gameScene.BagView)
                this.gameScene.MainView.active = false
            } else if (this.SHOPVIEW == id) {
                cc.log("uimgr currentShopType = " + this.currentShopType)
                this.viewStack.push(this.gameScene.ShopView)
                this.gameScene.MainView.active = false
            } else if (this.SIGNREWARDVIEW == id) {
                this.viewStack.push(this.gameScene.SignRewardView)
                this.gameScene.MainView.active = false
            } else if (this.GIFTVIEW == id) {
                this.viewStack.push(this.gameScene.GiftView)
                this.gameScene.MainView.active = false
            } else if (this.WECHATVIEW == id) {
                this.viewStack.push(this.gameScene.WechatView)
                this.gameScene.MainView.active = false
            } else if (this.VIDEOVIEW == id) {
                this.viewStack.push(this.gameScene.VideoView)
                this.gameScene.MainView.active = false
            } else if (this.SETTINGVIEW == id) {
                this.viewStack.push(this.gameScene.SettingView)
                this.gameScene.MainView.active = false
            } else if (this.COLLECTVIEW == id) {
                this.viewStack.push(this.gameScene.CollectView)
                this.gameScene.MainView.active = false
            }

            for (var i = 0; i < this.viewStack.length - 1; ++i) {
                this.viewStack[i].active = false
            }
            this.viewStack[this.viewStack.length - 1].active = true
        }
    },

    // use this for initialization
    onLoad: function() {

    },



    changeSprite: function(node, res, handle = null) {
        if (!cc.cs.loadMgr.isLoadComplete) {
            cc.log("error the res is not load complete")
        }
        var spriteFrame = null
        if (CC_JSB) {
            spriteFrame = cc.loader.getRes("picture/newRes831/" + res, cc.SpriteFrame)

            if (spriteFrame == null || spriteFrame == 'undefinde') {
                cc.log("the res is mission = " + "picture/newRes831/" + res)
            }
            var sprite = node.getComponent(cc.Sprite)
            if (sprite == null || sprite == 'undefinde') {
                cc.log("the sprite is mission = " + node.name)
            }
            sprite.spriteFrame = spriteFrame
            if (handle)
                handle()
        } else {
            cc.loader.loadRes("picture/newRes831/" + res, cc.SpriteFrame, function(err, prefab) {
                spriteFrame = prefab;



                if (spriteFrame == null || spriteFrame == 'undefinde') {
                    cc.log("the res is mission = " + "picture/newRes831/" + res)
                }
                var sprite = node.getComponent(cc.Sprite)
                if (sprite == null || sprite == 'undefinde') {
                    cc.log("the sprite is mission = " + node.name)
                }
                sprite.spriteFrame = spriteFrame
                if (handle)
                    handle()

            });

        }

    },



    changeSpriteFrame: function(spriteframeOrigin, res) {
        if (!cc.cs.loadMgr.isLoadComplete) {
            cc.log("error the res is not load complete")
        }
        var spriteFrame = cc.loader.getRes("picture/newRes831/" + res, cc.SpriteFrame)
        if (spriteFrame == null || spriteFrame == 'undefinde') {
            cc.log("the res is mission = " + "picture/newRes831/" + res)
        }

        spriteframeOrigin._textureFilenameSetter.set(spriteFrame._textureFilename)
    },


    init: function() {
        this.expTip = cc.loader.getRes("prefab/expTip", cc.Prefab)
        this.tipPrefab = cc.loader.getRes("prefab/tip", cc.Prefab)
        this.popupPrefab = cc.loader.getRes("prefab/popup", cc.Prefab)
        this.popupPrefab2 = cc.loader.getRes("prefab/popup2", cc.Prefab)
        this.popupPrefab3 = cc.loader.getRes("prefab/popup3", cc.Prefab)
        this.TouchDisableLayer = cc.loader.getRes("prefab/TouchDisableLayer", cc.Prefab)


        this.nodeUsePrefab = cc.loader.getRes("prefab/NodeUse", cc.Prefab)
        this.nodePopBuyPrefab = cc.loader.getRes("prefab/PopBuy", cc.Prefab)
       
		
		

        this.nodeGuide1 = cc.loader.getRes("prefab/PopGuide", cc.Prefab)
		this.nodeGuide2 = cc.loader.getRes("prefab/PopGuide2", cc.Prefab) //箭头向上
		this.nodeGuide3 = cc.loader.getRes("prefab/PopGuide2", cc.Prefab) //箭头向上
		this.nodeGuide4 = cc.loader.getRes("prefab/PopGuide4", cc.Prefab) //箭头向上
		this.nodeGuide5 = cc.loader.getRes("prefab/PopGuide5", cc.Prefab) //箭头向上
		this.nodeGuide6 = cc.loader.getRes("prefab/PopGuide6", cc.Prefab) //箭头向上
		this.nodeGuide7 = cc.loader.getRes("prefab/PopGuide7", cc.Prefab) //箭头向上
		this.nodeGuide8 = cc.loader.getRes("prefab/PopGuide8", cc.Prefab) //箭头向上
		this.nodeGuide9 = cc.loader.getRes("prefab/PopGuide9", cc.Prefab) //箭头向上
		this.nodeGuide10 = cc.loader.getRes("prefab/PopGuide10", cc.Prefab) //箭头向上
		this.nodeGuide11 = cc.loader.getRes("prefab/PopGuide11", cc.Prefab) //箭头向上
		this.nodeGuide12 = cc.loader.getRes("prefab/PopGuide12", cc.Prefab) //箭头向上
		this.nodeGuide13 = cc.loader.getRes("prefab/PopGuide13", cc.Prefab) //箭头向上
		this.nodeGuide14 = cc.loader.getRes("prefab/PopGuide14", cc.Prefab) //箭头向上
		this.nodeGuide15 = cc.loader.getRes("prefab/PopGuide15", cc.Prefab) //箭头向上
		this.nodeGuide16 = cc.loader.getRes("prefab/PopGuide16", cc.Prefab) //箭头向上
		this.nodeGuide17 = cc.loader.getRes("prefab/PopGuide17", cc.Prefab) //箭头向上
		
    },
    showPopBuy: function(id, okHandle, obj) {
        //id 1 秒回礼包 3 一件完成礼包
        if(this.isOpen == true)
        {
            var popupNode = cc.instantiate(this.nodePopBuyPrefab)
            popupNode.setPosition(0, 0);
            popupNode.getComponent("PopBuy").setCallBack(popupNode, id, okHandle, obj)
        }
    },


    showGuide: function(guideID, Target, obj) {

        cc.log("showGuide" + guideID)
        if (guideID <= parseInt(cc.cs.PlayerInfo.guide_id)) {
            return
        } else {

           

            var scene = cc.director.getScene();
            //cc.log("scene   = "+ scene + "    " + this.nodeGuidePrefab)
            var popupNode = null
            switch (guideID) {
                case 1:
					popupNode = cc.instantiate(this.nodeGuide1)
					break
					 case 2:
					popupNode = cc.instantiate(this.nodeGuide2)
					break
					 case 3:
					popupNode = cc.instantiate(this.nodeGuide3)
					break
					 case 4:
					popupNode = cc.instantiate(this.nodeGuide4)
					break
					 case 5:
					popupNode = cc.instantiate(this.nodeGuide5)
					break
					 case 6:
					popupNode = cc.instantiate(this.nodeGuide6)
					break
					 case 7:
					popupNode = cc.instantiate(this.nodeGuide7)
					break
					 case 8:
					popupNode = cc.instantiate(this.nodeGuide8)
					break
					 case 9:
					popupNode = cc.instantiate(this.nodeGuide9)
					break
					 case 10:
					popupNode = cc.instantiate(this.nodeGuide10)
					break
					 case 11:
					popupNode = cc.instantiate(this.nodeGuide11)
					break
					 case 12:
					popupNode = cc.instantiate(this.nodeGuide12)
					break
					 case 13:
					popupNode = cc.instantiate(this.nodeGuide13)
					break
					 case 14:
					popupNode = cc.instantiate(this.nodeGuide14)
					break
					 case 15:
					popupNode = cc.instantiate(this.nodeGuide15)
					break
					 case 16:
					popupNode = cc.instantiate(this.nodeGuide16)
					break
					 case 17:
					popupNode = cc.instantiate(this.nodeGuide17)
					break
               


            }

            cc.log("popupNode   = " + popupNode + "    ")
            scene.getChildByName("Canvas").addChild(popupNode, 999)
            popupNode.setPosition(0, 0);
            popupNode.getComponent("PopGuide").setGuide(guideID, Target, obj)
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

                children[i].y -= node.height
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

        for (var i = children.length - 1; i >= 0; --i) {
            children[i].y = -height
            height += children[i].height
        }
        scrollView.content.height = height

    },

    refresh_verticalScrollViewUp_array: function(scrollView, array, verticalSpace) {
        if (typeof verticalSpace == 'undefined')
            verticalSpace = 0;
        var pos = cc.v2(0.0, 0.0)
        var children = array;
        var height = 0;

        for (var i = children.length - 1; i >= 0; --i) {
            children[i].x = 0
            children[i].y = -height
            height += children[i].height
        }
        scrollView.content.height = height

    },


    showExpTip: function(exp, targetNode, Handle) {
        var scene = cc.director.getScene();
        var tip = null
        if (typeof(scene.getChildByName("Canvas").tipExp) == "undefined") {
            var etip = cc.instantiate(this.expTip)
            scene.getChildByName("Canvas").addChild(etip, 1000)
            scene.getChildByName("Canvas").tipExp = etip
            etip.active = false
            tip = etip
        } else {
            tip = scene.getChildByName("Canvas").tipExp
        }
        if (tip.active) {
            cc.log("tip.actibe == true")
                //return
        } else {
            tip.active = true
        }
        var zf = "+"
        if (exp < 0) {

            //this.changeSprite(tip, "common/qinmijian")
            zf = ""
        }
        var expLabel = tip.getChildByName("expText").getComponent(cc.Label).string = zf + exp
        var scene = cc.director.getScene();


        var p = targetNode.parent.convertToWorldSpaceAR(cc.v2(targetNode.x, targetNode.y))
        var p2 = tip.parent.convertToNodeSpaceAR(cc.v2(p.x, p.y))

        tip.setPosition(0, 50);
        tip.targettt = Handle

        var action = cc.sequence(cc.moveTo(0.8, p2.x, p2.y), cc.callFunc(this.showExpHandle, tip))

        tip.runAction(action)
    },

    showExpHandle: function(target) {
        target.targettt.refresh()
        target.active = false
            //cc.director.getScene().getChildByName("Canvas").removeChild(target)
    },

    showTip: function(text, time) {
        //if (CC_JSB) {
        time = 2.0
        var scene = cc.director.getScene();
        if (typeof(scene.getChildByName("Canvas").tipNode) == "undefined") {
            scene.getChildByName("Canvas").tipNode = []
            for (var i = 0; i < 3; ++i) {
                var tipNode = cc.instantiate(this.tipPrefab)
                tipNode.active = false
                scene.getChildByName("Canvas").tipNode.push(tipNode)
                scene.getChildByName("Canvas").addChild(tipNode, 1000)
            }
        }
        var currentTipNode = null;
        var minHeight = 800;
        for (var i = 0; i < 3; ++i) {
            if (scene.getChildByName("Canvas").tipNode[i].active == false) {
                if (currentTipNode == null) {
                    currentTipNode = scene.getChildByName("Canvas").tipNode[i]
                    currentTipNode.active = true
                }
            } else {
                if (minHeight > scene.getChildByName("Canvas").tipNode[i].y) {
                    minHeight = scene.getChildByName("Canvas").tipNode[i].y
                }
            }
        }
        if (minHeight < 150.0) {
            if (currentTipNode != null) {
                currentTipNode.active = false
            }
            return
        }
        if (currentTipNode == null) {
            return
        }

        cc.log(scene.getChildByName("Canvas").parent.name)

        currentTipNode.x = 0
        currentTipNode.y = 50

        var textLabel = currentTipNode.getChildByName("tipText").getComponent(cc.Label)
        textLabel.string = text

        currentTipNode.width = textLabel.fontSize * textLabel.string.length + 40
        var action = cc.sequence(cc.moveTo(time, 0.0, 350.0), cc.callFunc(function(target) {
            target.active = false
        }, currentTipNode))

        currentTipNode.runAction(action);
        // }
        // else{
        //     cc.log(text)
        // }
    },

    setHeart: function(target, currentExp, maxExp) {

        var mask = target.getChildByName("mask")
        var heart = mask.getChildByName("heart")
        var max = target.getChildByName("max")
        if (currentExp >= maxExp) {
            max.active = true
            heart.height = mask.height + 30
        } else {
            max.active = false
            var p = currentExp / maxExp
            if (p > 1.0) {
                heart.height = mask.height

            } else {
                heart.height = mask.height * p
            }

        }
    },
    showTouchDisableLayer: function() {
        var scene = cc.director.getScene();
        var popupNode = cc.instantiate(this.TouchDisableLayer)
        scene.getChildByName("Canvas").addChild(popupNode, 999)
        popupNode.setPosition(0, 0);
        this.disabletouchlayer = popupNode
    },
    removeTouchDisableLayer: function() {

        cc.director.getScene().getChildByName("Canvas").removeChild(this.disabletouchlayer)
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

    showPopupO2: function(title, msg, okHandle) {

        var scene = cc.director.getScene();
        var popupNode = cc.instantiate(this.popupPrefab3)
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

    showPopupOC2: function(title, msg2, msg, okHandle, cancelHandle) {

        var scene = cc.director.getScene();
        var popupNode = cc.instantiate(this.popupPrefab2)
        scene.getChildByName("Canvas").addChild(popupNode, 999)
        popupNode.setPosition(0, 0);
        popupNode.getChildByName("title").getComponent(cc.Label).string = title
        popupNode.getChildByName("msg").getComponent(cc.Label).string = msg
        popupNode.getChildByName("msg2").getComponent(cc.Label).string = msg2
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

    getTalkHeight: function(n) {
        var nameText = n.getChildByName("name")
        return nameText.height + n.height
    },

    setNanTalk: function(nanNode, text, name) {
        var nameText = nanNode.getChildByName("name").getComponent(cc.Label)
        var talkText = nanNode.getChildByName("talk").getComponent(cc.Label)
        talkText.string = text
        nameText.string = name
        if (talkText.node.height < 85) {
            nanNode.height = 85
        } else {
            nanNode.height = talkText.node.height + 20
        }
        nameText.node.y = nanNode.height * 0.5
    },

    setNvTalk: function(nvNode, text, name, issound) {
        var nameText = nvNode.getChildByName("name").getComponent(cc.Label)
        var talkText = nvNode.getChildByName("talk").getComponent(cc.Label)
        var soundTalk = nvNode.getChildByName("soundBtn")
        //nvNode.width = 586
        //talkText.node.width = 536
        //talkText.node.x = 25
        soundTalk.x = nvNode.width - 50
        if (issound) {
            soundTalk.active = true

            soundTalk.on("click", (event) => {
                cc.log("nvNode.Tag = " + nvNode.getTag())
                cc.cs.AudioMgr.StopVoice();
                cc.cs.AudioMgr.playVoice("" + nvNode.getTag(), null)

            }, this.soundTalk)


        } else {
            soundTalk.active = false
        }
        talkText.string = text
        nameText.string = name

        var lineCount = Math.ceil(text.length * talkText.fontSize / talkText.node.width)
        if (lineCount * talkText.lineHeight + 20 < 85) {
            nvNode.height = 85
        } else {
            nvNode.height = lineCount * talkText.lineHeight + 20
        }
        nameText.node.y = nvNode.height * 0.5
        soundTalk.y = nvNode.height * 0.5 + soundTalk.height * 0.5 + 5
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});