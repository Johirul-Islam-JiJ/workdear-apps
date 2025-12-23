import Container from "@/components/common/Container";
import MyWorkContent from "@/components/my-work/MyWorkContent";
import React from "react";

const MyWorkScreen = () => {
  return (
    <Container rowGap={20}>
      <MyWorkContent />
    </Container>
  );
};

export default MyWorkScreen;
