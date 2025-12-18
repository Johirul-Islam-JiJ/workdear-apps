import Collupsable from "@/components/libs/Collupsable";
import { Job } from "@/types/Job";
import React from "react";
import { View } from "react-native";
import Instructions from "./Instructions";
import JobperformanceAndStatistics from "./JobperformanceAndStatistics";
import Questions from "./Questions";

const JobOverView = ({ job }: { job: Job }) => {
  return (
    <View style={{ rowGap: 10 }}>
      <Collupsable
        title="Instructions"
        description={<Instructions job={job} />}
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
