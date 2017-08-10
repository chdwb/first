cc.Class({
    extends: cc.Component,

    properties: {
        actionBg: {
            default: null,
            type: cc.Sprite
        },
        process: {
            default: null,
            type: cc.ProgressBar
        },
        processText: {
            default: null,
            type: cc.Label
        },
        rightNowBtn: {
            default: null,
            type: cc.Node
        },
        backBtn: {
            default: null,
            type: cc.Node
        },
        currentWorkID:0,
        currentLogID:0,
        isWork : false,
        totalTime: 0,
        currentTime: 0,
        isAction: false,
        handle: null,
        handleobj: null,
    },


    onRightNow:function()
    {
        if(this.iswork)
        {
            cc.cs.gameMgr.sendWorkRightNode(cc.cs.PlayerInfo.ApiToken, this.currentLogID, this.onRightNowHandle, this)
        }
        else
        {

            cc.log("this.currentWorkID = "+ this.currentWorkID)
            cc.cs.gameMgr.sendDateRightNode(cc.cs.PlayerInfo.ApiToken, this.currentLogID, this.onRightNowHandle, this)
        }
    },

    onRightNowHandle:function(ret)
    {
         var JasonObject = JSON.parse(ret);
        if (JasonObject.success == true) 
        {
            //cc.cs.UIMgr.showTip("", 1.0)

            if(this.iswork == true)
            {

            }
            else 
            {
                cc.cs.PlayerInfo.Level = JasonObject.content.info.level
            cc.cs.PlayerInfo.Exp = JasonObject.content.info.exp
            cc.cs.PlayerInfo.videoID = JasonObject.content.info.playvideo
            cc.log("video id 1= " + cc.cs.PlayerInfo.videoID)
             cc.log("currentWorkID = "+this.currentWorkID)
             
            cc.cs.PlayerInfo["Love"+this.currentWorkID+"LeftTImes"] = JasonObject.content.info["date_id" + this.currentWorkID]
            
            cc.log("now lefttime = "+ cc.cs.PlayerInfo["Love"+this.currentWorkID+"LeftTImes"])
            //this.needTimeText.string = "剩余次数:" + cc.cs.PlayerInfo["Love"+this.currentWorkID+"LeftTImes"]

            
            var array = cc.cs.PlayerInfo.Bag
            for(var i = 0;i < array.length;i++)
            {
               if( array[i].goods_id == JasonObject.content.info.goods_id)
               {
                   array[i].num = JasonObject.content.info.num
                   if(JasonObject.content.info.num == 0 )
                   {
                       array.splice(i,1);
                   }
                   break;
               }
            }


            cc.cs.UIMgr.showPopupO("约会完成了","约会完成了",()=>{

                var parent = this.node.parent
                parent.getComponent("GameScene").SetView(cc.cs.UIMgr.LOVEVIEW)
            })
            }


        }else{
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }

     
    },

    onBuyRightNow:function()
    {
        var type = 0;
        var isRightnow = false;

         

        if(this.iswork)
        {
            type = 4
            isRightnow = cc.cs.PlayerInfo.work_fn
        }
        else 
        {
            type = 3

            isRightnow = cc.cs.PlayerInfo.date_fn
        }

        if(isRightnow == false)
        {
            cc.cs.gameMgr.buyRightNow(cc.cs.PlayerInfo.ApiToken,type,this.onBuyRightNowhandle,this)
        }
        else
        {
            this.onRightNow()
        }
   


       
    },

     onBuyRightNowhandle:function(ret)
     {

         cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success == true) 
        {
            cc.cs.UIMgr.showTip("购买成功", 1.0)

           this.onRightNow()


        }else{
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }

     },



    setActionInfo: function(time, id, iswork, callback,obj) {
        cc.log("setActionInfosetActionInfosetActionInfosetActionInfo")
        this.isAction = true
        this.totalTime = parseInt(time)
        cc.log(" handle == totalTime " + this.handle + "     "  )
        this.isWork = iswork
        cc.log(" handle == iswork " + this.handle + "     "  )
        this.currentTime = 0
        cc.log(" handle == currentTime " + this.handle + "     "  )
        this.handle = callback
        cc.log(" handle == callback "+ "     "  )
        this.handleobj = obj
        this.currentWorkID = id
        this.currentLogID = obj.dateLogID;
        cc.log(" handle == handleobj " + "     "  + obj.workLogID )
        
    },
    // use this for initialization
    onLoad: function() {
        var self = this
        this.backBtn.on("click", (event) => {
            var parent = this.node.parent
            if(self.isWork)
                parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MISSONVIEW)
            else
                parent.getComponent("GameScene").SetView(cc.cs.UIMgr.LOVEVIEW)
        }, this.backBtn)

        this.rightNowBtn.on("click", (event) => {

        }, this.rightNowBtn)

        //this.setActionInfo(10, "test", "", this.cccc) for test
    },

    update: function(dt) {
        if (this.isAction) {
            this.currentTime += dt;
            if (this.currentTime >= this.totalTime) {
                this.process.progress = 1.0
                this.processText.string = 100 + "%"

               // cc.log("6666"+this.handle)
       

                //if(this.handle !== null){
                this.handle(this.handleobj);
               // }    
                
                this.isAction = false;
                this.currentTime = 0
                this.totalTime = 0
            } else {
                this.process.progress = this.currentTime / this.totalTime
                this.processText.string = parseInt(this.process.progress * 100.0) + "%"
            }
        }

    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});