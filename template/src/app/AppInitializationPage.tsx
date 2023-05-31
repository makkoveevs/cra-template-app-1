import { StoreContext, createStore } from "src/modules/Store";
import "src/styles/index.css";

const AppStoreContextValue = createStore();

const AppInitializationPage = (): JSX.Element => (
  <StoreContext.Provider value={AppStoreContextValue}>
    <div>App Template</div>
  </StoreContext.Provider>
);

export default AppInitializationPage;
