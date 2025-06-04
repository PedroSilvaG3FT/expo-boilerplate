import { IFormOption } from "@/_shared/interface/_form-option.interface";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect, useRef, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { LayoutChangeEvent, Platform } from "react-native";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import AppText from "../app-text";
import AppView from "../app-view";

interface IAppFormSelectProps {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  control?: Control<any>;
  options: IFormOption[];
  required?: boolean;
}

export default function AppFormSelect(props: IAppFormSelectProps) {
  const triggerRef = useRef<any>(null);
  const textColor = useThemeColor({}, "text");
  const [triggerWidth, setTriggerWidth] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState("");

  const onTriggerLayout = (event: LayoutChangeEvent) => {
    setTriggerWidth(event.nativeEvent.layout.width);
  };

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState: { error } }) => {
        useEffect(() => {
          const selectedOption = props.options.find(
            (option) => option.value === field.value
          );
          setSelectedLabel(selectedOption ? selectedOption.label : "");
        }, [field.value, props.options]);

        return (
          <AppView className="relative">
            {props.label && (
              <AppText className="mb-2 font-medium text-foreground">
                {props.required && (
                  <AppText className="text-red-400 mr-0.5">*</AppText>
                )}
                {props.label}
              </AppText>
            )}

            <Select
              value={field.value.value}
              onValueChange={(data) => field.onChange(data?.value)}
            >
              <SelectTrigger
                ref={triggerRef}
                onLayout={onTriggerLayout}
                className={props.className}
              >
                <SelectValue
                  style={{ color: textColor }}
                  placeholder={props.placeholder || ""}
                >
                  {selectedLabel || props.placeholder}
                </SelectValue>
              </SelectTrigger>

              <SelectContent
                style={{ width: Platform.OS === "web" ? "100%" : triggerWidth }}
              >
                {props.options.map((item, index) => (
                  <SelectItem label={item.label} key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {error && (
              <AppText className="mt-2 text-sm text-red-400">
                {error.message}
              </AppText>
            )}
          </AppView>
        );
      }}
    />
  );
}
