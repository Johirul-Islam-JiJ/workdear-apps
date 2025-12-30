import React from "react";
import NavBar from "./NavBar";

const ScreenHeader = ({
  route,
  openDrawer = true,
}: {
  route: string;
  openDrawer?: boolean;
}) => {
  return <NavBar route={route} openDrawer={openDrawer} />;
};

export default ScreenHeader;
