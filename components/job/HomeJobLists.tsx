import { useGetJobsForHomeQuery } from "@/store/features/jobs";
import { useRouter } from "expo-router";
import { View } from "react-native";
import Button from "../libs/Button";
import { ThemedText } from "../libs/ThemedText";
import JobCard from "./JobCard";
import JobLoadingCard from "./JobLoadingCard";

const HomeJobLists = () => {
  const { data: jobs, isLoading } = useGetJobsForHomeQuery();
  const navigation = useRouter();
  const data = jobs?.data ?? [];

  return (
    <View style={{ rowGap: 10 }}>
      <ThemedText variant="subtitle" color="primarydarker" darkColor="white">
        Latest Jobs
      </ThemedText>
      {isLoading ? (
        <View style={{ rowGap: 10 }}>
          <JobLoadingCard />
          <JobLoadingCard />
          <JobLoadingCard />
          <JobLoadingCard />
          <JobLoadingCard />
        </View>
      ) : data?.length ? (
        data?.map((job, index) => <JobCard key={index} job={job} />)
      ) : (
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <ThemedText color="placeholder">No job found</ThemedText>
        </View>
      )}

      {data?.length && (
        <View style={{ alignItems: "center" }}>
          <Button
            onPress={() => navigation.navigate("/(mainLayout)/(tabs)/jobs")}
            title="View More"
          />
        </View>
      )}
    </View>
  );
};

export default HomeJobLists;
