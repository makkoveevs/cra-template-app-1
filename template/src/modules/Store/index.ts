import { createContext, useContext } from "react";
import { AppStore } from "./store";

export const createStore = (): AppStore => new AppStore();

export const StoreContext = createContext<AppStore | null>(null);

export const useStore = (): AppStore => {
  const stores = useContext(StoreContext);

  if (!stores) {
    throw new Error(
      "useStore() allow use inside <StoreContext.provider /> only"
    );
  }

  return stores;
};
