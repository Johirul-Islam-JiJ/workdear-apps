import { useAppSelector } from "@/hooks/redux";
import React from "react";
import StatusCard from "./StatusCard";

const WorkingOverview = () => {
  const { user } = useAppSelector((state) => state.user);

  const { user_rating } = user || {};

  const statusContent = {
    title: "Working Status",
    satisfied: user_rating?.satisfied_percentage,
    unsatisfied: user_rating?.unsatisfied_percentage,
    pending: user_rating?.pending_percentage,
  } as any;

  return (
    <>
      <StatusCard data={statusContent} />
    </>
  );
};

export default WorkingOverview;
