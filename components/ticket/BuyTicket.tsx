import { useToast } from "@/hooks/useToast";
import { useBuyticketMutation } from "@/store/features/ticket";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import Button from "../libs/Button";
import { DropdownMenu } from "../libs/DropdownMenu";
import Input from "../libs/Input";
import Modal from "../libs/Modal";
import { ThemedText } from "../libs/ThemedText";

const BuyTicket = ({ unitPrice }: { unitPrice: string }) => {
  const [visible, setVisible] = useState(0);
  const [buyTicket, { isLoading: buyLoading }] = useBuyticketMutation();
  const toast = useToast();
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ticket_amount: "",
      balance_type: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await buyTicket(data).unwrap();
      toast.success("Tickets purchased successfully!");
      setVisible(0);
    } catch (err: any) {
      toast.error(err.data.message || "Internal server error");
    }
  };

  const ticketCount = watch("ticket_amount") ?? "0";
  const estimatedPrice = Number(ticketCount) * Number(unitPrice);

  const optionForDropDown = [
    { label: "Earning Balance", value: "earning_balance" },
    { label: "Deposit Balance", value: "deposit_balance" },
  ];

  return (
    <>
      <Button
        title="Buy Ticket"
        style={{ alignSelf: "flex-end" }}
        onPress={() => setVisible(1)}
      />
      <Modal visible={visible} setVisible={setVisible}>
        <ThemedText variant="subtitle" style={{ textAlign: "center" }}>
          Buy ticket
        </ThemedText>
        <ThemedText style={{ textAlign: "center" }} color="warning">
          Ticket unit price: ${unitPrice}
        </ThemedText>

        <View style={{ marginVertical: 20, rowGap: 8 }}>
          <Controller
            name="balance_type"
            control={control}
            rules={{ required: "Balance type is required" }}
            render={({ field }) => (
              <View>
                <ThemedText>Balance type</ThemedText>
                <DropdownMenu
                  items={optionForDropDown}
                  value={field.value}
                  onSelect={field.onChange}
                  placeholder="Select balance type"
                  error={errors.balance_type?.message}
                  border
                />
              </View>
            )}
          />
          <Controller
            name="ticket_amount"
            control={control}
            rules={{ required: "Ticket amount is required" }}
            render={({ field }) => (
              <View>
                <ThemedText>How many ticket you want</ThemedText>
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="Ticket amount"
                  error={errors.ticket_amount?.message}
                  keyboardType="numeric"
                />
                <ThemedText>
                  Your ticket total price: ${estimatedPrice.toFixed(4)}
                </ThemedText>
              </View>
            )}
          />
        </View>
        <Button
          title="Buy Ticket"
          onPress={handleSubmit(onSubmit)}
          loading={buyLoading}
          endIcon="rocket"
        />
      </Modal>
    </>
  );
};

export default BuyTicket;
