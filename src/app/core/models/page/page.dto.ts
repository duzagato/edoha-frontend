/**
 * DTO for Page entity
 * Maps to Page entity in backend
 */
export interface PageDTO {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  createdBy: string | null;
}

/**
 * DTO for creating a new Page
 * Maps to CreatePage in backend
 */
export interface CreatePageDTO {
  name: string;
  description?: string | null;
}

/**
 * DTO for updating a Page
 * Maps to UpdatePage in backend
 */
export interface UpdatePageDTO {
  name?: string | null;
  description?: string | null;
}
