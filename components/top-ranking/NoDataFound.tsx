import React from "react";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";

const NoDataFound = ({ message }: { message: string }) => {
  return (
    <Card style={{ marginTop: 10 }}>
      <ThemedText style={{ textAlign: "center", paddingVertical: 20 }}>
        {message}
      </ThemedText>
    </Card>
  );
};

export default NoDataFound;
