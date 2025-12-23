import Container from "@/components/common/Container";
import TopUserContent from "@/components/top-ranking/TopUserContent";
import React from "react";

const TopUser = () => {
  return (
    <Container rowGap={5}>
      <TopUserContent />
    </Container>
  );
};

export default TopUser;
