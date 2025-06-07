import AppCamera from "@/_shared/design/components/app-camera";
import AppImageCropper from "@/_shared/design/components/app-image-cropper";
import { createContext, useContext, useRef, useState } from "react";

type CameraContextType = {
  closeCamera: () => void;
  openCamera: (
    cb: (uri: string) => void,
    aspectRatio?: [number, number]
  ) => void;
};

const CameraContext = createContext<CameraContextType | null>(null);
export const useCamera = () => useContext(CameraContext)!;

export function CameraProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<
    [number, number] | undefined
  >();
  const callbackRef = useRef<(uri: string) => void>(() => {});
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  const openCamera = (cb: (uri: string) => void, ratio?: [number, number]) => {
    callbackRef.current = cb;
    setAspectRatio(ratio);
    setIsOpen(true);
  };

  const closeCamera = () => {
    setIsOpen(false);
    setAspectRatio(undefined);
  };

  const handleTakePhoto = (uri: string) => {
    setIsOpen(false);

    if (aspectRatio) {
      setPhotoUri(uri);
      setShowCropper(true);
    } else callbackRef.current(uri);
  };

  const handleCropDone = (croppedUri: string) => {
    setShowCropper(false);
    setPhotoUri(null);
    callbackRef.current(croppedUri);
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setPhotoUri(null);

    callbackRef.current(photoUri!);
  };

  return (
    <CameraContext.Provider value={{ openCamera, closeCamera }}>
      {children}

      <AppCamera
        isOpen={isOpen}
        onClose={closeCamera}
        onTakePhoto={handleTakePhoto}
      />

      {showCropper && photoUri && (
        <AppImageCropper
          imageUri={photoUri}
          onCrop={handleCropDone}
          aspectRatio={aspectRatio}
          onCancel={handleCropCancel}
        />
      )}
    </CameraContext.Provider>
  );
}
