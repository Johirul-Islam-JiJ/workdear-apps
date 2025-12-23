import Container from "@/components/common/Container";
import OverView from "@/components/profile/OverView";
import PackageInfo from "@/components/profile/PackageInfo";
import ProfileHeader from "@/components/profile/ProfileHeader";
import React from "react";

const Profile = () => {
  return (
    <Container>
      <ProfileHeader />
      <PackageInfo />
      <OverView />
    </Container>
  );
};

export default Profile;
