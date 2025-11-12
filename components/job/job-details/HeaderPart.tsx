import { Job } from "@/types/Job";
import React from "react";
import { View } from "react-native";
import JobHeaderInfoCard from "./JobHeaderInfoCard";
import JobProviderInfoCard from "./JobProviderInfoCard";

const HeaderPart = ({ job }: { job: Job }) => {
  return (
    <View style={{ rowGap: 10 }}>
      <JobHeaderInfoCard job={job} />
      <JobProviderInfoCard provider={job.provider} />
    </View>
  );
};

export default HeaderPart;
