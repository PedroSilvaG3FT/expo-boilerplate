import { useEffect, useRef } from "react";
import { Animated, ImageSourcePropType } from "react-native";

interface IProps {
  className?: string;
  type: "primary" | "secondary";
}

export default function AppFooterWave(props: IProps) {
  const { type } = props;

  const waveImages: Record<NonNullable<IProps["type"]>, ImageSourcePropType> = {
    primary: require("@/assets/images/footer/wave-primary.png"),
    secondary: require("@/assets/images/footer/wave-secondary.png"),
  };

  const translateY = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 750,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.Image
      resizeMode="stretch"
      source={waveImages[type]}
      style={{
        left: 0,
        bottom: 0,
        zIndex: 10,
        height: 100,
        width: "100%",
        position: "absolute",
        transform: [{ translateY }],
      }}
    />
  );
}
