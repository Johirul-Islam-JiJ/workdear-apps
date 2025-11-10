import FinalForm from "@/components/job/FinalForm";
import FirstForm from "@/components/job/FirstForm";
import SelectCategory from "@/components/job/SelectCategory";
import SelectCountry from "@/components/job/SelectCountry";
import { ThemedView } from "@/components/libs/ThemedView";
import Stepper from "@/components/postJob/Stepper";
import React, { useState } from "react";

const PostJobScreen = () => {
  const [step, setStep] = useState(0);

  return (
    <ThemedView
      color="background"
      style={{
        flex: 1,
        paddingHorizontal: 10,
        rowGap: 15,
      }}
    >
      <Stepper selected={step} />

      {step === 0 ? (
        <SelectCountry step={step} setStep={setStep} />
      ) : step === 1 ? (
        <SelectCategory step={step} setStep={setStep} />
      ) : step === 2 ? (
        <FirstForm step={step} setStep={setStep} />
      ) : step === 3 ? (
        <FinalForm step={step} setStep={setStep} />
      ) : null}
    </ThemedView>
  );
};

export default PostJobScreen;
