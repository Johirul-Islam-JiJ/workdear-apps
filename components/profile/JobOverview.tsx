import { useAppSelector } from "@/hooks/redux";
import React from "react";
import OverViewCard from "./OverViewCard";
import StatusCard from "./StatusCard";

const JobOverview = () => {
  const { user } = useAppSelector((state) => state.user);

  const { user_rating } = user || {};

  const statusContent = {
    title: "Job Status",
    satisfied: user_rating?.satisfied_percentage,
    unsatisfied: user_rating?.unsatisfied_percentage,
    pending: user_rating?.pending_percentage,
  } as any;

  const overviewContent = {
    title: "Overview",
    tag: "Job Status",
    rating: user_rating?.star_count,
    works: [
      {
        title: "Valid Job Posted",
        value: user_rating?.job_posted_count,
      },
      {
        title: "Total Deposit",
        value: `$${user?.user_transaction_record?.deposit}` || "_",
      },
      {
        title: "Paid",
        value: `$${user?.user_transaction_record?.job_paid}` || "_",
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

export default JobOverview;
