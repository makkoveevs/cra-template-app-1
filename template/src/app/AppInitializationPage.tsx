import { BrowserRouter } from "react-router-dom";
import { AxiosService } from "src/modules/Axios";
import { StoreContext, createStore } from "src/modules/Store";
import { Root } from "src/pages/Root";
import "src/styles/index.css";

const AxiosServiceInstance = new AxiosService();
AxiosServiceInstance.setServiceUrlsConfig({
  api: process.env.API_URL ?? "http://localhost",
});

const AppStoreContextValue = createStore();

const AppInitializationPage = (): JSX.Element => (
  <BrowserRouter>
    <StoreContext.Provider value={AppStoreContextValue}>
      <Root />
    </StoreContext.Provider>
  </BrowserRouter>
);

export default AppInitializationPage;
