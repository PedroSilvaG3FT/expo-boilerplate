import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { cn } from "../../lib/utils";

interface IProps {
  color?: string;
  className?: string;
}

export default function AppLoadingIndicator(props: IProps) {
  const { color = "#FAD13C", className = "" } = props;

  const bounceValue1 = useRef(new Animated.Value(0)).current;
  const bounceValue2 = useRef(new Animated.Value(0)).current;
  const bounceValue3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createBounceAnimation = (
      bounceValue: Animated.Value,
      delay: number
    ) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(bounceValue, {
            delay,
            toValue: -10,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(bounceValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animation1 = createBounceAnimation(bounceValue1, 0);
    const animation2 = createBounceAnimation(bounceValue2, 150);
    const animation3 = createBounceAnimation(bounceValue3, 300);

    animation1.start();
    animation2.start();
    animation3.start();

    return () => {
      animation1.stop();
      animation2.stop();
      animation3.stop();
    };
  }, [bounceValue1, bounceValue2, bounceValue3]);

  const ballStyle = {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: color,
  };

  return (
    <View
      className={cn(
        `flex flex-row justify-center items-center w-10 h-10`,
        className
      )}
    >
      <Animated.View
        style={[ballStyle, { transform: [{ translateY: bounceValue1 }] }]}
      />
      <Animated.View
        style={[ballStyle, { transform: [{ translateY: bounceValue2 }] }]}
      />
      <Animated.View
        style={[ballStyle, { transform: [{ translateY: bounceValue3 }] }]}
      />
    </View>
  );
}
