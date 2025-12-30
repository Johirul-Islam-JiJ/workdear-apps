import { useToast } from "@/hooks/useToast";
import { useUpdateProfileMutation } from "@/store/features/auth";
import React from "react";
import Button from "../libs/Button";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";
import ManualVerificationAlert from "./ManualVerificationAlert";

const VerificationRejected = () => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const toast = useToast();

  async function handleReapply() {
    try {
      const payload = {
        verification_status: null,
      };
      await updateProfile(payload).unwrap();
    } catch (error: any) {
      toast.error(error.data.message);
    }
  }

  return (
    <Card>
      <ManualVerificationAlert />
      <Card color="error">
        <ThemedText>Your application is Rejected, Try another</ThemedText>
      </Card>
      <Button onPress={handleReapply} title="Re apply" loading={isLoading} />
    </Card>
  );
};

export default VerificationRejected;
