import {CONNECT_TWITCH_URL, COMPLETE_TWITCH_AUTH} from "../constants";
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

function prepareAuth(){
    var token = sessionStorage.getItem('access_token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
        axios.defaults.headers.common['Authorization'] = null;
        window.location = "/splash";
        /*if setting null does not remove `Authorization` header then try     
            delete axios.defaults.headers.common['Authorization'];
        */
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

    })

    execFunc();

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
function connect(){
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
            if(error.response.data.message = "identifier has been used"){
                localStorage.removeItem("identifier");
                connect();
            }
        }else{
            // TODO: Have an appropriate Error page
            alert("There is an issue with the backend server");
        }
    })
    
}