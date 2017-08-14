cc.Class({
    extends: cc.Component,
    statics: {
        url:"",
        token:"",
        sendRequest : function(url, externURL, data, handler, isPost, obj){
            var xmlHttp = cc.loader.getXMLHttpRequest();
            xmlHttp.timeout = 3000;
            var param = ""
            if(!isPost)
            {
                param = "?"
            }
            
            for(var key in data)
            {
                if(param != "?" && param != "")
                {
                    param += "&"    
                }
                param += key + "=" + data[key]
            }
            if(isPost)
            {
                xmlHttp.open("POST", url+ externURL, true)
                xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;")
                xmlHttp.setRequestHeader("cache-control","no-cache")
                xmlHttp.setRequestHeader("contentType","text/html;charset=uft-8") 
                xmlHttp.send(param)
            }else
            {
                xmlHttp.open("GET", url +externURL+ encodeURI(param), true)
            }
            
            xmlHttp.onreadystatechange = function() {
                if(xmlHttp.readyState === 4 && (xmlHttp.status >= 200 && xmlHttp.status < 300)){
                    console.log("http res("+ xmlHttp.responseText.length + "):" + xmlHttp.responseText);
                    try {
                        if(handler !== null){
                            handler.apply(obj, [xmlHttp.responseText]);
                        }                        /* code */
                    } catch (e) {
                        console.log("err:" + e);
                        
                    }
                    finally{
                    
                    }
                }
            };
            
        },
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
