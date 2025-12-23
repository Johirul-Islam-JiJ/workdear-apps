import { MyJob } from "@/types/myJobs";
import React from "react";
import { View } from "react-native";
import { ThemedText } from "../libs/ThemedText";
import MyJobCard from "./MyJobCard";

type Props = {
  data: MyJob[];
};

const MyjobsList = ({ data }: Props) => {
  if (data.length === 0)
    return (
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <ThemedText color="gray.800" darkColor="gray.300" variant="body">
          No job found
        </ThemedText>
      </View>
    );

  return (
    <View style={{ rowGap: 10 }}>
      {data.map((job) => (
        <MyJobCard key={job.id} job={job} />
      ))}
    </View>
  );
};

export default MyjobsList;
