export const BACKEND_API = process.env.REACT_APP_BACKEND_URL;
export const CONNECT_TWITCH_URL = BACKEND_API + "twitch/connect/";
export const LOGIN_TWITCH_URL = BACKEND_API + "twitch/login/";
export const COMPLETE_TWITCH_AUTH = BACKEND_API + "twitch/auth/";
export const TWITCH_ACCOUNT_INFO = BACKEND_API + "twitch/account/";
export const TWITCH_ACCOUNT_SIDEBAR_INFO = BACKEND_API + "twitch/account/sidebar/";
export const TWITTER_ACCOUNTS_URL = BACKEND_API + "twitter/accounts/";
export const TWITTER_AUTH_URL = BACKEND_API + "twitter/login/";
export const TWITTER_ACCOUNT_DETAIL = BACKEND_API + "twitter/account/";
export const TWITTER_CONFIG_DETAIL = BACKEND_API + "twitter/config/";
export const TWITTER_REFRESH_DATA = BACKEND_API + "twitter/refresh/";
export const TWITTER_TOGGLE_CONFIG = BACKEND_API + "twitter/config/toggle/";
export const VALIDATE_USERNAME = BACKEND_API + "validate/username/";
export const REGISTER_USER = BACKEND_API + "register/";
export const PASSWORD = BACKEND_API + "user/password/";
export const USER_PROFILE = BACKEND_API + "user/profile/";
export const LOG_OUT = BACKEND_API + "o/revoke_token/";
export const CONNECTED_ACCOUNTS = BACKEND_API + "user/connected/";

export const POSITIONING = [
    { key: 'b', text: 'Before', value: 'BEFORE' },
    { key: 'a', text: 'After', value: 'AFTER' },
  ]
