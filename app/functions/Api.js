module.exports = function(type,url,data,callbacks){
    callbacks = callbacks || {};
    var precallback = callbacks.pre || function(){},
        successcallback = callbacks.success || function(){},
        failcallback = callbacks.fail || function(){};

    precallback();

    if(!type){failcallback({error:"Invalid request type",code:400}); return false;}
    if(!url || url==""){failcallback({error:"Invalid url",code:400}); return false;}
    url = "/api" + url;
    data = data || {};

    var expectedresponse = 200;
    if(type=="POST"){
        expectedresponse = 201;
    } else if(type=="DELETE") {
        expectedresponse = 204;
    }

    var http = new XMLHttpRequest();
    http.open(type, url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function() {
        if(http.readyState == 4) {
            var response = null;
            if(http.responseText.length>0) response = JSON.parse(http.responseText);

            if(http.status==expectedresponse && response){
                successcallback(response);
            } else if(http.status==expectedresponse && !response){
                successcallback();
            } else {
                failcallback(response);
            }
        }
    };
    if(data) http.send(JSON.stringify(data));
    else http.send();
    return true;
};