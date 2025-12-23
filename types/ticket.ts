export type RecentBuyers = {
  ticket_buy: string;
  user: string;
};

export type TopTicketBuyer = {
  rank: number;
  ticket_buy: string;
  user: string;
};

export type PreviousDayWinners = {
  rank: string;
  reward: string;
  user: string;
};

export type TicketType = {
  draw_date: string;
  per_ticket_price: string;
  previous_days_winners: PreviousDayWinners[];
  recent_buyers: RecentBuyers[];
  status: boolean;
  top_ticket_buyers: TopTicketBuyer[];
  user_data: {
    all_ticket: string;
    seasonal_ticket: number;
  };
};
