import Container from "@/components/common/Container";
import AccountDeactivation from "@/components/setting/AccountDeactivation";
import AccountPassword from "@/components/setting/AccountPassword";
import EditProfile from "@/components/setting/EditProfile";
import React from "react";

const Settings = () => {
  return (
    <Container>
      <EditProfile />
      <AccountPassword />
      <AccountDeactivation />
    </Container>
  );
};

export default Settings;
