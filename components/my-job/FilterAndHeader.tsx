import { selectOptions } from "@/_mock/selectOptions";
import { JobStatus } from "@/types/Job";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import AppIcon from "../libs/AppIcon";
import Card from "../libs/Card";
import { DropdownMenu } from "../libs/DropdownMenu";
import { ThemedText } from "../libs/ThemedText";

type Props = {
  onChangeStatus: React.Dispatch<React.SetStateAction<JobStatus | "All" | "">>;
};

const FilterAndHeader = ({ onChangeStatus }: Props) => {
  return (
    <Card>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <ThemedText variant="bodySemiBold">Filter</ThemedText>
        <AppIcon color="text" size={18}>
          <FontAwesome name="filter" />
        </AppIcon>
      </View>
      <DropdownMenu
        items={selectOptions.job.status_type}
        onSelect={(value) => onChangeStatus(value as JobStatus)}
        placeholder="Filter by status"
        title="Filter by status"
        border
      />
    </Card>
  );
};

export default FilterAndHeader;
