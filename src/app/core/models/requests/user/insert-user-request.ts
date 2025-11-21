export interface InsertUserRequest {
  Name: string;
  Phone?: string | null;
  Nickname?: string | null;
  UnhashedPassword?: string | null;
}