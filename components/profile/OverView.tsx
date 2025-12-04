import React, { useState } from "react";
import { View } from "react-native";
import JobOverview from "./JobOverview";
import OverviewToggle from "./OverviewToggle";
import WorkingOverview from "./WorkingOverview";

const OverView = () => {
  const [overview, setOverview] = useState("work");
  return (
    <View style={{ rowGap: 15, marginTop: 10 }}>
      <OverviewToggle overview={overview} setOverview={setOverview} />
      {overview === "work" ? <WorkingOverview /> : <JobOverview />}
    </View>
  );
};

export default OverView;
