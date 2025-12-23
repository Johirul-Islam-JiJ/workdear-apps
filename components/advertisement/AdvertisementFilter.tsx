import { selectOptions } from "@/_mock/selectOptions";
import React from "react";
import { View } from "react-native";
import { DropdownMenu } from "../libs/DropdownMenu";
import { ThemedText } from "../libs/ThemedText";

type Props = {
  onStatusChange: React.Dispatch<React.SetStateAction<string>>;
};

const AdvertisementFilter = ({ onStatusChange }: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <ThemedText variant="subtitle">Advertisements</ThemedText>
      <DropdownMenu
        items={selectOptions.ads.status_type}
        onSelect={(value) => onStatusChange(value)}
        placeholder="Filter"
        title="Filter by status"
        border
      />
    </View>
  );
};

export default AdvertisementFilter;
