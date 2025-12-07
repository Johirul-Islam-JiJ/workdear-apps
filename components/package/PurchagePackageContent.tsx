import { PremiumPackage } from "@/types/PremiumPackage";
import React from "react";
import { View } from "react-native";
import PakcageFeatureList from "./PakcageFeatureList";
import PurchasePackCard from "./PurchasePackCard";

type Props = {
  packageInfo: PremiumPackage;
};

const PurchagePackageContent = ({ packageInfo }: Props) => {
  return (
    <View style={{ padding: 10, rowGap: 10 }}>
      <PurchasePackCard packageInfo={packageInfo} />
      <PakcageFeatureList packageInfo={packageInfo} />
    </View>
  );
};

export default PurchagePackageContent;
