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
        BGMid:-1,
        Backid:-1,
        isSondOff:false
    },

    // use this for initialization
    onLoad: function () {
     

    },

     init:function()
    {
        var hehe = cc.sys.localStorage.getItem('ISSOUNDOFF')
        cc.log("声音开关"+hehe)
        if(hehe == 1)
        {
            this.isSondOff = true;
        }
    },
    /*
    playEffect:function(clip)
    {
        if(this.isSondOff == false)
         cc.audioEngine.play(clip, false, 1);
    },*/

    playBGM:function (name,isLoop)
    {
        var self = this;
        if(this.isSondOff == false)
        {

            var hehe  = cc.loader.getRes("audio/"+name, cc.AudioClip)
            self.BGMid  = cc.audioEngine.play(hehe, isLoop, 1);

                       
            /*cc.loader.loadRes("audio/"+name, function (err, clip) 
            {

              self.BGMid = cc.audioEngine.play(clip, isLoop, 0.5);
            });*/
        }
       //this.BGMid = cc.audioEngine.play(clip, isLoop, 1);

          
       cc.log("背景音乐id"+this.BGMid)
    },

    stopBGM:function(issave = false)
    {
        
        if(issave)
        {
        this.isSondOff = true
        cc.sys.localStorage.setItem('ISSOUNDOFF',1)
        }

         cc.audioEngine.pause(this.BGMid)

    },

    startBGM:function(issave = false)
    {
        
        if(issave)
        {
            this.isSondOff = false
            cc.sys.localStorage.setItem('ISSOUNDOFF',0)
           
        }
         cc.audioEngine.resume(this.BGMid)
    },


    playAudio:function(name,isloop)
    {
        if(arguments.length == 1)
            isloop =false;
        var id = 0;
        if(this.isSondOff == false)
        {
            var self = this;
   
           var hehe = cc.loader.getRes("audio/effect/"+name, cc.AudioClip)
            id = cc.audioEngine.play(hehe, isloop, 1);
        }
        return id;
    },
           
     playVoice:function(name,handle)
    {
       
        var self = this
        cc.loader.loadRes("audio/voice/"+name, function (err, clip) {

            cc.log("playVoice name"+name + " erro code "+err)

            self.Backid  = cc.audioEngine.play(clip, false, 1);

             cc.log("播放语音ID = " + self.Backid)

             self.setFinishCallback(self.Backid,handle)

            
        });
    return  self.Backid;
    },
     setFinishCallback:function ( audioID, callback )
    {

        cc.audioEngine.setFinishCallback(audioID, callback);

    },

     StopAudio:function(id)
     {

         cc.audioEngine.stop(id)

     },

     

       StopVoice:function()
     {

         cc.audioEngine.stop(this.Backid)

     },




   

    playBack:function (clip,isLoop)
    {
        cc.log("backid ="+this.Backid)
        /*if(this.Backid == -1)
        {
            this.Backid = cc.audioEngine.play(clip, isLoop,1);
             //cc.log("backid ="+cc.audioEngine.play(clip, isLoop,1))
        }
        else 
        {
            cc.audioEngine.setCurrentTime(this.Backid,0)
            cc.audioEngine.resume(this.Backid)
        }*/
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
