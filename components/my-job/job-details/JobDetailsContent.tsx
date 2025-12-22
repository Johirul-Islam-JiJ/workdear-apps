import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { useJobbyidQuery } from "@/store/features/jobs";
import { Job } from "@/types/Job";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import JobBasicInfo from "./JobBasicInfo";
import JobOverView from "./JobOverView";
import JobProofs from "./JobProofs";
import JobTimeline from "./JobTimeline";
import TabMenus from "./TabMenus";

const JobDetailsContent = () => {
  const { slug } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const { data, isLoading } = useJobbyidQuery(slug);
  const job: Job = data?.data ?? {};

  if (isLoading)
    return (
      <LoadingIndicator
        fullScreen
        style={{ height: Dimensions.get("screen").height - 100 }}
      />
    );
  return (
    <View style={{ rowGap: 10, padding: 10 }}>
      <JobBasicInfo job={job} />
      <TabMenus activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 0 && <JobOverView job={job} />}
      {activeTab === 1 && <JobTimeline job={job} />}
      {activeTab === 2 && <JobProofs />}
    </View>
  );
};

export default JobDetailsContent;
