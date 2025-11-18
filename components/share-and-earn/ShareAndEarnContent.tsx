import React from "react";
import { View } from "react-native";
import AffiliateLinkCard from "./AffiliateLinkCard";
import AffiliateProgramControl from "./AffiliateProgramControl";

const ShareAndEarnContent = () => {
  return (
    <View style={{ padding: 10, rowGap: 20 }}>
      <AffiliateLinkCard />
      <AffiliateProgramControl />
    </View>
  );
};

export default ShareAndEarnContent;
