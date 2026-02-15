import { config } from "@/config/config";
import { useAppSelector } from "@/hooks/redux";
import { useToast } from "@/hooks/useToast";
import { useUpdateProfilePictureMutation } from "@/store/features/auth";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ExpoImagePicker from "expo-image-picker";
import React from "react";
import { View } from "react-native";
import AppIcon from "../libs/AppIcon";
import IconButton from "../libs/IconButton";

const EditProfileImage = () => {
  const { user } = useAppSelector((state) => state.user);
  const [updateProfileImage, { isLoading }] = useUpdateProfilePictureMutation();
  const toast = useToast();

  const handleImagePicker = async () => {
    try {
      let result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const image: ExpoImagePicker.ImagePickerAsset = result.assets[0];
        const formData = new FormData();
        formData.append("profile_image", {
          uri: image.uri,
          type: image.mimeType || "image/jpeg",
          name: image.fileName || `upload_${Date.now()}.jpg`,
        } as any);
        await updateProfileImage(formData).unwrap();
        toast.success("Profile image updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update profile image");
    }
  };

  const source = user?.profile_image
    ? { uri: config.fileBaseUrl + user.profile_image }
    : require("@/assets/images/default.png");
  return (
    <View style={{ alignItems: "center", marginVertical: 20 }}>
      <View style={{ position: "relative" }}>
        <Image
          style={{ height: 150, width: 150, borderRadius: 50 }}
          source={source}
        />

        <IconButton
          isLoading={isLoading}
          onPress={handleImagePicker}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
          color="primarydark"
          icon={
            <AppIcon color="gray.800" darkColor="white">
              <FontAwesome name="edit" />
            </AppIcon>
          }
        />
      </View>
    </View>
  );
};

export default EditProfileImage;
