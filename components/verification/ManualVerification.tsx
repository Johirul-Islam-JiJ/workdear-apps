import { useToast } from "@/hooks/useToast";
import { AccountVerificationSchema } from "@/schema/auth";
import { useManualVarificationMutation } from "@/store/features/verifications";
import { FontAwesome } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Image } from "expo-image";
import { ImagePickerAsset } from "expo-image-picker";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import AppIcon from "../libs/AppIcon";
import Button from "../libs/Button";
import Card from "../libs/Card";
import { DropdownMenu } from "../libs/DropdownMenu";
import ImagePicker from "../libs/ImagePicker";
import Input from "../libs/Input";
import { ThemedText } from "../libs/ThemedText";
import FormAlert from "./FormAlert";

const ManualVerification = () => {
  const [manualVerification, { isLoading }] = useManualVarificationMutation();

  const toast = useToast();

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AccountVerificationSchema),
  });

  const verifyType = watch("verifyType");

  type CardType = {
    label: string;
    value: string;
  };

  function getVerificationLabel(types: CardType[], value: string) {
    const match = types.find((type) => type.value === value);
    return match ? match.label : "";
  }

  async function onSubmit(data: any) {
    try {
      const formData = new FormData();
      formData.append("verify_type", data.verifyType);
      formData.append("full_name", data.fullName);
      formData.append("card_number", data.cardNumber);
      formData.append("phone_number", data.phoneNumber);
      const frontImage = data.frontImage;
      formData.append("front_image", {
        uri: frontImage.uri,
        type: frontImage.mimeType || "image/jpeg",
        name: frontImage.fileName || `upload_${Date.now()}.jpg`,
        size: frontImage.fileSize,
      } as any);
      const backImage = data.selfieImage;
      formData.append("selfie_image", {
        uri: backImage.uri,
        type: backImage.mimeType || "image/jpeg",
        name: backImage.fileName || `upload_${Date.now()}.jpg`,
        size: frontImage.fileSize,
      } as any);

      await manualVerification(formData).unwrap();
      reset();

      toast.success("Verification submitted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Internal server error");
    }
  }

  const verification_types: CardType[] = [
    { label: "NID Card", value: "NID" },
    { label: "Passport", value: "PASSPORT" },
    { label: "Driving Licence", value: "DRIVING_LICENSE" },
    { label: "Birth Certificate", value: "BIRTH_CERTIFICATE" },
  ];

  return (
    <Card>
      <FormAlert />

      <Controller
        name="verifyType"
        control={control}
        render={({ field }) => (
          <View>
            <ThemedText>Select verify card</ThemedText>
            <DropdownMenu
              value={field.value}
              onSelect={field.onChange}
              placeholder="Select verify card"
              items={verification_types}
              error={errors.verifyType?.message}
              border
            />
          </View>
        )}
      />
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <View>
            <ThemedText>
              {verifyType === "" || verifyType === undefined
                ? "Your original full name"
                : `Your ${getVerificationLabel(
                    verification_types,
                    verifyType
                  )} full name`}
            </ThemedText>
            <Input
              value={field.value}
              onChangeText={field.onChange}
              placeholder={
                verifyType === "" || verifyType === undefined
                  ? "Enter  original full name"
                  : `Enter ${getVerificationLabel(
                      verification_types,
                      verifyType
                    )} full name`
              }
              startIcon={
                <AppIcon color="text" size={20}>
                  <FontAwesome name="user" />
                </AppIcon>
              }
              error={errors.fullName?.message}
            />
          </View>
        )}
      />

      <Controller
        name="cardNumber"
        control={control}
        render={({ field }) => (
          <View>
            <ThemedText>
              {verifyType === "" || verifyType === undefined
                ? "Your card number"
                : `Your ${getVerificationLabel(
                    verification_types,
                    verifyType
                  )} number`}
            </ThemedText>
            <Input
              value={field.value}
              onChangeText={field.onChange}
              keyboardType="numeric"
              placeholder={
                verifyType === "" || verifyType === undefined
                  ? "Enter Card Number"
                  : `Enter ${getVerificationLabel(
                      verification_types,
                      verifyType
                    )} Number`
              }
              startIcon={
                <AppIcon color="text" size={18}>
                  <FontAwesome name="id-card" />
                </AppIcon>
              }
              error={errors.cardNumber?.message}
            />
          </View>
        )}
      />
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <View>
            <ThemedText>Your phone number</ThemedText>
            <Input
              value={field.value}
              onChangeText={field.onChange}
              keyboardType="numeric"
              placeholder="Enter phone number"
              startIcon={
                <AppIcon color="text" size={18}>
                  <FontAwesome name="phone" />
                </AppIcon>
              }
              error={errors.phoneNumber?.message}
            />
          </View>
        )}
      />
      <Controller
        name="frontImage"
        control={control}
        render={({ field }) => {
          const value = field.value as ImagePickerAsset;
          return (
            <View>
              <ThemedText>
                Card front side image where your face is visible
              </ThemedText>
              <ImagePicker
                value={value}
                onChange={field.onChange}
                error={errors.frontImage?.message}
              />

              {/* preview image  */}
              {field.value && (
                <Image
                  source={{ uri: value.uri }}
                  style={{
                    height: 150,
                    marginTop: 5,
                    borderRadius: 10,
                  }}
                />
              )}
            </View>
          );
        }}
      />
      <Controller
        name="selfieImage"
        control={control}
        render={({ field }) => {
          const value = field.value as ImagePickerAsset;
          return (
            <View>
              <ThemedText>Selfie with the front side of your card</ThemedText>
              <ImagePicker
                value={value}
                onChange={field.onChange}
                error={errors.selfieImage?.message}
              />

              {/* preview image  */}
              {field.value && (
                <Image
                  source={{ uri: value.uri }}
                  style={{
                    height: 150,
                    marginTop: 5,
                    borderRadius: 10,
                  }}
                />
              )}
            </View>
          );
        }}
      />

      <Button
        title="Submit"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        style={{ marginTop: 10 }}
      />
    </Card>
  );
};

export default ManualVerification;
