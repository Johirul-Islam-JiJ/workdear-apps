import AppIcon from "@/components/libs/AppIcon";
import Card from "@/components/libs/Card";
import Rating from "@/components/libs/Rating";
import { ThemedText } from "@/components/libs/ThemedText";
import JobReportCard, {
  JobSummaryCardProps,
} from "@/components/my-work/work-details/JobReportCard";
import { config } from "@/config/config";
import { useThemeColor } from "@/hooks/useThemeColor";
import { User } from "@/types/User";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Image, ImageStyle } from "expo-image";
import React from "react";
import { View, ViewStyle } from "react-native";

const ProviderInfo = ({ provider }: { provider: User }) => {
  const primaryColor = useThemeColor("primarydark");

  const providerReports: JobSummaryCardProps[] = [
    {
      label: "Job posted",
      value: provider.user_rating.job_posted_count,
      color: "primarydark",
      variant: "button",
      Icon: (
        <AppIcon color="primarydark" size={20}>
          <MaterialIcons name="work-history" />
        </AppIcon>
      ),
    },
    {
      label: "Satisfied",
      value: `${provider.user_rating.job_posted_count}%`,
      color: "success",
      variant: "button",
      Icon: (
        <AppIcon color="success" size={20}>
          <MaterialCommunityIcons name="emoticon-happy" />
        </AppIcon>
      ),
    },
    {
      label: "Unsatisfied",
      value: `${provider.user_rating.job_posted_count}%`,
      color: "error",
      variant: "button",
      Icon: (
        <AppIcon color="error" size={20}>
          <FontAwesome name="close" />
        </AppIcon>
      ),
    },
    {
      label: "Report",
      value: `${provider.user_rating.report_percentage}%`,
      color: "warning",
      variant: "button",
      Icon: (
        <AppIcon color="warning" size={20}>
          <Ionicons name="flag" />
        </AppIcon>
      ),
    },
  ];

  const source = provider?.profile_image
    ? { uri: config.fileBaseUrl + provider.profile_image }
    : require("@/assets/images/default.png");

  const profileStyle: ImageStyle = {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: primaryColor,
  };
  const reportWrapper: ViewStyle = {
    rowGap: 5,
    columnGap: "1.9%",
    flexDirection: "row",
    flexWrap: "wrap",
  };

  return (
    <View style={{ rowGap: 10 }}>
      <ThemedText variant="subtitle" color="primarydark" darkColor="white">
        Provider information
      </ThemedText>
      <Card>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image source={source} style={profileStyle} />
          <View>
            <ThemedText variant="body2">{provider.name}</ThemedText>
            <Rating
              value={provider.user_rating.star_rating}
              size={16}
              ratingInfo={`(${provider.user_rating.star_count})`}
            />
          </View>
        </View>
        <View style={reportWrapper}>
          {providerReports.map((item, index) => (
            <JobReportCard key={index} {...item} style={{ width: "49%" }} />
          ))}
        </View>
      </Card>
    </View>
  );
};

export default ProviderInfo;
