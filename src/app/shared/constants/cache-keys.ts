/**
 * Cache keys for sessionStorage/localStorage
 */
export class CacheKeys {
  static readonly JWT_TOKEN = 'edoha_jwt_token';
  static readonly USER_DATA = 'edoha_user_data';
  static readonly CURRENT_INSTITUTION = 'edoha_current_institution';
  static readonly USER_PERMISSIONS = 'edoha_user_permissions';
  static readonly ID_USER = 'idUser';
  static readonly ID_INSTITUTION = 'idInstitution';
  static readonly LOTTERY_STORAGE_PREFIX = 'lottery';
  static readonly INSTITUTION_STORAGE_PREFIX = 'institution';
  static readonly USER_STORAGE_PREFIX = 'user';
}

export class SessionKeys {
  static readonly USER_ID = 'userId';
  static readonly INSTITUTION_PUBLIC_DATA = 'institution:{slug}';
  static readonly INSTITUTION_ID = 'institution:id';
  static readonly INSTITUTION_SLUG = 'institution:slug';
  static readonly INSTITUTION_SHORT_NAME = 'institution:shortName';
}