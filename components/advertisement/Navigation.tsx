import { Link } from "expo-router";
import React from "react";
import Button from "../libs/Button";

const Navigation = () => {
  return (
    <Link href="/(mainLayout)/add-advertisement" asChild>
      <Button
        title="Add Advertisement"
        size="small"
        style={{ alignSelf: "flex-end" }}
        endIcon="arrow-up-right-box-outline"
      />
    </Link>
  );
};

export default Navigation;
