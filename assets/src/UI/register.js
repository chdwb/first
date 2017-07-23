const i18n = require('i18n');
cc.Class({
    extends: cc.Component,

    properties: {
        nowLayer:1,
        
    //随机名字    
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',
        NAMEEDITBOX   :{
            default: null,
            type: cc.EditBox
        },

        button:{
            default: null,
            type: cc.Button


        },
        
    //登录游客账号
         label_YouKeMingZi: {
            default: null,
            type: cc.Label
        },
        
         Layer_RandomName :{
            default: null,
            type: cc.Node


        },
        Layer_YouKeZhangHao :{
            default: null,
            type: cc.Node


        },

         Layer_ZhuCe :{
            default: null,
            type: cc.Node


        },

         Layer_DengLu :{
            default: null,
            type: cc.Node


        },


         Layer_GongYong :{  // 登陆和注册公用登陆框
            default: null,
            type: cc.Node


        },
        //注册界面
         editbox_phone   :{
            default: null,
            type: cc.EditBox
        },

         editbox_PassWord   :{
            default: null,
            type: cc.EditBox
        },

         editbox_PassWord2   :{
            default: null,
            type: cc.EditBox
        },





        //登录界面

        
        
        
       
        
    },

    // use this for initialization
    onLoad: function () {
        var QuDaoID = '渠道';
        var Name1 = 'adfklj234';
        this.label_YouKeMingZi.string = QuDaoID+Name1;
        //this.Layer_RandomName.active = true;


        this.resetView();
    },

    // called every frame
    update: function (dt) {

    },
//随机名字
    onclick: function()
    {
         var index = cc.random0To1() * 2031; // 名字随机

         var index2 = cc.random0To1() * 580; // 姓随机
        
        this.label.string =   i18n.t( Math.floor(index2) +"hehe")+ i18n.t(""+ Math.floor(index) );
    }
,
    onedit: function()
    {
        this.label.string = this.NAMEEDITBOX.string;
    }
    ,
//登录游客账号
 onStartGameclick: function()
    {
         console.log('直接游客账号登陆');
    },
     onZhuCeclick: function()
    {
        this.nowLayer = 3;
        this.resetView();
    },
     onDengluclick: function()
    {
        this.nowLayer = 2;
        this.resetView();
    },


     //注册界面
         onGoToDengluclick: function()
    {
        this.nowLayer = 2;
        this.resetView();
    },

     onGoTZhuCeclick: function()
    {
         console.log('确认注册');
         //发送到服务器
         console.log('手机'+this.editbox_phone.string);
         console.log('密码'+this.editbox_PassWord.string);
         console.log('再次密码'+this.editbox_PassWord2.string);
    },


        



        //登录界面

          onDengluCommitclick: function()
    {
         console.log('确认登陆');
         //发送到服务器
         console.log('手机'+this.editbox_phone.string);
         console.log('密码'+this.editbox_PassWord.string);
         
    },


    //界面 刷新

     resetView: function()
     {

       this.Layer_DengLu.active = false;
       this.Layer_GongYong.active = false;
       this.Layer_RandomName.active = false;
       this.Layer_YouKeZhangHao.active = false;
       this.Layer_ZhuCe.active = false;

       switch(this.nowLayer)
       {
           case 1:   // 游客账号界面
           {
            this.Layer_YouKeZhangHao.active = true;
           }
           break;
           case 2: // 登陆
           {
            this.Layer_GongYong.active = true;
            this.Layer_DengLu.active = true;
           }
           break;
           case 3: // 注册
           {
            this.Layer_GongYong.active = true;
            this.Layer_ZhuCe.active = true;
           }
           break;
           case 4: // 随机名字
           {
            this.Layer_RandomName.active = true;
           }
           break;
       }
     },




});
