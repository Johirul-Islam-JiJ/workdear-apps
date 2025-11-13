import { MyWork, MyWorkStatus } from "@/types/myWork";
import React from "react";
import { View, ViewStyle } from "react-native";
import { DropdownMenu } from "../libs/DropdownMenu";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";
import MyWorkCard from "./MyWorkCard";

interface MyWorkListProps {
  onChangeStatus: (status: MyWorkStatus) => void;
  data: MyWork[];
}

const MyWorkList = ({ onChangeStatus, data }: MyWorkListProps) => {
  const filterOptions = [
    { label: "All", value: "" },
    { label: "Under Review", value: MyWorkStatus.UNDER_REVIEW },
    { label: "Satisfied", value: MyWorkStatus.SATISFIED },
    { label: "Unsatisfied", value: MyWorkStatus.UNSATISFIED },
  ];

  const rowStyle: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  };
  return (
    <View style={{ rowGap: 10 }}>
      <View style={rowStyle}>
        <ThemedText variant="subtitle" color="primarydark" darkColor="white">
          Your submissions
        </ThemedText>
        <ThemedView color="card" style={{ borderRadius: 10 }}>
          <DropdownMenu
            items={filterOptions}
            placeholder="Filter"
            onSelect={(value) => onChangeStatus(value as MyWorkStatus)}
          />
        </ThemedView>
      </View>
      {data.map((task) => (
        <MyWorkCard key={task.task.id} task={task} />
      ))}
    </View>
  );
};

export default MyWorkList;
