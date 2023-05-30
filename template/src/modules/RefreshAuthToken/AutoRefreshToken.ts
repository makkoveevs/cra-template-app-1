import { refreshTokenRequest } from "./refreshTokenRequest";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  AUTO_REFRESH_TOKEN_TIMEOUT,
  IS_REFRESHING_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_ENDPOINT_PATH,
} from "src/constants/auth";
import { parseJwt } from "./parseJWT";

/**
    Use this class for automatic token refreshing
    Run that in anyway place app.

    const autoRefreshToken = new AutoRefreshToken({
      elementName: "App",
      refreshTokenURL: `${REFRESH_TOKEN_ENDPOINT_URL`
    });

    That code automatic add listeners for events mousemove, mousedown, keydown.
    Dont forget remove listeners on component unload hook

    autoRefreshToken.removeListeners()
 */

let instance: AutoRefreshToken;

export type TAutoRefreshTokenConfig = {
  timeoutMS?: number;
  refreshTokenURL?: string;
  elementName?: string;
};

export const AUTO_REFRESH_TOKEN_CONFIG: Required<TAutoRefreshTokenConfig> = {
  timeoutMS: AUTO_REFRESH_TOKEN_TIMEOUT,
  refreshTokenURL: `${location.protocol}://${location.host}/${REFRESH_TOKEN_ENDPOINT_PATH}`,
  elementName: "App",
};

export class AutoRefreshToken {
  timeout: NodeJS.Timeout | undefined;
  config: Required<TAutoRefreshTokenConfig>;
  hasListeners = false;
  listenersOwnerElement = "";
  updateProcessStarted = false;

  constructor(config?: TAutoRefreshTokenConfig) {
    this.config = { ...AUTO_REFRESH_TOKEN_CONFIG, ...(config ?? {}) };
    if (!instance) {
      instance = this;
    }
    this.addListeners(this.config.elementName);
    return instance;
  }

  clearStorageAndReload = (): void => {
    this.timeout && this.clearTimeout();
    localStorage.removeItem(IS_REFRESHING_STORAGE_KEY);
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    //TODO - ? выкидывать на главную ?
    return location.replace("/");
  };

  handleEvent = (): void => {
    if (this.updateProcessStarted) {
      return;
    }

    const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

    if (storedRefreshToken === null) {
      this.timeout && this.clearTimeout();
      return;
    }

    try {
      const parsedToken = parseJwt(storedRefreshToken);
      //TODO add delta time between client and server time
      const diff = parsedToken.exp - Date.now() / 1000; // seconds
      if (diff < 0) {
        //token is expired
        return this.clearStorageAndReload();
      } else if (diff < this.config.timeoutMS / 1000) {
        // force update and exit
        this.timeout && this.clearTimeout();
        return this.runRefreshTokenProcess();
      }
    } catch {
      // error on token parsing process => clear all and exit
      this.timeout && this.clearTimeout();
      return;
    }

    if (typeof this.timeout === "undefined") {
      this.timeout = setTimeout(
        this.runRefreshTokenProcess,
        this.config.timeoutMS
      );
    }
  };

  clearTimeout = (): void => {
    if (typeof this.timeout !== "undefined") {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  };

  runRefreshTokenProcess = (): void => {
    this.updateProcessStarted = true;
    refreshTokenRequest(this.config.refreshTokenURL)
      .finally(() => {
        this.updateProcessStarted = false;
      })
      .catch((e) => {
        if (e?.response?.status === 400) {
          return this.clearStorageAndReload();
        }
      });
    this.clearTimeout();
  };

  addListeners = (elementName = "App"): void => {
    if (this.hasListeners) {
      return;
    }
    document.addEventListener("mousedown", this.handleEvent);
    document.addEventListener("mousemove", this.handleEvent);
    document.addEventListener("keydown", this.handleEvent);
    window.addEventListener("beforeunload", this.removeListeners);
    this.listenersOwnerElement = elementName;
    this.hasListeners = true;
  };

  removeListeners = (): void => {
    this.clearTimeout();
    document.removeEventListener("mousedown", this.handleEvent);
    document.removeEventListener("mousemove", this.handleEvent);
    document.removeEventListener("keydown", this.handleEvent);
    window.removeEventListener("beforeunload", this.removeListeners);
    this.listenersOwnerElement = "";
    this.hasListeners = false;
  };
}
