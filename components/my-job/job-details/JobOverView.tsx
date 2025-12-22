import Collupsable from "@/components/libs/Collupsable";
import { Job } from "@/types/Job";
import React from "react";
import { View } from "react-native";
import Instructions from "./Instructions";
import JobperformanceAndStatistics from "./JobperformanceAndStatistics";
import Questions from "./Questions";
import RequiredProofs from "./RequiredProofs";

const JobOverView = ({ job }: { job: Job }) => {
  return (
    <View style={{ rowGap: 10 }}>
      <Collupsable
        title="Instructions"
        description={<Instructions job={job} />}
        titleVariant="subtitle"
      />
      <Collupsable
        title="Required Proofs"
        description={<RequiredProofs required_proofs={job.required_proofs} />}
        titleVariant="subtitle"
      />
      <Collupsable
        title="Questions"
        description={<Questions job={job} />}
        titleVariant="subtitle"
      />
      <Collupsable
        title="Job performance and statistics"
        description={<JobperformanceAndStatistics job={job} />}
        titleVariant="subtitle"
      />
    </View>
  );
};

export default JobOverView;
