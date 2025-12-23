import Container from "@/components/common/Container";
import TopReffererContent from "@/components/top-ranking/TopReffererContent";
import React from "react";

const TopRefferer = () => {
  return (
    <Container rowGap={5}>
      <TopReffererContent />
    </Container>
  );
};

export default TopRefferer;
