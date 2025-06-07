import { APP_THEME } from "@/_shared/constants/app-theme";
import { ChevronLeft } from "lucide-react-native";
import { Dimensions, Image, ImageSourcePropType, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Button } from "../ui/button";

interface IProps {
  height?: number;
  iconColor?: string;
  onBack?: () => void;
  curveHeight?: number;
  source: ImageSourcePropType;
  wave?: "primary" | "secondary";
}

const { width } = Dimensions.get("window");

export default function AppHeaderImage(props: IProps) {
  const {
    wave,
    onBack,
    source,
    curveHeight = 60,
    iconColor = APP_THEME.light.background,
    height = 0.4 * Dimensions.get("window").height,
  } = props;

  const waveImages: Record<NonNullable<IProps["wave"]>, ImageSourcePropType> = {
    primary: require("@/assets/images/header/wave-primary.png"),
    secondary: require("@/assets/images/header/wave-secondary.png"),
  };

  return (
    <View className="relative">
      {wave && (
        <Image
          resizeMode="stretch"
          source={waveImages[wave]}
          className="absolute top-0 -right-0 z-10 w-3/4 h-[140px]"
        />
      )}

      <Image source={source} resizeMode="cover" style={{ width, height }} />

      {onBack && (
        <Button
          variant="ghost"
          onPress={onBack}
          className="absolute top-14 -left-2 p-0"
        >
          <ChevronLeft size={34} color="black" />
        </Button>
      )}

      <Svg
        width={width}
        height={curveHeight}
        viewBox={`0 0 ${width} ${curveHeight}`}
        style={{ position: "absolute", bottom: 0 }}
      >
        <Path
          fill={iconColor}
          d={`
            M0,0 
            Q${width / 2},${curveHeight * 2} 
            ${width},0 
            L${width},${curveHeight} 
            L0,${curveHeight} 
            Z
          `}
        />
      </Svg>
    </View>
  );
}
