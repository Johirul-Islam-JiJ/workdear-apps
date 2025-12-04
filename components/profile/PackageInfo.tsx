import { ColorScheme } from "@/constants/Colors";
import { useAppSelector } from "@/hooks/redux";
import { getRemainingDays } from "@/services/timeCalculator";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import AppIcon from "../libs/AppIcon";
import Badge from "../libs/Badge";
import Button from "../libs/Button";
import Card from "../libs/Card";
import IconButton from "../libs/IconButton";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";
import NoPackagePurchase from "./NoPackagePurchase";

const PackageInfo = () => {
  const { user } = useAppSelector((state) => state.user);

  const dataInfo = (pack: any) => [
    {
      Icon: <Entypo name="stopwatch" />,
      color: "warning",
      title: "Duration",
      value: `${pack.package.duration} months`,
    },
    {
      Icon: <FontAwesome5 name="calendar-alt" />,
      color: "primarydark",
      title: "Subscription period",
      value: `${pack.start_date} - ${pack.end_date}`,
    },
    {
      Icon: <Entypo name="credit-card" />,
      color: "info",
      title: "Payment method",
      value: pack.paid_from.replace("_", " "),
    },
  ];

  if (!user?.premium_subscriptions.length) return <NoPackagePurchase />;

  return (
    <View>
      {user?.premium_subscriptions.map((pack) => (
        <Card key={pack.id} style={{ padding: 0, rowGap: 0 }}>
          {/* header */}
          <Card
            color="primarydark"
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          >
            <View>
              <ThemedText variant="subtitle" color="white">
                {pack.package.name}
              </ThemedText>
              <ThemedText variant="small" color="white">
                {pack.package.description}
              </ThemedText>
            </View>
            <View>
              <ThemedView
                color="primarydarker"
                opacity={{ dark: 80 }}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 8,
                }}
              >
                <ThemedText style={{ fontWeight: "bold" }} color="white">
                  ${pack.package.price}
                </ThemedText>
              </ThemedView>
            </View>
          </Card>

          {/* message  */}
          <ThemedView
            color="success"
            opacity={{ dark: 20, light: 20 }}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 8,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ThemedText variant="small" color="success">
              <Badge variant="dot" color="success" /> Active
            </ThemedText>
            <ThemedText variant="small" color="success">
              {getRemainingDays(pack.end_date)} days left
            </ThemedText>
          </ThemedView>

          {/* description */}
          <View style={{ padding: 15, rowGap: 8 }}>
            {dataInfo(pack).map((item, index) => (
              <View key={index} style={{ flexDirection: "row", columnGap: 8 }}>
                <IconButton
                  color={item.color as ColorScheme}
                  icon={
                    <AppIcon color={item.color as ColorScheme}>
                      {item.Icon}
                    </AppIcon>
                  }
                />
                <View>
                  <ThemedText variant="small" darkColor="gray.400">
                    {item.title}
                  </ThemedText>
                  <ThemedText style={{ fontWeight: "bold" }}>
                    {item.value}
                  </ThemedText>
                </View>
              </View>
            ))}
            <Link href="/packages" asChild>
              <Button title="Renew subscription" style={{ marginTop: 10 }} />
            </Link>
          </View>
        </Card>
      ))}
    </View>
  );
};

export default PackageInfo;
