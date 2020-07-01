
const axios = require('axios');
let token = sessionStorage.getItem('access_token');
if(token){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
export default axios;