import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ColorScheme } from "@/constants/Colors";

export type PositionData = {
  earning: number;
  job_provider: number;
  referrer: number;
  worker: number;
};

export type CategoryInfo = {
  key: keyof PositionData;
  label: string;
  icon: React.JSX.Element;
  badgeLabel: string;
};

export const categories: CategoryInfo[] = [
  {
    key: "earning",
    label: "Top Earner",
    icon: <Ionicons name="cash" />,
    badgeLabel: "Earnings",
  },
  {
    key: "worker",
    label: "Top Worker",
    icon: <Ionicons name="construct" />,
    badgeLabel: "Worker",
  },
  {
    key: "job_provider",
    label: "Top Job Provider",
    icon: <MaterialIcons name="work" />,
    badgeLabel: "Job Provider",
  },
  {
    key: "referrer",
    label: "Top Referrer",
    icon: <Ionicons name="people" />,
    badgeLabel: "Referrer",
  },
];

export const getRankColor = (rank: number): ColorScheme => {
  if (rank === 1) return "warning";
  if (rank === 2) return "silvar";
  if (rank === 3) return "orange";
  return "primarydark";
};
