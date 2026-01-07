import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useRef, useState } from "react";
import { TextInput, TextInputKeyPressEvent, View } from "react-native";

type OtpInputProps = {
  length?: number;
  onChange?: (otp: string) => void;
  error?: boolean;
};

const OtpInput = ({ length = 6, onChange, error = false }: OtpInputProps) => {
  const [otp, setOtp] = useState<string[]>(Array.from({ length }, () => ""));
  const borderColor = useThemeColor("border");
  const placeholderColor = useThemeColor("placeholder");
  const errorColor = useThemeColor("error");
  const textColor = useThemeColor("text");

  const inputsRef = useRef<Array<TextInput | null>>([]);

  const focusInput = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      focusInput(index + 1);
    }

    onChange?.(newOtp.join(""));
  };

  const handleKeyPress = (e: TextInputKeyPressEvent, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      focusInput(index - 1);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
        justifyContent: "center",
      }}
    >
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          value={digit}
          onChangeText={(value) => handleChange(value, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          textAlign="center"
          placeholderTextColor={placeholderColor}
          placeholder="-"
          style={{
            width: 48,
            height: 48,
            borderWidth: 1,
            borderColor: error && !digit ? errorColor : borderColor,
            borderRadius: 8,
            fontSize: 20,
            fontWeight: "600",
            color: textColor,
          }}
        />
      ))}
    </View>
  );
};

export default OtpInput;
