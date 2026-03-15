/**
 * API Routes constants for all backend controllers
 * Maps to the ASP.NET Core API endpoints
 */
export class ApiRoutes {
  // Auth Controller - /auth
  static readonly AUTH_POST = '/auth';

  // Action Controller - /Action
  static readonly ACTION_GET_ALL = '/Action';
  static readonly ACTION_GET_BY_ID = '/Action';
  static readonly ACTION_POST = '/Action';
  static readonly ACTION_PUT = '/Action';
  static readonly ACTION_DELETE = '/Action';

  // Institution Controller - /Institution
  static readonly INSTITUTION_GET_ALL = '/Institution';
  static readonly INSTITUTION_GET_BY_ID = '/Institution';
  static readonly INSTITUTION_GET_BY_USER = '/institution/institution_by_user';
  static readonly INSTITUTION_POST = '/Institution';
  static readonly INSTITUTION_PUT = '/Institution';
  static readonly INSTITUTION_DELETE = '/Institution';

  // Lottery Controller - /Lottery
  static readonly LOTTERY_GET_ALL = '/Lottery';
  static readonly LOTTERY_GET_BY_ID = '/Lottery';
  static readonly LOTTERY_POST = '/Lottery';
  static readonly LOTTERY_PUT = '/Lottery';
  static readonly LOTTERY_DELETE = '/Lottery';

  // Page Controller - /api/Page
  static readonly PAGE_GET_ALL = '/api/Page';
  static readonly PAGE_GET_BY_ID = '/api/Page';
  static readonly PAGE_POST = '/api/Page';
  static readonly PAGE_PUT = '/api/Page';
  static readonly PAGE_DELETE = '/api/Page';

  // Permission Controller - /Permission
  static readonly PERMISSION_GET_ALL = '/Permission';
  static readonly PERMISSION_GET_BY_ID = '/Permission';
  static readonly PERMISSION_POST = '/Permission';
  static readonly PERMISSION_PUT = '/Permission';
  static readonly PERMISSION_DELETE = '/Permission';

  // StatusTicketbook Controller - /StatusTicketbook
  static readonly STATUS_TICKETBOOK_GET_ALL = '/StatusTicketbook';
  static readonly STATUS_TICKETBOOK_GET_BY_ID = '/StatusTicketbook';
  static readonly STATUS_TICKETBOOK_POST = '/StatusTicketbook';
  static readonly STATUS_TICKETBOOK_PUT = '/StatusTicketbook';
  static readonly STATUS_TICKETBOOK_DELETE = '/StatusTicketbook';

  // Ticket Controller - /Ticket
  static readonly TICKET_GET_ALL = '/Ticket';
  static readonly TICKET_GET_BY_ID = '/Ticket';
  static readonly TICKET_POST = '/Ticket';
  static readonly TICKET_PUT = '/Ticket';
  static readonly TICKET_DELETE = '/Ticket';

  // Ticketbook Controller - /Ticketbook
  static readonly TICKETBOOK_GET_RETURNEDS = '/ticketbook/returneds';
  static readonly TICKETBOOK_GET_WITHDRAWNS = '/ticketbook/withdrawns';
  static readonly TICKETBOOK_GET_ALL = '/ticketbook';
  static readonly TICKETBOOK_GET_BY_ID = '/ticketbook';
  static readonly TICKETBOOK_POST = '/ticketbook';
  static readonly TICKETBOOK_PUT = '/ticketbook';
  static readonly TICKETBOOK_DELETE = '/ticketbook';

  // User Controller - /User
  static readonly USER_GET_ALL = '/User';
  static readonly USER_GET_BY_ID = '/User';
  static readonly USER_POST = '/User';
  static readonly USER_PUT = '/User';
  static readonly USER_DELETE = '/User';

  // UserInstitution Controller - /UserInstitution
  static readonly USER_INSTITUTION_GET_ALL = '/UserInstitution';
  static readonly USER_INSTITUTION_GET_BY_ID = '/UserInstitution';
  static readonly USER_INSTITUTION_POST = '/UserInstitution';
  static readonly USER_INSTITUTION_PUT = '/UserInstitution';
  static readonly USER_INSTITUTION_DELETE = '/UserInstitution';

  // UserPermission Controller - /UserPermission
  static readonly USER_PERMISSION_GET_BY_ID = '/UserPermission';
  static readonly USER_PERMISSION_POST = '/UserPermission';
  static readonly USER_PERMISSION_DELETE = '/UserPermission';

  // UserType Controller - /UserType
  static readonly USER_TYPE_GET_ALL = '/UserType';
  static readonly USER_TYPE_GET_BY_ID = '/UserType';
  static readonly USER_TYPE_POST = '/UserType';
  static readonly USER_TYPE_PUT = '/UserType';
  static readonly USER_TYPE_DELETE = '/UserType';
}
