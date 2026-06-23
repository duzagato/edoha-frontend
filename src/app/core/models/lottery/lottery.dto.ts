/**
 * DTO for Lottery entity
 * Maps to Lottery entity in backend
 */
export interface Lottery {
  id: string;
  name: string;
  numTicketsTicketbook: number;
  numTicketbooks: number;
  priceTicket: number;
  doubleChance: boolean;
  createdAt: string;
  createdBy: string | null;
}

/**
 * DTO for creating a new Lottery
 * Maps to CreateLotteryDTO in backend
 */
export interface CreateLotteryDTO {
  name: string;
  numTicketsTicketbook: number;
  numTicketbooks: number;
  priceTicket: number;
  doubleChance: boolean;
}

/**
 * DTO for updating a Lottery
 * Maps to UpdateLotteryDTO in backend
 */
export interface UpdateLotteryDTO {
  id: string;
  name: string;
  numTicketsTicketbook: number;
  numTicketbooks: number;
  priceTicket: number;
  doubleChance: boolean;
}
