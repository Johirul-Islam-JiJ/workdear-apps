import SelectCategory from "@/components/job/SelectCategory";
import SelectCountry from "@/components/job/SelectCountry";
import Button from "@/components/libs/Button";
import { ThemedView } from "@/components/libs/ThemedView";
import Stepper from "@/components/postJob/Stepper";
import React from "react";
import { View } from "react-native";

const PostJobScreen = () => {
  const [step, setStep] = React.useState(1);

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
      <Stepper selected={step} />

      {step === 0 ? <SelectCountry /> : step === 1 ? <SelectCategory /> : null}

      <View
        style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 8 }}
      >
        <Button
          disabled={step === 0}
          onPress={() => setStep(step - 1)}
          title="Previews"
          variant="Outlined"
          style={{ flex: 1 }}
        />
        <Button
          title="Next"
          style={{ flex: 1 }}
          disabled={step === 3}
          onPress={() => setStep(step + 1)}
        />
      </View>
    </ThemedView>
  );
};

export default PostJobScreen;
