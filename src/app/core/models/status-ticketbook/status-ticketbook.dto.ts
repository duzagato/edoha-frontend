/**
 * DTO for StatusTicketbook entity
 * Maps to StatusTicketbook entity in backend
 */
export interface StatusTicketbookDTO {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string | null;
}

/**
 * DTO for creating a new StatusTicketbook
 * Maps to CreateStatusTicketbookDTO in backend
 */
export interface CreateStatusTicketbookDTO {
  name?: string;
}

/**
 * DTO for updating a StatusTicketbook
 * Maps to UpdateStatusTicketbookDTO in backend
 */
export interface UpdateStatusTicketbookDTO {
  name?: string;
}
