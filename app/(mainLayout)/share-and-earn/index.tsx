import Container from "@/components/common/Container";
import AffiliateLinkCard from "@/components/share-and-earn/AffiliateLinkCard";
import AffiliateProgramControl from "@/components/share-and-earn/AffiliateProgramControl";
import React from "react";

const ShareAndEarn = () => {
  return (
    <Container rowGap={20}>
      <AffiliateLinkCard />
      <AffiliateProgramControl />
    </Container>
  );
};

export default ShareAndEarn;
