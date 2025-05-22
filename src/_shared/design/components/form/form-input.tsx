import { cn } from "@/_shared/design/lib/utils";
import { Control, Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { Input } from "../../ui/input";

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
            <Text className="mb-1 text-foreground text-sm font-medium">
              {required && <Text className="text-red-500">*</Text>}
              {label}
            </Text>
          )}

          <Input
            {...inputProps}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            className={cn(error ? "border-red-500" : "", inputProps.className)}
          />

          {error && (
            <Text className="mt-1 text-red-500 text-xs">
              {error.message?.toString()}
            </Text>
          )}
        </View>
      )}
    />
  );
}
