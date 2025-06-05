import { Button, ButtonText } from "@/_shared/design/ui/button";
import { useCamera } from "@/contexts/camera.context";
import { useState } from "react";
import { Image, View } from "react-native";

export default function CameraExample() {
  const { openCamera } = useCamera();
  const [photo, setPhoto] = useState("");

  const handleOpenCamera = () => openCamera((uri) => setPhoto(uri));

  return (
    <View>
      <Button onPress={handleOpenCamera}>
        <ButtonText>Abrir câmera</ButtonText>
      </Button>

      {photo && (
        <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}
