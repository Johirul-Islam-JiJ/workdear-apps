import Collupsable from "@/components/libs/Collupsable";
import { Job } from "@/types/Job";
import React from "react";
import { View } from "react-native";
import Instructions from "./Instructions";

const JobOverView = ({ job }: { job: Job }) => {
  return (
    <View>
      <Collupsable
        title="Instructions"
        description={<Instructions job={job} />}
        titleVariant="subtitle"
      />
    </View>
  );
};

export default JobOverView;
