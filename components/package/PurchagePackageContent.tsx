import { PremiumPackage } from "@/types/PremiumPackage";
import React from "react";
import { View } from "react-native";
import PurchasePackCard from "./PurchasePackCard";

type Props = {
  packageInfo: PremiumPackage;
};

const PurchagePackageContent = ({ packageInfo }: Props) => {
  return (
    <View style={{ padding: 10 }}>
      <PurchasePackCard packageInfo={packageInfo} />
    </View>
  );
};

export default PurchagePackageContent;
