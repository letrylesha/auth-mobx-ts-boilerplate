import { createContext, useContext } from "react";
import { UserStore } from "../stores/UserStore";

export enum StoresEnum {
  USER_STORE = "userStore",
}

export interface StoreInterface {
  userStore: UserStore;
}

export const store: StoreInterface = {
  [StoresEnum.USER_STORE]: new UserStore(),
};

export const StoreContext = createContext(store);

export const useStore = (store: StoresEnum) => {
  const stores: StoreInterface = useContext(StoreContext);

  return stores[store];
};
