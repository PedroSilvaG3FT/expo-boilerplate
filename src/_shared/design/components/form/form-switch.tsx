import React from "react";
import { Control, Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { Switch } from "../../ui/switch";

interface IAppFormSwitchProps {
  name: string;
  label: string;
  control: Control<any>;
  className?: string;
}

export default function AppFormSwitch(props: IAppFormSwitchProps) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState: { error } }) => (
        <View>
          <View className="flex-row items-center space-x-3">
            <Switch
              checked={field.value}
              className={props.className}
              onCheckedChange={field.onChange}
            />
            <Text className="text-foreground">{props.label}</Text>
          </View>

          {error && (
            <Text className="mt-2 text-sm text-red-400">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}
