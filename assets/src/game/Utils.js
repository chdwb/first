cc.Class({
    extends: cc.Component,

    statics: {
        contains:function (arr, obj) {  
            var i = arr.length;  
            while (i--) {  
                if (arr[i] === obj) {  
                    return true;  
                }  
            }  
            return false;  
        }  
    },

    
});