import { cn } from "@/_shared/design/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Pressable, Text, TextProps } from "react-native";
import { TextClassContext } from "./text";

const buttonVariants = cva(
  "text-white group flex items-center justify-center rounded web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary web:hover:opacity-90 active:opacity-90",
        destructive:
          "bg-destructive text-destructive-foreground web:hover:opacity-90 active:opacity-90",
        outline:
          "border border-input text-accent-foreground group-active:text-accent-foreground bg-background web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
        secondary:
          "bg-secondary text-accent-foreground group-active:text-accent-foreground web:hover:opacity-80 active:opacity-80",
        ghost:
          "text-accent-foreground group-active:text-accent-foreground web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
        link: "text-primary web:underline-offset-4 web:hover:underline web:focus:underline",
      },
      size: {
        default: "h-14 px-4 py-2 native:px-5 native:py-3",
        sm: "h-9 rounded px-3",
        lg: "h-14 rounded px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonTextVariants = cva(
  "web:whitespace-nowrap text-sm native:text-base font-medium web:transition-colors",
  {
    variants: {
      variant: {
        default: "text-white",
        destructive: "text-destructive-foreground",
        outline: "group-active:text-accent-foreground",
        secondary: "text-foreground group-active:text-white",
        ghost: "group-active:text-accent-foreground",
        link: "text-primary group-active:underline",
      },
      size: {
        default: "",
        sm: "",
        lg: "native:text-lg",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ className, variant, size, children, ...props }, ref) => {
  const textStyles = buttonTextVariants({
    size,
    variant,
    className: "web:pointer-events-none",
  });

  return (
    <TextClassContext.Provider value={textStyles}>
      <Pressable
        className={cn(
          props.disabled && "opacity-50 web:pointer-events-none",
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        role="button"
        {...props}
      >
        {children}
      </Pressable>
    </TextClassContext.Provider>
  );
});

Button.displayName = "Button";

const ButtonText = React.forwardRef<React.ElementRef<typeof Text>, TextProps>(
  ({ className, ...props }, ref) => {
    const contextClass = React.useContext(TextClassContext);
    return (
      <Text className={cn(contextClass, className)} ref={ref} {...props} />
    );
  }
);
ButtonText.displayName = "ButtonText";

export { Button, ButtonText, buttonTextVariants, buttonVariants };
export type { ButtonProps };
