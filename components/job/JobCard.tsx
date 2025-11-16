import { timeCalculator } from "@/services/timeCalculator";
import { Job } from "@/types/Job";
import { Link } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
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
    <Link href={`/(mainLayout)/jobs/${job.slug}`} asChild>
      <Pressable style={{ flex: 1 }}>
        <ThemedView color="card" style={styles.container}>
          <ThemedText
            style={{ fontWeight: "bold" }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
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
              <ThemedText
                color="text"
                variant="small"
                style={{ textAlign: "right", fontWeight: "bold" }}
              >
                ${job.pay_per_task}
              </ThemedText>
              <ThemedText darkColor="gray.300" color="gray.600" variant="small">
                {timeCalculator(job.created_at)}
              </ThemedText>
            </View>
          </View>
        </ThemedView>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
});

export default JobCard;
