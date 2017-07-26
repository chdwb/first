cc.Class({
    extends: cc.Component,

    properties: {
        startGameNode : {
            type : cc.Node,
            default : null
        },
        registerNode : {
            type : cc.Node,
            default : null
        },
        loginNode : {
            type:cc.Node,
            default : null
        },
        startGameBtn:{
            type:cc.Node,
            default:null
        },
        gustIDLabel : {
            type:cc.Label,
            default:null
        },
       
        intoRegisterNodeBtn : {
            type:cc.Node,
            default : null
        },
        intoLoginNodeBtn:{
            type:cc.Node,
            default : null
        },
        registerBackBtn:{
            type:cc.Node,
            default : null
        },
        registerConfirmBtn:{
            type:cc.Node,
            default:null
        },
        registerIDEdit:{
            type:cc.EditBox,
            default:null
        },
        registerPasswordEdit:{
            type:cc.EditBox,
            default:null
        },
        registerConfirmPasswordEdit:{
            type:cc.EditBox,
            default:null
        },
        regisetrIntoLoginBtn:{
            type:cc.Node,
            default:null
        },
        loginBackBtn:{
            type:cc.Node,
            default:null
        },
        loginIDEdit:{
            type:cc.EditBox,
            default:null
        },
        loginPasswordEdit:{
            type:cc.EditBox,
            default:null
        },
        LoginIntoRegisterBtn:{
            type:cc.Node,
            default:null
        },
        LoginBtn:{
            type:cc.Node,
            default:null
        },
        randomNameNode : {
            type:cc.Node,
            default:null
        },
        randomNameConfirmBtn : {
            type:cc.Node,
            default:null
        },
        randomNameRandomBtn : {
            type:cc.Node,
            default:null
        },
        playerNameEdit : {
            type:cc.EditBox,
            default:null
        },
        editTip: {
            type:cc.Node,
            default:null
        },
    },

    
    setStartGameNode : function(){
        this.startGameNode.active = true;
        this.registerNode.active = false;
        this.loginNode.active = false;
        this.randomNameNode.active = false;
    },

    setRegisterNode : function(){
        this.startGameNode.active = false;
        this.registerNode.active = true;
        this.loginNode.active = false;
        this.randomNameNode.active = false;
    },

    setLoginNode : function(){
        this.startGameNode.active = false;
        this.registerNode.active = false;
        this.loginNode.active = true;
        this.randomNameNode.active = false;
    },

    setRandomNameNode : function(){
        this.startGameNode.active = false;
        this.registerNode.active = false;
        this.loginNode.active = false;
        this.randomNameNode.active = true;
    },

    loginEvent : function()
    {
        cc.cs.UIMgr.showTip("这里添加登陆事件", 1.0)
        this.setRandomNameNode()
    },

    registerEvent:function()
    {
        cc.cs.UIMgr.showTip("这里添加注册事件", 1.0)
    },

    playerName:function()
    {
        cc.cs.UIMgr.showTip("这里添加用户名事件", 1.0)
    },

    randomName:function()
    {
        cc.cs.UIMgr.showTip("这里添加随机用户名功能", 1.0)
    },

    // use this for initialization
    onLoad: function () {
        var self = this
        this.setStartGameNode()
        this.gustIDLabel.string = cc.cs.gameMgr.generateGustInfo()
        
        this.startGameBtn.on("click", (event)=>{
            self.loginEvent()
        }, this.startGameBtn)
        this.registerConfirmBtn.on("click", (event)=>{
            //注册账号按钮点击事件
            if(self.registerPasswordEdit.string != self.registerConfirmPasswordEdit.string)
            {
                cc.cs.UIMgr.showTip("输入密码不一致，请重新输入", 1.0)
                self.registerConfirmPasswordEdit.string = ""
                self.registerPasswordEdit.string = ""
                return ;
            }else if(self.registerIDEdit.string == ""||self.registerIDEdit.string == null )
            {
                cc.cs.UIMgr.showTip("请输入手机号", 1.0)
                return;
            }else if(self.registerPasswordEdit.string == ""||self.registerPasswordEdit.string == null )
            {
                cc.cs.UIMgr.showTip("请输入密码", 1.0)
                return;
            }else if(self.registerConfirmPasswordEdit.string == ""||self.registerConfirmPasswordEdit.string == null )
            {
                cc.cs.UIMgr.showTip("请输入密码", 1.0)
                return;
            }else{
                self.registerEvent()
            }
        }, this.registerConfirmBtn)

        this.LoginBtn.on("click", (event)=>{
            if(self.loginIDEdit.string == "" || self.loginIDEdit.string == null)
            {
                cc.cs.UIMgr.showTip("请输入ID", 1.0)
                return;
            }else if(self.loginPasswordEdit.string == "" || self.loginPasswordEdit.string == null)
            {
                cc.cs.UIMgr.showTip("请输入密码", 1.0)
                return;
            }else
            {
                self.loginEvent()
                
            }
        })

        this.intoRegisterNodeBtn.on("click", (event)=>{
            self.setRegisterNode()
        }, this.intoRegisterNodeBtn)
        this.intoLoginNodeBtn.on("click", (event)=>{
            self.setLoginNode()
        }, this.intoLoginNodeBtn)
        this.loginBackBtn.on("click", (event)=>{
            self.setStartGameNode()
        }, this.loginBackBtn)
        this.registerBackBtn.on("click", (event)=>{
            self.setStartGameNode()
        }, this.registerBackBtn)
        this.regisetrIntoLoginBtn.on("click", (event)=>{
            self.setLoginNode()
        }, this.regisetrIntoLoginBtn)
        this.LoginIntoRegisterBtn.on("click", (event)=>{
            self.setRegisterNode()
        }, this.LoginIntoRegisterBtn)
        this.randomNameConfirmBtn.on("click", (event)=>{
            self.playerName()
        },this.randomNameConfirmBtn)
        this.randomNameRandomBtn.on("click", (event)=>{
            self.randomName()
        },this.randomNameRandomBtn)
    },
    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
