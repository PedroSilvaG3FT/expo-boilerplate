import { IFormOption } from "@/_shared/interface/_form-option.interface";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { cn } from "src/_shared/design/lib/utils";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";

interface IAppFormRadioGroupProps {
  name: string;
  label?: string;
  control: Control<any>;
  options: IFormOption[];
  containerClassName?: string;
  required?: boolean;
}

export default function AppFormRadioGroup(props: IAppFormRadioGroupProps) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState: { error } }) => (
        <View>
          {props.label && (
            <Text className="mb-2 font-medium text-foreground">
              {props.required && <Text className="text-red-400 mr-0.5">*</Text>}
              {props.label}
            </Text>
          )}

          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className={cn("flex flex-col space-y-2", props.containerClassName)}
          >
            {props.options.map((item, index) => (
              <View key={index} className="flex-row items-center space-x-3">
                <RadioGroupItem value={item.value} />
                <TouchableOpacity
                  onPress={() => field.onChange(item.value)}
                  activeOpacity={0.7}
                >
                  <Text className="text-foreground">{item.label}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </RadioGroup>

          {error && (
            <Text className="mt-2 text-sm text-red-400">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}
