import AdvertisementForm from "@/components/advertisement/AdvertisementForm";
import Container from "@/components/common/Container";
import { ThemedText } from "@/components/libs/ThemedText";
import { useToast } from "@/hooks/useToast";
import { useCreateAdMutation } from "@/store/features/advertisement";
import { useRouter } from "expo-router";
import React from "react";

const AddAdvertisement = () => {
  const [createAds, { isLoading }] = useCreateAdMutation();
  const router = useRouter();
  const toast = useToast();

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("target_url", data.target_url);
      formData.append("cost_id", data.cost_id);
      formData.append("banner_image", data.banner_image);
      await createAds(formData).unwrap();
      toast.success("Advertisement created successfully");
      router.back();
    } catch (error: any) {
      toast.error(error.data?.message || "Internal server error");
    }
  };

  return (
    <Container>
      <ThemedText variant="body2">Add Advertisement</ThemedText>
      <AdvertisementForm onSubmit={onSubmit} isLoading={isLoading} />
    </Container>
  );
};

export default AddAdvertisement;
