import { MyJob } from "@/types/myJobs";
import React from "react";
import { View } from "react-native";
import MyJobCard from "./MyJobCard";

type Props = {
  data: MyJob[];
};

const MyjobsList = ({ data }: Props) => {
  return (
    <View style={{ rowGap: 10 }}>
      {data.map((job) => (
        <MyJobCard key={job.id} job={job} />
      ))}
    </View>
  );
};

export default MyjobsList;
