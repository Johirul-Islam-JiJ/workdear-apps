import Container from "@/components/common/Container";
import AccountPassword from "@/components/setting/AccountPassword";
import EditProfile from "@/components/setting/EditProfile";
import React from "react";

const Settings = () => {
  return (
    <Container>
      <EditProfile />
      <AccountPassword />
    </Container>
  );
};

export default Settings;
