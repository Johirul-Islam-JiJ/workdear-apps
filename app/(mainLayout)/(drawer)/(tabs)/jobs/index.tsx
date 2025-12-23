import JobCard from "@/components/job/JobCard";
import JobListHeader from "@/components/job/JobListHeader";
import JobLoadingCard from "@/components/job/JobLoadingCard";
import Button from "@/components/libs/Button";
import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { useFindJobsQuery } from "@/store/features/jobs";
import { Job } from "@/types/Job";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export type CategoryState = {
  id: null | number;
  name: null | string;
};

const JobsSreen = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [page, setPage] = useState(1);

  const {
    data: jobs,
    isLoading,
    isFetching,
  } = useFindJobsQuery({
    country_ids: selectedCountry ? [parseInt(selectedCountry)] : null,
    job_category_id: parseInt(selectedCategory),
    higest_pay: true,
    recent: true,
    page,
  });

  useEffect(() => {
    setJobsData([]);
    setPage(1);
  }, [selectedCountry, selectedCategory]);

  useEffect(() => {
    if (jobs?.data?.data) {
      const data: Job[] = jobs
        ? Array.isArray(jobs.data.data)
          ? jobs.data.data
          : typeof jobs.data.data === "object"
          ? Object.values(jobs.data.data)
          : []
        : [];

      setJobsData((prev) => [...prev, ...data]);
    }
  }, [jobs]);

  return (
    <ThemedView color="background" style={{ padding: 10, flex: 1 }}>
      <JobListHeader
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 40,
          paddingTop: 10,
        }}
        ListEmptyComponent={() =>
          isLoading || isFetching ? (
            <View style={{ gap: 10 }}>
              <JobLoadingCard />
              <JobLoadingCard />
              <JobLoadingCard />
              <JobLoadingCard />
              <JobLoadingCard />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ThemedText>No job found</ThemedText>
            </View>
          )
        }
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => <JobCard job={item} />}
        keyExtractor={(item, index) => item.id.toString()}
        data={jobsData}
        ListFooterComponent={() =>
          jobs?.data &&
          jobs?.data.last_page > 1 &&
          page <= jobs?.data.last_page && (
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Button
                onPress={() => setPage(page + 1)}
                title="View More"
                loading={isFetching}
              />
            </View>
          )
        }
      />
    </ThemedView>
  );
};

export default JobsSreen;
