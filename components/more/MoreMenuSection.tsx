import { MoreMenusContent } from "@/_mock/menus";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Href, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import Button from "../libs/Button";
import Card from "../libs/Card";
import Divider from "../libs/Divider";
import { ExternalLink } from "../libs/ExternalLink";
import IconButton from "../libs/IconButton";
import { ThemedText } from "../libs/ThemedText";

type Props = {
  menuContent: MoreMenusContent;
};

const MoreMenuSection = ({ menuContent }: Props) => {
  const menuColor = useThemeColor(menuContent.color);
  const textColor = useThemeColor("text");
  const navigation = useRouter();

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <IconButton
          icon={<menuContent.Icon color={menuColor} size={24} />}
          color={menuContent.color}
        />
        <ThemedText variant="body2" color="gray.800">
          {menuContent.title}
        </ThemedText>
      </View>

      <Card style={{ marginTop: 8 }}>
        {menuContent.menus.map((item, index) => {
          const path = `/(mainLayout)/${item.path.replace(
            "index",
            ""
          )}` as Href;

          return (
            <View key={index}>
              {item.external ? (
                <ExternalLink href={item.path}>
                  <Button
                    disabled
                    title={item.label}
                    endIcon="chevron-forward"
                    variant="text"
                    color="text"
                    startIcon={<item.Icon size={24} color={textColor} />}
                    style={{ justifyContent: "space-between" }}
                  />
                </ExternalLink>
              ) : (
                <Button
                  title={item.label}
                  endIcon="chevron-forward"
                  variant="text"
                  color="text"
                  startIcon={<item.Icon size={24} color={textColor} />}
                  style={{ justifyContent: "space-between" }}
                  onPress={() => navigation.push(path)}
                />
              )}

              {index !== menuContent.menus.length - 1 && <Divider />}
            </View>
          );
        })}
      </Card>
    </View>
  );
};

export default MoreMenuSection;
