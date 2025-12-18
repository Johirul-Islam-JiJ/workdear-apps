import Button from "@/components/libs/Button";
import React from "react";
import { View } from "react-native";

type Props = {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
};

const TabMenus = ({ activeTab, setActiveTab }: Props) => {
  const tabs = ["Overview", "Timeline", "Proofs"];
  return (
    <View style={{ flexDirection: "row", columnGap: 8 }}>
      {tabs.map((tab, index) => (
        <Button
          key={index}
          title={tab}
          style={{ flex: 1 }}
          variant={activeTab === index ? "contained" : "outlined"}
          onPress={() => setActiveTab(index)}
        />
      ))}
    </View>
  );
};

export default TabMenus;
