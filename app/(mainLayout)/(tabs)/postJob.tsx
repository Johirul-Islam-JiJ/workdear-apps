import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import Stepper from "@/components/postJob/Stepper";
import React from "react";

const PostJobScreen = () => {
  return (
    <ThemedView
      color="lightGray"
      style={{
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 15,
        rowGap: 15,
      }}
    >
      <Stepper />
      <ThemedText type="defaultSemiBold" color="primaryDarker">
        Select country you want to hide from the selected zone (optional)
      </ThemedText>
    </ThemedView>
  );
};

export default PostJobScreen;
