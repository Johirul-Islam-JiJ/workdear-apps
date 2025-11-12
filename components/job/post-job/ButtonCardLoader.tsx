import Skeleton from "@/components/libs/Skeleton";
import React from "react";
import { View } from "react-native";

const ButtonCardLoader = () => {
  return (
    <View style={{ flex: 1, gap: 8 }}>
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} height={40} />
      ))}
    </View>
  );
};

export default ButtonCardLoader;
