import { View } from "react-native";
import { ThemedText } from "../libs/ThemedText";
import PackageCard from "./PackageCard";

const Packages = () => {
  return (
    <View style={{ rowGap: 10 }}>
      <ThemedText
        type="subtitle"
        style={{ textAlign: "center" }}
        color="primaryDarker"
      >
        Unlock more with premium plans
      </ThemedText>
      <PackageCard />
      <PackageCard highlight />
      <PackageCard />
    </View>
  );
};

export default Packages;
