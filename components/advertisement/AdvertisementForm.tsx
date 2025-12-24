import { config } from "@/config/config";
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
import { DropdownMenu } from "../libs/DropdownMenu";
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
    setValue,
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
    setValue("cost_id", data.abs_cost_id);
    setValue("title", data.title);
    setValue("target_url", data.target_url);
    setValue("status", data.status);
    setValue("banner_image", data.banner_image);
  }, []);

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
  const statusOptions = [
    {
      label: "Active",
      value: "ACTIVE",
    },
    {
      label: "Inactive",
      value: "INACTIVE",
    },
  ];

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
                      color={
                        cost.id === parseInt(field.value ?? "0")
                          ? "primarydark"
                          : "border"
                      }
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

      {data && /ACTIVE|INACTIVE|APPROVED/.test(data.status) && (
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <View>
              <ThemedText>Status</ThemedText>
              <DropdownMenu
                items={statusOptions}
                onSelect={field.onChange}
                value={field.value}
                border
                placeholder="Select status"
                error={errors.status?.message}
              />
            </View>
          )}
        />
      )}

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
            {bannerImage && (
              <Image
                source={{
                  uri:
                    typeof bannerImage === "string"
                      ? config.fileBaseUrl + bannerImage
                      : bannerImage?.uri,
                }}
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
