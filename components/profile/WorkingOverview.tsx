import { useAppSelector } from "@/hooks/redux";
import React from "react";
import OverViewCard from "./OverViewCard";
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

  const overviewContent = {
    title: "Overview",
    tag: "Total Working",
    rating: user_rating?.star_count,
    works: [
      {
        title: "Task Attend",
        value: user_rating?.total_submissions,
      },
      {
        title: "Satisfied",
        value: user_rating?.satisfied_count,
      },
      {
        title: "Not Satisfied",
        value: user_rating?.unsatisfied_count,
      },
      {
        title: "Pending",
        value: user_rating?.pending,
      },
      {
        title: "Total Earn",
        value: `$${user?.user_transaction_record?.job_earn}` || "_",
      },
    ],
  } as any;

  return (
    <>
      <StatusCard data={statusContent} />
      <OverViewCard data={overviewContent} />
    </>
  );
};

export default WorkingOverview;
