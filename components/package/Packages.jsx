import { View } from "react-native";
import { ThemedText } from "../libs/ThemedText";

const Packages = () => {
  return (
    <View>
      <ThemedText
        type="subtitle"
        style={{ textAlign: "center" }}
        color="primaryDarker"
      >
        Unlock more with premium plans
      </ThemedText>
    </View>
  );
};

export default Packages;
