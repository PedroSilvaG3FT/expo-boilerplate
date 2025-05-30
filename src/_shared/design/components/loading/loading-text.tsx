import React from "react";
import AppText from "../app-text";
import AppView from "../app-view";

interface IProps {
  text?: string;
}

export default function AppLoadingText(props: IProps) {
  const { text = "Loading..." } = props;

  const generateAnimatedText = (text: string) => {
    return text.split("").map((char, index) => {
      return (
        <AppText
          key={index}
          className="relative overflow-hidden"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <AppText className="animate-pulse">{char}</AppText>
          <AppView
            className="absolute inset-0 opacity-30 animate-shimmer"
            style={{
              backgroundColor: "transparent",
              backgroundImage:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)",
              backgroundSize: "200% 100%",
            }}
          />
        </AppText>
      );
    });
  };

  return (
    <AppText className="flex flex-row">{generateAnimatedText(text)}</AppText>
  );
}
