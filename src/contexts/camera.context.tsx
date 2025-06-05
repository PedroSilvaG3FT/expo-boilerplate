import AppCamera from "@/_shared/design/components/app-camera";
import { createContext, useContext, useRef, useState } from "react";

type CameraContextType = {
  openCamera: (cb: (uri: string) => void) => void;
  closeCamera: () => void;
};

const CameraContext = createContext<CameraContextType | null>(null);

export const useCamera = () => useContext(CameraContext)!;

export function CameraProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const callbackRef = useRef<(uri: string) => void>(() => {});

  const openCamera = (cb: (uri: string) => void) => {
    callbackRef.current = cb;
    setIsOpen(true);
  };

  const closeCamera = () => {
    setIsOpen(false);
  };

  const handleTakePhoto = (uri: string) => {
    callbackRef.current?.(uri);
    closeCamera();
  };

  return (
    <CameraContext.Provider value={{ openCamera, closeCamera }}>
      {children}
      <AppCamera
        isOpen={isOpen}
        onClose={closeCamera}
        onTakePhoto={handleTakePhoto}
      />
    </CameraContext.Provider>
  );
}
