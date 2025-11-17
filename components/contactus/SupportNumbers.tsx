import { useAppSelector } from "@/hooks/redux";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Linking, View, ViewStyle } from "react-native";
import AppIcon from "../libs/AppIcon";
import Button from "../libs/Button";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

const SupportNumbers = () => {
  const { generalData } = useAppSelector((state) => state.settings);

  const supportNumbers = [
    {
      id: 1,
      name: "Phone",
      number: generalData?.site_phone?.cell,
      text: "Direct phone support",
      Icon: <Ionicons name="call-sharp" />,
      btnText: "Call Now",
      link: `tel:${generalData?.site_phone?.cell}`,
    },
    {
      id: 2,
      name: "telegram",
      number: generalData?.site_phone?.telegram,
      text: "Message on Telegram",
      Icon: <FontAwesome5 name="telegram-plane" />,
      btnText: "Open Telegram",
      link: `https://t.me/${generalData?.site_phone?.telegram}`,
    },
    {
      id: 3,
      name: "whatsapp",
      number: generalData?.site_phone?.whatsapp,
      text: "Message on Whatsapp",
      Icon: <FontAwesome5 name="whatsapp" />,
      btnText: "Chat on Whatsapp",
      link: `https://wa.me/${generalData?.site_phone?.whatsapp}`,
    },
  ];

  const iconWrapper: ViewStyle = {
    width: 100,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  };
  const wrapperStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: "4%",
    paddingHorizontal: 20,
  };

  return (
    <View
      style={{
        rowGap: 5,
        paddingHorizontal: 10,
        marginTop: -30,
        marginBottom: 10,
      }}
    >
      {supportNumbers.map((item, index) => (
        <Card key={index} style={wrapperStyle}>
          <View style={{ width: "48%", alignItems: "center" }}>
            <ThemedView color="primarydark" style={iconWrapper}>
              <AppIcon size={26} color="white">
                {item.Icon}
              </AppIcon>
            </ThemedView>
          </View>
          <View style={{ width: "48%" }}>
            <ThemedText style={{ fontWeight: "bold" }}>
              {item.number}
            </ThemedText>
            <ThemedText color="gray.700" darkColor="gray.300" variant="small">
              {item.text}
            </ThemedText>
            <Button
              title={item.btnText}
              size="small"
              style={{ marginTop: 10 }}
              onPress={() => Linking.openURL(item.link)}
              startIcon={
                <AppIcon size={16} color="white">
                  {item.Icon}
                </AppIcon>
              }
            />
          </View>
        </Card>
      ))}
    </View>
  );
};

export default SupportNumbers;
