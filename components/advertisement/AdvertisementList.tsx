import { Advertisement } from "@/types/Advertisement";
import React from "react";
import { View } from "react-native";
import { ThemedText } from "../libs/ThemedText";
import AdvertisementCard from "./AdvertisementCard";

const AdvertisementList = ({ data }: { data: Advertisement[] }) => {
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
        <AdvertisementCard key={ads.id} ads={ads} />
      ))}
    </>
  );
};

export default AdvertisementList;
