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
        },
        
        
        getStr(strname,array)
        {
            
         cc.loader.loadRes("video/text/"+strname,function(err,data){
            if(!err){
                cc.log(data)
                
                var ttt = ""
				var re = new RegExp(/\r\n/);
				if (cc.sys.os==cc.sys.OS_IOS){
					re = new RegExp(/\n/);
					ttt = data.replace(/^\d+\n/gm, "")
					ttt = ttt.replace(/^\n/gm, "")
				}else{
					ttt = data.replace(/^\d+\r\n/gm, "")
					ttt = ttt.replace(/^\r\n/gm, "")
				}
               
                data = ttt
                var hehe = data.split(re)
                //var index = 1;
                var id = 1
                for(var i = 1;i+1<hehe.length;i+=2)
                {
                   var strdata = []
                   strdata.ID = id
                   strdata.starttime = parseInt(hehe[i].substring(6,8)) * 1000 +  parseInt(hehe[i].substring(3,5))*60*1000 + parseInt(hehe[i].substring(0,2))*3600*1000 + parseInt(hehe[i].substring(9,12))  
                   strdata.endtime = parseInt(hehe[i].substring(23,25)) * 1000 +  parseInt(hehe[i].substring(20,22))*60*1000 + parseInt(hehe[i].substring(17,19))*3600*1000 + parseInt(hehe[i].substring(26,29)) 
                   strdata.text = hehe[i+1].replace(/(^\n*)|(\n*$)/g, "");
                   array.push(strdata)
                   id++;
                }
            }
        } )
        //return array
        }
        
    },

    
});