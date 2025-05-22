import { cn } from "@/_shared/design/lib/utils";
import * as React from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
// import { Eye, EyeOff } from "lucide-react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TextInputMask, TextInputMaskTypeProp } from "react-native-masked-text";
import AppText from "../components/app-text";

interface InputProps extends TextInputProps {
  mask?: string;
  required?: string;
  className?: string;
  inputClassName?: string;
  rightSlot?: React.ReactNode;
  maskType?: TextInputMaskTypeProp;
}

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      className,
      inputClassName,
      mask,
      maskType = "custom",
      rightSlot,
      secureTextEntry,
      ...props
    },
    ref
  ) => {
    const [isShowPass, setIsShowPass] = React.useState(false);

    const textColor = useThemeColor({}, "text");
    const placeholderColor = useThemeColor({}, "text");
    const backgroundColor = useThemeColor({}, "background");

    const handleChange = (text: string) => {
      props.onChangeText?.(text);
    };

    const renderToggleIcon = () => (
      <TouchableOpacity
        onPress={() => setIsShowPass(!isShowPass)}
        className="absolute right-3 top-3"
      >
        {isShowPass ? <AppText>S</AppText> : <AppText>N</AppText>}
      </TouchableOpacity>
    );

    const inputBaseClasses = cn(
      "h-12 native:h-16 border border-input native:dark:border-input/20 dark:border-input/80 rounded-2xl px-3 text-base bg-background text-foreground",
      inputClassName
    );

    return (
      <View className={cn("relative w-full", className)}>
        {mask ? (
          <TextInputMask
            type={maskType}
            onChangeText={handleChange}
            className={inputBaseClasses}
            ref={ref as React.Ref<TextInputMask>}
            style={{ backgroundColor, color: textColor }}
            options={maskType === "custom" ? { mask } : {}}
            placeholderTextColor={placeholderColor}
            {...props}
          />
        ) : (
          <TextInput
            ref={ref}
            onChangeText={handleChange}
            className={inputBaseClasses}
            placeholderTextColor={placeholderColor}
            style={{ backgroundColor, color: textColor }}
            secureTextEntry={secureTextEntry && !isShowPass}
            {...props}
          />
        )}

        {secureTextEntry && renderToggleIcon()}
        {rightSlot && (
          <View className="absolute right-3 top-0 h-full justify-center">
            {rightSlot}
          </View>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";

export { Input };
