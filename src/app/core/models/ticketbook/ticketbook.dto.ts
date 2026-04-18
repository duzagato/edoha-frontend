import { Ticket, TicketInformation } from "../ticket/ticket.dto";

/**
 * Ticket data for the sell (venda) form.
 * Represents a single ticket within a ticketbook, with buyer information.
 */
export interface TicketSellData {
  number: number;
  donaterName: string;
  donaterPhone: string;
}

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

export interface UserContact {
  id: string;
  name: string;
  phone: string;
}

export interface Ticketbook {
  id: string;
  idLottery: string;
  ticketbookOwner: UserContact;
  ticketbookHolder: UserContact | null;
  idStatusTicketbook: string;
  number: number;
  tickets: Ticket[];
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
  ticketbookHolder?: TicketbookPersonDTO | null;
  ticketbookOwner: TicketbookPersonDTO;
  number: number;
  idStatusTicketbook: number;
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


export interface WithdrawTicketbookRequest {
  ticketbookHolder?: TicketbookPersonDTO | null;
  ticketbookOwner: TicketbookPersonDTO;
  idStatusTicketbook: number;
  number: number;
  withdrawnDate: string | null;
  devolutionDate: string | null;
}

export interface ReturnedTicketbookRequest {
  ticketbookHolder?: TicketbookPersonDTO | null;
  ticketbookOwner: TicketbookPersonDTO;
  number: number;
  tickets: TicketInformation[]
}