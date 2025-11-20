import { useToast } from "@/hooks/useToast";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { Image } from "expo-image";
import * as ExpoImagePicker from "expo-image-picker";
import React from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import IconButton from "../libs/IconButton";
import Input from "../libs/Input";
import { ThemedView } from "../libs/ThemedView";
import VoicePlayer from "../libs/VoicePlayer";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  onChangeImage: (value: ExpoImagePicker.ImagePickerAsset | null) => void;
  imagePreview: ExpoImagePicker.ImagePickerAsset | null;
  onChangeAudio: (value: string | null) => void;
  audioPreview: string | null;
};

const ChatInput = ({
  value,
  onChange,
  onSendMessage,
  isLoading,
  onChangeImage,
  imagePreview,
  onChangeAudio,
  audioPreview,
}: Props) => {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const toast = useToast();

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

  const handleAudioRecord = async () => {
    try {
      if (recorderState.isRecording) {
        // Stop recording
        await audioRecorder.stop();
        const uri = audioRecorder.uri;
        if (uri) {
          onChangeAudio(uri);
        }
      } else {
        // Start recording: Request permissions and set mode first (if not done)
        const { granted } =
          await AudioModule.requestRecordingPermissionsAsync();
        if (!granted) {
          Alert.alert(
            "Permission Denied",
            "Microphone access is required for recording."
          );
          return;
        }

        await setAudioModeAsync({
          allowsRecording: true,
          playsInSilentMode: true,
        });

        // Prepare and start
        await audioRecorder.prepareToRecordAsync();
        audioRecorder.record();
      }
    } catch (err: any) {
      toast.error(err?.message || "Internal server error");
    }
  };

  return (
    <ThemedView color="card" style={styles.container}>
      {imagePreview && (
        <View style={{ position: "relative", alignItems: "center" }}>
          <Image
            source={{ uri: imagePreview.uri }}
            style={{
              width: 300,
              height: 100,
              borderRadius: 5,
            }}
          />
          <IconButton
            icon="close"
            color="error"
            onPress={() => onChangeImage(null)}
            size="sm"
            style={{ position: "absolute", top: -10, right: 10 }}
          />
        </View>
      )}
      {audioPreview && (
        <View style={{ alignItems: "center", position: "relative" }}>
          <VoicePlayer uri={new URL(audioPreview).pathname} />
          <IconButton
            icon="close"
            color="error"
            onPress={() => onChangeAudio(null)}
            size="sm"
            style={{ position: "absolute", top: -10, right: 10 }}
          />
        </View>
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
        <IconButton
          onPress={handleAudioRecord}
          icon={recorderState.isRecording ? "mic-circle-sharp" : "mic"}
          color="primarydark"
        />
        <IconButton
          onPress={onSendMessage}
          disabled={isLoading}
          icon={isLoading ? <ActivityIndicator /> : "send-sharp"}
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
