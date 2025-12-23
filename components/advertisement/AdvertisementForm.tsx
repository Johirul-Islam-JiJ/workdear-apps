import { Advertisementschema } from "@/schema/Advertisement";
import { useGetAdCostsQuery } from "@/store/features/advertisement";
import { CostList } from "@/types/Advertisement";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, View } from "react-native";
import Card from "../libs/Card";
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
          </View>
        )}
      />
    </Card>
  );
};

export default AdvertisementForm;
