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
      
    
        itemDec666:{
            default: null,
            type: cc.Label
        },

        itemUseCount:1,
        itemUseCountLabel:{
            default: null,
            type: cc.Label
        },
        
        
        ItemNmae:{
            default: null,
            type: cc.Label
        },
        
        ItemCount2:{
            default: null,
            type: cc.Label
        },



        itmeCount:0,
        doJob:null,
        obj:null,
        goodsid:0,

        BUYITEM:0,  //
        USEITEM:1,
        BUYLIBAO:2,


        type:0,



    },

    // use this for initialization
    onLoad: function () {

    },

    setCallBack:function(goodsid, OKhandle,Max,obj,type)
    {
        this.goodsid = goodsid
        this.doJob = OKhandle
        this.itmeCount = Max
        this.obj = obj
        this.type = type;

        var gooddata = cc.cs.gameData.goods["GOODS_ID_" +goodsid]
            if(gooddata != undefined)
            {
                this.ItemNmae.string = gooddata["GOODS_NAME"]
                this.itemDec666.string = gooddata["GOODS_DESC"]
            }
            else
            {
                this.ItemNmae.string = goodsid
            }




             var array = cc.cs.PlayerInfo.Bag
            var isFind = false
            for(var i = 0;i < array.length;i++)
            {
               if( array[i].goods_id == goodsid)
               {
                   isFind = true;

                   cc.log(66666)
                   this.ItemCount2.string = array[i].num 
                   break;
               }
            }
            if(isFind == false)
            {
                cc.log(99999)
                this.ItemCount2.string ="0"
            }




    },

    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },


    onCancel:function()
    {
        //this.nodeItemUse.active = false;
        this.node.removeFromParent(true);

    },

    onOK:function()
    {
       //this.startGoodsUse();
       this.doJob.apply(this.obj, [this.itemUseCount]);
       this.node.removeFromParent(true);

    },

    onPlus:function()
    {
        this.itemUseCount ++;
        if(this.itemUseCount > this.itmeCount)
        {
            this.itemUseCount = this.itmeCount
        }
        this.itemUseCountLabel.string = ""+this.itemUseCount
    },

    onMinus:function()
    {
        this.itemUseCount --;
        if(this.itemUseCount == 0)
        {
            this.itemUseCount = 1
        }
        this.itemUseCountLabel.string = ""+this.itemUseCount
    },
});
