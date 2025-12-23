import { Advertisement } from "@/types/Advertisement";
import React from "react";
import AdvertisementCard from "./AdvertisementCard";

const AdvertisementList = ({ data }: { data: Advertisement[] }) => {
  return (
    <>
      {data.map((ads) => (
        <AdvertisementCard key={ads.id} ads={ads} />
      ))}
    </>
  );
};

export default AdvertisementList;
