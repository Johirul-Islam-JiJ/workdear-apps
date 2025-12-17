import Button from "@/components/libs/Button";
import { DropdownMenu } from "@/components/libs/DropdownMenu";
import { ThemedText } from "@/components/libs/ThemedText";
import { TaskStatus } from "@/types/myJobs";
import React from "react";
import { View } from "react-native";

type Props = {
  setStatus: React.Dispatch<React.SetStateAction<"" | TaskStatus>>;
};

const NaviagionHeader = ({ setStatus }: Props) => {
  const options = [
    {
      label: "All",
      value: "",
    },
    {
      label: "Satisfied",
      value: TaskStatus.SATISFIED,
    },
    {
      label: "Unsatisfied",
      value: TaskStatus.UNSATISFIED,
    },
    {
      label: "Under Review",
      value: TaskStatus.UNDER_REVIEW,
    },
  ];

  return (
    <View style={{ rowGap: 8 }}>
      <ThemedText variant="subtitle" style={{ textAlign: "center" }}>
        Submission lists
      </ThemedText>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <Button style={{ flex: 1 }} title="Satisfied" color="success" />
        <Button style={{ flex: 1 }} title="Unsatisfied" color="error" />
      </View>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <Button style={{ flex: 1 }} title="Extend Deadline" />
        <Button style={{ flex: 1 }} title="Complete Job" color="success" />
      </View>
      <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
        <Button style={{ flex: 1 }} title="View Job" startIcon="eye" />
        <DropdownMenu
          onSelect={(value) => setStatus(value as any)}
          items={options}
          placeholder="Filter"
          border
          title="Filter by status"
        />
      </View>
    </View>
  );
};

export default NaviagionHeader;
