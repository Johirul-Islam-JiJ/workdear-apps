import Container from "@/components/common/Container";
import TopWorkerContent from "@/components/top-ranking/TopWorkerContent";
import React from "react";

const TopWorker = () => {
  return (
    <Container rowGap={5}>
      <TopWorkerContent />
    </Container>
  );
};

export default TopWorker;
