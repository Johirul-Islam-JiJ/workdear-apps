import { useGetJobsForHomeQuery } from "@/store/features/jobs";
import { View } from "react-native";
import Button from "../libs/Button";
import { ThemedText } from "../libs/ThemedText";
import JobCard from "./JobCard";
import LoadingJobCard from "./LoadingJobCard";

const JobLists = () => {
  const { data: jobs, isLoading } = useGetJobsForHomeQuery();

  return (
    <View style={{ rowGap: 10 }}>
      {isLoading ? (
        <>
          <LoadingJobCard />
          <LoadingJobCard />
          <LoadingJobCard />
          <LoadingJobCard />
          <LoadingJobCard />
        </>
      ) : jobs?.data?.length > 0 ? (
        jobs?.data?.map((job, index) => <JobCard key={index} job={job} />)
      ) : (
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <ThemedText color="placeHolder">No job found</ThemedText>
        </View>
      )}

      <View style={{ alignItems: "center" }}>
        <Button title="View More" />
      </View>
    </View>
  );
};

export default JobLists;
