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
        point1 : {
            default: null,
            type: cc.Node
        },
        point2 : {
            default: null,
            type: cc.Node
        },
        point3 : {
            default: null,
            type: cc.Node
        },
        jinxingText:{
            default: null,
            type: cc.Sprite
        },
        doName : {
            default: null,
            type: cc.Label
        },
        tipSprite:{
            default: null,
            type: cc.Sprite
        },
        currentWorkID:0,
        currentLogID:0,
        isWork : false,
        totalTime: 0,
        currentTime: 0,
        isAction: false,
        handle: null,
        handleobj: null,
        doID : 0,
        AudioID:-1
    },

    setItem:function(id , iswork){
        this.isWork = iswork
        this.doID = id
        if(this.isWork){
            this.loadWork(id)
        }else{
            this.loadDate(id)
        }   
        this.isAction = true
        cc.cs.UIMgr.openView(cc.cs.UIMgr.ActionView)
    },

    loadWork:function(id){
        cc.cs.UIMgr.changeSprite(this.jinxingText.node, "work_quest/" + "working")
        cc.cs.UIMgr.changeSprite(this.tipSprite.node, "work_quest/" + "tuichugongzuo")
        cc.cs.UIMgr.changeSprite(this.actionBg.node, "work_quest/work/"  + id)
        var workData = cc.cs.gameData.getworkData(id)
        this.doName.string = workData["NAME"]
        this.totalTime = workData["EXECUTE_TIME"]
        this.currentTime = 0
    },

    loadDate:function(id){
        cc.cs.UIMgr.changeSprite(this.jinxingText.node, "work_quest/" + "doing")
        cc.cs.UIMgr.changeSprite(this.tipSprite.node, "work_quest/" + "tuichulianai")
        cc.cs.UIMgr.changeSprite(this.actionBg.node, "work_quest/quest/" + id)
        var dateData = cc.cs.gameData.getdateData(id)
        this.doName.string = dateData["DATE_NAME"]
        this.totalTime = dateData["DATE_EXECUTE_TIME"]
        this.currentTime = 0
    },

    doneWork : function(ret){
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            var workData = cc.cs.gameData.getworkData(this.doID)
            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)
            cc.cs.UIMgr.showPopupO("达成", "经过辛勤的工作，你获得了" + workData["REWARD"]+"金币。", this.closePopupHandle)
             cc.cs.AudioMgr.playAudio("success",false)
           
        }else{
            cc.log("error " + JasonObject.error)
        }
    },

    closePopupHandle : function(){
        cc.cs.UIMgr.closeView()
    },

    doneDate:function(ret){
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            var dateData = cc.cs.gameData.getdateData(this.doID)
            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)
            cc.cs.UIMgr.showPopupO("达成", "你获得了" + dateData["DATE_EXP"]+"亲密度。", this.closePopupHandle)

            cc.cs.AudioMgr.playAudio("success",false)

        }else{
            cc.log("error " + JasonObject.error)
        }
        
    },

    doEnd:function(){

          cc.log("stop id "+ this.AudioID)
        cc.cs.AudioMgr.StopAudio(this.AudioID)

        if(this.isWork){
            cc.cs.gameMgr.sendWorkDone(this.doneWork,this)
        }else{
            cc.cs.gameMgr.sendLoveDone(this.doneDate,this)
        }
    },

    onRightNow:function()
    {
        /*if(this.isWork)
        {
            cc.log("this.currentWorkID2 = "+ this.currentWorkID)
            cc.cs.gameMgr.sendWorkRightNode(this.currentLogID, this.onRightNowHandle, this)
        }
        else
        {

            cc.log("this.currentWorkID = "+ this.currentWorkID)
            cc.cs.gameMgr.sendDateRightNode(this.currentLogID, this.onRightNowHandle, this)
        }*/
        cc.log("stop id "+ this.AudioID)
        cc.cs.AudioMgr.StopAudio(this.AudioID)
        this.currentTime = this.totalTime

        if(this.isWork)
        {
            cc.cs.gameMgr.sendWorkDone(this.doneDate,this)

        }
        else
        {

            cc.cs.gameMgr.sendLoveDone(this.doneDate,this)
        }

    },

    onRightNowHandle:function(ret)
    {
         var JasonObject = JSON.parse(ret);
        if (JasonObject.success == true) 
        {
            //cc.cs.UIMgr.showTip("", 1.0)

            if(this.isWork == true)
            {

                cc.cs.PlayerInfo.money = JasonObject.content.info.money
            cc.cs.PlayerInfo["Work"+this.currentWorkID+"LeftTImes"] = JasonObject.content.info["work_id" + this.currentWorkID]
            //this.needTimeText.string = "剩余次数:" + cc.cs.PlayerInfo["Work"+this.currentWorkID+"LeftTImes"]
            cc.cs.UIMgr.showPopupO("工作完成了","工作完成了",()=>{

                var parent = this.node.parent
                parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MISSONVIEW)
            })

            }
            else 
            {
            cc.cs.PlayerInfo.level = JasonObject.content.info.level
            cc.cs.PlayerInfo.exp = JasonObject.content.info.exp
            cc.cs.PlayerInfo.playvideo = JasonObject.content.info.playvideo
            cc.log("video id 1= " + cc.cs.PlayerInfo.playvideo)
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
        
        cc.log("意见wancheng")
        var type = 0;
        var isRightnow = false;

         

        if(this.isWork)
        {
            type = 4
            isRightnow = cc.cs.PlayerInfo.work_fn
        }
        else 
        {
            type = 3

            isRightnow = cc.cs.PlayerInfo.date_fn
        }
        
        cc.log("hehe"+ isRightnow)

        if(isRightnow == false)
        {
            //cc.cs.gameMgr.buyRightNow(type,this.onBuyRightNowhandle,this)
            
            cc.cs.UIMgr.showPopBuy(3,this.buyLIJI,this)
        }
        else
        {
            this.onRightNow()
        }
   


       
    },
    
    buyLIJI:function()
    {
        cc.cs.gameMgr.buyRightNow(3,this.onBuyRightNowhandle,this)
    },

     onBuyRightNowhandle:function(ret)
     {

         cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success == true) 
        {
            cc.cs.UIMgr.showTip("购买成功", 1.0)
           if(this.isWork)
           {
            cc.cs.PlayerInfo.work_fn = JasonObject.content.info.work_fn
           }
           else
           {
            cc.cs.PlayerInfo.date_fn = JasonObject.content.info.date_fn
           }
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
        if(this.isWork)
        {
            this.currentLogID = obj.workLogID
        }
        else{
            this.currentLogID = obj.dateLogID;
        }
        cc.log(" handle == handleobj " + "     "  + obj.workLogID )
        
    },
    // use this for initialization
    onLoad: function() {
        var self = this
        this.backBtn.on("click", (event) => {
            cc.cs.AudioMgr.StopAudio(this.AudioID)
            cc.cs.UIMgr.closeView()
        }, this.backBtn)
        
    

        /*this.rightNowBtn.on("click", (event) => {

        }, this.rightNowBtn)*/

        //this.setActionInfo(10, "test", "", this.cccc) for test
    },

    onEnable: function()
    {

        this.AudioID =  cc.cs.AudioMgr.playAudio("time_click",true)
       cc.log("audio id " + this.AudioID)

    },

    update: function(dt) {
        if (this.isAction) {
            this.currentTime += dt;
            if (this.currentTime >= this.totalTime) {
                this.process.progress = 1.0
                this.processText.string = 100 + "%"

               // cc.log("6666"+this.handle)
       

                //if(this.handle !== null){
                this.doEnd()
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