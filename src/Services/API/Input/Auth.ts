export interface RegisterInput {
  Name: string;
  Email?: string;
  Password?: string;
  MobileNo: string;
  RoleId?: string;
  Prefed_City: string;
  Prefed_City_Key?: string;
}

export interface LoginInput {
  MobileNo: string;
  Password?: string;
}