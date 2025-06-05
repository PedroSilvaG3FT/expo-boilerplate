import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React, { createContext } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./auth.context";
import { CameraProvider } from "./camera.context";
import { SheetProvider } from "./sheet.context";

interface IWrapperProviderProps {
  children: React.ReactNode;
}

const WrapperContext = createContext({});

const WrapperProvider: React.FC<IWrapperProviderProps> = ({ children }) => {
  return (
    <WrapperContext.Provider value={{}}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <SheetProvider>
            <CameraProvider>
              <AuthProvider>{children}</AuthProvider>
            </CameraProvider>
          </SheetProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </WrapperContext.Provider>
  );
};

export { WrapperContext, WrapperProvider };
