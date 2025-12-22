import { useGetTicketQuery } from "@/store/features/ticket";
import React from "react";
import { Dimensions, View } from "react-native";
import LoadingIndicator from "../libs/LoadingIndicator";
import BuyNewTicket from "./BuyNewTicket";
import YourTicketBalance from "./YourTicketBalance";

const TicketContend = () => {
  const { data, isLoading } = useGetTicketQuery(undefined);

  if (isLoading)
    return (
      <LoadingIndicator
        fullScreen
        style={{ height: Dimensions.get("screen").height - 100 }}
      />
    );

  return (
    <View style={{ gap: 10, padding: 10 }}>
      <BuyNewTicket />
      <YourTicketBalance
        allTime={data?.user_data?.all_ticket ?? 0}
        tisSeason={data?.user_data?.seasonal_ticket ?? 0}
      />
    </View>
  );
};

export default TicketContend;
