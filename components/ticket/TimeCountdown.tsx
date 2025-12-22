import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

const TimeCountdown = ({ drawTime }: { drawTime: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: "0",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    if (!drawTime) return;
    const targetDate = new Date(drawTime);
    targetDate.setHours(23, 59, 59, 999);

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    updateCountdown();

    const interval = setInterval(() => {
      updateCountdown();
    }, 1000);

    return () => clearInterval(interval);
  }, [drawTime]);

  const timeData = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];
  return (
    <Card>
      <ThemedText variant="subtitle">Time remaining for draw</ThemedText>
      <View
        style={{
          flexDirection: "row",
          columnGap: "2%",
          rowGap: 8,
          flexWrap: "wrap",
        }}
      >
        {timeData.map((data, index) => (
          <ThemedView
            color="border"
            style={{ padding: 10, borderRadius: 10, width: "49%" }}
            key={index}
          >
            <ThemedText variant="h2">{data.value}</ThemedText>
            <ThemedText variant="body2">{data.label}</ThemedText>
          </ThemedView>
        ))}
      </View>
    </Card>
  );
};

export default TimeCountdown;
