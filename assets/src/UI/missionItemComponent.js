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
        titleText: {
            default: null,
            type: cc.Label
        },

        doSprite: {
            default: null,
            type: cc.Sprite
        },
		
		JobSprite: {
            default: null,
            type: cc.Sprite
        },

        getSprite: {
            default: null,
            type: cc.Sprite
        },

        getLabel: {
            default: null,
            type: cc.Label
        },

        doName: {
            default: null,
            type: cc.Label
        },

        timesLabel: {
            default: null,
            type: cc.Label
        },

        goodsLabel: {
            default: null,
            type: cc.Label
        },

        startTips: {
            default: null,
            type: cc.Label
        },

        startBtn: {
            default: null,
            type: cc.Node
        },
        btnLock: {
            default: null,
            type: cc.Node
        },
        btnText: {
            default: null,
            type: cc.Label
        },
        goldText: {
            default: null,
            type: cc.Label
        },
        
        IconBg:{
            default: null,
            type: cc.Sprite
        },
        itemID: 0,
        isWork: false,
        isLoad : false,
        currentExp:0,
		CheckDateItemresult:0,
        canclick : true,
    },

    loadElement : function(){
        this.titleText = this.node.getChildByName("titleText").getComponent(cc.Label);
        this.doSprite = this.node.getChildByName("1").getComponent(cc.Sprite);
        this.getSprite = this.node.getChildByName("bantoumingbeijing").getChildByName("xin").getComponent(cc.Sprite);
        this.getLabel = this.node.getChildByName("bantoumingbeijing").getChildByName("getText").getComponent(cc.Label);
        this.doName = this.node.getChildByName("nameText").getComponent(cc.Label);
        this.timesLabel = this.node.getChildByName("timesText").getComponent(cc.Label);
        this.goodsLabel = this.node.getChildByName("goodsText").getComponent(cc.Label);
        this.goldText = this.node.getChildByName("goldText").getComponent(cc.Label);
        this.startTips = this.node.getChildByName("starTips").getComponent(cc.Label);
        this.startBtn = this.node.getChildByName("starBtn")
        this.btnLock = this.startBtn.getChildByName("suo")
        this.btnText = this.startBtn.getChildByName("btnText").getComponent(cc.Label)
		if (this.isWork)
		{
		this.pircePic = this.node.getChildByName("upgradepic").getComponent(cc.Sprite)
		this.priceText = this.node.getChildByName("upgradepic").getChildByName("priceText").getComponent(cc.Label)
		}
    },

    getstartBtn : function(){
        return this.startBtn
    },

    setItem: function(id, isWork) {
        cc.log("missionitemComponent    setItem")
        this.isWork = isWork
        this.itemID = id
        this.loadElement()
        if (isWork) {
			
			this.doSprite.node.active = false
			this.JobSprite.node.active = true
			
			cc.cs.UIMgr.changeSprite(this.IconBg.node, "love_job/job_bg")
            var workResult = cc.cs.PlayerInfo.canWork(id)
            this.loadWork(workResult);
        } else {
			this.doSprite.node.active = true
			this.JobSprite.node.active = false
			cc.cs.UIMgr.changeSprite(this.IconBg.node, "love_job/love_bg")
            var dateResult = cc.cs.PlayerInfo.canLove(id)
            this.loadDate(dateResult)
        }
        this.isLoad = true
    },

    refresh :function(){
        
        if(!this.isLoad) return
        if (this.isWork) {
            this.goldText.node.active = false
            var workData = cc.cs.gameData.getworkData(this.itemID)
            if (workData["TIME"] == cc.cs.PlayerInfo.getWorkFreeTimes(this.itemID)) {
                this.timesLabel.string = "工作次数:   " + cc.cs.PlayerInfo.getWorkFreeTimes(this.itemID) + "/"+ workData["TIME"]
            } else {
                this.timesLabel.string = "剩余次数:   " + cc.cs.PlayerInfo.getWorkFreeTimes(this.itemID) + "/"+workData["TIME"]
            }
            var workResult = cc.cs.PlayerInfo.canWork(this.itemID)
            this.goodsLabel.node.active = false
            this.startTips.node.active = false
            this.startBtn.getComponent(cc.Button).interactable = true
            if (workResult == 0 || workResult == 1) {
                this.btnLock.active = false
                this.btnText.node.active = true
                this.btnText.string = "开始"
				this.timesLabel.node.active = true
				this.pircePic.node.active = false 
				
            } else if (workResult == 2) {
                this.btnLock.active = false
                this.btnText.node.active = true
                this.btnText.string = "升职"
				this.timesLabel.node.active = false
				this.pircePic.node.active = true 
				this.priceText.string = ""+workData["NEED_GOLD"]
            } else {
                this.btnLock.active = true
                this.btnText.node.active = false
                this.startBtn.getComponent(cc.Button).interactable = false
				this.timesLabel.node.active = false
				this.pircePic.node.active = true 
				this.priceText.string = ""+workData["NEED_GOLD"]
            }

        }else{
            this.goldText.node.active = false
            var dateData = cc.cs.gameData.getdateData(this.itemID)
            if (dateData["DATE_FREE_TIMES"] == cc.cs.PlayerInfo.getLoveFreeTimes(this.itemID)) {
                this.timesLabel.string = "恋爱次数:   " + cc.cs.PlayerInfo.getLoveFreeTimes(this.itemID)+ "/"+dateData["DATE_FREE_TIMES"]
            } else {
                this.timesLabel.string = "剩余次数:   " + cc.cs.PlayerInfo.getLoveFreeTimes(this.itemID) + "/"+dateData["DATE_FREE_TIMES"]
            }

            if(cc.cs.PlayerInfo.getLoveFreeTimes(this.itemID) == 0 )
            {
                this.timesLabel.string = "每日0点重置次数"
            }
            var dateResult = cc.cs.PlayerInfo.canLove(this.itemID)
            cc.log("dateResult    " + dateResult)
            this.startTips.node.active = false
            if (dateResult == -1) {
                this.startBtn.active = true
                this.btnText.string = ""
                this.goldText.node.active = true
                this.goldText.string = "" + cc.cs.PlayerInfo.getLovePrice(this.itemID)
            } else if (dateResult == 0) {
                this.startBtn.active = true
                this.btnText.string = "开始"
            } else {
                this.startBtn.active = false
                this.startTips.node.active = true
                this.startTips.string = "游戏内时间第" + dateResult + "天开放"
            }
        }
    },

     loadDate: function(result) {
        var self = this
        var dateData = cc.cs.gameData.getdateData(this.itemID)
        this.titleText.string = "恋爱"
        cc.cs.UIMgr.changeSprite(this.doSprite.node, "love_job/love/" + this.itemID)
        this.getLabel.string = dateData["DATE_EXP"]
        this.doName.string = dateData["DATE_NAME"]
        if (dateData["DATE_FREE_TIMES"] == cc.cs.PlayerInfo.getLoveFreeTimes(this.itemID)) {
            this.timesLabel.string = "恋爱次数:   " + cc.cs.PlayerInfo.getLoveFreeTimes(this.itemID)+ "/"+dateData["DATE_FREE_TIMES"]
        } else {
            this.timesLabel.string = "剩余次数:   " + cc.cs.PlayerInfo.getLoveFreeTimes(this.itemID)+ "/"+dateData["DATE_FREE_TIMES"]
        }

        if(cc.cs.PlayerInfo.getLoveFreeTimes(this.itemID) == 0 )
            {
                this.timesLabel.string = "每日0点重置次数"
            }

        if (dateData["DATE_NEED_GOODS_ID"] == "dummy") {
            this.goodsLabel.node.active = false
        } else {
            this.goodsLabel.node.active = true
            this.goodsLabel.string = "所需道具：  " +   cc.cs.gameData.getgoodsData(dateData["DATE_NEED_GOODS_ID"])["GOODS_NAME"] 
        }

        this.startTips.node.active = false
        if (result == -1) {
            this.startBtn.active = true
            this.btnText.string = "购买次数"
        } else if (result == 0) {
            this.startBtn.active = true
            this.btnText.string = "开始"
        } else {
            this.startBtn.active = false
            this.startTips.node.active = true
            this.startTips.string = "游戏内时间第" + result + "天开放"
        }
        this.startBtn.on("click", (event)=>{
            if (!self.canclick)
            {
                return;
            }
            self.canclick = false

            this.schedule(function(){
                    self.canclick = true
                },0.5,0);

            cc.log("startbtn")
            var dateResult = cc.cs.PlayerInfo.canLove(self.itemID)
            if(dateResult == 0){
				
				
				self.CheckDateItemresult = self.checkDateItem()
				if(self.CheckDateItemresult == 0)
				{
					cc.cs.gameMgr.sendLove(self.itemID, self.startDateHandle, self)
				}
				else
				{
					var goodData = cc.cs.gameData.getgoodsData(self.CheckDateItemresult)
					
					 if(cc.cs.PlayerInfo.money < goodData["GOODS_PRICE"])
					 {
						cc.cs.UIMgr.showPopupOC("金币不足","您的"+goodData["GOODS_NAME"]+"不足且购买所需的金币不足，是否前往商城购买？",self.goShop,null)
					 }
					 else
					 {
						cc.cs.UIMgr.showPopupOC("道具不足","您的"+goodData["GOODS_NAME"]+"不足，是否花费"+ goodData["GOODS_PRICE"] +"金币购买？",self.buyDateItem.bind(this),null)
					 }
				}
            }else if(dateResult == -1){

                if(cc.cs.PlayerInfo.money < cc.cs.PlayerInfo.getLovePrice(self.itemID))
                {
					cc.cs.UIMgr.showPopupOC("金币不足","您的金币不足，是否前往商城购买？",self.goShop,null)
				}
                else
                {
					cc.cs.gameMgr.buyLoveTime(self.itemID, self.buyLoveHandle, self)
                }
            }
            
        })
    },
	buyDateItem:function()
	{
		cc.cs.gameMgr.sendGoodBuy(1,this.CheckDateItemresult, 1, this.GoodBuyHandle, this)
	},
	
	GoodBuyHandle(ret)
    {
       
        var JasonObject = JSON.parse(ret);
        cc.cs.UIMgr.closeNetView()
        if (JasonObject.success === true) {
            
            //cc.cs.UIMgr.showTip("购买成功", 1.0)
            var parent = this.node.parent
            
            cc.cs.PlayerInfo.money = JasonObject.content.info.money
            
            var array = cc.cs.PlayerInfo.Bag
            var isFind = false
            for(var i = 0;i < array.length;i++)
            {
               
               if( array[i].goods_id == JasonObject.content.info.goods_id)
               {
                    cc.log("已经有这个道具")
                   isFind = true;
                   array[i].num = JasonObject.content.info.num
                   break;
               }
            }
            if(isFind == false)
            {
                cc.log("还没有这个道具")
                var newgoods = {}
                    newgoods.goods_id = JasonObject.content.info.goods_id
                    newgoods.num = JasonObject.content.info.num
                cc.log["push Bag"]
                cc.cs.PlayerInfo.Bag.push(newgoods)
            }

            
            cc.cs.gameMgr.sendLove(this.itemID, this.startDateHandle, this)
            
            
            
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },
	checkDateItem:function()
	{
		var dateData = cc.cs.gameData.getdateData(this.itemID)
		var dateitemid = parseInt(dateData["DATE_NEED_GOODS_ID"])
				if(dateData["DATE_NEED_GOODS_ID"] != "dummy")
				{   
					
					for (var i = 0; i < cc.cs.PlayerInfo.Bag.length; i++) {
						if (cc.cs.PlayerInfo.Bag[i].goods_id == dateitemid ) {
							return 0
						}
						
					}

				}
				else
				{
					return 0
				}
				
				
				return dateitemid   //所需道具不足
						
	},

    buyLoveHandle:function(ret){
		var self  = this
        var JasonObject = JSON.parse(ret);
		cc.cs.UIMgr.closeNetView()
        if (JasonObject.success === true) {
            //cc.cs.UIMgr.closeNetView()
            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)

			
			
			self.CheckDateItemresult = self.checkDateItem()
				if(self.CheckDateItemresult == 0)
				{
					cc.cs.gameMgr.sendLove(self.itemID, self.startDateHandle, self)
				}
				else
				{
					var goodData = cc.cs.gameData.getgoodsData(self.CheckDateItemresult)
					
					 if(cc.cs.PlayerInfo.money < goodData["GOODS_PRICE"])
					 {
						cc.cs.UIMgr.showPopupOC("金币不足","您的"+goodData["GOODS_NAME"]+"不足且购买所需的金币不足，是否前往商城购买？",self.goShop,null)
					 }
					 else
					 {
						cc.cs.UIMgr.showPopupOC("道具不足","您的"+goodData["GOODS_NAME"]+"不足，是否花费"+ goodData["GOODS_PRICE"] +"金币购买？",self.buyDateItem.bind(this),null)
					 }
				}
            //cc.cs.gameMgr.sendLove(this.itemID, this.startDateHandle, this)

           this.node.dispatchEvent( new cc.Event.EventCustom('EVENT_LOVEVIEW_UPDATE', true) );
            this.refresh()
        }else{

            cc.cs.UIMgr.showTip(JasonObject.error,1.0)
        }
    },
    startDateHandle : function(ret){
        var JasonObject = JSON.parse(ret);
		cc.cs.UIMgr.closeNetView()
        if (JasonObject.success === true) {
            //cc.cs.UIMgr.closeNetView()
            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)
            var actionView = cc.cs.UIMgr.getView(cc.cs.UIMgr.ACTIONVIEW)
            actionView.getComponent("actioningView").setItem(this.itemID, false)
            cc.cs.UIMgr.openView(cc.cs.UIMgr.ACTIONVIEW)
        }else{
            cc.cs.UIMgr.showTip(JasonObject.error,1.0)
        }
    },

    loadWork: function(result) {
        var self = this
        var workData = cc.cs.gameData.getworkData(this.itemID)
        this.titleText.string = "工作"
        cc.cs.UIMgr.changeSprite(this.JobSprite.node, "love_job/job/" + this.itemID)
        cc.cs.UIMgr.changeSprite(this.getSprite.node, "common/gold")
        this.getLabel.string = workData["REWARD"]
        this.doName.string = workData["NAME"]
        if (workData["TIME"] == cc.cs.PlayerInfo.getWorkFreeTimes(this.itemID)) {
            this.timesLabel.string ="工作次数:   "+ cc.cs.PlayerInfo.getWorkFreeTimes(this.itemID)  + "/"+workData["TIME"]
        } else {
            this.timesLabel.string = "剩余次数:   " + cc.cs.PlayerInfo.getWorkFreeTimes(this.itemID)  + "/"+workData["TIME"]
        }
        this.goodsLabel.node.active = false
        this.startTips.node.active = false
        this.startBtn.getComponent(cc.Button).interactable = true
        if (result == 0 || result == 1) {
            this.btnLock.active = false
            this.btnText.node.active = true
            this.btnText.string = "开始"
        } else if (result == 2) {
            this.btnLock.active = false
            this.btnText.node.active = true
            this.btnText.string = "升职"
        } else {
            this.btnLock.active = true
            this.btnText.node.active = false
            this.startBtn.getComponent(cc.Button).interactable = false
        }

        this.startBtn.on("click", (event)=>{
            cc.log("startbtn")

             if (!self.canclick)
            {
                return;
            }
            self.canclick = false

            this.schedule(function(){
                    self.canclick = true
                },0.5,0);
            var dateResult = cc.cs.PlayerInfo.canWork(self.itemID)
            if(dateResult == 0 || dateResult == 1 ){
                if(dateResult == 0)

                {
                    cc.cs.gameMgr.sendWork(self.itemID, self.startWorkHandle, self)
                }
                else if(dateResult == 1)
                {
                   cc.cs.UIMgr.showTip("剩余工作次数不足",1.0) 
                }
            }else if(dateResult == 2){
               // cc.cs.gameMgr.buyLoveTime(self.itemID, self.buyLoveHandle, self)
               
               self.confirmUpgrade()
            }
            
        })




    },


    SendUpgrade:function()
    {   
        cc.cs.gameMgr.sendUpgrade( this.itemID, this.upgradeWorkHandle, this)
    }
    ,

    goShop:function()
    {
       
        cc.cs.UIMgr.setShopType(2)
        cc.log("cc.cs.UIMgr = " + cc.cs.UIMgr.currentShopType)
        cc.cs.UIMgr.openView(cc.cs.UIMgr.SHOPVIEW)

    }
    ,

    confirmUpgrade: function()
    {
        var workData = cc.cs.gameData.getworkData(this.itemID)
        var needgold =  workData["NEED_GOLD"]
        var job = workData["NAME"]

        if( parseInt(needgold) > cc.cs.PlayerInfo.money)
        {
            cc.cs.UIMgr.showPopupOC2("金币不足","升职到"+job+"需要花费"+needgold+"金币,您的金币不足","是否前往商城购买？",this.goShop,null)
        }
        else
        {
                //  cc.cs.UIMgr.showPopupOC("提示","升职到"+job+"需要花费"+needgold+"金币，确定升职吗？",this.SendUpgrade.bind(this),null)
                this.SendUpgrade()
        }
    }
    ,


      startWorkHandle : function(ret){
        var JasonObject = JSON.parse(ret);
		cc.cs.UIMgr.closeNetView()
        if (JasonObject.success === true) {
            //cc.cs.UIMgr.closeNetView()
            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)
            var actionView = cc.cs.UIMgr.getView(cc.cs.UIMgr.ACTIONVIEW)
            actionView.getComponent("actioningView").setItem(this.itemID, true)
            cc.cs.UIMgr.openView(cc.cs.UIMgr.ACTIONVIEW)
        }else{
            //cc.log("error " + JasonObject.error)
            cc.cs.UIMgr.showTip(JasonObject.error,1.0)
        }
    },

     upgradeWorkHandle:function(ret)
    {
        cc.log(ret)
        var JasonObject = JSON.parse(ret);
		cc.cs.UIMgr.closeNetView()
        if (JasonObject.success == true) 
        {
            
            //cc.cs.UIMgr.closeNetView()
            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)
            
           
             var actionView = cc.cs.UIMgr.getView(cc.cs.UIMgr.MISSONVIEW)
            actionView.getComponent("workView").refreshItem()
            this.refresh()
           // cc.cs.UIMgr.showTip("升级成功", 1.0)
            var workData = cc.cs.gameData.getworkData(this.itemID)
        var needgold =  workData["NEED_GOLD"]
        var job = workData["NAME"]
           
           cc.cs.UIMgr.showPopupO("恭喜升职","恭喜您升职为"+job+"，将会重置您当前的工作次数。",null)
           
        }else{
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },

    start:function(){
        cc.log("missionitemComponent    start   " + this.itemID)
    },

    // use this for initialization
    onLoad: function() {
        cc.log("missionitemComponent    onload   " + this.itemID)
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});