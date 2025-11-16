import { moreMenus } from "@/_mock/menus";
import { ThemedView } from "@/components/libs/ThemedView";
import MoreMenuSection from "@/components/more/MoreMenuSection";
import React from "react";
import { ScrollView, View } from "react-native";

const MoreScreen = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 10, rowGap: 20 }}>
          {moreMenus.map((item, index) => (
            <MoreMenuSection key={index} menuContent={item} />
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default MoreScreen;
