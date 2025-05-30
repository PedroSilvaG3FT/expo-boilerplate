import React, { createContext } from "react";
import { AuthProvider } from "./auth.context";

interface IWrapperProviderProps {
  children: React.ReactNode;
}

const WrapperContext = createContext({});

const WrapperProvider: React.FC<IWrapperProviderProps> = ({ children }) => {
  return (
    <WrapperContext.Provider value={{}}>
      <AuthProvider>{children}</AuthProvider>
    </WrapperContext.Provider>
  );
};

export { WrapperContext, WrapperProvider };
