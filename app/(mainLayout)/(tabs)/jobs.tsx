import JobCard from "@/components/job/JobCard";
import JobListHeader from "@/components/job/JobListHeader";
import JobLoadingCard from "@/components/job/JobLoadingCard";
import Button from "@/components/libs/Button";
import { ThemedText } from "@/components/libs/ThemedText";
import { useFindJobsQuery } from "@/store/features/jobs";
import { Job } from "@/types/Job";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export type CategoryState = {
  id: null | number;
  name: null | string;
};

const JobsSreen = () => {
  const [jobsData, setJobsData] = useState<Job[]>([]);

  const [countryIds, setCountryIds] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<CategoryState>({
    id: null,
    name: null,
  });

  const {
    data: jobs,
    isLoading,
    isFetching,
  } = useFindJobsQuery({
    country_ids: countryIds.length > 0 ? countryIds : null,
    job_category_id: category.id,
    higest_pay: true,
    recent: true,
    page,
  });

  useEffect(() => {
    setJobsData([]);
    setPage(1);
  }, [countryIds, category.id]);

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
    <View style={{ paddingHorizontal: 10, paddingVertical: 15 }}>
      <JobListHeader
        countryIds={countryIds}
        setCountryIds={setCountryIds}
        category={category}
        setCategory={setCategory}
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
            <View style={{ alignItems: "center", marginVertical: 10 }}>
              <ThemedText color="placeHolder">No job found</ThemedText>
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
    </View>
  );
};

export default JobsSreen;
