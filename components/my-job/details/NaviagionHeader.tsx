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
  const statusOptions = [
    { id: 1, label: "All", value: "" },
    { id: 3, label: "CORRECT", value: "correct_submissions" },
    { id: 2, label: "INCORRECT", value: "incorrect_submissions" },
    { id: 4, label: "PENDING", value: "UNDER_REVIEW" },
    { id: 5, label: "SATISFIED", value: "SATISFIED" },
    { id: 6, label: "UNSATISFIED", value: "UNSATISFIED" },
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
          items={statusOptions}
          placeholder="Filter"
          border
          title="Filter by status"
        />
      </View>
    </View>
  );
};

export default NaviagionHeader;
