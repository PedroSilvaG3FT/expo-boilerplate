import React from "react";
import { Control, Controller } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { Checkbox } from "../../ui/checkbox";
import AppText from "../app-text";

interface IAppFormCheckboxProps {
  name: string;
  label: string;
  control: Control<any>;
  className?: string;
}

export default function AppFormCheckbox(props: IAppFormCheckboxProps) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState: { error } }) => (
        <View>
          <TouchableOpacity
            onPress={() => field.onChange(!field.value)}
            activeOpacity={0.7}
            className="flex-row items-center space-x-3"
          >
            <Checkbox
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked)}
              className={props.className}
            />
            <AppText className="text-foreground native:ml-2">
              {props.label}
            </AppText>
          </TouchableOpacity>

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
