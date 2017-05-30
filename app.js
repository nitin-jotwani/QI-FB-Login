var express=require('express');
var request = require('request');
var app=express();
var access_token="";
var app_id=1903917926522994;
var redirect_uri="http://localhost:8888/fb";
var client_secret="da2f0b6a149b65885368e48820229341";

app.listen('8888',function(req,res){
    console.log("SERVER STARTED");
});
app.get('/', function (req, res) {
    res.send("SERVER STARTED");
});
app.get('/fb', function (req, res) {
    //res CONTAINS PARAMETER CODE, WITH THE HELP OF WHICH WE WILL REQUEST AN ACCESS TOKEN
    var url_parameter_code=req.query.code;
    var url="https://graph.facebook.com/v2.9/oauth/access_token?client_id="+app_id+"&redirect_uri=http://localhost:8888/fb&client_secret="+client_secret+"&code="+url_parameter_code;
    //REQUESTING ACCESS TOKEN
    console.log("REQUESTING ACCESS TOKEN");
    request(url, function (error, response, body) {
        var jsonObject = JSON.parse(body);
        verifyAccessToken(jsonObject.access_token);
    });
    res.send("Activity Recorded in Terminal");
});
function verifyAccessToken(access_token) {
    //ACCESS TOKEN RECEIVED MUST BE VERIFIED IN ORDER TO AUTHENTICATE A VALID USER AND AN ACCESS TOKEN SESSION
    console.log("VERIFYING ACCESS TOKEN");
    var url="https://graph.facebook.com/debug_token?input_token="+access_token+"&access_token=1903917926522994|da2f0b6a149b65885368e48820229341";
    request(url, function (error, response, body) {
        var jsonObject = JSON.parse(body);
        //IF VERIFICATION IS SUCCESSFUL IT MUST HAVE RECEIVED DATA OBJECT
        if(jsonObject.hasOwnProperty('data')){
            if (jsonObject.data['is_valid'] == true) {
                console.log("ACCESS TOKEN VERIFICATION SUCCESSFUL");
                //RETRIEVE USER INFO BY QUERYING FB GRAPH API
                getUserInfo(access_token);
            }
            else{
                console.log("ACCESS TOKEN VERIFICATION FAILED");
            }
        }
        else{
            console.log("UNABLE TO VERIFY: "+jsonObject.error.message);
        }
    });
}
function getUserInfo(access_token){
    console.log("RETRIEVING USER INFO");
    var url="https://graph.facebook.com/me?access_token="+access_token+"&fields=name,email,picture";
    request(url, function (error, response, body) {
        var jsonObject = JSON.parse(body);
        //CURRENTLY INFO IS DISPLAYED IN TERMINAL ONLY
        console.log(jsonObject.name+", "+jsonObject.email+", "+jsonObject.picture.data.url);
    });
}

