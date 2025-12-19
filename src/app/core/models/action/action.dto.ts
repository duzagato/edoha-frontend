/**
 * DTO for Action entity
 * Maps to Action entity in backend
 */
export interface ActionDTO {
  id: string;
  name: string;
  description: string | null;
  withoutOwner: boolean;
  otherOwner: boolean;
  createdAt: string;
  createdBy: string | null;
}

/**
 * DTO for creating a new Action
 * Maps to CreateActionDTO in backend
 */
export interface CreateActionDTO {
  name: string;
  description?: string | null;
  withoutOwner?: boolean | null;
  otherOwner?: boolean | null;
}

/**
 * DTO for updating an Action
 * Maps to UpdateActionDTO in backend
 */
export interface UpdateActionDTO {
  name?: string | null;
  description?: string | null;
  withoutOwner?: boolean | null;
  otherOwner?: boolean | null;
}
