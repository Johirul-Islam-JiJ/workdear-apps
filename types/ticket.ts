export type TicketType = {
  draw_date: string;
  per_ticket_price: string;
  previous_days_winners: string[];
  recent_buyers: string[];
  status: boolean;
  top_ticket_buyers: string[];
  user_data: {
    all_ticket: string;
    seasonal_ticket: number;
  };
};
