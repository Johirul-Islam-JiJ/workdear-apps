import { timeCalculator } from "@/services/timeCalculator";
import { Job } from "@/types/Job";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";
import LineChart from "./LineChart";

const JobCard = ({ job }: { job: Job }) => {
  const { REQUIRED_JOB_WORKER, TOTAL_SUBMISSIONS } = job.submission_information;
  const progress =
    TOTAL_SUBMISSIONS === 0
      ? 0
      : (TOTAL_SUBMISSIONS / REQUIRED_JOB_WORKER) * 100;
  const label = `${TOTAL_SUBMISSIONS} OF ${REQUIRED_JOB_WORKER}`;

  return (
    <ThemedView color="card" style={styles.container}>
      <ThemedText variant="subtitle" numberOfLines={2} ellipsizeMode="tail">
        {job.title}
      </ThemedText>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <LineChart label={label} value={progress} />
        <View>
          <ThemedText color="text" style={{ textAlign: "right" }}>
            ${job.pay_per_task}
          </ThemedText>
          <ThemedText color="gray.300" variant="small">
            {timeCalculator(job.created_at)}
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default JobCard;
