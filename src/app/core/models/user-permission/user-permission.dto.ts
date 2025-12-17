import { ActionDTO } from '../action';

/**
 * DTO for UserPermission entity
 * Maps to UserPermission entity in backend
 */
export interface UserPermissionDTO {
  idUser: string;
  idPage: string;
  idPermission: string;
  idAction: string;
  createdAt: string;
  createdBy: string | null;
}

/**
 * DTO for creating a new UserPermission
 * Maps to CreateUserPermissionDTO in backend
 */
export interface CreateUserPermissionDTO {
  idUser: string;
  idPage: string;
  idPermission: string;
  idAction: string;
}

/**
 * Expanded UserPermission with additional details
 * Maps to UserPermissionExpand in backend
 */
export interface UserPermissionExpandDTO {
  pageName: string;
  actionName: string;
  withoutOwner: boolean;
  otherOwner: boolean;
}

/**
 * UserPermission grouped by page
 * Maps to UserPermissionPage in backend
 */
export interface UserPermissionPageDTO {
  pageName: string;
  actions: ActionDTO[];
}
