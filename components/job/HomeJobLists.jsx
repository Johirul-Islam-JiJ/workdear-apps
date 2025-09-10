import { useNavigation } from "@/hooks/useNavigation";
import { useGetJobsForHomeQuery } from "@/store/features/jobs";
import { View } from "react-native";
import Button from "../libs/Button";
import { ThemedText } from "../libs/ThemedText";
import JobCard from "./JobCard";
import LoadingJobCard from "./LoadingJobCard";

const HomeJobLists = () => {
  const { data: jobs, isLoading } = useGetJobsForHomeQuery();
  const navigation = useNavigation();

  return (
    <View style={{ rowGap: 10 }}>
      {isLoading ? (
        <View style={{ rowGap: 10 }}>
          <LoadingJobCard />
          <LoadingJobCard />
          <LoadingJobCard />
          <LoadingJobCard />
          <LoadingJobCard />
        </View>
      ) : jobs?.data?.length > 0 ? (
        jobs?.data?.map((job, index) => <JobCard key={index} job={job} />)
      ) : (
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <ThemedText color="placeHolder">No job found</ThemedText>
        </View>
      )}

      <View style={{ alignItems: "center" }}>
        <Button onPress={() => navigation.navigate("jobs")} title="View More" />
      </View>
    </View>
  );
};

export default HomeJobLists;
