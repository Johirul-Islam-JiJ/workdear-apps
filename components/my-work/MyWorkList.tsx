import { MyWorkStatus } from "@/types/myWork";
import React from "react";
import { View, ViewStyle } from "react-native";
import { ThemedText } from "../libs/ThemedText";

const MyWorkList = ({ Status = "" }: { Status?: MyWorkStatus | "" }) => {
  const containerStyle: ViewStyle = {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  };
  return (
    <View>
      <ThemedText variant="subtitle" color="primarydark" darkColor="white">
        Your submissions
      </ThemedText>
    </View>
  );
};

export default MyWorkList;
