export interface IGridProps {
  $cols?: number;
  $rows?: number;
  $isLeftRightGap?: boolean;
}

export interface IGridItemProps {
  $colStart?: number;
  $rowStart?: number;
  $colEnd?: number;
  $rowEnd?: number;
}
