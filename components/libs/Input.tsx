import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface InputProps extends TextInputProps {
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  error,
  startIcon = null,
  endIcon = null,
  ...props
}) => {
  const borderColor = useThemeColor(error ? "error" : "borderColor");
  const placeholderColor = useThemeColor(error ? "error" : "placeHolder");

  return (
    <View>
      <View style={{ position: "relative" }}>
        {startIcon && (
          <View style={{ position: "absolute", left: 10, top: 10 }}>
            {startIcon}
          </View>
        )}
        <TextInput
          {...props}
          placeholderTextColor={placeholderColor}
          style={{
            height: 40,
            borderColor: borderColor,
            borderWidth: 1,
            borderRadius: 7,
            fontFamily: "RobotoSerifRegular",
            paddingLeft: startIcon ? 40 : 10,
            paddingRight: endIcon ? 40 : 10,
          }}
        />
        {endIcon && (
          <View style={{ position: "absolute", right: 10, top: 10 }}>
            {endIcon}
          </View>
        )}
      </View>
      {error && (
        <ThemedText style={{ marginTop: 2 }} type="small" color="error">
          {error}
        </ThemedText>
      )}
    </View>
  );
};

export default Input;
