import { useToast } from "@/hooks/useToast";
import {
  useDeleteAdvertisementMutation,
  useUpdateAdsStatusMutation,
} from "@/store/features/advertisement";
import { Advertisement, AdvertisementStatus } from "@/types/Advertisement";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { ThemedText } from "../libs/ThemedText";
import AdvertisementCard from "./AdvertisementCard";

const AdvertisementList = ({ data }: { data: Advertisement[] }) => {
  const [updateAdsStatus] = useUpdateAdsStatusMutation();
  const [isStatusUpdating, setIsStatusUpdating] = useState(-1);
  const [isDeleting, setIsDeleting] = useState(-1);
  const [deleteAds] = useDeleteAdvertisementMutation();
  const toast = useToast();

  async function handleStatusUpdate(id: number, status: AdvertisementStatus) {
    try {
      setIsStatusUpdating(id);
      await updateAdsStatus({ data: { status }, id }).unwrap();
      toast.success("Status updated successfully");
    } catch (error: any) {
      toast.error(error.data?.message || "Internal server error");
    } finally {
      setIsStatusUpdating(-1);
    }
  }

  async function handleDelete(id: number) {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setIsDeleting(id);

              await deleteAds(id).unwrap();

              toast.success("Deleted successfully");
            } catch (error: any) {
              toast.error(error?.data?.message || "Internal server error");
            } finally {
              setIsDeleting(-1);
            }
          },
        },
      ],
      { cancelable: true }
    );
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
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      ))}
    </>
  );
};

export default AdvertisementList;
