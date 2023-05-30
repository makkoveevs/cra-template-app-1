/* eslint-disable import/no-default-export */

declare const __ENV__: "development";
declare const __VERSION__: string;
declare const __COMMIT_HASH__: string;
declare const __BRANCH__: string;
declare const __LAST_COMMIT_DATE_TIME__: string;

declare module "*.css" {
  const css: any;
  export default css;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.json";
