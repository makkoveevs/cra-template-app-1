export type TGetAccessTokenResponseKeys =
  | "access_token"
  | "expires_in"
  | "refresh_expires_in"
  | "refresh_token"
  | "token_type"
  | "session_state"
  | "scope"
  | "not-before-policy";

export const RESPONSE_DATA_KEYS: TGetAccessTokenResponseKeys[] = [
  "access_token",
  "expires_in",
  "refresh_expires_in",
  "refresh_token",
  "token_type",
  "session_state",
  "scope",
  "not-before-policy",
];

export type JWTToken = {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  "allowed-origins": string[];
  realm_access: {
    roles: string[];
  };
  resource_access: {
    account: {
      roles: string[];
    };
  };
  scope: string;
  sid: string;
  email_verified: boolean;
  preferred_username: string;
  locale: string;
};

export type TGetAccessTokenResponseData = Record<
  TGetAccessTokenResponseKeys,
  string
>;
