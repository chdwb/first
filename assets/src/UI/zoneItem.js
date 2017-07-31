cc.Class({
    extends: cc.Component,

    properties: {
        plBtn : {
            type:cc.Node,
            default:null
        },
        dzBtn : {
            type:cc.Node,
            default:null
        },
        replyMsg : {
            type:cc.RichText,
            default:null
        },
        msg:{
            type:cc.Label,
            default:null
        },
        bg:{
            type:cc.Node,
            default:null
        },
        bghf:{
            type:cc.Node,
            default:null
        },
        dateText:{
            type:cc.Label,
            default:null
        },
        replyList:[],
        zoneID:0,
        zanNum:6,
        plNum:0,
        plID:0,
    },

    setLength : function(){
        var height =  Math.abs(this.bghf.y) + this.bghf.getContentSize().height + Math.abs(this.replyMsg.node.y*2)
        cc.log(this.bghf.y)
        cc.log(this.bghf.getContentSize().height)
        var si = this.node.getContentSize()
        si.height = height + 30
        this.node.setContentSize(si)
    },
    setZoneID:function(id){
        this.zoneID = id
    },
    setMsg :function(text){
        this.msg.string = text
    },

    addText : function(id){
        var  height = Math.abs(this.replyMsg.node.y*2)
        if(this.replyList.length ==0)
        {
            this.replyList.push(this.replyMsg.node)
            this.replyMsg.string = "<color=#0000ff>" + cc.cs.gameData.zonefeefback["ID_" + id]["ZONE_FB_FNAME"] + "</c><color=#000000>:"+cc.cs.gameData.zonefeefback["ID_" + id]["ZONE_FB_TEXT"] +"</color>"
            if(cc.cs.gameData.zonefeefback["ID_" + id]["ZONE_FB_REPLY"] != "dummy")
            {
                
                this.addTextItem("<color=#0000ff>"
                                + cc.cs.PlayerInfo.NPCName
                                +"</c><color=#000000>回复"
                                +"</c><color=#0000ff>"
                                +cc.cs.gameData.zonefeefback["ID_" + id]["ZONE_FB_FNAME"]
                                +"</c><color=#000000>:"
                                +cc.cs.gameData.zonefeefback["ID_" + id]["ZONE_FB_REPLY"]
                                +"</color>")
            }
        }else{
            this.addTextItem("<color=#0000ff>" 
            + cc.cs.gameData.zonefeefback["ID_" + id]["ZONE_FB_FNAME"] 
            + "</c><color=#000000>:"
            +cc.cs.gameData.zonefeefback["ID_" + id]["ZONE_FB_TEXT"]
            +"</color>")
            if(cc.cs.gameData.zonefeefback["ID_" + id]["ZONE_FB_REPLY"] != "dummy")
            {
                
                this.addTextItem("<color=#0000ff>"
                                + cc.cs.PlayerInfo.NPCName
                                +"</c><color=#000000>回复"
                                +"</c><color=#0000ff>"
                                +cc.cs.gameData.zonefeefback["ID_" + id]["ZONE_FB_FNAME"]
                                +"</c><color=#000000>:"
                                +cc.cs.gameData.zonefeefback["ID_" + id]["ZONE_FB_REPLY"]
                                +"</color>")
            }
        }

        var si = this.bghf.getContentSize()
        si.height = height + this.replyList.length * this.replyList[0].getContentSize().height

        this.bghf.setContentSize(si)
        this.setLength()
        this.plNum ++;
        this.setPL(this.plNum)
    },

    addPlayerText :function(id){
        var  height = Math.abs(this.replyMsg.node.y*2)
        if(this.replyList.length ==0)
        {
            this.replyList.push(this.replyMsg.node)
            this.replyMsg.string = "<color=#0000ff>" + cc.cs.PlayerInfo.PlayerNmae + "</c><color=#000000>:"+cc.cs.gameData.reply["ID_" + id]["REPLY_TEXT"] +"</color>"
            if(cc.cs.gameData.reply["ID_" + id]["REPLY_REPLY"] != "dummy")
            {
                
                this.addTextItem("<color=#0000ff>"
                                + cc.cs.PlayerInfo.NPCName
                                +"</c><color=#000000>回复"
                                +"</c><color=#0000ff>"
                                +cc.cs.PlayerInfo.PlayerNmae
                                +"</c><color=#000000>:"
                                +cc.cs.gameData.reply["ID_" + id]["REPLY_REPLY"]
                                +"</color>")
            }
        }else{
            this.addTextItem("<color=#0000ff>" 
            + cc.cs.PlayerInfo.PlayerNmae
            + "</c><color=#000000>:"
            +cc.cs.gameData.reply["ID_" + id]["REPLY_TEXT"]
            +"</color>")
            if(cc.cs.gameData.reply["ID_" + id]["REPLY_REPLY"] != "dummy")
            {
                
                this.addTextItem("<color=#0000ff>"
                                + cc.cs.PlayerInfo.NPCName
                                +"</c><color=#000000>回复"
                                +"</c><color=#0000ff>"
                                +cc.cs.PlayerInfo.PlayerNmae
                                +"</c><color=#000000>:"
                                +cc.cs.gameData.reply["ID_" + id]["REPLY_REPLY"]
                                +"</color>")
            }
        }

        var si = this.bghf.getContentSize()
        si.height = height + this.replyList.length * this.replyList[0].getContentSize().height

        this.bghf.setContentSize(si)
        this.setLength()
        this.plNum ++;
        this.plID = id
        this.setPL(this.plNum)
    },

    addTextItem : function(text){
        var newItem = new cc.Node(this.replyMsg.node.name + this.replyList.length)
        var r = newItem.addComponent(cc.RichText)
        this.replyMsg.node.parent.addChild(newItem)
        newItem.anchorX = this.replyMsg.node.anchorX
        newItem.anchorY = this.replyMsg.node.anchorY
        newItem.x = this.replyMsg.node.x
        newItem.y = this.replyList[0].y - this.replyList.length * this.replyMsg.node.getContentSize().height
        r.string = text
        this.replyList.push(newItem)
    },

    load:function(){
        this.bg = this.node.getChildByName("bg")
        this.bghf = this.node.getChildByName("bghf")
        this.msg = this.bg.getChildByName("msg")
        this.plBtn = this.bghf.getChildByName("plBtn")
        this.dzBtn = this.bghf.getChildByName("dzBtn")
        this.replyMsg = this.bghf.getChildByName("reply").getComponent("cc.RichText")
        this.dateText = this.bghf.getChildByName("dateText")
    },

    onLoad: function () {
        var self = this;
        this.plBtn.on("click", (event)=>{
            if(cc.cs.PlayerInfo.canPLZone(self.zoneID))
                event.target.parent.parent.parent.parent.parent.parent.getComponent("zoneView").showInputTable(self.zoneID ,self)
            else
                cc.cs.UIMgr.showTip("已经评论过", 1.0)
        },this.plBtn)

        this.dzBtn.on("click", (event)=>{
            if(cc.cs.PlayerInfo.canZanZone(self.zoneID))
            {
                cc.cs.gameMgr.sendThumb(cc.cs.PlayerInfo.ApiToken,self.zoneID, this.sendReplyHandle, this)
            }else
            {
                 cc.cs.UIMgr.showTip("已经攒过", 1.0)
            }
            
        },this.dzBtn)
    },

    setZan:function(count){
        this.dzBtn.getChildByName("Label").getComponent(cc.Label).string = "点赞("+count+")"
    },

    setPL:function(count){
        this.plBtn.getChildByName("Label").getComponent(cc.Label).string = "评论("+count+")"
    },

    sendReplyHandle:function(ret)
     {

        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            //cc.cs.UIMgr.showTip("工作完成", 1.0)
            cc.cs.PlayerInfo.weibo_thumbs.push(self.zoneID)
            this.setZan(this.zanNum+1)
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
        //弹窗

     },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});