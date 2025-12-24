import AdvertisementForm from "@/components/advertisement/AdvertisementForm";
import Container from "@/components/common/Container";
import { ThemedText } from "@/components/libs/ThemedText";
import { useToast } from "@/hooks/useToast";
import { useUpdateAdvertisementMutation } from "@/store/features/advertisement";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const EditAdvertisement = () => {
  const [updateAds, { isLoading }] = useUpdateAdvertisementMutation();
  const { ads } = useLocalSearchParams();
  const data = JSON.parse(ads as string);
  const toast = useToast();

  const onSubmit = async (payload: any) => {
    try {
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("target_url", payload.target_url);
      formData.append("cost_id", payload.cost_id);
      const file = data.banner_image;
      if (typeof file === "string") {
        formData.append("banner_image", file);
      } else {
        formData.append("banner_image", {
          uri: file.uri,
          type: file.mimeType || "image/jpeg",
          name: file.fileName || `upload_${Date.now()}.jpg`,
        } as any);
      }
      formData.append("status", payload.status);
      await updateAds({ data: formData, id: data.id }).unwrap();
      toast.success("Advertisement updated successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "Internal server error");
    }
  };

  return (
    <Container>
      <ThemedText variant="body2">Update Advertisement</ThemedText>
      <AdvertisementForm
        data={data}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default EditAdvertisement;
