import { JWTToken } from "./types";

export const parseJwt = (token: string): JWTToken => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e: any) {
    throw new Error(`Error parse token: ${JSON.stringify(e)}`);
  }
};

// utils for KeyCloak
export const parseISS = (token: string | null): string | undefined => {
  if (!token) {
    return undefined;
  }
  try {
    const { iss } = parseJwt(token);
    const issSplitted = iss.split("/");
    return issSplitted[issSplitted.length - 1];
  } catch (e: any) {
    // console.error("ISS not parsed: ", e);
    return undefined;
  }
};
