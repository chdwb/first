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
        
    },

    


    // use this for initialization
    onLoad: function () {
        var self = this
        this.startGameNode.active = true;
        this.registerNode.active = false;
        this.loginNode.active = false;
        this.gustIDLabel.string = cc.cs.gameMgr.generateGustInfo()
        
        this.startGameBtn.on("click", (event)=>{
            //开始游戏按钮点击事件

        }, this.startGameBtn)
        this.registerConfirmBtn.on("click", (event)=>{
            //注册账号按钮点击事件
            if(self.registerPasswordEdit.string != self.registerConfirmPasswordEdit.string)
            {
                return ;
            }

        }, this.registerConfirmBtn)

        this.intoRegisterNodeBtn.on("click", (event)=>{
            self.startGameNode.active = false;
            self.registerNode.active = true;
            self.loginNode.active = false;
        }, this.intoRegisterNodeBtn)
        this.intoLoginNodeBtn.on("click", (event)=>{
            self.startGameNode.active = false;
            self.registerNode.active = false;
            self.loginNode.active = true;
        }, this.intoLoginNodeBtn)
        this.loginBackBtn.on("click", (event)=>{
            self.startGameNode.active = true;
            self.registerNode.active = false;
            self.loginNode.active = false;
        }, this.loginBackBtn)
        this.registerBackBtn.on("click", (event)=>{
            self.startGameNode.active = true;
            self.registerNode.active = false;
            self.loginNode.active = false;
        }, this.registerBackBtn)
        this.regisetrIntoLoginBtn.on("click", (event)=>{
            self.startGameNode.active = false;
            self.registerNode.active = false;
            self.loginNode.active = true;
        }, this.regisetrIntoLoginBtn)
        this.LoginIntoRegisterBtn.on("click", (event)=>{
            self.startGameNode.active = false;
            self.registerNode.active = true;
            self.loginNode.active = false;
        }, this.LoginIntoRegisterBtn)
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
