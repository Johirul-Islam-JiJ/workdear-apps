import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { View } from "react-native";
import Badge from "../libs/Badge";
import Card from "../libs/Card";
import DonutChat from "../libs/DonutChat";
import { ThemedText } from "../libs/ThemedText";

type Props = {
  data: {
    title: string;
    satisfied: number;
    unsatisfied: number;
    pending: number;
  };
};

type Status = {
  title: string;
  color: ColorScheme;
};

const StatusCard = ({ data }: Props) => {
  const success = useThemeColor("success");
  const error = useThemeColor("error");
  const warning = useThemeColor("warning");
  const status: Status[] = [
    {
      title: "Satisfied",
      color: "success",
    },
    {
      title: "Unsatisfied",
      color: "error",
    },
    {
      title: "Pending",
      color: "warning",
    },
  ];

  const description = `Satisfied: ${data.satisfied}%\nUnsatisfied: ${data.unsatisfied}%\nPending: ${data.pending}%`;

  return (
    <Card>
      <ThemedText
        variant="subtitle"
        style={{ textAlign: "center" }}
        color="primarymain"
      >
        {data.title}
      </ThemedText>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          justifyContent: "center",
        }}
      >
        {status.map((item, index) => (
          <View
            key={index}
            style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
          >
            <Badge size="large" color={item.color} variant="dot" />
            <ThemedText>{item.title}</ThemedText>
          </View>
        ))}
      </View>
      <DonutChat
        segments={[
          { value: data.satisfied, color: success },
          { value: data.unsatisfied, color: error },
          { value: data.pending, color: warning },
        ]}
        description={description}
      />
    </Card>
  );
};

export default StatusCard;
