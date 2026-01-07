import { useToast } from "@/hooks/useToast";
import { useVerifyOptMutation } from "@/store/features/auth";
import { isFetchBaseQueryError } from "@/store/features/baseQuery";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import Button from "../libs/Button";
import Modal from "../libs/Modal";
import OtpInput from "../libs/OtpInput";
import { ThemedText } from "../libs/ThemedText";

type Props = {
  open: number;
  onClose: React.Dispatch<React.SetStateAction<number>>;
};

const EmailVerifyModal = ({ open, onClose }: Props) => {
  const [verifyOptMutation, { isLoading, error }] = useVerifyOptMutation();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await verifyOptMutation(data).unwrap();
      toast.success("Email verified successfully");
      onClose(0);
    } catch (error: any) {
      toast.error(error.data?.message || "Internal server error");
    }
  };

  return (
    <Modal visible={open} setVisible={onClose} style={{ rowGap: 15 }}>
      <ThemedText variant="subtitle" style={{ textAlign: "center" }}>
        OTP Verification
      </ThemedText>

      <Controller
        name="code"
        rules={{
          required: "OTP is required",
          minLength: { value: 6, message: "OTP must be 6 digits" },
        }}
        control={control}
        render={({ field }) => (
          <View>
            <OtpInput onChange={field.onChange} error={!!errors.code} />
            <ThemedText
              variant="small"
              style={{ textAlign: "center", marginTop: 5 }}
              color="gray.500"
              darkColor="gray.400"
            >
              An OTP has been sent to your email address.
            </ThemedText>
          </View>
        )}
      />

      {error && isFetchBaseQueryError(error) && (
        <ThemedText color="error" variant="body">
          {(error.data as { message?: string })?.message ||
            "Internal server error"}
        </ThemedText>
      )}

      <Button
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}
        title="Submit"
      />
    </Modal>
  );
};

export default EmailVerifyModal;
