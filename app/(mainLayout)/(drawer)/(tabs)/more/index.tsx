import { moreMenus } from "@/_mock/menus";
import Container from "@/components/common/Container";
import MoreMenuSection from "@/components/more/MoreMenuSection";
import React from "react";

const MoreScreen = () => {
  return (
    <Container rowGap={20}>
      {moreMenus.map((item, index) => (
        <MoreMenuSection key={index} menuContent={item} />
      ))}
    </Container>
  );
};

export default MoreScreen;
