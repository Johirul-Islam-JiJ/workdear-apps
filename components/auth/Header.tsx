import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { config } from "@/config/config";
import { useAppSelector } from "@/hooks/redux";
import { Image } from "expo-image";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Header = ({ title, subTitle }: { title: string; subTitle: string }) => {
  const { generalData } = useAppSelector((state) => state.settings);
  const frame = useSafeAreaInsets();

  return (
    <ThemedView
      color="primarydark"
      darkColor="primarydarker"
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingTop: frame.top,
        paddingBottom: 15,
      }}
    >
      {generalData.site_logo_light && (
        <Image
          source={{ uri: config.fileBaseUrl + generalData.site_logo_dark }}
          style={{ height: 50, width: 160 }}
          contentFit="contain"
        />
      )}
      <ThemedText
        variant="subtitle"
        color="white"
        style={{ marginBottom: 5, marginTop: 5 }}
      >
        {title}
      </ThemedText>
      <ThemedText color="white" style={{ textAlign: "center" }}>
        {subTitle}
      </ThemedText>
    </ThemedView>
  );
};

export default Header;
