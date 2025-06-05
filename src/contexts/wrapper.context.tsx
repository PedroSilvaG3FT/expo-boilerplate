import React, { createContext } from "react";
import { AuthProvider } from "./auth.context";
import { CameraProvider } from "./camera.context";

interface IWrapperProviderProps {
  children: React.ReactNode;
}

const WrapperContext = createContext({});

const WrapperProvider: React.FC<IWrapperProviderProps> = ({ children }) => {
  return (
    <WrapperContext.Provider value={{}}>
      <CameraProvider>
        <AuthProvider>{children}</AuthProvider>
      </CameraProvider>
    </WrapperContext.Provider>
  );
};

export { WrapperContext, WrapperProvider };
