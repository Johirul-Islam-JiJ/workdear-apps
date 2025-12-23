import { useToast } from "@/hooks/useToast";
import { useUpdateAdsStatusMutation } from "@/store/features/advertisement";
import { Advertisement, AdvertisementStatus } from "@/types/Advertisement";
import React, { useState } from "react";
import { View } from "react-native";
import { ThemedText } from "../libs/ThemedText";
import AdvertisementCard from "./AdvertisementCard";

const AdvertisementList = ({ data }: { data: Advertisement[] }) => {
  const [updateAdsStatus] = useUpdateAdsStatusMutation();
  const [isStatusUpdating, setIsStatusUpdating] = useState(-1);
  const toast = useToast();

  async function handleStatusUpdate(id: number, status: AdvertisementStatus) {
    try {
      setIsStatusUpdating(id);
      await updateAdsStatus({ data: { status }, id }).unwrap();
      toast.success("Status updated successfully");
    } catch (error: any) {
      toast.error(error.data?.message || "Internal Server Error");
    } finally {
      setIsStatusUpdating(-1);
    }
  }

  if (data.length === 0)
    return (
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <ThemedText color="gray.800" darkColor="gray.300" variant="body">
          No advertisement found
        </ThemedText>
      </View>
    );

  return (
    <>
      {data.map((ads) => (
        <AdvertisementCard
          key={ads.id}
          ads={ads}
          onStatusUpdate={handleStatusUpdate}
          isUpdating={isStatusUpdating}
        />
      ))}
    </>
  );
};

export default AdvertisementList;
