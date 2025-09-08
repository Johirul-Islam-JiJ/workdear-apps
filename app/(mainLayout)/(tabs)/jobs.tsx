import JobCard from "@/components/job/JobCard";
import Button from "@/components/libs/Button";
import { DropdownMenu } from "@/components/libs/DropdownMenu";
import React from "react";
import { FlatList, View } from "react-native";

const JobsSreen = () => {
  const [category, setCategory] = React.useState("");
  const [location, setLocation] = React.useState("");
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
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={() => <JobCard />}
      keyExtractor={(item, index) => index.toString()}
      data={Array(20).fill(0)}
      ListFooterComponent={() => (
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Button title="View More" />
        </View>
      )}
    />
  );
};

export default JobsSreen;
