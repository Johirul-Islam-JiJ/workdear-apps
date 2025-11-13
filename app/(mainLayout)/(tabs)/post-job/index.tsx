import JobBasicDetailsForm from "@/components/job/post-job/JobBasicDetailsForm";
import JobsEstimationForm from "@/components/job/post-job/JobsEstimationForm";
import SelectCategory from "@/components/job/post-job/SelectCategory";
import SelectCountry from "@/components/job/post-job/SelectCountry";
import Stepper from "@/components/job/post-job/Stepper";
import { ThemedView } from "@/components/libs/ThemedView";
import React, { useState } from "react";

const PostJobScreen = () => {
  const [step, setStep] = useState(0);

  return (
    <ThemedView
      color="card"
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
        <JobBasicDetailsForm step={step} setStep={setStep} />
      ) : step === 3 ? (
        <JobsEstimationForm step={step} setStep={setStep} />
      ) : null}
    </ThemedView>
  );
};

export default PostJobScreen;
