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
        lock: {
            default: null,
            type: cc.Node
        }

        ,

        Icon: {
            default: null,
            type: cc.Sprite
        },

        Play: {
            default: null,
            type: cc.Node
        },

        JinBi: {

            default: null,
            type: cc.Node

        },

        Name: {

            default: null,
            type: cc.Label
        },
        Price: {

            default: null,
            type: cc.Label
        },
        videoData: null,
        videoID: 0,
        isBuy: false,
        bgNode: null,
        videoNode: null,
        videoView: null,
    },

    // use this for initialization
    onLoad: function() {
        //this.Play.active = false
        //this.JinBi.active = true


    },

    updateui: function() {

        for (var i = 0; i < cc.cs.PlayerInfo.playerbuyvideos.length; i++) {
            cc.log("update video item " + cc.cs.PlayerInfo.playerbuyvideos[i].video_id)
            if (cc.cs.PlayerInfo.playerbuyvideos[i].video_id == this.videoID) {

                this.isBuy = true
                break;
            }
        }


        this.Play.active = this.isBuy
        this.JinBi.active = !this.isBuy

    },

    sendbuy: function() {

        cc.cs.gameMgr.sendGoodBuy(5, this.videoID, 1, this.onbuyhandle, this)
    },


    onbuyhandle: function(ret) {

        var JasonObject = JSON.parse(ret);
        cc.cs.UIMgr.closeNetView()
        if (JasonObject.success === true) {
            //cc.cs.UIMgr.closeNetView()
            cc.cs.UIMgr.showTip("购买成功", 1.0)
            var parent = this.node.parent

            cc.cs.PlayerInfo.money = JasonObject.content.info.money
            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)
            this.updateui()
            if (this.videoView != null) {
                this.videoView.setGold(cc.cs.PlayerInfo.money)
            }

        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },

    goShop: function() {

        cc.cs.UIMgr.setShopType(2)
        cc.log("cc.cs.UIMgr = " + cc.cs.UIMgr.currentShopType)
        cc.cs.UIMgr.openView(cc.cs.UIMgr.SHOPVIEW)

    },

    onClick: function() {

        if (this.isBuy == false) {

            var needgold = this.videoData["VIDEO_NEED_MONEY"]
            var job = this.videoData["VIDEO_NAME"]

            if (parseInt(needgold) > cc.cs.PlayerInfo.money) {
                cc.cs.UIMgr.showPopupOC("提示", "没有足够的金币，是否前往购买", this.goShop, null)
            } else {
                cc.cs.UIMgr.showPopupOC("提示", "购买视频" + job + "需要花费" + needgold + "金币，确定购买吗？", this.sendbuy.bind(this), null)
            }
        } else {
            //cc.cs.UIMgr.openView(cc.cs.UIMgr.VIDEOVIEW)
            this.bgNode.active = false
            this.videoNode.getComponent("jsVideo").setPlayVideoID(this.videoID)
            this.videoNode.active = true
        }

    },

    setVideo: function(videodata, bgNode, videNode) {
        this.videoData = videodata
        this.videoID = videodata["VIDEO_ID"];
        this.Name.string = videodata["VIDEO_NAME"]
        this.Price.string = videodata["VIDEO_NEED_MONEY"]
            //this.itemDec.string = good["GOODS_DESC"]
        cc.log(this.videoID)
        cc.cs.UIMgr.changeSprite(this.Icon.node, "video_icon/" + this.videoID)
        this.updateui()
        this.bgNode = bgNode
        this.videoNode = videNode
    }



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});