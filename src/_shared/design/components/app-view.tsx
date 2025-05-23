import { useThemeColor } from "@/hooks/useThemeColor";
import { View, type ViewProps } from "react-native";

export type IProps = ViewProps & {
  darkColor?: string;
  lightColor?: string;
};

export default function AppView({
  style,
  darkColor,
  lightColor,
  ...otherProps
}: IProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
