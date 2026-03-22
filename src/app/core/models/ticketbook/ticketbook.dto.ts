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
 * Represents a ticket sale entry within a ticketbook.
 * Used to record buyer information for each ticket.
 */
export interface Ticket {
  number: number;
  donaterName: string;
  donaterPhone: string;
}

export interface Ticketbook {
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
  tickets?: Ticket[];
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

/**
 * Person (owner or holder) embedded in a withdrawal request
 */
export interface TicketbookPersonDTO {
  name: string;
  phone: string;
}

/**
 * DTO for registering a ticketbook withdrawal via
 * POST /institution/{idInstitution}/lottery/{idLottery}/ticketbook
 */
export interface WithdrawTicketbookDTO {
  ticketbookHolder?: TicketbookPersonDTO | null;
  ticketbookOwner: TicketbookPersonDTO;
  idStatusTicketbook: number;
  number: number;
  withdrawnDate: string | null;
  devolutionDate: string | null;
}
