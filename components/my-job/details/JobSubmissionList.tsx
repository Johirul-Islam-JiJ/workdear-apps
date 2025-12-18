import { JobSubmission } from "@/types/myJobs";
import React from "react";
import { View } from "react-native";
import JobSubmissionCard from "./JobSubmissionCard";

type Props = {
  jobSubmissions: JobSubmission[];
  onSelect: (id: number) => void;
  selectedTaskIds: number[];
};

const JobSubmissionList = ({
  jobSubmissions,
  onSelect,
  selectedTaskIds,
}: Props) => {
  return (
    <View style={{ rowGap: 8, marginTop: 10 }}>
      {jobSubmissions.map((item) => (
        <JobSubmissionCard
          key={item.id}
          data={item}
          onSelect={onSelect}
          selectedTaskIds={selectedTaskIds}
        />
      ))}
    </View>
  );
};

export default JobSubmissionList;
