import { MEDIA } from "src/styles/constats";
import styled from "styled-components";

export const RootLayout = styled.div`
  width: 100vw;
  height: 100vh;

  display: grid;

  ${MEDIA.desktopXl`
    grid-template-columns: 400px 1fr;
    grid-template-rows: 100vh;
  `}
  ${MEDIA.desktopL`
    grid-template-columns: 400px 1fr;
    grid-template-rows: 100vh;
  `}
  
  ${MEDIA.desktopM`
    grid-template-columns: 380px 1fr;
    grid-template-rows: 100vh;
  `}
  ${MEDIA.tablet`
    grid-template-columns: 300px 1fr;
    grid-template-rows: 100vh;
  `}
  ${MEDIA.mobile`
    grid-template-columns: 1fr;
    grid-template-rows: max-content;
    overflow:auto;
    padding: 20px;
  `}
`;

export const RootLayoutSidebar = styled.aside`
  position: relative;
  width: 100%;
  overflow: auto;
  ${MEDIA.mobile`
    height: fit-content;
    overflow: none;
  `}
`;

export const RootLayoutMain = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: auto;

  ${MEDIA.mobile`
    height: 100%;
  `}
`;
