import JobCard from "@/components/job/JobCard";
import JobListHeader from "@/components/job/JobListHeader";
import LoadingJobCard from "@/components/job/LoadingJobCard";
import Button from "@/components/libs/Button";
import { ThemedText } from "@/components/libs/ThemedText";
import { useFindJobsQuery } from "@/store/features/jobs";
import React, { useState } from "react";
import { FlatList, View } from "react-native";

export type CategoryState = {
  id: null | number;
  name: null | string;
};

const JobsSreen = () => {
  const [countryIds, setCountryIds] = useState<number[]>([]);
  const [category, setCategory] = useState<CategoryState>({
    id: null,
    name: null,
  });
  const [page, setPage] = useState(1);

  const { data: jobs, isLoading } = useFindJobsQuery({
    country_ids: null,
    job_category_id: null,
    page,
    higest_pay: false,
    recent: false,
  });

  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 15, gap: 10 }}>
      <JobListHeader
        countryIds={countryIds}
        setCountryIds={setCountryIds}
        category={category}
        setCategory={setCategory}
      />

      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() =>
          isLoading ? (
            <View style={{ gap: 10 }}>
              <LoadingJobCard />
              <LoadingJobCard />
              <LoadingJobCard />
              <LoadingJobCard />
              <LoadingJobCard />
            </View>
          ) : (
            <View style={{ alignItems: "center", marginVertical: 10 }}>
              <ThemedText color="placeHolder">No job found</ThemedText>
            </View>
          )
        }
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => <JobCard job={item} />}
        keyExtractor={(_, index) => index.toString()}
        data={jobs?.data?.data || []}
        ListFooterComponent={() =>
          jobs?.data &&
          jobs?.data.last_page > 1 && (
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Button title="View More" />
            </View>
          )
        }
      />
    </View>
  );
};

export default JobsSreen;
