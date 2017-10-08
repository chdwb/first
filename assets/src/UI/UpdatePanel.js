module.exports = cc.Class({
    extends: cc.Component,

    properties: {
        info: cc.Label,
        fileProgress: cc.ProgressBar,
        fileLabel: cc.Label,
        byteProgress: cc.ProgressBar,
        byteLabel: cc.Label,
        close: cc.Node,
        checkBtn: cc.Node,
        retryBtn: cc.Node,
        updateBtn: cc.Node

    },
    
    onLoad () {
        var self = this
        this.close.on(cc.Node.EventType.TOUCH_END, function () {
            self.node.active = false;
            self.node.parent.getChildByName("Bg").active = true
        }, this);
    }
});
