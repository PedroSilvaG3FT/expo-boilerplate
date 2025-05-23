import React from "react";
import { Control, Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { Textarea } from "../../ui/textarea";

interface IAppFormTextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  control: Control<any>;
  className?: string;
  numberOfLines?: number;
  required?: boolean;
}

export default function AppFormTextarea(props: IAppFormTextareaProps) {
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

          <Textarea
            value={field.value}
            onChangeText={field.onChange}
            placeholder={props.placeholder}
            className={props.className}
            numberOfLines={props.numberOfLines || 4}
            multiline={true}
            textAlignVertical="top"
          />

          {error && (
            <Text className="mt-2 text-sm text-red-400">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}
