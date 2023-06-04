import styled from "styled-components";

export const MenuItems = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
`;

export const MenuItem = styled.div<{ isActive?: boolean }>`
  position: relative;
  width: 100%;
  min-height: 38px;

  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${({ isActive = false }) =>
    isActive ? "#dedede" : "#ffffff"};

  &:hover {
    background-color: #e6e6e6;
  }
`;
