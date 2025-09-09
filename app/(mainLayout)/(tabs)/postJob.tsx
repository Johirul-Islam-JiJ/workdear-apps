import FirstForm from "@/components/job/FirstForm";
import SelectCategory from "@/components/job/SelectCategory";
import SelectCountry from "@/components/job/SelectCountry";
import { ThemedView } from "@/components/libs/ThemedView";
import Stepper from "@/components/postJob/Stepper";
import React from "react";

const PostJobScreen = () => {
  const [step, setStep] = React.useState(2);

  return (
    <ThemedView
      color="lightGray"
      style={{
        flex: 1,
        paddingHorizontal: 10,
        rowGap: 15,
      }}
    >
      <Stepper selected={step} />

      {step === 0 ? (
        <SelectCountry />
      ) : step === 1 ? (
        <SelectCategory />
      ) : step === 2 ? (
        <FirstForm step={step} setStep={setStep} />
      ) : null}
    </ThemedView>
  );
};

export default PostJobScreen;
