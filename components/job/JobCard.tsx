import { timeCalculator } from "@/services/timeCalculator";
import { Job } from "@/types/Job";
import { StyleSheet, View } from "react-native";
import DonutChat from "../libs/DonutChat";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

const JobCard = ({ job }: { job: Job }) => {
  const { REQUIRED_JOB_WORKER, TOTAL_SUBMISSIONS } = job.submission_information;
  const progress =
    TOTAL_SUBMISSIONS === 0
      ? 100
      : 100 - (TOTAL_SUBMISSIONS / REQUIRED_JOB_WORKER) * 100;

  return (
    <ThemedView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ThemedText type="subtitle">{job.title}</ThemedText>
        <ThemedText>{job.provider.name}</ThemedText>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemedText color="placeHolder">
            {timeCalculator(job.created_at)}
          </ThemedText>
          <ThemedView style={styles.price} color="primaryDarker">
            <ThemedText color="white">${job.pay_per_task}</ThemedText>
          </ThemedView>
        </View>
      </View>
      <DonutChat
        cutout={progress}
        description={`${job.submission_information.TOTAL_SUBMISSIONS}/${job.submission_information.REQUIRED_JOB_WORKER}`}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  price: {
    paddingHorizontal: 8,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});

export default JobCard;
