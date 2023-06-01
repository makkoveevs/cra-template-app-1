import styled, { css } from "styled-components";
import { IGridItemProps, IGridProps } from "./types";
import { MEDIA } from "src/styles/constats";

export const Grid = styled.div<IGridProps>`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: ${({ $isLeftRightGap, $cols = 1 }) =>
    $isLeftRightGap
      ? `0 repeat(${$cols}, minmax(0, 1fr)) 0`
      : `repeat(${$cols}, minmax(0, 1fr))`};
  ${({ $rows }) =>
    $rows &&
    css`
      grid-template-rows: repeat(${$rows}, minmax(0, 1fr));
    `};
  row-gap: 24px;
  ${MEDIA.desktopXl`
    column-gap: 40px;
  `};
  ${MEDIA.desktopL`
    column-gap: 32px;
    height: max-content;
  `};
  ${MEDIA.desktopM`
    column-gap: 24px;
    height: max-content;
     grid-template-columns: repeat(2, minmax(0, 1fr));
  `};
  ${MEDIA.mobile`
    column-gap: 24px;
    height: max-content;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    grid-template-rows: repeat(1, minmax(0, 1fr));
  `};
`;

export const GridItem = styled.div<IGridItemProps>`
  min-width: 0;
  ${({ $colStart }) =>
    $colStart &&
    css`
      grid-column-start: ${$colStart};
    `};
  ${({ $colEnd }) =>
    $colEnd &&
    css`
      grid-column-end: ${$colEnd};
    `};
  ${({ $rowStart }) =>
    $rowStart &&
    css`
      grid-row-start: ${$rowStart};
    `};
  ${({ $rowEnd }) =>
    $rowEnd &&
    css`
      grid-row-end: ${$rowEnd};
    `};
`;
