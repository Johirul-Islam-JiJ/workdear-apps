import Container from "@/components/common/Container";
import TopJobPosterContent from "@/components/top-ranking/TopJobPosterContent";
import React from "react";

const TopJobPoster = () => {
  return (
    <Container rowGap={5}>
      <TopJobPosterContent />
    </Container>
  );
};

export default TopJobPoster;
