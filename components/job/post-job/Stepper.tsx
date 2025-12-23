import React from "react";
import { View } from "react-native";
import { ThemedView } from "../../libs/ThemedView";

const Stepper = ({ selected = 0 }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {Array.from({ length: 4 }, (_, index) => (
        <React.Fragment key={index}>
          <ThemedView
            color={selected >= index ? "success" : "gray.500"}
            darkColor={selected >= index ? "success" : "gray.100"}
            style={{ width: 20, height: 20, borderRadius: 100 }}
          />
          {index !== 3 && (
            <ThemedView
              color={selected > index ? "success" : "gray.500"}
              darkColor={selected > index ? "success" : "gray.100"}
              style={{
                flex: 1,
                height: 2,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

export default Stepper;
