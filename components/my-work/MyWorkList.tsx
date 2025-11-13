import React from "react";
import { View } from "react-native";
import { DropdownMenu } from "../libs/DropdownMenu";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

const MyWorkList = ({}: {}) => {
  const filterOptions = [
    { label: "All", value: "" },
    { label: "Under Review", value: "UNDER_REVIEW" },
    { label: "Satisfied", value: "SATISFIED" },
    { label: "Unsatisfied", value: "UNSATISFIED" },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ThemedText variant="subtitle" color="primarydark" darkColor="white">
        Your submissions
      </ThemedText>
      <ThemedView color="card" style={{ borderRadius: 10 }}>
        <DropdownMenu
          items={filterOptions}
          placeholder="Filter"
          onSelect={() => {}}
        />
      </ThemedView>
    </View>
  );
};

export default MyWorkList;
