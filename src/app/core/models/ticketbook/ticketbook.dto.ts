/**
 * DTO for Ticketbook entity
 * Maps to Ticketbook entity in backend
 */
export interface TicketbookDTO {
  id: string;
  idLottery: string;
  idOwner: string | null;
  idHolder: string | null;
  idStatusTicketbook: string;
  number: number;
  withdrawnDate: string | null;
  devolutionDate: string | null;
  createdAt: string;
  createdBy: string | null;
}

/**
 * DTO for creating a new Ticketbook
 * Maps to CreateTicketbookDTO in backend
 */
export interface CreateTicketbookDTO {
  idLottery: string;
  idOwner?: string | null;
  idHolder?: string | null;
  idStatusTicketbook: string;
  number: number;
  withdrawnDate?: string | null;
  devolutionDate?: string | null;
}

/**
 * DTO for updating a Ticketbook
 * Maps to UpdateTicketbookDTO in backend
 */
export interface UpdateTicketbookDTO {
  idOwner?: string | null;
  idHolder?: string | null;
  idStatusTicketbook: string;
  withdrawnDate?: string | null;
  devolutionDate?: string | null;
}
