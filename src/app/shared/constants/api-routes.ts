/**
 * API Routes constants for all backend controllers
 * Maps to the ASP.NET Core API endpoints
 */
export class ApiRoutes {
  // Auth Controller - /auth
  static readonly AUTH_POST = '/auth';

  // Action Controller - /action
  static readonly ACTION_GET_ALL = '/action';
  static readonly ACTION_GET_BY_ID = '/action';
  static readonly ACTION_POST = '/action';
  static readonly ACTION_PUT = '/action';
  static readonly ACTION_DELETE = '/action';

  // Institution Controller - /institution
  static readonly INSTITUTION_GET_ALL = '/institution';
  static readonly INSTITUTION_GET_BY_ID = '/institution';
  static readonly INSTITUTION_POST = '/institution';
  static readonly INSTITUTION_PUT = '/institution';
  static readonly INSTITUTION_DELETE = '/institution';

  // Lottery Controller - /lottery
  static readonly LOTTERY_GET_ALL = '/lottery';
  static readonly LOTTERY_GET_BY_ID = '/lottery';
  static readonly LOTTERY_POST = '/lottery';
  static readonly LOTTERY_PUT = '/lottery';
  static readonly LOTTERY_DELETE = '/lottery';

  // Page Controller - /api/page
  static readonly PAGE_GET_ALL = '/api/page';
  static readonly PAGE_GET_BY_ID = '/api/page';
  static readonly PAGE_POST = '/api/page';
  static readonly PAGE_PUT = '/api/page';
  static readonly PAGE_DELETE = '/api/page';

  // Permission Controller - /permission
  static readonly PERMISSION_GET_ALL = '/permission';
  static readonly PERMISSION_GET_BY_ID = '/permission';
  static readonly PERMISSION_POST = '/permission';
  static readonly PERMISSION_PUT = '/permission';
  static readonly PERMISSION_DELETE = '/permission';

  // StatusTicketbook Controller - /statusticketbook
  static readonly STATUS_TICKETBOOK_GET_ALL = '/statusticketbook';
  static readonly STATUS_TICKETBOOK_GET_BY_ID = '/statusticketbook';
  static readonly STATUS_TICKETBOOK_POST = '/statusticketbook';
  static readonly STATUS_TICKETBOOK_PUT = '/statusticketbook';
  static readonly STATUS_TICKETBOOK_DELETE = '/statusticketbook';

  // Ticket Controller - /ticket
  static readonly TICKET_GET_ALL = '/ticket';
  static readonly TICKET_GET_BY_ID = '/ticket';
  static readonly TICKET_POST = '/ticket';
  static readonly TICKET_PUT = '/ticket';
  static readonly TICKET_DELETE = '/ticket';

  // Ticketbook Controller - /ticketbook
  static readonly TICKETBOOK_GET_ALL = '/ticketbook';
  static readonly TICKETBOOK_GET_BY_ID = '/ticketbook';
  static readonly TICKETBOOK_POST = '/ticketbook';
  static readonly TICKETBOOK_PUT = '/ticketbook';
  static readonly TICKETBOOK_DELETE = '/ticketbook';

  // User Controller - /user
  static readonly USER_GET_ALL = '/user';
  static readonly USER_GET_BY_ID = '/user';
  static readonly USER_POST = '/user';
  static readonly USER_PUT = '/user';
  static readonly USER_DELETE = '/user';

  // UserInstitution Controller - /userinstitution
  static readonly USER_INSTITUTION_GET_ALL = '/userinstitution';
  static readonly USER_INSTITUTION_GET_BY_ID = '/userinstitution';
  static readonly USER_INSTITUTION_POST = '/userinstitution';
  static readonly USER_INSTITUTION_PUT = '/userinstitution';
  static readonly USER_INSTITUTION_DELETE = '/userinstitution';

  // UserPermission Controller - /userpermission
  static readonly USER_PERMISSION_GET_BY_ID = '/userpermission';
  static readonly USER_PERMISSION_POST = '/userpermission';
  static readonly USER_PERMISSION_DELETE = '/userpermission';

  // UserType Controller - /usertype
  static readonly USER_TYPE_GET_ALL = '/usertype';
  static readonly USER_TYPE_GET_BY_ID = '/usertype';
  static readonly USER_TYPE_POST = '/usertype';
  static readonly USER_TYPE_PUT = '/usertype';
  static readonly USER_TYPE_DELETE = '/usertype';
}
