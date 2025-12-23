import { selectOptions } from "@/_mock/selectOptions";
import React from "react";
import { DropdownMenu } from "../libs/DropdownMenu";

type Props = {
  onStatusChange: React.Dispatch<React.SetStateAction<string>>;
};

const AdvertisementFilter = ({ onStatusChange }: Props) => {
  return (
    <DropdownMenu
      items={selectOptions.ads.status_type}
      onSelect={(value) => onStatusChange(value)}
      placeholder="Filter by status"
      title="Filter by status"
      border
    />
  );
};

export default AdvertisementFilter;
