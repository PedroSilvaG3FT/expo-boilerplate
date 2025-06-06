import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  View,
} from "react-native";
import { cn } from "../lib/utils";
import AppText from "./app-text";
import AppView from "./app-view";

const ITEM_WIDTH = 14;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CENTER_OFFSET = SCREEN_WIDTH / 2 - ITEM_WIDTH / 2;

interface IProps {
  min?: number;
  max?: number;
  step?: number;
  decimals?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
}
export default function Ruler(props: IProps) {
  const {
    min = 0,
    max = 60,
    step = 0.1,
    decimals = 1,
    initialValue = 0,
    onChange,
  } = props;

  const scrollRef = useRef<ScrollView>(null);
  const [ticksControl, setTicksControl] = useState(0);
  const [value, setValue] = useState<number>(initialValue ?? min);
  const previousValueRef = useRef<number>(value);

  useEffect(() => {
    const offset = (((initialValue ?? min) - min) / step) * ITEM_WIDTH;
    scrollRef.current?.scrollTo({ x: offset, animated: false });
  }, [initialValue]);

  useEffect(() => {
    setTicksControl((max - min) / step);
  }, [min, max, step]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const newValue = min + Math.round(x / ITEM_WIDTH) * step;
    const isOverlay = newValue > max;

    const result = isOverlay
      ? parseFloat(max.toFixed(decimals))
      : parseFloat(newValue.toFixed(decimals));

    if (result !== previousValueRef.current) {
      Haptics.selectionAsync();
      previousValueRef.current = result;
    }

    setValue(result);
    onChange?.(result);
  };

  const renderTicks = () => {
    let ticks = [];

    for (let i = 0; i <= ticksControl; i++) {
      const val = min + i * step;
      const isMajor = i % 10 === 0;

      ticks.push(
        <AppView key={i} style={{ width: ITEM_WIDTH }} className="items-center">
          <View
            className={cn(
              "bg-gray-400 rounded-sm w-1",
              isMajor ? "h-12" : "h-8 opacity-70 relative top-2"
            )}
          />
          {isMajor && (
            <AppText className="!text-[10px] whitespace-nowrap">{val}</AppText>
          )}
        </AppView>
      );
    }

    return ticks;
  };

  return (
    <View className="items-center overflow-hidden max-h-[146px]">
      <Text className="text-[60px] font-bold mb-4 text-foreground">
        {value.toFixed(1).replace(".", ",")}
      </Text>

      <View className="relative">
        <View
          style={{ left: SCREEN_WIDTH / 2 - 20 }}
          className="absolute top-2 bottom-0 w-[40px] h-8 bg-app-light-green opacity-60 rounded-sm z-10 px-2 flex-row justify-around items-center"
        />

        <ScrollView
          horizontal
          ref={scrollRef}
          onScroll={onScroll}
          decelerationRate="fast"
          scrollEventThrottle={16}
          snapToInterval={ITEM_WIDTH}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: CENTER_OFFSET,
            paddingRight: CENTER_OFFSET - ITEM_WIDTH * 3,
          }}
        >
          {renderTicks()}
        </ScrollView>
      </View>
    </View>
  );
}
