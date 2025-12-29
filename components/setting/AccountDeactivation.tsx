import { useAppSelector } from "@/hooks/redux";
import { useToast } from "@/hooks/useToast";
import {
  useAccountDeleteMutation,
  useUpdateAccountDeleteMutation,
} from "@/store/features/auth";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import AppIcon from "../libs/AppIcon";
import Button from "../libs/Button";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";
import DeleteAccountModal from "./DeleteAccountModal";

const AccountDeactivation = () => {
  const { user } = useAppSelector((state) => state.user);
  const [showDeleteModal, setShowDeleteModal] = useState(0);
  const [cancelDelete, { isLoading: isCanceling }] =
    useUpdateAccountDeleteMutation();
  const [deleteAccount, { isLoading }] = useAccountDeleteMutation();
  const [updateDelete, { isLoading: updating }] =
    useUpdateAccountDeleteMutation();
  const toast = useToast();

  async function handleCancelDeleteAccount() {
    try {
      await cancelDelete({ status: "CANCEL" }).unwrap();
      toast.success("Account delete request cancelled successfully");
    } catch (error: any) {
      toast.error(error.data?.message || "Internal server error");
    }
  }
  async function handleAccountDelete(data: any) {
    try {
      if (
        user?.deactivation?.reason_for_deactivation &&
        user?.deactivation?.status !== "CANCEL"
      ) {
        await updateDelete(data).unwrap();
      } else {
        await deleteAccount(data).unwrap();
      }
      setShowDeleteModal(0);
      toast.success("Account delete request sent successfully");
    } catch (error: any) {
      toast.error(error.data?.message || "Internal server error");
    }
  }

  return (
    <Card>
      <ThemedText variant="subtitle">Account Deactivation</ThemedText>
      {(!user?.deactivation || user?.deactivation?.status === "CANCEL") && (
        <Button
          style={{ alignSelf: "flex-start" }}
          size="small"
          onPress={() => setShowDeleteModal(1)}
          color="warning"
          title=" Delete Account"
          startIcon={
            <AppIcon color="white" size={20}>
              <MaterialIcons name="delete" />
            </AppIcon>
          }
        />
      )}

      <DeleteAccountModal
        open={showDeleteModal}
        onClose={setShowDeleteModal}
        onDelete={handleAccountDelete}
        isLoading={isLoading || updating}
      />
    </Card>
  );
};

export default AccountDeactivation;
