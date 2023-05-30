export const ACCESS_TOKEN_STORAGE_KEY = "access_token";
export const REFRESH_TOKEN_STORAGE_KEY = "refresh_token";
export const TOKEN_TYPE_STORAGE_KEY = "token_type";
export const IS_REFRESHING_STORAGE_KEY = "refreshTokenFlag";
export const TOKEN_SAVE_DATE_STORAGE_KEY = "token_save_date";

export const MAX_RETRY_COUNT = 8;
export const DELAY_BETWEEN_RETRY_MS = 1000;

export const EXPIRED_TOKEN_RESPONSE_STATUS = 401;
export const NOT_VALID_REFRESH_TOKEN_RESPONSE_STATUS = 400;

export const AUTO_REFRESH_TOKEN_TIMEOUT = 5 * 60 * 1000; // 5 minutes in ms
export const REFRESH_TOKEN_ENDPOINT_PATH = "refresh-token";

export const APP_LOGIN_LOCATIOIN = "/";
