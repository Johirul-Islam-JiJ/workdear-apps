import { Image } from "expo-image";
import * as ExpoImagePicker from "expo-image-picker";
import React from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../libs/IconButton";
import Input from "../libs/Input";
import { ThemedView } from "../libs/ThemedView";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  onChangeImage: (value: ExpoImagePicker.ImagePickerAsset) => void;
  imagePreview: ExpoImagePicker.ImagePickerAsset | null;
};

const ChatInput = ({
  value,
  onChange,
  onSendMessage,
  isLoading,
  onChangeImage,
  imagePreview,
}: Props) => {
  const handleImagePick = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onChangeImage(result.assets[0]);
    }
  };
  return (
    <ThemedView color="card" style={styles.container}>
      {imagePreview && (
        <Image
          source={{ uri: imagePreview.uri }}
          style={{ width: "auto", height: 100, borderRadius: 5 }}
        />
      )}
      <View style={styles.wrapper}>
        <Input
          placeholder="Enter your message"
          value={value}
          onChangeText={onChange}
        />
        <IconButton
          onPress={handleImagePick}
          icon="image"
          color="primarydark"
        />
        <IconButton icon="mic" color="primarydark" />
        <IconButton
          onPress={onSendMessage}
          disabled={isLoading}
          icon="send-sharp"
          color="primarydark"
        />
      </View>
    </ThemedView>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    rowGap: 5,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
