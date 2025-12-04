import React from "react";
import { View } from "react-native";
import Button from "../libs/Button";

type Props = {
  overview: string;
  setOverview: React.Dispatch<React.SetStateAction<string>>;
};

const OverviewToggle = ({ overview, setOverview }: Props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Button
        onPress={() => setOverview("work")}
        color={overview === "work" ? "primarymain" : "primarydarker"}
        title="Work overview"
        style={{ flex: 1, borderTopEndRadius: 0, borderBottomEndRadius: 0 }}
      />
      <Button
        title="Job overview"
        onPress={() => setOverview("job")}
        color={overview === "job" ? "primarymain" : "primarydarker"}
        style={{ flex: 1, borderTopStartRadius: 0, borderBottomStartRadius: 0 }}
      />
    </View>
  );
};

export default OverviewToggle;
