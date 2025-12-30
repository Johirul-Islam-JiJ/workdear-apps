import React from "react";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";
import ManualVerificationAlert from "./ManualVerificationAlert";

const VerificationPending = () => {
  return (
    <Card>
      <ManualVerificationAlert />

      <Card color="border">
        <ThemedText style={{ textAlign: "center" }}>
          Please wait 1 - 6 Hours. We are reviewing
        </ThemedText>
      </Card>
    </Card>
  );
};

export default VerificationPending;
