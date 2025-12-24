import { Advertisementschema } from "@/schema/Advertisement";
import { useGetAdCostsQuery } from "@/store/features/advertisement";
import { CostList } from "@/types/Advertisement";
import { yupResolver } from "@hookform/resolvers/yup";
import { Image } from "expo-image";
import { ImagePickerAsset } from "expo-image-picker";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, Pressable, View } from "react-native";
import Button from "../libs/Button";
import Card from "../libs/Card";
import ImagePicker from "../libs/ImagePicker";
import Input from "../libs/Input";
import LoadingIndicator from "../libs/LoadingIndicator";
import { ThemedText } from "../libs/ThemedText";

type Props = {
  data?: any;
  onSubmit: (data: any) => void;
  isLoading: boolean;
};

const AdvertisementForm = ({ data, onSubmit, isLoading }: Props) => {
  const { data: costs, isLoading: costLoading } = useGetAdCostsQuery(undefined);
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Advertisementschema),
    defaultValues: {
      title: "",
      target_url: "",
      status: "PENDING",
      cost_id: "",
      banner_image: "",
    },
  });

  useEffect(() => {
    if (!data) return;
    reset({
      title: data.title,
      target_url: data.target_url,
      status: data.status,
      cost_id: data.cost_id,
      banner_image: data.banner_image,
    });
  }, [data]);

  if (costLoading) {
    return (
      <LoadingIndicator
        fullScreen
        style={{ height: Dimensions.get("screen").height - 100 }}
      />
    );
  }

  const costList: CostList[] = costs?.ad_cost_lists ?? [];
  const bannerImage = watch("banner_image") as ImagePickerAsset;

  return (
    <Card>
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <View>
            <ThemedText>Title</ThemedText>
            <Input
              placeholder="Enter title"
              value={field.value}
              onChangeText={field.onChange}
              error={errors.title?.message}
            />
          </View>
        )}
      />
      <Controller
        control={control}
        name="target_url"
        render={({ field }) => (
          <View>
            <ThemedText>Target URL</ThemedText>
            <Input
              placeholder="Enter target url"
              value={field.value}
              onChangeText={field.onChange}
              error={errors.target_url?.message}
            />
          </View>
        )}
      />
      <Controller
        control={control}
        name="cost_id"
        render={({ field }) => (
          <View>
            <ThemedText>Duration</ThemedText>
            <View style={{ rowGap: 5 }}>
              {costList.length > 0 ? (
                costList.map((cost) => (
                  <Pressable
                    key={cost.id}
                    onPress={() => field.onChange(cost.id)}
                  >
                    <Card
                      color={cost.id === field.value ? "primarydark" : "border"}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <ThemedText color="white">
                        {cost.duration_days}
                      </ThemedText>
                      <ThemedText color="white">${cost.cost}</ThemedText>
                    </Card>
                  </Pressable>
                ))
              ) : (
                <ThemedText>Cost not found</ThemedText>
              )}
            </View>
          </View>
        )}
      />

      <Controller
        name="banner_image"
        control={control}
        render={({ field }) => (
          <View>
            <ThemedText>Banner Image</ThemedText>
            <ImagePicker
              onChange={field.onChange}
              error={errors.banner_image?.message}
              value={bannerImage}
            />
            {bannerImage?.uri && (
              <Image
                source={{ uri: bannerImage?.uri }}
                style={{
                  width: "100%",
                  height: 100,
                  borderRadius: 10,
                  marginTop: 5,
                }}
              />
            )}
          </View>
        )}
      />
      <Button
        title="Submit"
        style={{ marginTop: 10 }}
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
      />
    </Card>
  );
};

export default AdvertisementForm;
