import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import React, { useEffect, useState } from "react"; // Add useState
import { View, ViewStyle } from "react-native";
import Card from "./Card";
import IconButton from "./IconButton";
import LoadingIndicator from "./LoadingIndicator";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const VoicePlayer = ({ uri }: { uri: string }) => {
  const player = useAudioPlayer({ uri });
  const status = useAudioPlayerStatus(player);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  const togglePlayback = () => {
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const skipBack = async () => {
    try {
      const targetTime = Math.max(0, status.currentTime - 10);
      await player.seekTo(targetTime);
    } catch (error) {}
  };

  const skipForward = async () => {
    try {
      const targetTime = Math.min(
        status.duration || 0,
        status.currentTime + 10
      );
      await player.seekTo(targetTime);
    } catch (error) {}
  };

  useEffect(() => {
    if (status.isLoaded) {
      setHasLoadedOnce(true);
    }
  }, [status.isLoaded]);

  useEffect(() => {
    if (status.didJustFinish) {
      player
        .seekTo(0)
        .then(() => {
          player.pause();
        })
        .catch((error) => {});
    }
  }, [status.didJustFinish, player]);

  if (!status.isLoaded && !hasLoadedOnce) {
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
        <IconButton
          onPress={skipBack}
          icon="play-back"
          color="black"
          darkColor="white"
          size="sm"
        />

        <IconButton
          icon={status.playing ? "pause-sharp" : "play"}
          color={status.playing ? "success" : "black"}
          darkColor={status.playing ? "success" : "white"}
          size="sm"
          onPress={togglePlayback}
        />
        <IconButton
          onPress={skipForward}
          icon="play-forward"
          color="black"
          darkColor="white"
          size="sm"
        />
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
