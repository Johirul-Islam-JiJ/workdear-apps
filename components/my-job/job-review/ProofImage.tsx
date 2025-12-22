import Card from "@/components/libs/Card";
import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { config } from "@/config/config";
import { JobSubmissionImage } from "@/types/myWork";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";

const ProofImage = ({ images }: { images: JobSubmissionImage[] }) => {
  return (
    <Card>
      <ThemedText variant="bodySemiBold">Proof Images</ThemedText>
      <View style={{ rowGap: 8 }}>
        {images.map((image, index) => (
          <ThemedView key={index} color="border" style={{ borderRadius: 10 }}>
            <Image
              source={{ uri: config.fileBaseUrl + image.image_path }}
              style={{
                width: "100%",
                minHeight: 100,
                borderRadius: 10,
              }}
              contentFit="contain"
            />
          </ThemedView>
        ))}
      </View>
    </Card>
  );
};

export default ProofImage;
