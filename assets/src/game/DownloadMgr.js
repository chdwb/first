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
        _downloader: null,
        _storagePath: "",
        _inited: false
    },

    // use this for initialization
    onLoad: function () {

        
    },
    init:function()
    {
this._downloader = new jsb.Downloader();
        this._downloader.setOnFileTaskSuccess(this.onSucceed.bind(this));
        this._downloader.setOnTaskProgress(this.onProgress.bind(this));
        this._downloader.setOnTaskError(this.onError.bind(this));

        this._storagePath = jsb.fileUtils.getWritablePath() + '/example-cases/downloader/';
        this._inited = jsb.fileUtils.createDirectory(this._storagePath);
        if (!this._inited) {
            cc.log('Failed to create storage path, downloader won\'t work correctly')
            
        }

    },
    startDownload(url,filename)
    {
        this._downloader.createDownloadFileTask(url, this._storagePath + filename);
        cc.log("开始下载 dir = "+this._storagePath)
    },
    onSucceed (task) {
        /*var atlasRelated = false;
        switch (task.requestURL) {
        case this.imgUrl:
            var self = this;
            cc.loader.load(task.storagePath, function (err, tex) {
                var spriteFrame = new cc.SpriteFrame(tex);
                self.sprite.spriteFrame = spriteFrame;

                self.sprite.node.active = true;
                self.label.node.active = false;
            });
            break;
        case this.txtUrl:
            var content = jsb.fileUtils.getStringFromFile(task.storagePath);
            this.sprite.node.active = false;
            this.label.node.active = true;
            this.label.string = content.substr(0, 350);
            break;
        }*/
        cc.log("下载成功")
       
    },

    onProgress (task, bytesReceived, totalBytesReceived, totalBytesExpected) {

    },

    onError (task, errorCode, errorCodeInternal, errorStr) {
        //this.sprite.node.active = false;
        //this.label.node.active = true;
         cc.log( 'Failed to download file (' + task.requestURL + '): ' + errorStr + '(' + errorCode + ')')
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
