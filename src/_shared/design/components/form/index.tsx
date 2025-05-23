import { TextProps } from "@rn-primitives/label";
import React from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { ViewProps } from "react-native";
import { cn } from "../../lib/utils";
import AppText from "../app-text";
import AppView from "../app-view";

const FormContainer = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const FormItemContext = React.createContext<{ id: string }>(
  {} as { id: string }
);

const FormItem = ({ className, ...props }: ViewProps) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <AppView className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    ...fieldState,
  };
};

interface FormLabelProps extends TextProps {
  children: React.ReactNode;
  className?: string;
}

const FormLabel = ({ children, className, ...props }: FormLabelProps) => {
  const { error } = useFormField();

  return (
    <AppText
      className={cn("text-sm font-medium", error && "text-red-400", className)}
      {...props}
    >
      {children}
    </AppText>
  );
};

const FormControl = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const FormDescription = ({
  children,
  className,
  ...props
}: { children: React.ReactNode; className?: string } & TextProps) => {
  return (
    <AppText className={cn("text-xs text-gray-500", className)} {...props}>
      {children}
    </AppText>
  );
};

const FormMessage = ({
  children,
  className,
  ...props
}: { children?: React.ReactNode; className?: string } & TextProps) => {
  const { error } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) return null;

  return (
    <AppText
      className={cn("text-xs text-red-400 font-medium", className)}
      {...props}
    >
      {body}
    </AppText>
  );
};

export {
  FormContainer,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
