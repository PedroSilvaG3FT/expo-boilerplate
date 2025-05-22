import { useThemeColor } from "@/hooks/useThemeColor";
import { View, type ViewProps } from "react-native";

export type IProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export default function AppView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: IProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
