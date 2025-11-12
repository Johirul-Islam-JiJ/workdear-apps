import { useThemeColor } from "@/hooks/useThemeColor";
import * as ExpoImagePicker from "expo-image-picker";
import React from "react";
import { View, ViewStyle } from "react-native";
import Button from "./Button";
import { ThemedText } from "./ThemedText";

interface ImagePickerProps {
  value?: ExpoImagePicker.ImagePickerAsset;
  onChange: (value: ExpoImagePicker.ImagePickerAsset) => void;
  error?: string;
}

const ImagePicker = ({ value, onChange, error }: ImagePickerProps) => {
  const borderColor = useThemeColor(error ? "error" : "border");

  const pickImage = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onChange(result.assets[0]);
    }
  };

  const containerStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
  };
  return (
    <View>
      <View style={containerStyle}>
        <Button
          onPress={pickImage}
          title="Choose Image"
          size="small"
          color={error ? "error" : undefined}
          style={{ borderRadius: 50 }}
        />
        <ThemedText
          variant="small"
          color={error ? "error" : "text"}
          numberOfLines={1}
          lineBreakMode="tail"
          style={{ width: "60%" }}
        >
          {value && value.fileName ? value.fileName : "No file chosen"}
        </ThemedText>
      </View>
      {error && (
        <ThemedText variant="small" color="error">
          {error}
        </ThemedText>
      )}
    </View>
  );
};

export default ImagePicker;
