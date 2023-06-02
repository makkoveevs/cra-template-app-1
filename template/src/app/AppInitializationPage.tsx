import { BrowserRouter } from "react-router-dom";
import { StoreContext, createStore } from "src/modules/Store";
import { Root } from "src/pages/Root";
import "src/styles/index.css";

const AppStoreContextValue = createStore();

const AppInitializationPage = (): JSX.Element => (
  <BrowserRouter>
    <StoreContext.Provider value={AppStoreContextValue}>
      <Root />
    </StoreContext.Provider>
  </BrowserRouter>
);

export default AppInitializationPage;
