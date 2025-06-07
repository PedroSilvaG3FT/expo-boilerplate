import * as ImageManipulator from "expo-image-manipulator";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  PanResponder,
  StyleSheet,
  View,
} from "react-native";
import { Button, ButtonText } from "../ui/button";
import AppView from "./app-view";

interface CropperProps {
  imageUri: string;
  aspectRatio?: [number, number];
  onCancel: () => void;
  onCrop: (croppedUri: string) => void;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function AppImageCropper({
  imageUri,
  aspectRatio = [1, 1],
  onCancel,
  onCrop,
}: CropperProps) {
  const panStart = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 50, y: 100 });

  const [position, setPosition] = useState(positionRef.current);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [renderedSize, setRenderedSize] = useState({
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0,
  });

  const cropWidth = 250;
  const cropHeight = cropWidth * (aspectRatio[1] / aspectRatio[0]);

  useEffect(() => {
    Image.getSize(imageUri, (width, height) => {
      setImageSize({ width, height });

      const imgRatio = width / height;
      const screenRatio = SCREEN_WIDTH / SCREEN_HEIGHT;

      if (imgRatio > screenRatio) {
        const scaledHeight = SCREEN_WIDTH / imgRatio;
        setRenderedSize({
          width: SCREEN_WIDTH,
          height: scaledHeight,
          offsetX: 0,
          offsetY: (SCREEN_HEIGHT - scaledHeight) / 2,
        });
      } else {
        const scaledWidth = SCREEN_HEIGHT * imgRatio;
        setRenderedSize({
          width: scaledWidth,
          height: SCREEN_HEIGHT,
          offsetX: (SCREEN_WIDTH - scaledWidth) / 2,
          offsetY: 0,
        });
      }
    });
  }, [imageUri]);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        panStart.current = { ...positionRef.current };
      },
      onPanResponderMove: (_, gesture) => {
        const newX = panStart.current.x + gesture.dx;
        const newY = panStart.current.y + gesture.dy;

        const maxX = renderedSize.width - cropWidth + renderedSize.offsetX;
        const maxY = renderedSize.height - cropHeight + renderedSize.offsetY;

        const clampedX = Math.min(Math.max(newX, renderedSize.offsetX), maxX);
        const clampedY = Math.min(Math.max(newY, renderedSize.offsetY), maxY);

        setPosition({ x: clampedX, y: clampedY });
      },
      onPanResponderRelease: (_, gesture) => {
        const finalX = panStart.current.x + gesture.dx;
        const finalY = panStart.current.y + gesture.dy;

        const maxX = renderedSize.width - cropWidth + renderedSize.offsetX;
        const maxY = renderedSize.height - cropHeight + renderedSize.offsetY;

        const clampedX = Math.min(Math.max(finalX, renderedSize.offsetX), maxX);
        const clampedY = Math.min(Math.max(finalY, renderedSize.offsetY), maxY);

        setPosition({ x: clampedX, y: clampedY });
      },
    })
  ).current;

  const handleCrop = async () => {
    const scaleX = imageSize.width / renderedSize.width;
    const scaleY = imageSize.height / renderedSize.height;

    const cropData = {
      originX: (position.x - renderedSize.offsetX) * scaleX,
      originY: (position.y - renderedSize.offsetY) * scaleY,
      width: cropWidth * scaleX,
      height: cropHeight * scaleY,
    };

    try {
      const cropped = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ crop: cropData }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
      onCrop(cropped.uri);
    } catch (error) {
      console.error("Erro ao cortar imagem:", error);
    }
  };

  return (
    <AppView
      className="!bg-black justify-end z-[999]"
      style={{ ...StyleSheet.absoluteFillObject }}
    >
      <Image
        resizeMode="contain"
        source={{ uri: imageUri }}
        className="w-full h-full absolute"
      />

      <View
        {...panResponder.panHandlers}
        className="absolute border-2 rounded border-white bg-white/30"
        style={{
          top: position.y,
          left: position.x,
          width: cropWidth,
          height: cropHeight,
        }}
      />

      <View className="absolute bottom-8 left-0 p-8 pl-3 w-full flex-row gap-4 justify-between items-center">
        <Button
          onPress={onCancel}
          variant="ghost"
          className="w-2/4 border border-white"
        >
          <ButtonText className="text-white">Cancelar</ButtonText>
        </Button>

        <Button onPress={handleCrop} variant="secondary" className="w-2/4">
          <ButtonText>Cortar</ButtonText>
        </Button>
      </View>
    </AppView>
  );
}
