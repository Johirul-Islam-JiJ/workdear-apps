import JobBasicDetailsForm from "@/components/job/post-job/JobBasicDetailsForm";
import JobsEstimationForm from "@/components/job/post-job/JobsEstimationForm";
import SelectCategory from "@/components/job/post-job/SelectCategory";
import SelectCountry from "@/components/job/post-job/SelectCountry";
import Stepper from "@/components/job/post-job/Stepper";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { ThemedView } from "@/components/libs/ThemedView";
import { useAppDispatch } from "@/hooks/redux";
import { useJobbyidQuery } from "@/store/features/jobs";
import {
  setJobPostFinalForm,
  setJobPostFirstForm,
} from "@/store/slices/jobform";
import { Job } from "@/types/Job";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";

const EditJob = () => {
  const [step, setStep] = useState(0);
  const { slug } = useLocalSearchParams();
  const { data, isLoading } = useJobbyidQuery(slug);
  const job: Job = data?.data ?? {};

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (job) {
      const firstForm = {
        title: job.title,
        description: job.description,
        steps: job.steps,
        required_proofs:
          job.required_proofs ||
          JSON.stringify([{ type: "", description: "" }]),
        question_condition:
          job.question_condition ||
          JSON.stringify([
            {
              id: 1,
              answer_type: "",
              text: "",
              condition: {
                operator: "",
                value: "",
              },
            },
          ]),
        thumbnail: job.thumbnail_url,
      };
      const finalForm = {
        status: job.status,
        total_workers_required: job.total_workers_required,
        pay_per_task: job.pay_per_task,
        minimum_pay: job.job_sub_category?.minimum_pay,
        require_screenshots: job.require_screenshots,
        estimated_day: job.estimated_day,
        job_category_id: job.job_sub_category?.parent_category?.id,
        job_sub_category_id: job.job_sub_category_id,
        country_ids: job.countries?.map((country) => country.id),
      };
      dispatch(setJobPostFinalForm(finalForm));
      dispatch(setJobPostFirstForm(firstForm));
    }
  }, [job]);

  if (isLoading) return <LoadingIndicator fullScreen />;

  return (
    <ThemedView
      color="card"
      style={{
        flex: 1,
        padding: 10,
        paddingBottom: 50,
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
        <JobsEstimationForm step={step} setStep={setStep} jobId={job.id} />
      ) : null}
    </ThemedView>
  );
};

export default EditJob;
