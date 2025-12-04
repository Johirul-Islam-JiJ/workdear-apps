import { Link } from "expo-router";
import React from "react";
import Button from "../libs/Button";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";

const NoPackagePurchase = () => {
  return (
    <Card>
      <ThemedText
        style={{ textAlign: "center", marginVertical: 15 }}
        color="gray.400"
      >
        You have not purchased any package
      </ThemedText>
      <Link href="/packages" asChild>
        <Button
          title="Buy a package"
          size="small"
          endIcon="arrow-up-right-box-outline"
        />
      </Link>
    </Card>
  );
};

export default NoPackagePurchase;
