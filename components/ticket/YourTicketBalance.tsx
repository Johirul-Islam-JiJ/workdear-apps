import React from "react";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

type Props = {
  tisSeason: string | number;
  allTime: number | string;
};

const YourTicketBalance = ({ tisSeason, allTime }: Props) => {
  const CardRender = ({
    title,
    value,
  }: {
    title: string | number;
    value: string | number;
  }) => {
    return (
      <ThemedView color="border" style={{ padding: 10, borderRadius: 10 }}>
        <ThemedText variant="subtitle">{title}</ThemedText>
        <ThemedText variant="h2">{value}</ThemedText>
      </ThemedView>
    );
  };

  return (
    <Card>
      <ThemedText variant="subtitle">Your ticket balance</ThemedText>
      <CardRender title="This Season" value={tisSeason} />
      <CardRender title="All Time" value={allTime} />
    </Card>
  );
};

export default YourTicketBalance;
