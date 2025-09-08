import { StyleSheet, View } from "react-native";
import DonutChat from "../libs/DonutChat";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

const JobCard = () => {
  return (
    <ThemedView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ThemedText type="subtitle">Job Title</ThemedText>
        <ThemedText>Name</ThemedText>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemedText color="placeHolder">10 hrs ago</ThemedText>
          <ThemedView style={styles.price} color="primaryDarker">
            <ThemedText color="white">$0.50</ThemedText>
          </ThemedView>
        </View>
      </View>
      <DonutChat cutout={70} description="70/100" />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  price: {
    paddingHorizontal: 8,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});

export default JobCard;
