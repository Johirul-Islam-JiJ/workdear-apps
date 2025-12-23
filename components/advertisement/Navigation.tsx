import { useRouter } from "expo-router";
import React from "react";
import Button from "../libs/Button";

const Navigation = () => {
  const router = useRouter();
  return (
    <Button
      onPress={() => router.push("/(mainLayout)/advertisement/add")}
      title="Add Advertisement"
      size="small"
      style={{ alignSelf: "flex-end" }}
      endIcon="arrow-up-right-box-outline"
    />
  );
};

export default Navigation;
