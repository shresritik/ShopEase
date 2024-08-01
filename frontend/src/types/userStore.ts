export interface UserProfileState {
  id?: number;
  name?: string;
  email?: string;
  location?: string;
  role?: { roleRank: number };
  pic?: string;
}

export type UserProfileAction =
  | { type: "STORE"; payload: Partial<UserProfileState> }
  | { type: "RESET" };
