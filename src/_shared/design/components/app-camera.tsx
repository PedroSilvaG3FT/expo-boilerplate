import { CameraView, useCameraPermissions } from "expo-camera";
import { ChevronLeft, Repeat } from "lucide-react-native";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, ButtonText } from "../ui/button";
import AppText from "./app-text";
import AppView from "./app-view";
import Show from "./utils/show";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  defaultFacing?: "front" | "back";
  onTakePhoto: (data: string) => void;
}

export default function AppCamera({
  isOpen,
  onClose,
  onTakePhoto,
  defaultFacing = "front",
}: IProps) {
  const cameraRef = useRef<any>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<"back" | "front">(defaultFacing);

  if (!isOpen || !permission) return null;

  const handleTake = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      onTakePhoto(photo.uri);
    }
  };

  const handleToggle = () =>
    setFacing((prev) => (prev === "back" ? "front" : "back"));

  return (
    <AppView
      className="!bg-black justify-end z-[999]"
      style={{ ...StyleSheet.absoluteFillObject }}
    >
      <Show>
        <Show.When condition={permission.granted}>
          <CameraView
            facing={facing}
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
          />

          <View className="flex-row justify-between items-center p-10 bg-black/20">
            <Button onPress={onClose} variant="link" className="p-0 w-9">
              <ChevronLeft size={44} color="#FFF" />
            </Button>

            <Button
              onPress={handleTake}
              className="rounded-full bg-white w-20 h-20"
            />

            <Button
              onPress={handleToggle}
              variant="link"
              className="p-0 w-9 h-9"
            >
              <Repeat size={32} color="#FFF" />
            </Button>
          </View>
        </Show.When>

        <Show.Else>
          <AppView className="flex-1 items-center justify-center">
            <AppText className="p-4 text-center">
              Precisamos da sua permissão para acessar a câmera.
            </AppText>
            <Button onPress={requestPermission}>
              <ButtonText>Conceder permissão</ButtonText>
            </Button>
          </AppView>
        </Show.Else>
      </Show>
    </AppView>
  );
}
