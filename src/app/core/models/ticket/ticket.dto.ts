/**
 * DTO for Ticket entity
 * Maps to Ticket entity in backend
 */
export interface TicketDTO {
  idTicketbook: string;
  idDonater: string;
  number: number;
  soldDate: string | null;
}

export interface Ticket {
  idTicketbook: string;
  idDonater: string;
  number: number;
  soldDate: string | null;
}

/**
 * DTO for creating a new Ticket
 * Maps to CreateTicketDTO in backend
 */
export interface CreateTicketDTO {
  idTicketbook: string;
  idDonater?: string | null;
  number: number;
  soldDate?: string | null;
}

/**
 * DTO for updating a Ticket
 * Maps to UpdateTicketDTO in backend
 */
export interface UpdateTicketDTO {
  id: string;
  idDonater?: string | null;
  soldDate?: string | null;
}
