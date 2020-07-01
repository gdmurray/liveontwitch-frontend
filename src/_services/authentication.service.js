import {CONNECT_TWITCH_URL, COMPLETE_TWITCH_AUTH, TWITCH_ACCOUNT_INFO} from "../constants";
var axios = require('axios');
var crypto = require('crypto');
export const authenticationService = {
    connect,
    callback,
    prepareAuth,
}

function setToken(token){
    sessionStorage.setItem('access_token', token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
console.log("ENVIRONMENT: " + process.env.REACT_APP_ENVIRONMENT);
function prepareAuth(props){
    //console.log(props.location.state);
    if(props.location !== undefined && props.location.state !== null && props.location.state !== undefined){
        //console.log("Sent With State");
        if(props.location.state.token !== undefined){
            //console.log("just authed...");
            token = props.location.state.token;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            axios.get(TWITCH_ACCOUNT_INFO).then((response) => {
                localStorage.setItem("userInfo", JSON.stringify(response.data));
            })
        }else{
            var token = sessionStorage.getItem('access_token');
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
    }else{
        //console.log("Default Refresh Behaviour");
        token = sessionStorage.getItem('access_token');
        if(token){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }else{
            var userInfo = localStorage.getItem("userInfo");
            //console.log(userInfo);
            if(userInfo !== null){
                //console.log("Navigate to /login");
                window.location = "/login"
            }else{
                //console.log("Navigate to Splash");
                window.location = "/splash";
            }
        }
    }
}

function callback(execFunc){
    var identifier = JSON.parse(localStorage.getItem('identifier'));

    axios.get(COMPLETE_TWITCH_AUTH, {
        params: {
            identifier: identifier.identifier,
            application: process.env.REACT_APP_LIVE_CLIENT_ID
        }
    }).then((response) => {
        localStorage.removeItem('identifier');
        setToken(response.data.token);
        setTimeout(function(){
            execFunc(response.data.token);
        }, 250)
    })


}
function generateIdentifier(){
    var timestamp = new Date().getTime();
    var identifier = crypto.randomBytes(20).toString('hex');
    var data = {
        "timestamp": timestamp,
        "identifier": identifier
    }
    localStorage.setItem('identifier', JSON.stringify(data));
    return data;
}
function connect(props=undefined, twitchAuth=false  ){
    var exists = localStorage.getItem('identifier');
    if (exists == null){
        data = generateIdentifier();
    }else{
        
        var data = JSON.parse(exists);
        
        var nowTime = new Date().getTime();
        var difference = nowTime - data.timestamp;
        if ( Math.round(difference / 60000) > 1){
            console.log("Bigger than 1 minute, generate new one");
            data = generateIdentifier();
        }
    }

    var identifier = data.identifier;
    console.log('identifier: ' + identifier);
    if(!twitchAuth){
        props.history.push("/login")
    }else{
        axios.get(CONNECT_TWITCH_URL, {
            params: {
                'identifier': identifier,
                'application': process.env.REACT_APP_LIVE_CLIENT_ID
            }
        }).then((response) => {
            if (response.data.auth_url !== undefined){
                window.location = response.data.auth_url;
            }
        }).catch((error) => {
            if(error.response){
                if(error.response.data.message == "identifier has been used"){
                    localStorage.removeItem("identifier");
                    connect();
                }else if(error.response.data.message == "client with that ID does not exist"){
                    alert("🅱️ackend Machine 🅱️roke");
                }
            }else{
                // TODO: Have an appropriate Error page
                if(props){
                    console.log("Go to error page");
                    props.history.push("/error", {"message": "Backend Server is not Responding"})
                }else{
                    alert("Backend Server is Not Responding");
                }
                
            }
        })
    }   
}

export function preSignOut(){
    var keys = ['userInfo', 'accounts'];
    for(var key of keys){
        try{
            localStorage.removeItem(key)
        }catch (err){
            console.log("couldnt remove key: ", key);
        }
    }
    try{
        sessionStorage.removeItem('access_token')
    }catch (err){
        console.log('couldnt remove access_token');
    }
}