import { Button, ButtonText } from "@/_shared/design/ui/button";
import { useCamera } from "@/contexts/camera.context";
import { useState } from "react";
import { Dimensions, Image, View } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function CameraExample() {
  const { openCamera } = useCamera();
  const [photo, setPhoto] = useState("");
  const [imageHeight, setImageHeight] = useState<number | null>(null);

  const handleOpenCamera = () => {
    openCamera(
      (uri) => {
        setPhoto(uri);
        setImageHeight(null);
        Image.getSize(uri, (width, height) => {
          const ratio = height / width;
          setImageHeight((screenWidth - 24) * ratio);
        });
      },
      [16, 9]
    );
  };

  return (
    <View>
      <Button onPress={handleOpenCamera}>
        <ButtonText>Abrir câmera</ButtonText>
      </Button>

      {photo && imageHeight && (
        <Image
          source={{ uri: photo }}
          style={{ height: imageHeight }}
          className="w-full mt-6 rounded-lg object-contain"
        />
      )}
    </View>
  );
}
