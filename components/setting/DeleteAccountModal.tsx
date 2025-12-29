import { useAppSelector } from "@/hooks/redux";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import Button from "../libs/Button";
import Input from "../libs/Input";
import Modal from "../libs/Modal";
import { ThemedText } from "../libs/ThemedText";

type Props = {
  open: number;
  onClose: React.Dispatch<React.SetStateAction<number>>;
  onDelete: (data: any) => void;
  isLoading: boolean;
};

const DeleteAccountModal = ({ open, onClose, onDelete, isLoading }: Props) => {
  const { user } = useAppSelector((state) => state.user);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reason_for_deactivation:
        user?.deactivation?.reason_for_deactivation || "",
    },
  });

  return (
    <Modal visible={open} setVisible={onClose}>
      <ThemedText variant="body2" style={{ marginBottom: 10 }}>
        Delete account
      </ThemedText>

      <Controller
        name="reason_for_deactivation"
        control={control}
        render={({ field }) => (
          <View>
            <ThemedText>Why do you want to delete your account?</ThemedText>
            <Input
              multiline
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Enter the reason"
              style={{ height: "auto" }}
              error={errors.reason_for_deactivation?.message}
            />
          </View>
        )}
      />
      <Button
        style={{ marginTop: 15 }}
        title="Confirm"
        onPress={handleSubmit(onDelete)}
        loading={isLoading}
        color="warning"
      />
    </Modal>
  );
};

export default DeleteAccountModal;
