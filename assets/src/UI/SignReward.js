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
        node1:{
            default:null,
            type:cc.Node
            
        },
         node2:{
            default:null,
            type:cc.Node
            
        },
         node3:{
            default:null,
            type:cc.Node
            
        },
         getbutton:{
            default:null,
            type:cc.Button
            
        },
       

        
    },
    
    onBack:function(){
        //var parent = this.node.parent
        //parent.getComponent("GameScene").SetView(cc.cs.UIMgr.MAINVIEW)
        cc.cs.UIMgr.closeView()
    },
    
    onSign:function()
    {
        cc.cs.gameMgr.sendSign( this.SignHandle, this)
    },

     SignHandle:function(ret)
    {
        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.cs.UIMgr.closeNetView()
            cc.cs.UIMgr.showTip("签到成功", 1.0)

            //cc.cs.PlayerInfo.signday = JasonObject.content.info.signday
            cc.cs.PlayerInfo.sign = true
            // cc.cs.PlayerInfo.money = JasonObject.content.info.money

            cc.cs.PlayerInfo.refreshInfoData(JasonObject.content.info)

           /* var array = cc.cs.PlayerInfo.Bag
            var isFind = false
            for(var i = 0;i < array.length;i++)
            {
               if( array[i].goods_id == JasonObject.content.info.goods1_id)
               {
                   isFind = true;
                   array[i].num = JasonObject.content.info.goods1_num
                   break;
               }
            }
            if(isFind == false)
            {
                var newgoods;
                    newgoods.goods_id = JasonObject.content.info.goods1_id
                    newgoods.num = JasonObject.content.info.goods1_num
                
                cc.cs.PlayerInfo.Bag.push(newgoods)
            }

            for(var i = 0;i < array.length;i++)
            {
               if( array[i].goods_id == JasonObject.content.info.goods2_id)
               {
                   isFind = true;
                   array[i].num = JasonObject.content.info.goods2_num
                   break;
               }
            }
            if(isFind == false)
            {
                var newgoods;
                    newgoods.goods_id = JasonObject.content.info.goods2_id
                    newgoods.num = JasonObject.content.info.goods2_num
                
                cc.cs.PlayerInfo.Bag.push(newgoods)
            }*/





            this.refreshReward(parseInt(cc.cs.PlayerInfo.signday)+1)
            
           
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
        //弹窗
    },
    
    refreshReward:function(day)
    {

        cc.log("day = "+day)

        cc.log("day = "+cc.cs.PlayerInfo.sign)
        if(cc.cs.PlayerInfo.sign  == true)
        {
           this.getbutton.interactable = false
          
        }
        else
        {
            
           this.getbutton.interactable = true
        }

         
        //this.button3.enabled = false;
        //this.node2.active = false;
        var rewarddata = cc.cs.gameData.sign_reward["ID_"+day]

        var item = cc.instantiate(this.prefab)
        var itemCom = item.getComponent("NodeItem")

        var item2 = cc.instantiate(this.prefab)
        var itemCom2 = item2.getComponent("NodeItem")

        var item3 = cc.instantiate(this.prefab)
        var itemCom3 = item3.getComponent("NodeItem")
            //cc.log("555"+rewarddata)

            this.node1.removeAllChildren(true)
            this.node2.removeAllChildren(true)
            this.node3.removeAllChildren(true)
            if(rewarddata != undefined)
            {
                //cc.log("666")
                itemCom.setItmeNmae("金币")
                itemCom.setItmeNum(rewarddata["GOLD_NUM"])
                itemCom.setGoodId(100)

                this.node1.addChild(item)

                itemCom2.setItmeNmae( cc.cs.gameData.goods[  "GOODS_ID_" + rewarddata["GOODS_1_ID"] ] ["GOODS_NAME"])
                itemCom2.setItmeNum(rewarddata["GOODS_1_NUM"])
                itemCom2.setGoodId(rewarddata["GOODS_1_ID"])

                this.node2.addChild(item2)

                itemCom3.setItmeNmae( cc.cs.gameData.goods[ "GOODS_ID_" +rewarddata["GOODS_2_ID"] ] ["GOODS_NAME"])
                itemCom3.setItmeNum(rewarddata["GOODS_2_NUM"])
                itemCom3.setGoodId(rewarddata["GOODS_2_ID"])

                this.node3.addChild(item3)
            }
           
            
            

    },
    

    // use this for initialization
    onLoad: function () {
        this.prefab = cc.loader.getRes("prefab/NodeItem", cc.Prefab)
        this.refreshReward(parseInt(cc.cs.PlayerInfo.signday)+1)

        this.getbutton

        cc.log("SignRewardView guidepos = "+cc.cs.PlayerInfo.guide_id)
        if(parseInt(cc.cs.PlayerInfo.guide_id) == 12) // 工作开始按钮
        {
            cc.cs.UIMgr.showGuide(parseInt(cc.cs.PlayerInfo.guide_id)+1,this.getbutton.node,this)
        }

       

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
