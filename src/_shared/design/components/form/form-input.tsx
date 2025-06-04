import { cn } from "@/_shared/design/lib/utils";
import { Control, Controller } from "react-hook-form";
import { View } from "react-native";
import { Input } from "../../ui/input";
import AppText from "../app-text";

interface AppFormInputProps extends React.ComponentProps<typeof Input> {
  name: string;
  label?: string;
  mask?: string;
  control: Control<any>;
  containerClassName?: string;
}

export default function AppFormInput(props: AppFormInputProps) {
  const { containerClassName, control, name, label, required, ...inputProps } =
    props;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View className={cn(containerClassName, "w-full")}>
          {label && (
            <AppText className="mb-1 text-foreground text-sm font-medium">
              {required && <AppText className="text-red-400">*</AppText>}
              {label}
            </AppText>
          )}

          <Input
            {...inputProps}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            className={cn(error ? "border-red-400" : "", inputProps.className)}
          />

          {error && (
            <AppText className="mt-1 text-red-400 text-xs">
              {error.message?.toString()}
            </AppText>
          )}
        </View>
      )}
    />
  );
}
