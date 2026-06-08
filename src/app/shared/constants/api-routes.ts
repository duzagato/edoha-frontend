export class ApiRoutes {
  // Auth Controller - /auth
  static readonly AUTH_POST = '/auth';

  // Action Controller - /action
  static readonly ACTION_GET_ALL = '/action';
  static readonly ACTION_GET_BY_ID = '/action/{id}';
  static readonly ACTION_POST = '/action';
  static readonly ACTION_PUT = '/action';
  static readonly ACTION_DELETE = '/action/{id}';

  // Institution Controller - /institution
  static readonly INSTITUTION_GET_ALL = '/institution';
  static readonly INSTITUTION_GET_BY_SLUG = '/institution/{slug}';
  static readonly INSTITUTION_GET_BY_USER = '/institution/institution_by_user/{idUser}';
  static readonly INSTITUTION_POST = '/institution';
  static readonly INSTITUTION_PUT = '/institution';
  static readonly INSTITUTION_DELETE = '/institution/{id}';

  // Lottery Controller - /institution/{idInstitution}/lottery
  static readonly LOTTERY_GET_ALL = '/institution/{idInstitution}/lottery';
  static readonly LOTTERY_GET_BY_ID = '/institution/{idInstitution}/lottery/{id}';
  static readonly LOTTERY_POST = '/institution/{idInstitution}/lottery';
  static readonly LOTTERY_PUT = '/institution/{idInstitution}/lottery';
  static readonly LOTTERY_DELETE = '/institution/{idInstitution}/lottery/{id}';

  // Page Controller - /api/page
  static readonly PAGE_GET_ALL = '/api/page';
  static readonly PAGE_GET_BY_ID = '/api/page/{id}';
  static readonly PAGE_POST = '/api/page';
  static readonly PAGE_PUT = '/api/page';
  static readonly PAGE_DELETE = '/api/page/{id}';

  // Permission Controller - /permission
  static readonly PERMISSION_GET_ALL = '/permission';
  static readonly PERMISSION_GET_BY_ID = '/permission/{id}';
  static readonly PERMISSION_POST = '/permission';
  static readonly PERMISSION_PUT = '/permission';
  static readonly PERMISSION_DELETE = '/permission/{id}';

  // StatusTicketbook Controller - /statusticketbook
  static readonly STATUS_TICKETBOOK_GET_ALL = '/statusticketbook';
  static readonly STATUS_TICKETBOOK_GET_BY_ID = '/statusticketbook/{id}';
  static readonly STATUS_TICKETBOOK_POST = '/statusticketbook';
  static readonly STATUS_TICKETBOOK_PUT = '/statusticketbook';
  static readonly STATUS_TICKETBOOK_DELETE = '/statusticketbook/{id}';

  // TableConfiguration Controller - /tableconfiguration
  static readonly TABLE_CONFIGURATION_GET = '/tableconfiguration/{schema}/{tableName}';

  // Ticket Controller - /ticketbook/{idTicketbook}/ticket
  static readonly TICKET_GET_ALL = '/ticketbook/{idTicketbook}/ticket';
  static readonly TICKET_GET_BY_ID = '/ticketbook/{idTicketbook}/ticket/{id}';
  static readonly TICKET_POST = '/ticketbook/{idTicketbook}/ticket';
  static readonly TICKET_PUT = '/ticketbook/{idTicketbook}/ticket';
  static readonly TICKET_DELETE = '/ticketbook/{idTicketbook}/ticket/{id}';

  // Ticketbook Controller - /lottery/{idLottery}/ticketbook
  static readonly TICKETBOOK_GET_ALL = '/lottery/{idLottery}/ticketbook';
  static readonly TICKETBOOK_GET_BY_ID = '/lottery/{idLottery}/ticketbook/{id}';
  static readonly TICKETBOOK_GET_BY_NUMBER = '/lottery/{idLottery}/ticketbook/ticketbook_by_number/{numberTicketbook}';
  static readonly TICKETBOOK_GET_RETURNEDS = '/lottery/{idLottery}/ticketbook/returneds';
  static readonly TICKETBOOK_GET_WITHDRAWNS = '/lottery/{idLottery}/ticketbook/withdrawns';
  static readonly TICKETBOOK_POST = '/lottery/{idLottery}/ticketbook';
  static readonly TICKETBOOK_PUT = '/lottery/{idLottery}/ticketbook';
  static readonly TICKETBOOK_DELETE = '/lottery/{idLottery}/ticketbook/{id}';
  static readonly TICKETBOOK_PATCH_STATUS = '/lottery/{idLottery}/ticketbook/{idTicketbook}/status/{idStatusTicketbook}';
  static readonly TICKETBOOK_PATCH_STATUS_RETURNED = '/lottery/{idLottery}/ticketbook/{idTicketbook}/status/returned';
  static readonly TICKETBOOK_PATCH_STATUS_WITHDRAW = '/lottery/{idLottery}/ticketbook/{idTicketbook}/status/withdraw';

  // User Controller - /user
  static readonly USER_GET_ALL = '/user';
  static readonly USER_GET_BY_ID = '/user/{id}';
  static readonly USER_GET_INFORMATION = '/user/user_information';
  static readonly USER_POST = '/user';
  static readonly USER_PUT = '/user';
  static readonly USER_DELETE = '/user/{id}';

  // UserInstitution Controller - /userinstitution
  static readonly USER_INSTITUTION_GET_ALL = '/userinstitution';
  static readonly USER_INSTITUTION_GET_BY_ID = '/userinstitution/{id}';
  static readonly USER_INSTITUTION_POST = '/userinstitution';
  static readonly USER_INSTITUTION_PUT = '/userinstitution';
  static readonly USER_INSTITUTION_DELETE = '/userinstitution/{id}';

  // UserPermission Controller - /userpermission
  static readonly USER_PERMISSION_GET_BY_ID = '/userpermission/{id}';
  static readonly USER_PERMISSION_POST = '/userpermission';
  static readonly USER_PERMISSION_DELETE = '/userpermission/{id}';

  // UserType Controller - /usertype
  static readonly USER_TYPE_GET_ALL = '/usertype';
  static readonly USER_TYPE_GET_BY_ID = '/usertype/{id}';
  static readonly USER_TYPE_POST = '/usertype';
  static readonly USER_TYPE_PUT = '/usertype';
  static readonly USER_TYPE_DELETE = '/usertype/{id}';
}
