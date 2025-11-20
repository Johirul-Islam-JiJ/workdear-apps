import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import React, { useEffect } from "react";
import { View, ViewStyle } from "react-native";
import Card from "./Card";
import IconButton from "./IconButton";
import LoadingIndicator from "./LoadingIndicator";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const VoicePlayer = ({ uri }: { uri: string }) => {
  const player = useAudioPlayer({ uri });
  const status = useAudioPlayerStatus(player);

  const togglePlayback = () => {
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  useEffect(() => {
    if (status.didJustFinish) {
      player.seekTo(0);
      player.pause();
    }
  }, [status.didJustFinish, player]);

  if (!status.isLoaded) {
    return <LoadingIndicator size="small" />;
  }

  const buttonWrapper: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
  };

  return (
    <Card style={{ rowGap: 5, width: 200 }}>
      <View style={buttonWrapper}>
        <IconButton icon="play-back" color="black" size="sm" />

        <IconButton
          icon={status.playing ? "pause-sharp" : "play"}
          color={status.playing ? "success" : "black"}
          size="sm"
          onPress={togglePlayback}
        />
        <IconButton icon="play-forward" color="black" size="sm" />
      </View>

      <View>
        <ThemedText style={{ textAlign: "right" }} variant="small">
          {status.currentTime.toFixed(0)}s / {status.duration?.toFixed(0)}s
        </ThemedText>
        <ThemedView color="gray.500" style={{ borderRadius: 5 }}>
          <ThemedView
            color="success"
            style={{
              height: 5,
              width: `${(status.currentTime / (status.duration || 1)) * 100}%`,
              borderRadius: 5,
            }}
          />
        </ThemedView>
      </View>
    </Card>
  );
};

export default VoicePlayer;
