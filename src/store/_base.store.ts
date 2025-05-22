import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IBuildStoreConfig<Data> {
  state: StateCreator<Data, [], []>;
  storage?: "local" | "session" | "native";
  name: string;
}

const isWeb = typeof window !== "undefined";

export const createStore = <State>(config: IBuildStoreConfig<State>) => {
  const { state, name, storage = isWeb ? "local" : "native" } = config;

  const storageImpl =
    storage === "native"
      ? createJSONStorage(() => ({
          setItem: setItemAsync,
          getItem: getItemAsync,
          removeItem: deleteItemAsync,
        }))
      : createJSONStorage(() =>
          storage === "local" ? localStorage : sessionStorage
        );

  return create(
    persist(state, {
      name: `@app:${name}`,
      storage: storageImpl,
    })
  );
};
