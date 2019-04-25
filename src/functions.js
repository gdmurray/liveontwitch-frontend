import {CONNECT_TWITCH_URL, TWITTER_AUTH_URL} from './constants';
const axios = require('axios');

export const ConnectTwitch = () => {
    window.location = CONNECT_TWITCH_URL;
}
export const connectTwitter = () => {
    axios.get(TWITTER_AUTH_URL).then((response) => {
        if(response.data.auth_url){
            window.location = response.data.auth_url;
        }
    })
}