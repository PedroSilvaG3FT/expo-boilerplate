import { useEffect, useRef } from "react";
import {
  Platform,
  ScrollView,
  StyleProp,
  UIManager,
  View,
  ViewStyle,
  findNodeHandle,
} from "react-native";
import { cn } from "../../lib/utils";
import { Button, ButtonText } from "../../ui/button";
import { monthNames } from "./@constants/app-calendar";

interface AppCalendarControlsProps {
  currentYear: number;
  currentMonth: number;
  onChangeYear: (year: number) => void;
  onChangeMonth: (month: number) => void;
}

const PAST_YEARS = 90;
const FUTURE_YEARS = 5;
const currentYearValue = new Date().getFullYear();
const YEARS = Array.from(
  { length: PAST_YEARS + FUTURE_YEARS + 1 },
  (_, i) => currentYearValue - PAST_YEARS + i
);

const scrollViewStyle: StyleProp<ViewStyle> = {
  gap: 18,
  padding: 8,
  paddingHorizontal: 18,
};

const getHTMLElement = (ref: any): HTMLElement | null => {
  return ref?.current instanceof HTMLElement ? ref.current : null;
};

export default function AppCalendarControls({
  currentMonth,
  currentYear,
  onChangeMonth,
  onChangeYear,
}: AppCalendarControlsProps) {
  const yearScrollRef = useRef<any>(null);
  const monthScrollRef = useRef<any>(null);
  const yearButtonRefs = useRef<Record<number, any>>({});
  const monthButtonRefs = useRef<Record<number, any>>({});

  const scrollToButton = (scrollRef: any, buttonRef: any) => {
    if (!scrollRef || !buttonRef) return;

    if (Platform.OS === "web") {
      const scrollEl = getHTMLElement(scrollRef);
      const buttonEl = getHTMLElement(buttonRef);
      if (scrollEl && buttonEl) {
        scrollEl.scrollTo({
          left: buttonEl.offsetLeft - 32,
          behavior: "smooth",
        });
      }
    } else {
      const scrollNode = findNodeHandle(scrollRef);
      const buttonNode = findNodeHandle(buttonRef);
      if (scrollNode && buttonNode) {
        UIManager.measureLayout(
          buttonNode,
          scrollNode,
          () => {},
          (x) => {
            scrollRef.scrollTo({ x: x - 32, animated: true });
          }
        );
      }
    }
  };

  useEffect(() => {
    scrollToButton(yearScrollRef.current, yearButtonRefs.current[currentYear]);
  }, [currentYear]);

  useEffect(() => {
    scrollToButton(
      monthScrollRef.current,
      monthButtonRefs.current[currentMonth]
    );
  }, [currentMonth]);

  return (
    <>
      <ScrollView
        horizontal
        className="mb-6"
        contentContainerStyle={scrollViewStyle}
        ref={yearScrollRef}
      >
        {YEARS.map((year) => (
          <View
            key={year}
            ref={(ref) => {
              yearButtonRefs.current[year] = ref;
            }}
          >
            <Button
              size="sm"
              variant="ghost"
              onPress={() => onChangeYear(year)}
              className={cn(
                "transition-all duration-500 scale-100",
                year === currentYear && "bg-blue-200 scale-[1.4]"
              )}
            >
              <ButtonText
                className={cn(
                  year === currentYear ? "text-blue-500" : "opacity-50"
                )}
              >
                {year}
              </ButtonText>
            </Button>
          </View>
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        ref={monthScrollRef}
        contentContainerStyle={scrollViewStyle}
      >
        {monthNames.map((month, index) => (
          <View
            key={month}
            ref={(ref) => {
              monthButtonRefs.current[index] = ref;
            }}
          >
            <Button
              size="sm"
              variant="ghost"
              onPress={() => onChangeMonth(index)}
              className={cn(
                "transition-all duration-500 scale-100",
                index === currentMonth && "bg-blue-200 scale-[1.4]"
              )}
            >
              <ButtonText
                className={cn(
                  index === currentMonth ? "text-blue-500" : "opacity-50"
                )}
              >
                {month}
              </ButtonText>
            </Button>
          </View>
        ))}
      </ScrollView>
    </>
  );
}
