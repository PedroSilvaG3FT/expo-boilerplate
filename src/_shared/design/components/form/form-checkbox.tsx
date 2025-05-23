import React from "react";
import { Control, Controller } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { Checkbox } from "../../ui/checkbox";

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
            <Text className="text-foreground">{props.label}</Text>
          </TouchableOpacity>

          {error && (
            <Text className="mt-2 text-sm text-red-400">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}
