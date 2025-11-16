import Badge from "@/components/libs/Badge";
import Rating from "@/components/libs/Rating";
import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { config } from "@/config/config";
import { Answer } from "@/types/Job";
import { MyWorkDetils, MyWorkStatus } from "@/types/myWork";
import { Image, ImageStyle } from "expo-image";
import React from "react";
import { View, ViewStyle } from "react-native";

const SubmissionInfo = ({ data }: { data: MyWorkDetils }) => {
  const answers: Answer = data.answer ? JSON.parse(data.answer) : null;

  const rowStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  };
  const imageStyle: ImageStyle = {
    height: 200,
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
  };
  return (
    <View style={{ rowGap: 10 }}>
      <ThemedText variant="subtitle" color="primarydark" darkColor="white">
        Task information
      </ThemedText>
      <ThemedView
        color="card"
        style={{ padding: 10, borderRadius: 10, gap: 10 }}
      >
        <View style={rowStyle}>
          <ThemedText style={{ fontWeight: "bold" }}>
            Current status:
          </ThemedText>
          <Badge
            label={data.status}
            style={{ borderRadius: 5 }}
            color={
              data.status === MyWorkStatus.UNDER_REVIEW
                ? "warning"
                : data.status === MyWorkStatus.SATISFIED
                ? "success"
                : "error"
            }
          />
        </View>
        <View style={rowStyle}>
          <ThemedText style={{ fontWeight: "bold" }}>
            Rating (This task):
          </ThemedText>
          <Rating value={parseInt(data.rating)} />
        </View>
        <View>
          <ThemedText style={{ fontWeight: "bold" }}>Answer:</ThemedText>
          {answers ? (
            Object.entries(answers).map(([key, value]) => (
              <ThemedText key={key}>
                Answer for {key}:{" "}
                <ThemedText variant="body2">{value}</ThemedText>
              </ThemedText>
            ))
          ) : (
            <ThemedText>Not applicable</ThemedText>
          )}
        </View>
        <View>
          <ThemedText style={{ fontWeight: "bold" }}>Proofs text:</ThemedText>
          <ThemedText>{data.proof_data}</ThemedText>
        </View>
        <View style={{ rowGap: 5 }}>
          <ThemedText style={{ fontWeight: "bold" }}>Screenshots:</ThemedText>
          {data.job_submission_image.map((image, index) => (
            <Image
              key={index}
              source={{ uri: config.fileBaseUrl + image.image_path }}
              alt={`screenshot-${index}`}
              style={imageStyle}
              contentFit="contain"
            />
          ))}
        </View>
      </ThemedView>
    </View>
  );
};

export default SubmissionInfo;
