import React from "react";
import { View } from "react-native";
import Card from "../libs/Card";
import Divider from "../libs/Divider";
import Rating from "../libs/Rating";
import { ThemedText } from "../libs/ThemedText";

type Props = {
  data: {
    title: string;
    tag: string;
    rating: number;
    works: {
      title: string;
      value: number;
    }[];
  };
};

const OverViewCard = ({ data }: Props) => {
  return (
    <Card>
      <View>
        <ThemedText
          variant="subtitle"
          style={{ textAlign: "center" }}
          color="primarymain"
        >
          {data.title}
        </ThemedText>
        <ThemedText variant="small" style={{ textAlign: "center" }}>
          {data.tag}
        </ThemedText>
      </View>
      <View>
        {data.works.map((work, index) => (
          <View key={work.title}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 5,
              }}
            >
              <ThemedText>{work.title}</ThemedText>
              <ThemedText>{work.value}</ThemedText>
            </View>
            <Divider />
          </View>
        ))}
      </View>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Rating value={data.rating} />
        <ThemedText variant="small">
          {data.rating >= 4
            ? "Excellent"
            : data.rating <= 3 && data.rating > 1
            ? "Good"
            : "Not Rated yet"}
        </ThemedText>
      </View>
    </Card>
  );
};

export default OverViewCard;
