import JobCard from "@/components/job/JobCard";
import LoadingJobCard from "@/components/job/LoadingJobCard";
import Button from "@/components/libs/Button";
import { DropdownMenu } from "@/components/libs/DropdownMenu";
import { ThemedText } from "@/components/libs/ThemedText";
import { useFindJobsQuery } from "@/store/features/jobs";
import React from "react";
import { FlatList, View } from "react-native";

const JobsSreen = () => {
  const [category, setCategory] = React.useState("");
  const [location, setLocation] = React.useState("");
  const { data: jobs, isLoading } = useFindJobsQuery();

  const categories = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Remote",
      value: "remote",
    },
    {
      label: "Onsite",
      value: "onsite",
    },
    {
      label: "Hybrid",
      value: "hybrid",
    },
  ];

  const locations = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Remote",
      value: "remote",
    },
    {
      label: "Onsite",
      value: "onsite",
    },
    {
      label: "Hybrid",
      value: "hybrid",
    },
  ];

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 8 }}>
          <DropdownMenu
            items={categories}
            placeholder="Select Category"
            value={category}
            onSelect={(value) => setCategory(value)}
            button
          />
          <DropdownMenu
            items={locations}
            placeholder="Select Location"
            value={location}
            onSelect={(value) => setLocation(value)}
            button
          />
        </View>
      )}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 10,
        paddingVertical: 15,
      }}
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
  );
};

export default JobsSreen;
