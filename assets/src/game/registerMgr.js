cc.Class({
    extends: cc.Component,

    properties: {
        handle:[],
    },

    registerHandle:function(name, handle){
        if(!!this.handle[name])
            cc.error("error the key '" + name +"' is exist  ")
        else
        {
            this.handle[name] = handle
        }
    },

    getHandle:function(name){
        if(!!this.handle[name])
            return this.handle[name]
        else
            return null
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
