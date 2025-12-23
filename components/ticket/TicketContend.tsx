import { useGetTicketQuery } from "@/store/features/ticket";
import React from "react";
import { Dimensions } from "react-native";
import LoadingIndicator from "../libs/LoadingIndicator";
import BuyTicket from "./BuyTicket";
import RecentPurchase from "./RecentPurchase";
import TicketBalance from "./TicketBalance";
import TimeCountdown from "./TimeCountdown";
import TopTicketBuyer from "./TopTicketBuyer";
import PreviousDayWinner from "./previousDayWinner";

const TicketContend = () => {
  const { data, isLoading } = useGetTicketQuery(undefined);

  if (isLoading) {
    return (
      <LoadingIndicator
        fullScreen
        style={{ height: Dimensions.get("screen").height - 100 }}
      />
    );
  }

  return (
    <>
      <BuyTicket unitPrice={data?.per_ticket_price ?? "0"} />
      <TicketBalance
        allTime={data?.user_data?.all_ticket ?? 0}
        tisSeason={data?.user_data?.seasonal_ticket ?? 0}
      />
      <TimeCountdown drawTime={data?.draw_date ?? ""} />
      <RecentPurchase data={data?.recent_buyers ?? []} />
      <TopTicketBuyer data={data?.top_ticket_buyers ?? []} />
      <PreviousDayWinner data={data?.previous_days_winners ?? []} />
    </>
  );
};

export default TicketContend;
