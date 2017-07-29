const i18n = require('i18n');
cc.Class({
    extends: cc.Component,

    properties: {
        startGameNode: {
            type: cc.Node,
            default: null
        },
        registerNode: {
            type: cc.Node,
            default: null
        },
        loginNode: {
            type: cc.Node,
            default: null
        },
        startGameBtn: {
            type: cc.Node,
            default: null
        },
        gustIDLabel: {
            type: cc.Label,
            default: null
        },

        intoRegisterNodeBtn: {
            type: cc.Node,
            default: null
        },
        intoLoginNodeBtn: {
            type: cc.Node,
            default: null
        },
        registerBackBtn: {
            type: cc.Node,
            default: null
        },
        registerConfirmBtn: {
            type: cc.Node,
            default: null
        },
        registerIDEdit: {
            type: cc.EditBox,
            default: null
        },
        registerPasswordEdit: {
            type: cc.EditBox,
            default: null
        },
        registerConfirmPasswordEdit: {
            type: cc.EditBox,
            default: null
        },
        regisetrIntoLoginBtn: {
            type: cc.Node,
            default: null
        },
        loginBackBtn: {
            type: cc.Node,
            default: null
        },
        loginIDEdit: {
            type: cc.EditBox,
            default: null
        },
        loginPasswordEdit: {
            type: cc.EditBox,
            default: null
        },
        LoginIntoRegisterBtn: {
            type: cc.Node,
            default: null
        },
        LoginBtn: {
            type: cc.Node,
            default: null
        },
        randomNameNode: {
            type: cc.Node,
            default: null
        },
        randomNameConfirmBtn: {
            type: cc.Node,
            default: null
        },
        randomNameRandomBtn: {
            type: cc.Node,
            default: null
        },
        playerNameEdit: {
            type: cc.EditBox,
            default: null
        },
        editTip: {
            type: cc.Label,
            default: null
        },

        isLogin:false,
    },


    setStartGameNode: function() {
        this.startGameNode.active = true;
        this.registerNode.active = false;
        this.loginNode.active = false;
        this.randomNameNode.active = false;
    },

    setRegisterNode: function() {
        this.startGameNode.active = false;
        this.registerNode.active = true;
        this.loginNode.active = false;
        this.randomNameNode.active = false;
    },

    setLoginNode: function() {
        this.startGameNode.active = false;
        this.registerNode.active = false;
        this.loginNode.active = true;
        this.randomNameNode.active = false;
    },

    setRandomNameNode: function() {
        this.startGameNode.active = false;
        this.registerNode.active = false;
        this.loginNode.active = false;
        this.randomNameNode.active = true;
    },

    loginEvent: function() {
        //cc.cs.UIMgr.showTip("这里添加登陆事件", 1.0)
        cc.cs.gameMgr.sendLogin(this.loginIDEdit.string, this.loginPasswordEdit.string, this.loginHandle, this)
            //this.setRandomNameNode()
    },

    registerEvent: function() {
        //cc.cs.UIMgr.showTip("这里添加注册事件", 1.0)
        cc.cs.gameMgr.sendRegister(this.registerIDEdit.string, this.registerPasswordEdit.string, this.registerHandle, this)
    },

    playerName: function() {
        //cc.cs.UIMgr.showTip("这里添加用户名事件", 1.0)
        cc.log("setplayername")
        var api_token = cc.sys.localStorage.getItem('API_TOKEN')
        cc.cs.gameMgr.sendName(api_token, this.playerNameEdit.sting, this.sendNameHandle, this)
    },

    editplayerName: function() {
        //this.editTip.string = this.playerNameEdit.string;
        //this.playerNameEdit.string = "";
    },

    randomName: function() {
        //cc.cs.UIMgr.showTip("这里添加随机用户名功能", 1.0)
        var index = cc.random0To1() * 2031; // 名字随机
        var index2 = cc.random0To1() * 580; // 姓随机
        var string = i18n.t(Math.floor(index2) + "hehe") + i18n.t("" + Math.floor(index));
        cc.log(string)
            //this.editTip.string =   i18n.t( Math.floor(index2) +"hehe")+ i18n.t(""+ Math.floor(index) );
        this.editplayerName.string = i18n.t(Math.floor(index2) + "hehe") + i18n.t("" + Math.floor(index));
    },

    startgame: function() {
        //var Name = cc.cs.PlayerInfo.playerName;
        //cc.log("Name =" + Name)
        /*if (Name == null) {

        cc.director.loadScene('GameScene');
        if (Name == null) {
            cc.log(1111)
            this.setRandomNameNode();
        } else*/
       // {
        if(this.isLogin)
        {
            cc.director.loadScene('GameScene');
        }
        else
        {
            var login_id = cc.sys.localStorage.getItem('LOGIN_ID')
            var passward = cc.sys.localStorage.getItem('PASSWORD')
            if ((login_id != null && login_id != "") && (passward != null && passward != "")) {
                this.gustIDLabel.string = login_id
                cc.cs.gameMgr.sendLogin(login_id, passward, this.gotoGameScene, this)
            } else {
                //this.setStartGameNode()
                //this.gustIDLabel.string = cc.cs.gameMgr.generateGustInfo()
            }
        }





            //cc.director.loadScene('GameScene');
       // }

    },

    gotoGameScene:function(ret)
    {
       var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.sys.localStorage.setItem('API_TOKEN', JasonObject.content.info.api_token)   
            //cc.sys.localStorage.setItem('UserID',this.loginIDEdit.string)
            this.isLogin = true
            cc.cs.PlayerInfo.ApiToken = JasonObject.content.info.api_token
            cc.cs.PlayerInfo.playerName = JasonObject.content.info.name
            cc.cs.PlayerInfo.Welcome = JasonObject.content.info.welcome
            cc.cs.PlayerInfo.Level = JasonObject.content.info.level
            cc.cs.PlayerInfo.Sign = JasonObject.content.info.sign
            cc.cs.PlayerInfo.Exp = JasonObject.content.info.exp
            cc.cs.PlayerInfo.Power = JasonObject.content.info.power
            cc.cs.PlayerInfo.Money = JasonObject.content.info.money
            cc.cs.PlayerInfo.Diamond = JasonObject.content.info.diamond
            cc.cs.PlayerInfo.Phone_ID = JasonObject.content.info.phone_id
            cc.cs.PlayerInfo.Wechat_ID = JasonObject.content.info.wechat_id
            cc.cs.PlayerInfo.ZoneThumbsUp_ID = JasonObject.content.info.zoneThumbsUp_id
            cc.cs.PlayerInfo.ZoneReplay_ID = JasonObject.content.info.zoneReplay_id
            cc.cs.PlayerInfo.Work_ID = JasonObject.content.info.work_id
            cc.cs.PlayerInfo.Work1LeftTImes = JasonObject.content.info.work_id1
            cc.cs.PlayerInfo.Work2LeftTImes = JasonObject.content.info.work_id2
            cc.cs.PlayerInfo.Work3LeftTImes = JasonObject.content.info.work_id3
            cc.cs.PlayerInfo.Work4LeftTImes = JasonObject.content.info.work_id4
            cc.cs.PlayerInfo.Work5LeftTImes = JasonObject.content.info.work_id5

            cc.cs.PlayerInfo.Love_ID = JasonObject.content.info.date_id
            cc.cs.PlayerInfo.Work1LeftTImes = JasonObject.content.info.date_id1
            cc.cs.PlayerInfo.Work2LeftTImes = JasonObject.content.info.date_id2
            cc.cs.PlayerInfo.Work3LeftTImes = JasonObject.content.info.date_id3
            cc.cs.PlayerInfo.Work4LeftTImes = JasonObject.content.info.date_id4
            


            var itemcount = JasonObject.content.info.backpacks.length
            for(var i=0;i<JasonObject.content.info.backpacks.length;i++){  
  
                cc.log("goodsid = "+JasonObject.content.info.backpacks[i].goods_id)
                cc.cs.PlayerInfo.Bag.push(JasonObject.content.info.backpacks[i])
            }  
            
             cc.director.loadScene('GameScene');
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }


       
    },

    // use this for initialization
    onLoad: function() {
        var self = this
        this.setStartGameNode()
        var login_id = cc.sys.localStorage.getItem('LOGIN_ID')
        var passward = cc.sys.localStorage.getItem('PASSWORD')
         if ((login_id != null && login_id != "") && (passward != null && passward != "")) {
            this.gustIDLabel.string = login_id
            
        } else {
             this.gustIDLabel.string = cc.cs.gameMgr.generateGustInfo()
        }
        this.startGameBtn.on("click", (event) => {
            self.startgame()
        }, this.startGameBtn)
        this.registerConfirmBtn.on("click", (event) => {
            //注册账号按钮点击事件
            if (self.registerPasswordEdit.string != self.registerConfirmPasswordEdit.string) {
                cc.cs.UIMgr.showTip("输入密码不一致，请重新输入", 1.0)
                self.registerConfirmPasswordEdit.string = ""
                self.registerPasswordEdit.string = ""
                return;
            } else if (self.registerIDEdit.string == "" || self.registerIDEdit.string == null) {
                cc.cs.UIMgr.showTip("请输入手机号", 1.0)
                return;
            } else if (self.registerPasswordEdit.string == "" || self.registerPasswordEdit.string == null) {
                cc.cs.UIMgr.showTip("请输入密码", 1.0)
                return;
            } else if (self.registerConfirmPasswordEdit.string == "" || self.registerConfirmPasswordEdit.string == null) {
                cc.cs.UIMgr.showTip("请输入密码", 1.0)
                return;
            } else {
                self.registerEvent()
            }
        }, this.registerConfirmBtn)

        this.LoginBtn.on("click", (event) => {
            if (self.loginIDEdit.string == "" || self.loginIDEdit.string == null) {
                cc.cs.UIMgr.showTip("请输入ID", 1.0)
                return;
            } else if (self.loginPasswordEdit.string == "" || self.loginPasswordEdit.string == null) {
                cc.cs.UIMgr.showTip("请输入密码", 1.0)
                return;
            } else {
                self.loginEvent()

            }
        })

        this.intoRegisterNodeBtn.on("click", (event) => {
            self.setRegisterNode()
        }, this.intoRegisterNodeBtn)
        this.intoLoginNodeBtn.on("click", (event) => {
            self.setLoginNode()
        }, this.intoLoginNodeBtn)
        this.loginBackBtn.on("click", (event) => {
            self.setStartGameNode()
        }, this.loginBackBtn)
        this.registerBackBtn.on("click", (event) => {
            self.setStartGameNode()
        }, this.registerBackBtn)
        this.regisetrIntoLoginBtn.on("click", (event) => {
            self.setLoginNode()
        }, this.regisetrIntoLoginBtn)
        this.LoginIntoRegisterBtn.on("click", (event) => {
            self.setRegisterNode()
        }, this.LoginIntoRegisterBtn)
        this.randomNameConfirmBtn.on("click", (event) => {
            self.playerName()
        }, this.randomNameConfirmBtn)
        this.randomNameRandomBtn.on("click", (event) => {
            self.randomName()
        }, this.randomNameRandomBtn)
    },

    registerHandle: function(ret) {
        //cc.log(this)
        cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.cs.UIMgr.showTip("注册成功", 1.0)
            this.setLoginNode()
            this.loginIDEdit.string = this.registerIDEdit.string
            this.loginPasswordEdit.string = this.registerPasswordEdit.string
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }

    },

    loginHandle: function(ret) {
        //cc.log(ret)
        var JasonObject = JSON.parse(ret);
        if (JasonObject.success === true) {
            cc.sys.localStorage.setItem('API_TOKEN', JasonObject.content.info.api_token)   
            //cc.sys.localStorage.setItem('UserID',this.loginIDEdit.string)
            this.isLogin = true
            cc.cs.PlayerInfo.ApiToken = JasonObject.content.info.api_token
            cc.cs.PlayerInfo.playerName = JasonObject.content.info.name
            cc.cs.PlayerInfo.Welcome = JasonObject.content.info.welcome
            cc.cs.PlayerInfo.Level = JasonObject.content.info.level
            cc.cs.PlayerInfo.Sign = JasonObject.content.info.sign
            cc.cs.PlayerInfo.Exp = JasonObject.content.info.exp
            cc.cs.PlayerInfo.Power = JasonObject.content.info.power
            cc.cs.PlayerInfo.Money = JasonObject.content.info.money
            cc.cs.PlayerInfo.Diamond = JasonObject.content.info.diamond
            cc.cs.PlayerInfo.Phone_ID = JasonObject.content.info.phone_id
            cc.cs.PlayerInfo.Wechat_ID = JasonObject.content.info.wechat_id
            cc.cs.PlayerInfo.ZoneThumbsUp_ID = JasonObject.content.info.zoneThumbsUp_id
            cc.cs.PlayerInfo.ZoneReplay_ID = JasonObject.content.info.zoneReplay_id
            cc.cs.PlayerInfo.Work_ID = JasonObject.content.info.work_id
            cc.cs.PlayerInfo.Work1LeftTImes = JasonObject.content.info.work_id1
            cc.cs.PlayerInfo.Work2LeftTImes = JasonObject.content.info.work_id2
            cc.cs.PlayerInfo.Work3LeftTImes = JasonObject.content.info.work_id3
            cc.cs.PlayerInfo.Work4LeftTImes = JasonObject.content.info.work_id4
            cc.cs.PlayerInfo.Work5LeftTImes = JasonObject.content.info.work_id5

            cc.cs.PlayerInfo.Love_ID = JasonObject.content.info.date_id
            cc.cs.PlayerInfo.Work1LeftTImes = JasonObject.content.info.date_id1
            cc.cs.PlayerInfo.Work2LeftTImes = JasonObject.content.info.date_id2
            cc.cs.PlayerInfo.Work3LeftTImes = JasonObject.content.info.date_id3
            cc.cs.PlayerInfo.Work4LeftTImes = JasonObject.content.info.date_id4
            


            var itemcount = JasonObject.content.info.backpacks.length
            for(var i=0;i<JasonObject.content.info.backpacks.length;i++){  
  
                cc.log("goodsid = "+JasonObject.content.info.backpacks[i].goods_id)
                cc.cs.PlayerInfo.Bag.push(JasonObject.content.info.backpacks[i])
            }  
            cc.sys.localStorage.setItem('LOGIN_ID', this.loginIDEdit.string)
            cc.sys.localStorage.setItem('PASSWORD', this.loginPasswordEdit.string)
            var api_token = cc.sys.localStorage.getItem('API_TOKEN')
            cc.cs.UIMgr.showTip("登陆成功 api_token =" + api_token, 1.0)
            this.setStartGameNode();
            this.gustIDLabel.string = this.loginIDEdit.string;
        } else {
            cc.cs.UIMgr.showTip(JasonObject.error, 1.0)
        }
    },

    sendNameHandle: function(ret) {
        cc.log(ret)
    },





    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});