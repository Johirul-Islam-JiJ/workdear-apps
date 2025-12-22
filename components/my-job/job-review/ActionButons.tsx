import JobReport from "@/components/job/common/JobReport";
import Button from "@/components/libs/Button";
import React from "react";
import { View } from "react-native";

const ActionButons = ({ taskId }: { taskId: number }) => {
  return (
    <View style={{ rowGap: 10 }}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Button
          color="success"
          title="Satisfied"
          style={{ flex: 1 }}
          startIcon="happy"
        />
        <Button
          color="error"
          title="Unsatisfied"
          style={{ flex: 1 }}
          startIcon="close"
        />
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <JobReport
          jobId={null}
          submissionId={taskId}
          title="Submit a report agains this worker"
          type="job_submission"
          style={{ flex: 1 }}
        />
        <Button
          color="success"
          title="Give tips"
          style={{ flex: 1 }}
          startIcon="happy"
        />
      </View>
    </View>
  );
};

export default ActionButons;
