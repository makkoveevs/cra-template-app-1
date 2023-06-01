import { FlattenSimpleInterpolation, css } from "styled-components";
import { IMedia } from "./types";

export const BREAK_POINTS: IMedia = {
  mobile: "max-width: 529px",
  tablet: "max-width: 949px",
  desktopM: "max-width: 1024px",
  desktopL: "max-width: 1536px",
  desktopXL: "min-width: 1536px",
};

export const MEDIA = {
  mobile: (
    p: TemplateStringsArray,
    ...args: TemplateStringsArray[]
  ): FlattenSimpleInterpolation => css`
    @media (${BREAK_POINTS.mobile}) {
      ${css(p, ...args)}
    }
  `,
  tablet: (
    p: TemplateStringsArray,
    ...args: TemplateStringsArray[]
  ): FlattenSimpleInterpolation => css`
    @media (${BREAK_POINTS.tablet}) {
      ${css(p, ...args)}
    }
  `,
  desktopM: (
    p: TemplateStringsArray,
    ...args: TemplateStringsArray[]
  ): FlattenSimpleInterpolation => css`
    @media (${BREAK_POINTS.desktopM}) {
      ${css(p, ...args)}
    }
  `,
  desktopL: (
    p: TemplateStringsArray,
    ...args: TemplateStringsArray[]
  ): FlattenSimpleInterpolation => css`
    @media (${BREAK_POINTS.desktopL}) {
      ${css(p, ...args)}
    }
  `,
  desktopXl: (
    p: TemplateStringsArray,
    ...args: TemplateStringsArray[]
  ): FlattenSimpleInterpolation => css`
    @media (${BREAK_POINTS.desktopXL}) {
      ${css(p, ...args)}
    }
  `,
};
