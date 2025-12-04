import React, { useState } from "react";
import { View } from "react-native";
import OverviewToggle from "./OverviewToggle";

const OverView = () => {
  const [overview, setOverview] = useState("work");
  return (
    <View>
      <OverviewToggle overview={overview} setOverview={setOverview} />
    </View>
  );
};

export default OverView;
