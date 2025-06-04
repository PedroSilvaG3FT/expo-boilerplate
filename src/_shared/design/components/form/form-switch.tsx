import React from "react";
import { Control, Controller } from "react-hook-form";
import { View } from "react-native";
import { Switch } from "../../ui/switch";
import AppText from "../app-text";

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
            <AppText className="text-foreground native:ml-2">
              {props.label}
            </AppText>
          </View>

          {error && (
            <AppText className="mt-2 text-sm text-red-400">
              {error.message}
            </AppText>
          )}
        </View>
      )}
    />
  );
}
