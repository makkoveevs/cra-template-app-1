import styled from "styled-components";

export const RootLayout = styled.div`
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
`;
export const RootLayoutSidebar = styled.aside`
  position: relative;
  width: 400px;
  height: 100vh;
  overflow: auto;
`;
export const RootLayoutMain = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: auto;
`;
