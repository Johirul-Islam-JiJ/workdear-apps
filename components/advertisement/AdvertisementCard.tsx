import { config } from "@/config/config";
import { Advertisement, AdvertisementStatus } from "@/types/Advertisement";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import AppIcon from "../libs/AppIcon";
import Badge from "../libs/Badge";
import Button from "../libs/Button";
import Card from "../libs/Card";
import { TextVariant, ThemedText } from "../libs/ThemedText";

type Props = {
  ads: Advertisement;
  onStatusUpdate: (id: number, status: AdvertisementStatus) => void;
  isUpdating: number;
  onDelete: (id: number) => void;
  isDeleting: number;
};

const AdvertisementCard = ({
  ads,
  onStatusUpdate,
  isUpdating,
  onDelete,
  isDeleting,
}: Props) => {
  const router = useRouter();

  const dateFormatter = (date: string) =>
    new Date(date).toLocaleDateString("en-BN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

  const handleGoEdit = () => {
    router.push({
      pathname: "/(mainLayout)/advertisement/update",
      params: { ads: JSON.stringify(ads) },
    });
  };
  const list = [
    {
      title: "Clicks",
      value: ads.click_count,
      variant: "body2",
      render: true,
    },
    {
      title: "Cost",
      value: `$ ${ads.cost}`,
      variant: "body2",
      render: true,
    },
    {
      title: "Duration",
      value: `${ads.duration_days} days`,
      variant: "body2",
      render: true,
    },
    {
      title: "Start Date",
      value: dateFormatter(ads.start_date),
      variant: "body",
      render: ads.start_date,
    },
    {
      title: "End Date",
      value: dateFormatter(ads.end_date),
      variant: "body",
      render: ads.end_date,
    },
  ];

  return (
    <Card style={{ padding: 0, rowGap: 0 }}>
      <Image
        source={{ uri: config.fileBaseUrl + ads.banner_image }}
        style={{
          width: "100%",
          height: 150,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <Card>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            columnGap: "2%",
            rowGap: 5,
          }}
        >
          <View style={{ width: "49%" }}>
            <ThemedText color="gray.400">Status</ThemedText>
            <Badge
              label={ads.status}
              style={{ borderRadius: 8, alignSelf: "flex-start" }}
              color={
                ads.status === AdvertisementStatus.APPROVED
                  ? "success"
                  : ads.status === AdvertisementStatus.EXPIRED
                  ? "warning"
                  : undefined
              }
            />
          </View>
          {list.map((item, index) => {
            if (!item.render) return null;
            return (
              <View key={index} style={{ width: "49%" }}>
                <ThemedText color="gray.400">{item.title}</ThemedText>
                <ThemedText variant={item.variant as TextVariant}>
                  {item.value}
                </ThemedText>
              </View>
            );
          })}
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Button
            style={{ flex: 1 }}
            onPress={handleGoEdit}
            title="Edit"
            startIcon={
              <AppIcon color="white" size={18}>
                <FontAwesome6 name="edit" />
              </AppIcon>
            }
          />
          {/APPROVED|INACTIVE|ACTIVE/.test(ads.status) && (
            <Button
              style={{ flex: 1 }}
              onPress={() =>
                onStatusUpdate(
                  ads.id,
                  ads.status === AdvertisementStatus.APPROVED
                    ? AdvertisementStatus.INACTIVE
                    : AdvertisementStatus.ACTIVE
                )
              }
              loading={isUpdating === ads.id}
              title={
                ads.status === AdvertisementStatus.APPROVED ? "Pause" : "Play"
              }
              color={
                ads.status === AdvertisementStatus.APPROVED
                  ? "success"
                  : "warning"
              }
              startIcon={
                <AppIcon color="white" size={18}>
                  <FontAwesome6
                    name={
                      ads.status === AdvertisementStatus.ACTIVE
                        ? "pause"
                        : "play"
                    }
                  />
                </AppIcon>
              }
            />
          )}
          {/EXPIRED|PENDING|REJECTED/.test(ads.status) && (
            <Button
              onPress={() => onDelete(ads.id)}
              loading={isDeleting === ads.id}
              color="error"
              title={
                <AppIcon color="white" size={24}>
                  <MaterialIcons name="delete" />
                </AppIcon>
              }
            />
          )}
        </View>
      </Card>
    </Card>
  );
};

export default AdvertisementCard;
